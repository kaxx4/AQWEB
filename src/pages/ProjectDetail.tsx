import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { supabase, type WelfareProject } from '../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const objectiveColor: Record<string, string> = {
  Workshop: '#3e8bc2',
  'Feeding Dogs': '#e08c3c',
  'Plantation Drive': '#255c3b',
  'Distribution Drive': '#7c4dbc',
  'Sundarbans Relief': '#1a6b6b',
  'Old Age Home Visit': '#b04060',
  'Fundraising Event': '#cc3333',
  Others: '#666666',
}

function getObjColor(obj: string | null) {
  return objectiveColor[obj ?? ''] ?? '#404040'
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getProjectImage(project: WelfareProject): string {
  if (project.main_image) return project.main_image
  return `/images/initiative-${(project.id % 43) + 1}.png`
}

const bodyVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const itemVariant = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

function SkeletonDetail() {
  return (
    <div style={{ paddingTop: '64px' }}>
      <div style={{ height: '440px', background: 'rgba(255,255,255,0.04)' }} />
      <div style={{ padding: '64px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ height: '48px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', marginBottom: '24px', width: '70%' }} />
        <div style={{ height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', marginBottom: '12px', width: '50%' }} />
        <div style={{ height: '18px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', marginBottom: '8px', width: '60%' }} />
        <div style={{ height: '18px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', width: '40%' }} />
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<WelfareProject | null>(null)
  const [related, setRelated] = useState<WelfareProject[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    supabase
      .from('welfare_projects')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true)
          setLoading(false)
          return
        }
        const p = data as WelfareProject
        setProject(p)
        setLoading(false)
        if (p.objective) {
          supabase
            .from('welfare_projects')
            .select('id,slug,header,key_statistic,workshop_date,objective,location,volunteers,featured,is_draft,google_drive_link,status,main_image,main_image_alt')
            .eq('is_draft', false)
            .eq('objective', p.objective)
            .neq('slug', slug)
            .order('workshop_date', { ascending: false })
            .limit(3)
            .then(({ data: relData }) => {
              if (relData) setRelated(relData as WelfareProject[])
            })
        }
      })
  }, [slug])

  if (loading) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <Nav />
        <SkeletonDetail />
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <Nav />
        <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", color: '#f7f5f0', fontSize: '28px' }}>Project not found.</p>
        <Link to="/projects" style={{ color: '#54d186', fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px' }}>← Back to all projects</Link>
      </div>
    )
  }

  const objColor = getObjColor(project.objective)
  const heroImage = getProjectImage(project)
  const galleryImages = [
    project.image_1 ? { src: project.image_1, alt: project.image_1_alt ?? '', label: project.label_1 } : null,
    project.image_2 ? { src: project.image_2, alt: project.image_2_alt ?? '', label: project.label_2 } : null,
    project.image_3 ? { src: project.image_3, alt: project.image_3_alt ?? '', label: project.label_3 } : null,
    project.image_4 ? { src: project.image_4, alt: project.image_4_alt ?? '', label: project.label_4 } : null,
  ].filter(Boolean) as { src: string; alt: string; label: string | null }[]

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero with full-width image ── */}
      <section
        style={{
          position: 'relative',
          paddingTop: '64px',
          overflow: 'hidden',
          minHeight: '460px',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <img
            src={heroImage}
            alt={project.main_image_alt ?? project.header}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              outline: '1px solid rgba(255,255,255,0.1)',
              outlineOffset: '-1px',
            }}
            onError={e => {
              const img = e.target as HTMLImageElement
              img.src = `/images/initiative-${(project.id % 43) + 1}.png`
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.95) 100%)',
            }}
          />
        </div>

        {/* Collab logo top-right */}
        {project.collab_logo && (
          <div
            style={{
              position: 'absolute',
              top: '84px',
              right: '40px',
              zIndex: 10,
              background: 'rgba(10,10,10,0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '14px',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '10px', color: 'rgba(247,245,240,0.5)', letterSpacing: '0.08em' }}>
              In collaboration with
            </span>
            <img
              src={project.collab_logo}
              alt={project.collab_logo_alt ?? project.collab_name ?? ''}
              style={{
                maxWidth: '120px',
                maxHeight: '40px',
                objectFit: 'contain',
                outline: '1px solid rgba(255,255,255,0.1)',
                outlineOffset: '-1px',
              }}
            />
          </div>
        )}

        {/* Content over image */}
        <div style={{ position: 'relative', zIndex: 5, padding: '60px 64px 60px', maxWidth: '1100px' }}>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '13px',
              color: 'rgba(247,245,240,0.6)',
              textDecoration: 'none',
              marginBottom: '32px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.6)')}
          >
            ← All Projects
          </Link>

          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: `${objColor}33`,
                border: `1px solid ${objColor}55`,
                borderRadius: '8px',
                padding: '6px 14px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '11px',
                color: objColor,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: objColor, display: 'inline-block' }} />
              {project.objective ?? 'Others'}
            </span>
            {project.featured && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255,215,0,0.12)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '11px',
                  color: '#ffd700',
                  letterSpacing: '0.08em',
                }}
              >
                FEATURED
              </span>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#f7f5f0',
              margin: '0 0 24px',
              lineHeight: 1.08,
              letterSpacing: '-0.5px',
              maxWidth: '800px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            {project.header}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
          >
            {[
              { label: 'Date', value: formatDate(project.workshop_date) },
              { label: 'Location', value: project.location },
              { label: 'Volunteers', value: project.volunteers ? `${project.volunteers} people` : null },
              { label: 'Status', value: project.status },
            ]
              .filter(item => item.value)
              .map(item => (
                <div
                  key={item.label}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '10px', color: 'rgba(247,245,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '14px', color: '#f7f5f0', fontVariantNumeric: 'tabular-nums' }}>
                    {item.value}
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <motion.section
        variants={bodyVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ padding: '60px 64px', maxWidth: '1100px', margin: '0 auto' }}
      >
        {/* Key stat */}
        {project.key_statistic && (
          <motion.div
            variants={itemVariant}
            style={{
              display: 'inline-block',
              background: 'rgba(184,232,200,0.08)',
              border: '1px solid rgba(184,232,200,0.2)',
              borderRadius: '16px',
              padding: '20px 32px',
              marginBottom: '40px',
            }}
          >
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                color: '#b8e8c8',
                margin: 0,
                lineHeight: '1.4',
              }}
            >
              "{project.key_statistic}"
            </p>
          </motion.div>
        )}

        {/* Long writeup or content */}
        {(project.long_writeup || project.content) && (
          <motion.div variants={itemVariant}>
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '22px', color: '#f7f5f0', margin: '0 0 20px', textWrap: 'balance' } as React.CSSProperties}>
              About this project
            </h2>
            <div
              style={{
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '16px',
                color: 'rgba(247,245,240,0.7)',
                lineHeight: '1.75',
                whiteSpace: 'pre-wrap',
              }}
            >
              {project.long_writeup || project.content}
            </div>
          </motion.div>
        )}

        {/* Fallback description */}
        {!project.long_writeup && !project.content && (
          <motion.div variants={itemVariant}>
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '22px', color: '#f7f5f0', margin: '0 0 20px' }}>
              About this project
            </h2>
            <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: 'rgba(247,245,240,0.7)', lineHeight: '1.75', margin: '0 0 16px' }}>
              This is one of AquaTerra's documented welfare projects — a{' '}
              <strong style={{ color: '#f7f5f0' }}>{project.objective ?? 'welfare'}</strong> initiative
              {project.location ? ` carried out in ${project.location}` : ''}.
              {project.workshop_date ? ` It took place on ${formatDate(project.workshop_date)}.` : ''}
            </p>
            {project.volunteers && project.volunteers > 0 && (
              <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: 'rgba(247,245,240,0.7)', lineHeight: '1.75', margin: 0 }}>
                <strong style={{ color: '#54d186', fontVariantNumeric: 'tabular-nums' }}>{project.volunteers} volunteers</strong> participated in making this project happen.
              </p>
            )}
          </motion.div>
        )}

        {/* Photo gallery */}
        {galleryImages.length > 0 && (
          <motion.div variants={itemVariant} style={{ marginTop: '48px' }}>
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '22px', color: '#f7f5f0', margin: '0 0 24px', textWrap: 'balance' } as React.CSSProperties}>
              Photos
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: '100%',
                      aspectRatio: '16/10',
                      objectFit: 'cover',
                      display: 'block',
                      outline: '1px solid rgba(255,255,255,0.1)',
                      outlineOffset: '-1px',
                    }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
                  />
                  {img.label && (
                    <div style={{ padding: '10px 14px', fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.5)' }}>
                      {img.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Google Drive link */}
        {project.google_drive_link && (
          <motion.div variants={itemVariant} style={{ marginTop: '40px' }}>
            <a
              href={project.google_drive_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(76,184,212,0.08)',
                border: '1px solid rgba(76,184,212,0.25)',
                borderRadius: '12px',
                padding: '14px 24px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(76,184,212,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(76,184,212,0.08)' }}
            >
              <span style={{ fontSize: '20px' }}>📸</span>
              <span style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '14px', color: '#4cb8d4' }}>View All Photos (Google Drive)</span>
            </a>
          </motion.div>
        )}
      </motion.section>

      {/* ── Related projects ── */}
      {related.length > 0 && (
        <section style={{ padding: '60px 64px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '24px', color: '#f7f5f0', margin: '0 0 32px', textWrap: 'balance' } as React.CSSProperties}>
              More {project.objective} projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {related.map(rel => (
                <Link key={rel.id} to={`/projects/${rel.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      background: '#111111',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.07)',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px rgba(255,255,255,0.15)'
                      ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px rgba(255,255,255,0.07)'
                      ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                    }}
                  >
                    <img
                      src={getProjectImage(rel)}
                      alt={rel.header}
                      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                      onError={e => { (e.target as HTMLImageElement).src = `/images/initiative-${(rel.id % 43) + 1}.png` }}
                    />
                    <div style={{ padding: '16px' }}>
                      <h3 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '14px', color: '#f7f5f0', margin: '0 0 6px', lineHeight: '1.4' }}>
                        {rel.header}
                      </h3>
                      <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '11px', color: 'rgba(247,245,240,0.35)' }}>
                        {formatDate(rel.workshop_date)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  )
}
