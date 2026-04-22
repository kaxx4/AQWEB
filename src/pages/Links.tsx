import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4 } },
}

const links = [
  { label: 'WhatsApp Community', href: 'https://wa.me/919830000000', bg: '#25d366', color: '#fff', icon: '💬', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/ngo.aquaterra', bg: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', color: '#fff', icon: '📸', external: true },
  { label: 'Our Website', href: '/', bg: 'rgba(255,255,255,0.08)', color: '#f7f5f0', icon: '🌍', external: false },
  { label: 'Our Projects', href: '/projects', bg: 'rgba(84,209,134,0.12)', color: '#54d186', icon: '📋', external: false },
  { label: 'Featured on The Statesman', href: '#', bg: 'rgba(76,184,212,0.12)', color: '#4cb8d4', icon: '📰', external: true },
]

export default function Links() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '60px 24px 40px',
        fontFamily: "'Neutral Face Regular', sans-serif",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Logo */}
        <motion.div variants={itemVariant} style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '48px' }}>🌍</span>
        </motion.div>
        <motion.h1 variants={itemVariant}
          style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: '28px',
            color: '#f7f5f0',
            margin: '0 0 4px',
            letterSpacing: '-0.5px',
          }}
        >
          <span style={{ background: 'linear-gradient(135deg, #54d186, #3e8bc2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AQUA</span>TERRA
        </motion.h1>
        <motion.p variants={itemVariant}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '18px',
            color: 'rgba(247,245,240,0.5)',
            margin: '0 0 40px',
            textAlign: 'center',
          }}
        >
          We got out of hand.
        </motion.p>

        {/* Primary CTA */}
        <motion.div variants={itemVariant} style={{ width: '100%', marginBottom: '16px' }}>
          <Link to="/contact" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                color: '#0a0a0a',
                borderRadius: '16px',
                padding: '18px 24px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                textAlign: 'center',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                boxSizing: 'border-box',
              }}
            >
              Join Us →
            </motion.div>
          </Link>
        </motion.div>

        {/* Secondary links */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map((link) => (
            <motion.div key={link.label} variants={itemVariant} style={{ width: '100%' }}>
              {link.external ? (
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    width: '100%',
                    background: link.bg,
                    color: link.color,
                    borderRadius: '14px',
                    padding: '16px 20px',
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '16px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxSizing: 'border-box',
                    transition: 'opacity 0.2s',
                  }}
                >
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{link.icon}</span>
                  {link.label}
                </motion.a>
              ) : (
                <Link to={link.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      width: '100%',
                      background: link.bg,
                      color: link.color,
                      borderRadius: '14px',
                      padding: '16px 20px',
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontWeight: 700,
                      fontSize: '16px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span style={{ fontSize: '22px', flexShrink: 0 }}>{link.icon}</span>
                    {link.label}
                  </motion.div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={itemVariant}
          style={{ marginTop: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}
        >
          <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '11px', color: 'rgba(247,245,240,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            DARPAN Certified · Govt. Reg: AAFTT2300ME20251
          </span>
          <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '11px', color: 'rgba(247,245,240,0.2)' }}>
            © 2026 AquaTerra NGO · Est. July 2021 · Kolkata, India
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
