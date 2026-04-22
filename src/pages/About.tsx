import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { supabase, type Blog } from '../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const numberStats = [
  { number: '534+', label: 'Projects', sub: 'documented welfare drives' },
  { number: '200+', label: 'Volunteers', sub: 'active across departments' },
  { number: '3,500+', label: 'Kids Taught', sub: 'across educational workshops' },
  { number: '4,000+', label: 'Saplings', sub: 'planted across drives' },
  { number: '1,600+', label: 'Medical', sub: 'checkups conducted' },
  { number: '2,500+', label: 'Event Attendees', sub: 'across fundraisers' },
  { number: '1,500+', label: 'Dogs Fed', sub: 'stray animal welfare' },
]

const departments = [
  { name: 'HR', icon: '👥', desc: 'Volunteer onboarding & people ops' },
  { name: 'Projects', icon: '📋', desc: 'Drive planning & execution' },
  { name: 'Finance', icon: '💰', desc: 'Budget, accounts & audits' },
  { name: 'Collabs', icon: '🤝', desc: 'NGO partnerships & outreach' },
  { name: 'Socials', icon: '📱', desc: 'Instagram, content & community' },
  { name: 'Website', icon: '💻', desc: 'Tech, design & digital presence' },
  { name: 'Events', icon: '🎪', desc: 'Fundraisers & cultural programs' },
]

const bubbleItems = [
  { id: 'projects', label: 'PROJECTS', color: '#1a3d2b', desc: '534 documented welfare drives — workshops, plantation drives, feeding drives, medical camps' },
  { id: 'events', label: 'EVENTS', color: '#3d2010', desc: 'Fundraising & cultural events — Disco Diwali, Paradox, Starry Night, Sundarbans expeditions' },
  { id: 'startups', label: 'STARTUPS', color: '#0f1f3d', desc: 'ROOTS (limited-drop streetwear) · ShikshAQ (free tutor matching, Kolkata) · AQ Ventures' },
  { id: 'departments', label: 'CORE DEPARTMENTS', color: '#0d2b2b', desc: 'HR · Projects · Finance · Collabs · Socials · Website · Events — 10+ departments, zero full-time roles' },
]

export default function About() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [selectedBubble, setSelectedBubble] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id,slug,headliner,featured_image,minutes_of_read,published_date,written_by,author_instagram,cover,author_url')
      .order('published_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setBlogs(data as Blog[])
        setBlogsLoading(false)
      })
  }, [])

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh' }}>
      <Nav />

      {/* ── Section 1: Hero ── */}
      <section
        style={{
          background: '#0a0a0a',
          paddingTop: '120px',
          paddingBottom: '100px',
          paddingLeft: '64px',
          paddingRight: '64px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '600px',
            background: 'radial-gradient(ellipse, rgba(84,209,134,0.05) 0%, rgba(62,139,194,0.04) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: '#54d186',
              textTransform: 'uppercase',
              margin: '0 0 28px',
            }}
          >
            About AquaTerra
          </motion.p>

          <h1
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(44px, 7vw, 88px)',
              color: '#f7f5f0',
              margin: '0 0 32px',
              lineHeight: 1.02,
              letterSpacing: '-1px',
            }}
          >
            STARTED AS
            <br />
            AN NGO.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              IT GOT OUT
              <br />
              OF HAND.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '22px',
              color: 'rgba(247,245,240,0.55)',
              margin: '0',
              lineHeight: '1.6',
              maxWidth: '560px',
            }}
          >
            Founded in 2021 with six volunteers and a dream. Now 200+ people, 534 documented projects, and zero signs of stopping.
          </p>
        </motion.div>
      </section>

      {/* ── Section 2: Origin Story ── */}
      <section
        style={{
          background: '#b8e8c8',
          padding: '100px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#255c3b',
                textTransform: 'uppercase',
                margin: '0 0 20px',
              }}
            >
              The Origin
            </p>
            <h2
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 52px)',
                color: '#0a0a0a',
                margin: '0 0 24px',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              Born in Kolkata.
              <br />
              Built by Young People.
            </h2>
            <p
              style={{
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '16px',
                color: '#1a3d25',
                lineHeight: '1.75',
                margin: '0 0 20px',
              }}
            >
              AquaTerra was founded in July 2021 in Kolkata. It started with 6 volunteers who just wanted to do something meaningful. No office, no budget, no hierarchy — just people who showed up.
            </p>
            <p
              style={{
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '16px',
                color: '#1a3d25',
                lineHeight: '1.75',
                margin: 0,
              }}
            >
              Over the course of 4 years, that grew into 200+ active volunteers across 10+ departments, 534 documented welfare projects, and partnerships with 20+ NGOs across West Bengal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Fact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Founded', value: 'July 2021', icon: '📅' },
                { label: 'Based in', value: 'Kolkata, India', icon: '📍' },
                { label: 'Est. running', value: '4 Years', icon: '⏳' },
                { label: 'Started with', value: '6 volunteers', icon: '🌱' },
                { label: 'Now', value: '200+ active volunteers', icon: '🚀' },
                { label: 'DARPAN Certified', value: 'Govt. Reg: AAFTT2300ME20251', icon: '📜' },
              ].map(fact => (
                <div
                  key={fact.label}
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: '14px',
                    padding: '16px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    border: '1px solid rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{fact.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Neutral Face Regular', sans-serif",
                        fontSize: '11px',
                        color: 'rgba(26,61,37,0.6)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '2px',
                      }}
                    >
                      {fact.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Neutral Face Bold', sans-serif",
                        fontSize: '16px',
                        color: '#0a0a0a',
                      }}
                    >
                      {fact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Numbers Grid + Photo Mosaic ── */}
      <section
        style={{
          background: '#0a0a0a',
          padding: '100px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <h2
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: '#f7f5f0',
                margin: '0 0 12px',
                letterSpacing: '-0.5px',
              }}
            >
              Four Years of Impact
            </h2>
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: '18px',
                color: 'rgba(247,245,240,0.4)',
                margin: 0,
              }}
            >
              "Not for a campaign. Not for the resume. For the work."
            </p>
          </motion.div>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              marginBottom: '64px',
            }}
          >
            {numberStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '18px',
                  padding: '28px 24px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '44px',
                    color: '#54d186',
                    letterSpacing: '-1px',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontSize: '15px',
                    color: '#f7f5f0',
                    marginBottom: '4px',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(247,245,240,0.35)',
                  }}
                >
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Photo mosaic from blog featured images */}
          {!blogsLoading && blogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'rgba(247,245,240,0.3)',
                  textTransform: 'uppercase',
                  margin: '0 0 20px',
                }}
              >
                Moments from the field
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gridAutoRows: '140px',
                  gap: '10px',
                }}
              >
                {blogs.slice(0, 10).map((blog, i) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    style={{
                      gridColumn: i === 0 || i === 5 ? 'span 2' : 'span 1',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'block',
                      position: 'relative',
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
                          transition: 'transform 0.3s',
                        }}
                        onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.06)' }}
                        onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Section 4: Departments ── */}
      <section
        style={{
          background: '#0d0d0d',
          padding: '100px 64px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '52px' }}
          >
            <h2
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#f7f5f0',
                margin: '0 0 12px',
                letterSpacing: '-0.3px',
              }}
            >
              How We're Organised
            </h2>
            <p
              style={{
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '15px',
                color: 'rgba(247,245,240,0.4)',
                margin: 0,
              }}
            >
              10+ departments. No full-time roles. No salaries. Just choice.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}
          >
            {departments.map((dept, i) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                style={{
                  background: '#141414',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.25s',
                }}
                whileHover={{ y: -4, border: '1px solid rgba(84,209,134,0.2)' } as never}
              >
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{dept.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#f7f5f0',
                    margin: '0 0 6px',
                  }}
                >
                  {dept.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(247,245,240,0.45)',
                    margin: 0,
                    lineHeight: '1.5',
                  }}
                >
                  {dept.desc}
                </p>
              </motion.div>
            ))}

            {/* Join CTA tile */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: departments.length * 0.06 }}
            >
              <Link
                to="/contact"
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(84,209,134,0.12), rgba(76,184,212,0.08))',
                    border: '1px solid rgba(84,209,134,0.25)',
                    borderRadius: '16px',
                    padding: '24px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    minHeight: '120px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg, rgba(84,209,134,0.2), rgba(76,184,212,0.12))' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg, rgba(84,209,134,0.12), rgba(76,184,212,0.08))' }}
                >
                  <span style={{ fontSize: '24px' }}>✨</span>
                  <span
                    style={{
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontSize: '16px',
                      color: '#54d186',
                    }}
                  >
                    Join a Department
                  </span>
                  <span
                    style={{
                      fontFamily: "'Neutral Face Regular', sans-serif",
                      fontSize: '12px',
                      color: 'rgba(84,209,134,0.6)',
                    }}
                  >
                    Apply to volunteer →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Everything We Do ── */}
      <section
        style={{
          background: '#0a0a0a',
          padding: '100px 64px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '52px', textAlign: 'center' }}
          >
            <h2
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#f7f5f0',
                margin: '0 0 12px',
                letterSpacing: '-0.3px',
              }}
            >
              Everything We Do
            </h2>
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: '17px',
                color: 'rgba(247,245,240,0.4)',
                margin: 0,
              }}
            >
              Tap any bubble to explore.
            </p>
          </motion.div>

          <div
            style={{
              position: 'relative',
              height: '420px',
              width: '100%',
            }}
          >
            {bubbleItems.map((item, i) => {
              const positions = [
                { top: '8%', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', left: '8%', transform: 'translateY(-50%)' },
                { top: '50%', right: '8%', transform: 'translateY(-50%)' },
                { bottom: '8%', left: '50%', transform: 'translateX(-50%)' },
              ]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedBubble(selectedBubble === item.id ? null : item.id)}
                  style={{
                    position: 'absolute',
                    ...positions[i],
                    width: '170px',
                    height: '170px',
                    borderRadius: '50%',
                    background: item.color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: selectedBubble === item.id
                      ? '2px solid rgba(255,255,255,0.5)'
                      : '2px solid rgba(255,255,255,0.1)',
                    transition: 'border 0.2s',
                    zIndex: selectedBubble === item.id ? 5 : 3,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontWeight: 700,
                      fontSize: '12px',
                      color: '#ffffff',
                      textAlign: 'center',
                      padding: '0 12px',
                      lineHeight: '1.3',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      marginTop: '8px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: selectedBubble === item.id ? '#54d186' : 'rgba(255,255,255,0.4)',
                      transition: 'background 0.2s',
                    }}
                  />
                </motion.div>
              )
            })}

            {/* Description panel */}
            {selectedBubble && (() => {
              const found = bubbleItems.find(b => b.id === selectedBubble)
              if (!found) return null
              return (
                <motion.div
                  key={selectedBubble}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: '-70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '16px',
                    padding: '14px 28px',
                    zIndex: 10,
                    backdropFilter: 'blur(8px)',
                    maxWidth: '600px',
                    width: 'max-content',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Neutral Face Regular', sans-serif",
                      fontSize: '14px',
                      color: '#f7f5f0',
                      margin: 0,
                      textAlign: 'center',
                      lineHeight: '1.5',
                    }}
                  >
                    {found.desc}
                  </p>
                </motion.div>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ── Section 6: ROOTS callout ── */}
      <section
        style={{
          background: '#1a2e1a',
          padding: '100px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(84,209,134,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(84,209,134,0.1)',
                border: '1px solid rgba(84,209,134,0.2)',
                borderRadius: '999px',
                padding: '6px 16px',
                marginBottom: '28px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '11px',
                  color: '#54d186',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                AquaTerra Startup
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#f7f5f0',
                margin: '0 0 20px',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              Meet{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #54d186, #b8e8c8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ROOTS
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '17px',
                color: 'rgba(247,245,240,0.65)',
                lineHeight: '1.75',
                margin: '0 0 28px',
                maxWidth: '600px',
              }}
            >
              ROOTS is AquaTerra's limited-drop streetwear label. Every item is designed in-house, manufactured in limited runs — and 100% of profits go back into funding our welfare projects.
            </p>

            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: '18px',
                color: 'rgba(184,232,200,0.7)',
                margin: '0 0 36px',
              }}
            >
              "Wear something. Fund something real."
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['ShikshAQ — Free Tutor Matching', 'AQ Ventures', 'ROOTS Streetwear'].map(startup => (
                <div
                  key={startup}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '10px 18px',
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(247,245,240,0.6)',
                  }}
                >
                  {startup}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
