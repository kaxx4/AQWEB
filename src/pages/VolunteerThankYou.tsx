import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
}

const nextSteps = [
  { icon: '📬', title: 'Check your inbox', desc: "We've logged your application. You'll hear from us within a few days." },
  { icon: '📸', title: 'Follow us on Instagram', desc: 'Stay updated on our projects, events, and community life at @ngo.aquaterra' },
  { icon: '💬', title: 'Join the community', desc: "Once approved, you'll be added to our WhatsApp groups and notified about upcoming drives." },
]

export default function VolunteerThankYou() {
  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh', color: '#f7f5f0' }}>
      <Nav />

      <section style={{ paddingTop: '140px', paddingBottom: '60px', paddingLeft: '64px', paddingRight: '64px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <motion.div variants={itemVariant} style={{ fontSize: '80px', marginBottom: '32px' }}>🌍</motion.div>

          <motion.h1 variants={itemVariant}
            style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-1.5px', color: '#f7f5f0', marginBottom: '20px', textWrap: 'balance' } as React.CSSProperties}
          >
            You're in the right place.
          </motion.h1>

          <motion.p variants={itemVariant}
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '20px', color: 'rgba(247,245,240,0.65)', lineHeight: 1.65, maxWidth: '540px', margin: '0 auto 60px' }}
          >
            Your application is with us. We don't just file these — someone actually reads every single one.
          </motion.p>

          {/* Next steps */}
          <motion.div
            variants={containerVariants}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '64px', textAlign: 'left' }}
          >
            {nextSteps.map(step => (
              <motion.div key={step.title} variants={itemVariant}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px' }}
              >
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{step.icon}</div>
                <h3 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '16px', color: '#f7f5f0', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px', color: 'rgba(247,245,240,0.55)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariant} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.instagram.com/ngo.aquaterra" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                style={{ background: 'linear-gradient(135deg, #54d186, #4cb8d4)', color: '#0a0a0a', borderRadius: '39px', padding: '14px 32px', fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
              >
                Follow @ngo.aquaterra →
              </motion.div>
            </a>
            <Link to="/projects" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                style={{ background: 'rgba(255,255,255,0.08)', color: '#f7f5f0', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '39px', padding: '14px 32px', fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
              >
                Explore Our Projects
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
