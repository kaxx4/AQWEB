import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

export default function NotFound() {
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
        {/* Subtle glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(84,209,134,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}
        >
          <motion.div variants={itemVariant}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontSize: 'clamp(80px, 15vw, 160px)',
              color: 'rgba(255,255,255,0.06)',
              lineHeight: 1,
              letterSpacing: '-4px',
              margin: '0 0 -20px',
              userSelect: 'none',
            }}
          >
            404
          </motion.div>

          <motion.h1 variants={itemVariant}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(24px, 4vw, 44px)',
              color: '#f7f5f0',
              margin: '0 0 20px',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            You went somewhere we haven't built yet.
          </motion.h1>

          <motion.p variants={itemVariant}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '20px',
              color: 'rgba(247,245,240,0.5)',
              lineHeight: '1.65',
              margin: '0 0 16px',
            }}
          >
            Unlike our drives, this page wasn't planned.
          </motion.p>

          <motion.p variants={itemVariant}
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '16px',
              color: 'rgba(247,245,240,0.4)',
              lineHeight: '1.7',
              margin: '0 0 40px',
            }}
          >
            If you were looking for something specific, there's a good chance it exists — just not here. Try heading back home.
          </motion.p>

          <motion.div variants={itemVariant} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
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
                ← Back to Home
              </motion.div>
            </Link>
            <Link to="/projects" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
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
                Browse Projects
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
