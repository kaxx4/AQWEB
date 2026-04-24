import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" />
    </svg>
  )
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="white" strokeWidth="1.8" fill="none" />
      <path d="M7 10v7M7 7v.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4M11 10v7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AquaTerraLogo({ fontSize = 18 }: { fontSize?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontSize: fontSize }}>🌍</span>
      <span style={{ display: 'inline-flex' }}>
        <span
          style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: `${fontSize}px`,
            background: 'linear-gradient(135deg, #54d186, #3e8bc2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          AQUA
        </span>
        <span
          style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: `${fontSize}px`,
            color: '#ffffff',
            letterSpacing: '-0.5px',
          }}
        >
          TERRA
        </span>
      </span>
    </span>
  )
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Collabs', path: '/collaborations' },
  { label: 'Support', path: '/support' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Contact', path: '/contact' },
]

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <AquaTerraLogo fontSize={18} />
        </Link>

        {/* Nav links — desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: isActive(link.path) ? '#54d186' : '#ffffff',
                textDecoration: 'none',
                opacity: isActive(link.path) ? 1 : 0.85,
                padding: '6px 12px',
                borderRadius: '8px',
                background: isActive(link.path) ? 'rgba(84,209,134,0.1)' : 'transparent',
                transition: 'opacity 0.2s, background 0.2s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.opacity = '0.85'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="https://www.instagram.com/ngo.aquaterra"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', opacity: 0.75, transition: 'opacity 0.2s', minWidth: 40, minHeight: 40, justifyContent: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/aquaterra-ngo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', opacity: 0.75, transition: 'opacity 0.2s', minWidth: 40, minHeight: 40, justifyContent: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
          >
            <LinkedInIcon size={18} />
          </a>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/volunteer/apply')}
            style={{
              background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
              color: '#0a0a0a',
              borderRadius: '39px',
              padding: '8px 18px',
              fontSize: '12px',
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            Join Us →
          </motion.button>

          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              minWidth: 40,
              minHeight: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '20px', height: '2px', background: '#f7f5f0', borderRadius: '1px', transformOrigin: 'center' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'block', width: '20px', height: '2px', background: '#f7f5f0', borderRadius: '1px' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '20px', height: '2px', background: '#f7f5f0', borderRadius: '1px', transformOrigin: 'center' }}
            />
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '80px 40px 40px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                style={{ width: '100%', maxWidth: '360px' }}
              >
                <Link
                  to={link.path}
                  style={{
                    display: 'block',
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '28px',
                    color: isActive(link.path) ? '#54d186' : '#f7f5f0',
                    textDecoration: 'none',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    letterSpacing: '-0.5px',
                    opacity: isActive(link.path) ? 1 : 0.85,
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
              style={{ display: 'flex', gap: '20px', marginTop: '32px' }}
            >
              <a href="https://www.instagram.com/ngo.aquaterra" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, minWidth: 40, minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InstagramIcon size={22} />
              </a>
              <a href="https://www.linkedin.com/company/aquaterra-ngo" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, minWidth: 40, minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LinkedInIcon size={22} />
              </a>
            </motion.div>

            {/* Join Us CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (navLinks.length + 1) * 0.06 }}
              style={{ marginTop: '16px', width: '100%', maxWidth: '360px' }}
            >
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { navigate('/volunteer/apply'); setMobileOpen(false) }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                  color: '#0a0a0a',
                  borderRadius: '39px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                Join Us →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
