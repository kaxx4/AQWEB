import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { supabase, type Blog } from '../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function formatDate(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function SkeletonCard() {
  return (
    <div
      style={{
        background: '#f0ede8',
        borderRadius: '20px',
        overflow: 'hidden',
        height: '440px',
      }}
    >
      <div style={{ height: '220px', background: '#e0ddd8' }} />
      <div style={{ padding: '24px' }}>
        <div style={{ width: '80px', height: '18px', background: '#d5d2cd', borderRadius: '6px', marginBottom: '14px' }} />
        <div style={{ width: '90%', height: '20px', background: '#d5d2cd', borderRadius: '6px', marginBottom: '8px' }} />
        <div style={{ width: '70%', height: '16px', background: '#dedad5', borderRadius: '6px', marginBottom: '16px' }} />
        <div style={{ width: '60%', height: '12px', background: '#dedad5', borderRadius: '4px' }} />
      </div>
    </div>
  )
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id,slug,headliner,featured_image,minutes_of_read,published_date,written_by,author_instagram')
      .order('published_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setBlogs(data as Blog[])
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#faf8f4', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        style={{
          background: '#ffffff',
          paddingTop: '120px',
          paddingBottom: '72px',
          paddingLeft: '64px',
          paddingRight: '64px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(62,139,194,0.08)',
              border: '1px solid rgba(62,139,194,0.18)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '11px',
                color: '#3e8bc2',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {loading ? '...' : `${blogs.length} Essays`}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(36px, 6vw, 72px)',
              color: '#0a0a0a',
              margin: '0 0 16px',
              lineHeight: 1.08,
              letterSpacing: '-0.5px',
            }}
          >
            Groundwork Diaries 📖
          </h1>

          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '20px',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
              lineHeight: '1.6',
              maxWidth: '540px',
            }}
          >
            Essays by people who actually show up. Unfiltered, from the field.
          </p>
        </motion.div>
      </section>

      {/* ── Blog Grid ── */}
      <section style={{ padding: '60px 64px 100px' }}>
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '28px',
            }}
          >
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              >
                <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                      transition: 'box-shadow 0.25s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                    }}
                  >
                    {/* Cover image */}
                    <div
                      style={{
                        height: '220px',
                        overflow: 'hidden',
                        position: 'relative',
                        background: '#e8e5e0',
                      }}
                    >
                      {blog.featured_image ? (
                        <img
                          src={blog.featured_image}
                          alt={blog.headliner}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                          }}
                          onError={e => {
                            (e.target as HTMLImageElement).style.opacity = '0'
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #e8f4fd, #b8e8c8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                          }}
                        >
                          📝
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '24px' }}>
                      {/* Instagram badge */}
                      {blog.author_instagram && (
                        <a
                          href={`https://instagram.com/${blog.author_instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: 'rgba(62,139,194,0.08)',
                            border: '1px solid rgba(62,139,194,0.15)',
                            borderRadius: '999px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontFamily: "'Neutral Face Regular', sans-serif",
                            color: '#3e8bc2',
                            textDecoration: 'none',
                            marginBottom: '14px',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(62,139,194,0.14)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(62,139,194,0.08)')}
                        >
                          <InstagramIcon size={11} />
                          {blog.author_instagram}
                        </a>
                      )}

                      {/* Title */}
                      <h2
                        style={{
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontWeight: 700,
                          fontSize: '17px',
                          color: '#0a0a0a',
                          margin: '0 0 8px',
                          lineHeight: '1.38',
                        }}
                      >
                        {blog.headliner}
                      </h2>

                      {/* Author */}
                      {blog.written_by && (
                        <p
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontStyle: 'italic',
                            fontSize: '14px',
                            color: 'rgba(10,10,10,0.5)',
                            margin: '0 0 14px',
                          }}
                        >
                          by {blog.written_by}
                        </p>
                      )}

                      {/* Meta row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {blog.published_date && (
                          <span
                            style={{
                              fontFamily: "'Neutral Face Regular', sans-serif",
                              fontSize: '11px',
                              color: 'rgba(10,10,10,0.35)',
                            }}
                          >
                            {formatDate(blog.published_date)}
                          </span>
                        )}
                        {blog.minutes_of_read && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontFamily: "'Neutral Face Regular', sans-serif",
                              fontSize: '11px',
                              color: 'rgba(10,10,10,0.35)',
                            }}
                          >
                            ⏱ {blog.minutes_of_read} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
