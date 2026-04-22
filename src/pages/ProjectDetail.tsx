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

function SkeletonDetail() {
  return (
    <div style={{ paddingTop: '100px' }}>
      <div style={{ height: '380px', background: 'rgba(255,255,255,0.04)', marginBottom: '0' }} />
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
        // Fetch related
        if (p.objective) {
          supabase
            .from('welfare_projects')
            .select('id,slug,header,key_statistic,workshop_date,objective,location,volunteers,featured,is_draft,google_drive_link,status')
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

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        style={{
          background: '#0a0a0a',
          paddingTop: '100px',
          paddingBottom: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient based on objective color */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${objColor}22 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ padding: '40px 64px 60px', position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
          {/* Back link */}
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '13px',
              color: 'rgba(247,245,240,0.5)',
              textDecoration: 'none',
              marginBottom: '32px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.5)')}
          >
            ← All Projects
          </Link>

          {/* Objective badge */}
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: `${objColor}22`,
                border: `1px solid ${objColor}44`,
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
                  marginLeft: '10px',
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
                ★ FEATURED
              </span>
            )}
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#f7f5f0',
              margin: '0 0 32px',
              lineHeight: 1.08,
              letterSpacing: '-0.5px',
              maxWidth: '800px',
            }}
          >
            {project.header}
          </motion.h1>

          {/* Key stat — hero prominent */}
          {project.key_statistic && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
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

          {/* Info grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {[
              { label: 'Date', value: formatDate(project.workshop_date), icon: '📅' },
              { label: 'Location', value: project.location, icon: '📍' },
              { label: 'Volunteers', value: project.volunteers ? `${project.volunteers} people` : null, icon: '👥' },
              { label: 'Category', value: project.objective, icon: '🏷️' },
              { label: 'Status', value: project.status, icon: '✅' },
            ]
              .filter(item => item.value)
              .map(item => (
                <div
                  key={item.label}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '14px 20px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Neutral Face Regular', sans-serif",
                      fontSize: '11px',
                      color: 'rgba(247,245,240,0.35)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {item.icon} {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontSize: '15px',
                      color: '#f7f5f0',
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 64px' }} />

      {/* ── About section ── */}
      <section style={{ padding: '60px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '28px',
              color: '#f7f5f0',
              margin: '0 0 20px',
            }}
          >
            About this project
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: project.google_drive_link ? '1fr auto' : '1fr',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '16px',
                  color: 'rgba(247,245,240,0.7)',
                  lineHeight: '1.75',
                  margin: '0 0 16px',
                }}
              >
                This is one of AquaTerra's documented welfare projects — a{' '}
                <strong style={{ color: '#f7f5f0' }}>{project.objective ?? 'welfare'}</strong> initiative
                {project.location ? ` carried out in ${project.location}` : ''}.
                {project.workshop_date ? ` It took place on ${formatDate(project.workshop_date)}.` : ''}
              </p>
              {project.volunteers && project.volunteers > 0 && (
                <p
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '16px',
                    color: 'rgba(247,245,240,0.7)',
                    lineHeight: '1.75',
                    margin: 0,
                  }}
                >
                  <strong style={{ color: '#54d186' }}>{project.volunteers} volunteers</strong> participated in
                  making this project happen — a testament to AquaTerra's community-driven approach.
                </p>
              )}
            </div>

            {project.google_drive_link && (
              <a
                href={project.google_drive_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'rgba(76,184,212,0.08)',
                  border: '1px solid rgba(76,184,212,0.25)',
                  borderRadius: '16px',
                  padding: '28px 32px',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  minWidth: '200px',
                  textAlign: 'center',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(76,184,212,0.15)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(76,184,212,0.08)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <span style={{ fontSize: '28px' }}>📸</span>
                <span
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontSize: '14px',
                    color: '#4cb8d4',
                    letterSpacing: '0.04em',
                  }}
                >
                  View Photos
                </span>
                <span
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '11px',
                    color: 'rgba(76,184,212,0.6)',
                  }}
                >
                  Google Drive
                </span>
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Related projects ── */}
      {related.length > 0 && (
        <section
          style={{
            padding: '60px 64px 80px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '24px',
                color: '#f7f5f0',
                margin: '0 0 32px',
              }}
            >
              More {project.objective} projects
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {related.map(rel => (
                <Link
                  key={rel.id}
                  to={`/projects/${rel.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: '#111111',
                      borderRadius: '14px',
                      padding: '20px',
                      border: '1px solid rgba(255,255,255,0.07)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.15)'
                      ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.07)'
                      ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Neutral Face Bold', sans-serif",
                        fontSize: '14px',
                        color: '#f7f5f0',
                        margin: '0 0 8px',
                        lineHeight: '1.4',
                      }}
                    >
                      {rel.header}
                    </h3>
                    {rel.key_statistic && (
                      <p
                        style={{
                          fontFamily: "'Instrument Serif', serif",
                          fontStyle: 'italic',
                          fontSize: '12px',
                          color: '#54d186',
                          margin: '0 0 10px',
                        }}
                      >
                        {rel.key_statistic}
                      </p>
                    )}
                    <span
                      style={{
                        fontFamily: "'Neutral Face Regular', sans-serif",
                        fontSize: '11px',
                        color: 'rgba(247,245,240,0.35)',
                      }}
                    >
                      {formatDate(rel.workshop_date)}
                    </span>
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
