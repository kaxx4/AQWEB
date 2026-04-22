import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { supabase, type Blog } from '../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function formatDate(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function SkeletonPost() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <div style={{ height: '500px', background: '#1a1a1a' }} />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ height: '44px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', marginBottom: '20px', width: '75%' }} />
        <div style={{ height: '18px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', marginBottom: '10px', width: '50%' }} />
        <div style={{ height: '18px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', width: '40%' }} />
      </div>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [related, setRelated] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true)
          setLoading(false)
          return
        }
        setBlog(data as Blog)
        setLoading(false)
      })
    // Fetch related
    supabase
      .from('blogs')
      .select('id,slug,headliner,featured_image,minutes_of_read,published_date,written_by,author_instagram,cover,author_url')
      .neq('slug', slug)
      .order('published_date', { ascending: false })
      .limit(3)
      .then(({ data: relData }) => {
        if (relData) setRelated(relData as Blog[])
      })
  }, [slug])

  if (loading) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <Nav />
        <SkeletonPost />
      </div>
    )
  }

  if (notFound || !blog) {
    return (
      <div
        style={{
          background: '#0a0a0a',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <Nav />
        <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", color: '#f7f5f0', fontSize: '28px' }}>
          Blog post not found.
        </p>
        <Link to="/blog" style={{ color: '#4cb8d4', fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px' }}>
          ← All Essays
        </Link>
      </div>
    )
  }

  const externalUrl = `https://ngoaquaterra.com/blog/${blog.slug}`

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero — full bleed image ── */}
      <section
        style={{
          position: 'relative',
          height: '560px',
          overflow: 'hidden',
        }}
      >
        {blog.featured_image ? (
          <img
            src={blog.featured_image}
            alt={blog.headliner}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0d2030, #0a2a1a)',
            }}
          />
        )}
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.25) 100%)',
          }}
        />
        {/* Content over image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0 64px 48px',
          }}
        >
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '13px',
              color: 'rgba(247,245,240,0.55)',
              textDecoration: 'none',
              marginBottom: '20px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.55)')}
          >
            ← All Essays
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              color: '#ffffff',
              margin: '0 0 18px',
              lineHeight: 1.1,
              letterSpacing: '-0.3px',
              maxWidth: '760px',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            {blog.headliner}
          </motion.h1>

          {/* Author + meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
          >
            {blog.written_by && (
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: '16px',
                  color: 'rgba(247,245,240,0.8)',
                }}
              >
                by {blog.written_by}
              </span>
            )}
            {blog.published_date && (
              <span
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(247,245,240,0.45)',
                }}
              >
                {formatDate(blog.published_date)}
              </span>
            )}
            {blog.minutes_of_read && (
              <span
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(247,245,240,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ⏱ {blog.minutes_of_read} min read
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '64px 32px',
        }}
      >
        {/* Placeholder content card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📖</div>
          <h2
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontSize: '20px',
              color: '#f7f5f0',
              margin: '0 0 12px',
            }}
          >
            Full essay available on AquaTerra's website
          </h2>
          <p
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '15px',
              color: 'rgba(247,245,240,0.55)',
              margin: '0 0 24px',
              lineHeight: '1.65',
            }}
          >
            This essay is hosted on AquaTerra's official website. Click below to read the full piece.
          </p>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#4cb8d4',
              color: '#0a0a0a',
              borderRadius: '999px',
              padding: '12px 28px',
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontSize: '14px',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#3da8c4')}
            onMouseLeave={e => (e.currentTarget.style.background = '#4cb8d4')}
          >
            Read on ngoaquaterra.com →
          </a>
        </motion.div>

        {/* Author Instagram CTA */}
        {blog.author_instagram && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, #0d1f3c, #0a0a0a)',
              border: '1px solid rgba(62,139,194,0.25)',
              borderRadius: '20px',
              padding: '32px 40px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <InstagramIcon size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '15px',
                  color: '#f7f5f0',
                  margin: '0 0 4px',
                }}
              >
                {blog.written_by ?? 'The Author'}
              </p>
              <p
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(247,245,240,0.5)',
                  margin: 0,
                }}
              >
                Follow the author on Instagram
              </p>
            </div>
            <a
              href={`https://instagram.com/${blog.author_instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(62,139,194,0.12)',
                border: '1px solid rgba(62,139,194,0.3)',
                borderRadius: '999px',
                padding: '8px 20px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '12px',
                color: '#4cb8d4',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(62,139,194,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(62,139,194,0.12)')}
            >
              {blog.author_instagram}
            </a>
          </motion.div>
        )}
      </section>

      {/* ── Related blogs ── */}
      {related.length > 0 && (
        <section
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '60px 64px 80px',
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
              More essays
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
              }}
            >
              {related.map(rel => (
                <Link key={rel.id} to={`/blog/${rel.slug}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: '#111111',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {rel.featured_image && (
                      <div style={{ height: '160px', overflow: 'hidden', background: '#1a1a1a' }}>
                        <img
                          src={rel.featured_image}
                          alt={rel.headliner}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '18px' }}>
                      <h3
                        style={{
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontSize: '14px',
                          color: '#f7f5f0',
                          margin: '0 0 6px',
                          lineHeight: '1.38',
                        }}
                      >
                        {rel.headliner}
                      </h3>
                      {rel.written_by && (
                        <p
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontStyle: 'italic',
                            fontSize: '12px',
                            color: 'rgba(247,245,240,0.45)',
                            margin: 0,
                          }}
                        >
                          by {rel.written_by}
                        </p>
                      )}
                    </div>
                  </motion.div>
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
