import { Link } from 'react-router-dom'

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

const featuredProjects = [
  'Sunderbans 8.0',
  'Disco Diwali 2.0',
  'Clothes Segregation and Donation',
  'Concord Day 1 - Roots',
  'Paradox 3.0',
  'Smiles Shared - Earth Day Workshop',
  'The Starry Night - A Christmas Carnival Fundraiser',
  'Christmas Fete Workshop',
]

const blogLinks = [
  'People in the Mirror',
  'Letter to my city',
  'Welcome to Blogs!',
  'The Art of Nostalgia & Heartbreak',
  'Pebbles and Peaks',
  'Vibe Reviewing',
  'A Cup of Tea',
  'He barks, I heal',
]

const pageLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'About Us', path: '/about' },
  { label: 'Collaborations', path: '/collaborations' },
  { label: 'Support Us', path: '/support' },
  { label: 'Links', path: '/links' },
  { label: 'Contact / Join', path: '/contact' },
]

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '80px 64px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '64px',
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '22px' }}>🌍</span>
              <span style={{ display: 'inline-flex' }}>
                <span
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '22px',
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
                    fontSize: '22px',
                    color: '#ffffff',
                    letterSpacing: '-0.5px',
                  }}
                >
                  TERRA
                </span>
              </span>
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '14px',
              color: 'rgba(247,245,240,0.6)',
              lineHeight: '1.7',
              margin: '0 0 20px',
              maxWidth: '260px',
            }}
          >
            A youth-led NGO from Kolkata running welfare projects since July 2021. 534+ documented drives and counting.
          </p>
          <p
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '11px',
              color: 'rgba(247,245,240,0.35)',
              lineHeight: '1.6',
              margin: '0 0 20px',
            }}
          >
            DARPAN Certified &nbsp;|&nbsp; Govt. Reg: AAFTT2300ME20251
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="https://www.instagram.com/ngo.aquaterra"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.6, transition: 'opacity 0.2s', display: 'flex' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/aquaterra-ngo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.6, transition: 'opacity 0.2s', display: 'flex' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            >
              <LinkedInIcon size={20} />
            </a>
          </div>
        </div>

        {/* Pages column */}
        <div>
          <h4
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              color: 'rgba(247,245,240,0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}
          >
            Pages
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pageLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(247,245,240,0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.65)')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Projects column */}
        <div>
          <h4
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              color: 'rgba(247,245,240,0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}
          >
            Featured Projects
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {featuredProjects.map((p) => (
              <Link
                key={p}
                to="/projects"
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(247,245,240,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  lineHeight: '1.4',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#54d186')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.55)')}
              >
                {p}
              </Link>
            ))}
          </div>
        </div>

        {/* Blog column */}
        <div>
          <h4
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              color: 'rgba(247,245,240,0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}
          >
            Blog Essays
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {blogLinks.map((b) => (
              <Link
                key={b}
                to="/blog"
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(247,245,240,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  lineHeight: '1.4',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#4cb8d4')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.55)')}
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: "'Neutral Face Regular', sans-serif",
            fontSize: '12px',
            color: 'rgba(247,245,240,0.3)',
            margin: 0,
          }}
        >
          © 2024 AquaTerra NGO. All rights reserved. Kolkata, India.
        </p>
        <p
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'rgba(247,245,240,0.3)',
            margin: 0,
          }}
        >
          "Started as an NGO. It got out of hand."
        </p>
        <a
          href="mailto:ngo.aquaterra@gmail.com"
          style={{
            fontFamily: "'Neutral Face Regular', sans-serif",
            fontSize: '12px',
            color: 'rgba(247,245,240,0.4)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#4cb8d4')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.4)')}
        >
          ngo.aquaterra@gmail.com
        </a>
      </div>
    </footer>
  )
}
