import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const FLOATY_EMOJIS = ['🌿', '🌊', '🌍', '🐾', '✨', '💧', '🌱', '🦋', '☀️', '🌙']

function FloatingEmoji({ emoji, x, delay }: { emoji: string; x: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.4 }}
      animate={{ opacity: [0, 0.8, 0], y: -120, scale: [0.4, 1, 0.6], rotate: [0, 20, -10] }}
      transition={{ duration: 3.5, delay, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        bottom: '20%',
        left: `${x}%`,
        fontSize: '28px',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {emoji}
    </motion.div>
  )
}

export default function NotFound() {
  const [burst, setBurst] = useState(false)
  const [burstEmojis, setBurstEmojis] = useState<{ emoji: string; x: number; delay: number; id: number }[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [hint, setHint] = useState(false)

  const fun404Texts = [
    "You went somewhere we haven't built yet.",
    'This page took the day off.',
    'Even our 534 drives missed this one.',
    'The map said turn left here. The map lied.',
    'Our volunteers searched but came back empty-handed.',
  ]
  const [textIdx] = useState(() => Math.floor(Math.random() * fun404Texts.length))

  function triggerBurst() {
    const emojis = Array.from({ length: 12 }, (_, i) => ({
      emoji: FLOATY_EMOJIS[Math.floor(Math.random() * FLOATY_EMOJIS.length)],
      x: 5 + Math.random() * 90,
      delay: i * 0.08,
      id: Date.now() + i,
    }))
    setBurstEmojis(emojis)
    setBurst(true)
    setClickCount(c => c + 1)
    setTimeout(() => setBurst(false), 4000)
  }

  useEffect(() => {
    if (clickCount >= 5) setHint(true)
  }, [clickCount])

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh', color: '#f7f5f0' }}>
      <Nav />

      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 64px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated ambient orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(84,209,134,0.12) 0%, rgba(76,184,212,0.06) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating emoji burst */}
        <AnimatePresence>
          {burst && burstEmojis.map(e => (
            <FloatingEmoji key={e.id} emoji={e.emoji} x={e.x} delay={e.delay} />
          ))}
        </AnimatePresence>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          {/* Giant 404 — click it */}
          <motion.div
            onClick={triggerBurst}
            whileHover={{ scale: 1.04, filter: 'brightness(1.3)' }}
            whileTap={{ scale: 0.94, rotate: -2 }}
            initial={{ opacity: 0, y: -30, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontSize: 'clamp(80px, 15vw, 160px)',
              background: 'linear-gradient(135deg, #54d186 0%, #4cb8d4 50%, rgba(255,255,255,0.08) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              letterSpacing: '-4px',
              margin: '0 0 -12px',
              cursor: 'pointer',
              userSelect: 'none',
              display: 'inline-block',
            }}
          >
            404
          </motion.div>

          {/* Hint after 5 clicks */}
          <AnimatePresence>
            {hint && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: '13px',
                  color: '#54d186',
                  margin: '4px 0 0',
                }}
              >
                You really like pressing that. We respect it.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(22px, 4vw, 40px)',
              color: '#f7f5f0',
              margin: '24px 0 16px',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            {fun404Texts[textIdx]}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '18px',
              color: 'rgba(247,245,240,0.5)',
              lineHeight: '1.65',
              margin: '0 0 12px',
            }}
          >
            Unlike our drives, this page wasn't planned.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '14px',
              color: 'rgba(247,245,240,0.35)',
              lineHeight: '1.7',
              margin: '0 0 8px',
            }}
          >
            (Psst — click the 404 above.)
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px' }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(84,209,134,0.3)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                  color: '#0a0a0a',
                  borderRadius: '39px',
                  padding: '14px 32px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                ← Take me home
              </motion.div>
            </Link>
            <Link to="/projects" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#f7f5f0',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '39px',
                  padding: '14px 32px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                Browse 534+ Projects
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
