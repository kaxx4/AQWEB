import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const stats = [
  { number: '534+', label: 'Projects', sub: 'documented welfare drives', photo: 1 },
  { number: '200+', label: 'Volunteers', sub: 'active across departments', photo: 2 },
  { number: '3,500+', label: 'Kids Taught', sub: 'across educational workshops', photo: 3 },
  { number: '4,000+', label: 'Saplings', sub: 'planted across drives', photo: 4 },
  { number: '1,600+', label: 'Medical', sub: 'checkups conducted', photo: 5 },
  { number: '2,500+', label: 'Event Attendees', sub: 'across fundraisers', photo: 6 },
]

const values = [
  { word: 'Show Up.', desc: "No ghost members. No lurkers. If you're in, you're actually in." },
  { word: 'No Hierarchy.', desc: 'Your year doesn\'t determine your say. Ideas win on merit here.' },
  { word: 'Own It.', desc: 'You took it on, you see it through. No hand-holding. No excuses.' },
  { word: 'Make Noise.', desc: 'Documenting the work publicly is part of the work.' },
]

const faqs = [
  { q: 'Is this just an NGO?', a: 'No. AquaTerra runs welfare drives, yes — but it\'s also a student ecosystem. We have startups (ROOTS streetwear, ShikshAQ), departments, events, and zero full-time roles. Think of it as the company you wished existed in college.' },
  { q: 'Do I need experience?', a: 'No. We\'ve onboarded designers, writers, coders, photographers, and event planners who had zero NGO experience. If you have the will to actually do the thing, we\'ll figure out the rest.' },
  { q: 'What\'s the time commitment?', a: 'Flexible. Some people attend one drive a month. Others run entire departments. There\'s no minimum — but there is an expectation that if you say you\'ll do something, you do it.' },
  { q: 'Is it free to join?', a: 'Always. We\'re not a paid course or a subscription community. You join, you contribute, you grow. That\'s the whole deal.' },
  { q: 'What if I\'m not in Kolkata?', a: 'Most of our on-ground work happens in Kolkata. But our content, blog, design, and social teams work remotely. Reach out — we\'ll find a fit.' },
  { q: 'Will I get a certificate?', a: 'We give LoRs and recognition to people who genuinely contribute. We don\'t hand out participation trophies. But if you do the work, we\'ll say so — loudly.' },
]

const timelineEvents = [
  { year: 'Jul 2021', text: 'Founded with 6 volunteers and a group chat.', photo: 1 },
  { year: '2022', text: 'Crossed 100 projects. First Sundarbans expedition. First partnerships.', photo: 2 },
  { year: '2023', text: 'DARPAN certified. ROOTS streetwear launched. ShikshAQ goes live.', photo: 3 },
  { year: '2024', text: '200+ active members. 400+ projects. Featured in The Statesman.', photo: 4 },
  { year: '2025', text: '534 documented drives. Three startups. Zero signs of stopping.', photo: 5 },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}
        >
          <motion.p variants={itemVariant}
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

          <motion.h1 variants={itemVariant}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(44px, 7vw, 88px)',
              color: '#f7f5f0',
              margin: '0 0 32px',
              lineHeight: 1.02,
              letterSpacing: '-1px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            More than thoughts
            <br />and prayers.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Much more.
            </span>
          </motion.h1>

          <motion.p variants={itemVariant}
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
            A student-driven NGO that got wildly out of hand. 534 documented projects, three startups, and a community that shows up when it matters.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Section 2: Origin Story Timeline ── */}
      <section style={{ background: '#b8e8c8', padding: '100px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '60px' }}
          >
            <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.15em', color: '#255c3b', textTransform: 'uppercase', margin: '0 0 16px' }}>
              The Origin
            </p>
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 4vw, 52px)', color: '#0a0a0a', margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.5px', textWrap: 'balance' } as React.CSSProperties}>
              Started July 2021.
              <br />Got out of hand.
            </h2>
            <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: '#1a3d25', lineHeight: '1.75', margin: 0, maxWidth: '560px' }}>
              Six people. One group chat. Zero budget. Four years later we're 200+ strong with three startups and 534 documented projects.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr auto 1fr' : '1fr auto 1fr',
                  gap: '32px',
                  alignItems: 'center',
                  paddingBottom: i < timelineEvents.length - 1 ? '32px' : 0,
                }}
              >
                <div style={{ textAlign: i % 2 === 0 ? 'right' : 'left', gridColumn: i % 2 === 0 ? '1' : '3' }}>
                  <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '14px', color: '#255c3b', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    {event.year}
                  </div>
                  <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: '#0a0a0a', lineHeight: '1.6', margin: 0 }}>
                    {event.text}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gridColumn: '2' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#255c3b', flexShrink: 0 }} />
                  {i < timelineEvents.length - 1 && (
                    <div style={{ width: '2px', height: '100%', minHeight: '40px', background: 'rgba(37,92,59,0.3)', flexGrow: 1 }} />
                  )}
                </div>
                <div style={{ gridColumn: i % 2 === 0 ? '3' : '1' }}>
                  <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', maxWidth: '280px', marginLeft: i % 2 === 0 ? '0' : 'auto', marginRight: i % 2 === 0 ? 'auto' : '0' }}>
                    <img
                      src={`/images/community-photo-${event.photo}.jpg`}
                      alt={event.year}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', outline: '1px solid rgba(0,0,0,0.1)', outlineOffset: '-1px' }}
                      onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Who even are we ── */}
      <section style={{ background: '#0a0a0a', padding: '100px 64px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src="/images/team-photo-1.png"
                alt="The AquaTerra team"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                onError={e => { (e.target as HTMLImageElement).src = '/images/community-photo-1.jpg' }}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.15em', color: '#54d186', textTransform: 'uppercase', margin: '0 0 20px' }}>
              Who even are we?
            </p>
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#f7f5f0', margin: '0 0 20px', lineHeight: 1.1, textWrap: 'balance' } as React.CSSProperties}>
              Students. Builders. People who actually show up.
            </h2>
            <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: 'rgba(247,245,240,0.65)', lineHeight: '1.75', margin: '0 0 16px' }}>
              AquaTerra is not run by professionals. It's run by college students and recent graduates who got tired of waiting for someone else to do the work.
            </p>
            <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: 'rgba(247,245,240,0.65)', lineHeight: '1.75', margin: '0 0 28px' }}>
              10+ departments. No salaries. No full-time roles. Just people who chose to spend their free time on something real.
            </p>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                  color: '#0a0a0a',
                  borderRadius: '39px',
                  padding: '12px 24px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Join Us →
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Core Values ── */}
      <section style={{ background: '#0d0d0d', padding: '100px 64px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '52px' }}
          >
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#f7f5f0', margin: '0 0 12px', textWrap: 'balance' } as React.CSSProperties}>
              What we actually stand for
            </h2>
            <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.4)', margin: 0 }}>
              Four principles. No exceptions.
            </p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.word}
                initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  background: '#141414',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <h3 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '28px', color: '#54d186', margin: '0 0 16px', lineHeight: 1.1, textWrap: 'balance' } as React.CSSProperties}>
                  {v.word}
                </h3>
                <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px', color: 'rgba(247,245,240,0.55)', lineHeight: '1.6', margin: 0 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Stats bento ── */}
      <section style={{ background: '#0a0a0a', padding: '100px 64px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '52px' }}
          >
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#f7f5f0', margin: '0 0 12px', textWrap: 'balance' } as React.CSSProperties}>
              Four years of impact
            </h2>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '17px', color: 'rgba(247,245,240,0.4)', margin: 0 }}>
              "Not for a campaign. Not for the resume. For the work."
            </p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
                }}
              >
                <img
                  src={`/images/community-photo-${stat.photo}.jpg`}
                  alt={stat.label}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                  onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '42px', color: '#f7f5f0', lineHeight: 1, letterSpacing: '-1px', marginBottom: '6px', fontVariantNumeric: 'tabular-nums' }}>
                    {stat.number}
                  </div>
                  <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '15px', color: '#f7f5f0', marginBottom: '2px' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.6)' }}>
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: FAQ accordion ── */}
      <section style={{ background: '#0d0d0d', padding: '100px 64px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '48px' }}
          >
            <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#f7f5f0', margin: '0 0 12px', textWrap: 'balance' } as React.CSSProperties}>
              Real questions. Real answers.
            </h2>
            <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.4)', margin: 0 }}>
              We don't do fluff.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '24px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'left',
                    minHeight: 40,
                  }}
                >
                  <span style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '16px', fontWeight: 700, color: '#f7f5f0', flex: 1 }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: '#54d186', fontSize: '24px', flexShrink: 0, lineHeight: 1 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.65)', lineHeight: '1.7', margin: '0 0 24px', paddingRight: '40px' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
