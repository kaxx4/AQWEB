import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { supabase, type WelfareProject, type Blog, OBJECTIVES, type ObjectiveFilter } from '../lib/supabase'
import Nav from '../components/Nav'

// ============================================
// RESPONSIVE HOOK
// ============================================
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

// ============================================
// COUNT-UP HOOK — animates numbers in-view
// ============================================
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return { count, ref }
}

// ============================================
// ARROW RIGHT ICON
// ============================================
function ArrowRight({ color = '#f7f5f0', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path
        d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"
        fill={color}
      />
    </svg>
  )
}

// ============================================
// INSTAGRAM ICON SVG
// ============================================
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="1.8" fill="none"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1" fill="white"/>
    </svg>
  )
}

// ============================================
// LINKEDIN ICON SVG
// ============================================
function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="white" strokeWidth="1.8" fill="none"/>
      <path d="M7 10v7M7 7v.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4M11 10v7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ============================================
// LOGO GRADIENT TEXT
// ============================================
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

// (Blog data now fetched live from Supabase — see liveBlogs state in Clone component)

// ============================================
// IMPACT STATS DATA
// ============================================
const impactStats = [
  { number: '3,500+', raw: 3500, line1: 'KIDS', line2: 'across educational workshops' },
  { number: '4,000+', raw: 4000, line1: 'saplings', line2: 'planted' },
  { number: '1,600+', raw: 1600, line1: 'medical', line2: 'checkups conducted' },
  { number: '2,500+', raw: 2500, line1: 'attendees', line2: 'across events' },
  { number: '500+',   raw: 500,  line1: 'campaigns', line2: 'and projects' },
  { number: '1,500+', raw: 1500, line1: 'dogs fed', line2: '' },
  { number: '2,500+', raw: 2500, line1: 'clothes KGS', line2: 'distributed & recycled' },
] as const

// ============================================
// ANIMATED COUNT STAT BLOCK
// ============================================
function CountStat({ raw, suffix = '+', line1, line2, fontSize = '56px' }: {
  raw: number; suffix?: string; line1: string; line2: string; fontSize?: string
}) {
  const { count, ref } = useCountUp(raw, 1600)
  return (
    <div ref={ref}>
      <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize, color: '#0a0a0a', lineHeight: 1, letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '18px', color: '#0a0a0a', marginTop: '4px' }}>{line1}</div>
      {line2 && <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: '#2a5a3a', marginTop: '2px' }}>{line2}</div>}
    </div>
  )
}

// ============================================
// CTA STAT — small inline count-up for Join Us section
// ============================================
function CtaStat({ raw, suffix = '', label }: { raw: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(raw, 1200)
  return (
    <div ref={ref} style={{ borderLeft: '2px solid rgba(255,255,255,0.35)', paddingLeft: '20px' }}>
      <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '28px', color: '#f7f5f0', letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.8)', letterSpacing: '0.03em' }}>{label}</div>
    </div>
  )
}

// ============================================
// BUBBLE DIAGRAM DATA
// ============================================
const bubbleItems = [
  {
    id: 'projects',
    label: 'PROJECTS',
    color: '#1a3d2b',
    position: { top: '10%', left: '50%', transform: 'translateX(-50%)' },
    description: '534 documented welfare drives — workshops, plantation drives, feeding drives, medical camps',
    size: 180,
  },
  {
    id: 'events',
    label: 'EVENTS',
    color: '#3d2010',
    position: { top: '50%', left: '12%', transform: 'translateY(-50%)' },
    description: 'Fundraising & cultural events — Disco Diwali, Paradox, Starry Night, Sundarbans expeditions',
    size: 180,
  },
  {
    id: 'startups',
    label: 'STARTUPS',
    color: '#0f1f3d',
    position: { top: '50%', right: '12%', transform: 'translateY(-50%)' },
    description: 'ROOTS (limited-drop streetwear, all profits to mission) · ShikshAQ (free tutor matching, Kolkata) · AQ Ventures',
    size: 180,
  },
  {
    id: 'departments',
    label: 'CORE DEPARTMENTS',
    color: '#0d2b2b',
    position: { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
    description: 'HR · Projects · Finance · Collabs · Socials · Website · Events — 10+ departments. No salaries. No full-time roles. Just choice.',
    size: 180,
  },
] as const

// ============================================
// FEATURED PROJECTS (FOOTER)
// ============================================
const featuredProjects = [
  'Sunderbans 8.0',
  'Disco Diwali 2.0',
  'Clothes Segregation and Donation',
  'Concord Day 1 - Roots',
  'Paradox 3.0',
  'Smiles Shared - Earth Day Workshop',
  'The Starry Night - A Christmas Carnival Fundraiser',
  'Christmas Fete Workshop',
  'Disco Diwali',
  'Sunderbans Plantation Project 5.0',
  'Colours Of Durga',
  'Goal Bound - Football Workshop',
  'Genesis Sunderbans 1.0',
  'Mini-Fete',
  'Sunderbans 7.0',
  'Sunderbans 6.0',
] as const

const footerBlogLinks = [
  'People in the Mirror',
  'Letter to my city',
  'Welcome to Blogs!',
  'The Art of Nostalgia & Heartbreak',
  'Pebbles and Peaks',
  'Vibe Reviewing',
  'A Cup of Tea',
  'Syntax Error',
  'Before you Judge Read This',
  "Voicing one's Opinions",
  'Art of empathy (noun)',
  'He barks, I heal',
  'Dynamics',
] as const

// (Initiative cards now fetched live from Supabase — see highlightProjects in Clone component)

// ============================================
// HERO FLOATING PHOTOS — full viewport scatter
// ============================================
type FloatingPhoto = {
  photo: number
  ext: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  size: number
  rot: number
  dur: number
  delay: number
  amp: number
}

const heroFloatingPhotos: FloatingPhoto[] = [
  // Top-left area
  { photo: 1, ext: 'jpg', top: '6%',  left: '2%',  size: 120, rot: -8,  dur: 3.5, delay: 0,   amp: 10 },
  { photo: 2, ext: 'jpg', top: '3%',  left: '15%', size: 90,  rot:  5,  dur: 4.0, delay: 0.4, amp: 8  },
  // Top-center
  { photo: 3, ext: 'jpg', top: '2%',  left: '38%', size: 75,  rot: -4,  dur: 3.2, delay: 0.7, amp: 12 },
  { photo: 6, ext: 'png', top: '5%',  left: '55%', size: 100, rot:  7,  dur: 3.8, delay: 0.2, amp: 9  },
  // Top-right area
  { photo: 4, ext: 'jpg', top: '4%',  right: '15%',size: 110, rot: -6,  dur: 4.2, delay: 0.5, amp: 11 },
  { photo: 7, ext: 'jpg', top: '8%',  right: '3%', size: 80,  rot:  9,  dur: 3.6, delay: 0.9, amp: 7  },
  // Left edge mid
  { photo: 5, ext: 'jpg', top: '42%', left: '1%',  size: 95,  rot: -10, dur: 3.9, delay: 1.1, amp: 10 },
  // Right edge mid
  { photo: 8, ext: 'png', top: '38%', right: '1%', size: 105, rot:  6,  dur: 4.1, delay: 0.3, amp: 8  },
  // Bottom-left
  { photo: 1, ext: 'jpg', bottom: '8%',  left: '3%',  size: 130, rot:  5,  dur: 3.7, delay: 0.6, amp: 10 },
  { photo: 2, ext: 'jpg', bottom: '4%',  left: '18%', size: 85,  rot: -7,  dur: 4.3, delay: 1.0, amp: 9  },
  // Bottom-center
  { photo: 3, ext: 'jpg', bottom: '3%',  left: '40%', size: 100, rot:  4,  dur: 3.4, delay: 0.8, amp: 11 },
  { photo: 5, ext: 'jpg', bottom: '6%',  left: '56%', size: 70,  rot: -5,  dur: 4.0, delay: 0.2, amp: 8  },
  // Bottom-right
  { photo: 6, ext: 'png', bottom: '5%',  right: '16%',size: 115, rot:  8,  dur: 3.6, delay: 1.2, amp: 10 },
  { photo: 7, ext: 'jpg', bottom: '9%',  right: '3%', size: 90,  rot: -9,  dur: 4.4, delay: 0.4, amp: 7  },
]

// ============================================
// COMMUNITY FLOATING PHOTOS — 20 photos
// ============================================
type CommunityPhoto = {
  photo: number
  ext: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  size: number
  rot: number
  dur: number
  delay: number
}

const communityFloatingPhotos: CommunityPhoto[] = [
  { photo: 1, ext: 'jpg', top: '5%',    left: '2%',    size: 160, rot: -8,  dur: 3.2, delay: 0    },
  { photo: 2, ext: 'jpg', top: '2%',    left: '16%',   size: 110, rot:  5,  dur: 4.0, delay: 0.3  },
  { photo: 3, ext: 'jpg', top: '10%',   left: '30%',   size: 90,  rot: -4,  dur: 3.7, delay: 0.6  },
  { photo: 4, ext: 'jpg', top: '3%',    left: '50%',   size: 120, rot:  7,  dur: 4.2, delay: 0.9  },
  { photo: 5, ext: 'jpg', top: '8%',    right: '28%',  size: 100, rot: -5,  dur: 3.5, delay: 0.2  },
  { photo: 6, ext: 'png', top: '4%',    right: '14%',  size: 130, rot:  6,  dur: 4.1, delay: 0.7  },
  { photo: 7, ext: 'jpg', top: '6%',    right: '3%',   size: 80,  rot: -9,  dur: 3.8, delay: 1.0  },
  { photo: 8, ext: 'png', top: '42%',   left: '1%',    size: 100, rot:  10, dur: 3.3, delay: 0.4  },
  { photo: 1, ext: 'jpg', top: '45%',   right: '2%',   size: 115, rot: -6,  dur: 4.3, delay: 0.8  },
  { photo: 2, ext: 'jpg', bottom: '8%', left: '3%',    size: 140, rot:  5,  dur: 3.6, delay: 0.1  },
  { photo: 3, ext: 'jpg', bottom: '3%', left: '18%',   size: 95,  rot: -7,  dur: 4.0, delay: 0.5  },
  { photo: 4, ext: 'jpg', bottom: '10%',left: '34%',   size: 110, rot:  4,  dur: 3.4, delay: 1.1  },
  { photo: 5, ext: 'jpg', bottom: '4%', left: '50%',   size: 125, rot: -8,  dur: 4.2, delay: 0.3  },
  { photo: 6, ext: 'png', bottom: '7%', right: '29%',  size: 90,  rot:  9,  dur: 3.7, delay: 0.7  },
  { photo: 7, ext: 'jpg', bottom: '2%', right: '14%',  size: 105, rot: -5,  dur: 3.9, delay: 1.2  },
  { photo: 8, ext: 'png', bottom: '8%', right: '3%',   size: 135, rot:  7,  dur: 4.1, delay: 0.2  },
  { photo: 1, ext: 'jpg', top: '28%',   left: '5%',    size: 75,  rot: -12, dur: 3.5, delay: 0.9  },
  { photo: 3, ext: 'jpg', top: '28%',   right: '5%',   size: 80,  rot:  11, dur: 4.0, delay: 0.6  },
  { photo: 5, ext: 'jpg', bottom: '24%',left: '20%',   size: 65,  rot: -3,  dur: 3.3, delay: 1.3  },
  { photo: 7, ext: 'jpg', bottom: '20%',right: '21%',  size: 70,  rot:  6,  dur: 4.4, delay: 0.4  },
]

// ============================================
// MANIFESTO STARFIELD DOTS
// ============================================
type StarDot = { cx: number; cy: number; r: number; op: number }

function useStarDots(count: number): StarDot[] {
  return useMemo(() => {
    const seed = [
      17, 83, 241, 59, 197, 113, 7, 167, 43, 223, 101, 149, 31, 89, 211,
      67, 179, 37, 127, 251, 53, 139, 23, 193, 79, 157, 11, 233, 97, 173,
      41, 107, 257, 61, 143, 19, 227, 73, 163, 47, 199, 83, 131, 29, 181,
      71, 151, 37, 211, 93, 157, 13, 233, 89, 169, 57, 201, 77, 149, 43,
      215, 63, 131, 21, 191, 67, 173, 51, 219, 87, 155, 33, 207, 73, 163,
      49, 197, 61, 137, 27, 189,
    ]
    const dots: StarDot[] = []
    for (let i = 0; i < count; i++) {
      const s1 = seed[i % seed.length]
      const s2 = seed[(i + 7) % seed.length]
      const s3 = seed[(i + 13) % seed.length]
      const s4 = seed[(i + 3) % seed.length]
      dots.push({
        cx: ((s1 * 1031 + s2 * 17 + i * 137) % 1000) / 1000,
        cy: ((s2 * 919 + s3 * 23 + i * 173) % 1000) / 1000,
        r: 0.5 + (s3 % 3) * 0.5 + (s4 % 2) * 0.5,
        op: 0.3 + ((s4 * 31 + i * 11) % 60) / 100,
      })
    }
    return dots
  }, [count])
}

// ============================================
// MAIN CLONE COMPONENT
// ============================================
export default function Clone() {
  const [selectedBubble, setSelectedBubble] = useState<string | null>(null)
  const starDots = useStarDots(80)
  const isMobile = useIsMobile()

  // ─── Supabase: live projects ───────────────────────────────────────
  const [allProjects, setAllProjects] = useState<WelfareProject[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [projectFilter, setProjectFilter] = useState<ObjectiveFilter>('All')
  const [projectSearch, setProjectSearch] = useState('')
  const [projectPage, setProjectPage] = useState(0)
  const PROJECT_PAGE_SIZE = 12

  // ─── Supabase: live blogs ──────────────────────────────────────────
  const [liveBlogs, setLiveBlogs] = useState<Blog[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)

  // Fetch all non-draft projects once
  useEffect(() => {
    supabase
      .from('welfare_projects')
      .select('id,slug,is_draft,header,featured,location,key_statistic,workshop_date,objective,volunteers,google_drive_link,status,main_image,main_image_alt,collab_logo,collab_name,short_summary')
      .eq('is_draft', false)
      .order('workshop_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setAllProjects(data as WelfareProject[])
        setProjectsLoading(false)
      })
  }, [])

  // Fetch latest 13 blogs
  useEffect(() => {
    supabase
      .from('blogs')
      .select('id,slug,headliner,featured_image,minutes_of_read,published_date,written_by,author_instagram')
      .order('published_date', { ascending: false })
      .limit(13)
      .then(({ data, error }) => {
        if (!error && data) setLiveBlogs(data as Blog[])
        setBlogsLoading(false)
      })
  }, [])

  // Reset page when filter/search changes
  const handleFilterChange = useCallback((f: ObjectiveFilter) => {
    setProjectFilter(f)
    setProjectPage(0)
  }, [])

  const handleSearchChange = useCallback((v: string) => {
    setProjectSearch(v)
    setProjectPage(0)
  }, [])

  // Derived: filtered + paginated projects
  const filteredProjects = useMemo(() => {
    let list = allProjects
    if (projectFilter !== 'All') {
      list = list.filter(p => p.objective?.toLowerCase().includes(projectFilter.toLowerCase()))
    }
    if (projectSearch.trim()) {
      const q = projectSearch.toLowerCase()
      list = list.filter(p =>
        p.header?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.key_statistic?.toLowerCase().includes(q)
      )
    }
    return list
  }, [allProjects, projectFilter, projectSearch])

  const pagedProjects = useMemo(() =>
    filteredProjects.slice(projectPage * PROJECT_PAGE_SIZE, (projectPage + 1) * PROJECT_PAGE_SIZE),
    [filteredProjects, projectPage]
  )
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECT_PAGE_SIZE))

  // Recent 12 for highlights (6 on mobile to keep page manageable)
  const highlightProjects = useMemo(() => allProjects.slice(0, isMobile ? 6 : 12), [allProjects, isMobile])

  // Latest 3 blogs for the section teaser
  const teaserBlogs = useMemo(() => liveBlogs.slice(0, 3), [liveBlogs])

  // Objective category colour map
  const objectiveColor: Record<string, string> = {
    Workshop: '#3e8bc2',
    'Feeding Dogs': '#e08c3c',
    'Plantation Drive': '#255c3b',
    'Distribution Drive': '#7c4dbc',
    'Sundarbans Relief': '#1a6b6b',
    'Old Age Home Visit': '#b04060',
    'Fundraising Event': '#cc3333',
    Others: '#666666',
  }
  const getObjColor = (obj: string | null) => objectiveColor[obj ?? ''] ?? '#404040'

  // Format date helper
  const formatDate = (iso: string | null) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', Inter, sans-serif", background: '#0a0a0a', overflowX: 'hidden' }}>

      {/* ============================================
          GET IN TOUCH — FIXED STICKY BUTTON
          ============================================ */}
      {/* Get in touch — hidden on mobile to avoid clutter */}
      {!isMobile && (
        <motion.a
          href="#footer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            position: 'fixed',
            right: '-34px',
            bottom: '50%',
            transform: 'translateY(50%) rotate(-90deg)',
            transformOrigin: 'center',
            zIndex: 100,
            background: '#171717',
            color: '#f7f5f0',
            borderRadius: '39px',
            padding: '10px 20px',
            fontSize: '12px',
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.05em',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          Get in touch
        </motion.a>
      )}

      {/* ============================================
          NAVIGATION — shared Nav component (responsive, hamburger on mobile)
          ============================================ */}
      <Nav />

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section
        style={{
          background: '#0a0a0a',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 10+ circular floating photos scattered across full viewport */}
        {heroFloatingPhotos.map((p, i) => {
          const posStyle: React.CSSProperties = {
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '2.5px solid rgba(255,255,255,0.13)',
            zIndex: 1,
          }
          if (p.top !== undefined) posStyle.top = p.top
          if (p.left !== undefined) posStyle.left = p.left
          if (p.right !== undefined) posStyle.right = p.right
          if (p.bottom !== undefined) posStyle.bottom = p.bottom

          return (
            <motion.div
              key={i}
              animate={{ y: [0, -p.amp, 0] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
              style={{ ...posStyle, rotate: p.rot }}
            >
              <img
                src={`/images/community-photo-${p.photo}.${p.ext}`}
                alt="Community"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
              />
            </motion.div>
          )
        })}

        {/* Center content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: isMobile ? '0 24px' : '0 20px', maxWidth: '820px', width: '100%' }}>
          {/* Badge above headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
          >
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '16px',
              color: '#f7f5f0',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '999px',
              padding: '6px 18px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(6px)',
            }}>
              Hey, We're 🌍 AquaTerra
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(56px, 7.5vw, 110px)',
              color: '#f7f5f0',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              margin: '0 0 24px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            STARTED AS AN NGO.
            <br />
            IT GOT OUT OF HAND.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '18px',
              color: '#f7f5f0',
              lineHeight: '1.6',
              margin: '0 auto 0',
              maxWidth: '700px',
              opacity: 0.85,
            }}
          >
            "A WhatsApp group in 2021. Three startups, 534 projects, and 1,000 builders later — AquaTerra is Kolkata's student ecosystem for people who'd rather do something than talk about it."
          </motion.p>
        </div>

        {/* DARPAN badge — centered at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <span style={{
            fontFamily: "'Neutral Face Regular', sans-serif",
            fontSize: '13px',
            color: '#f7f5f0',
            opacity: 0.6,
            whiteSpace: 'nowrap',
          }}>
            DARPAN Certified · Govt. of India Reg: AAFTT2300ME20251 · Est. July 2021
          </span>
          {/* Animated scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}
          >
            <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '10px', color: 'rgba(247,245,240,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(247,245,240,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Ambient glowing orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(84,209,134,0.3) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{ position: 'absolute', bottom: '20%', right: '8%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,184,212,0.3) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}
        />
      </section>

      {/* ============================================
          JOIN US NOW CTA SECTION
          ============================================ */}
      <section style={{ background: '#f7f5f0', padding: '64px 20px 64px', borderRadius: '0 0 90px 90px', overflow: 'hidden' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            background: '#4cb8d4',
            borderRadius: isMobile ? '32px' : '72px',
            padding: isMobile ? '40px 28px' : '60px 80px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: '40px',
            minHeight: isMobile ? 'auto' : '377px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Abstract human silhouette left */}
          <svg
            width="120"
            height="340"
            viewBox="0 0 120 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }}
          >
            <ellipse cx="60" cy="40" rx="26" ry="26" stroke="white" strokeWidth="3" fill="none"/>
            <path d="M60 66 L60 180" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M10 120 L110 120" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M60 180 L20 280" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M60 180 L100 280" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>

          {/* Abstract human silhouette right */}
          <svg
            width="120"
            height="340"
            viewBox="0 0 120 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }}
          >
            <ellipse cx="60" cy="40" rx="26" ry="26" stroke="white" strokeWidth="3" fill="none"/>
            <path d="M60 66 L60 180" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M10 120 L110 120" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M60 180 L20 280" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M60 180 L100 280" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>

          {/* Left content */}
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? '40px' : '64px',
              color: '#f7f5f0',
              letterSpacing: '-2px',
              lineHeight: isMobile ? '44px' : '70px',
              margin: '0 0 20px',
              textWrap: 'balance',
            } as React.CSSProperties}>
              JOIN US NOW
            </h2>
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '20px',
              color: '#f7f5f0',
              opacity: 0.85,
              margin: '0 0 32px',
              maxWidth: '460px',
              lineHeight: '1.5',
            }}>
              "LoR's and Certificates for the best"
            </p>
            <Link to="/volunteer/apply" style={{ textDecoration: 'none' }}>
            <motion.span
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(37,92,59,0.6)', filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: '#255c3b',
                color: '#f7f5f0',
                borderRadius: '39px',
                padding: '14px 32px',
                fontSize: '14px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.04em',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s, filter 0.3s',
              }}
            >
              SIGN UP NOW <ArrowRight color="#f7f5f0" size={15} />
            </motion.span>
            </Link>
          </div>

          {/* Right — animated stats row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '200px', position: 'relative', zIndex: 1 }}>
            <CtaStat raw={1000} suffix="+" label="members" />
            <CtaStat raw={534}  suffix=""  label="projects" />
            <CtaStat raw={4}    suffix=" yrs" label="running" />
          </div>
        </motion.div>
      </section>

      {/* ============================================
          EVERYTHING WE DO — BUBBLE DIAGRAM SECTION
          ============================================ */}
      <section style={{ background: '#0a0a0a', padding: isMobile ? '48px 20px' : '80px 64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <h2 style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: '44px',
            color: '#f7f5f0',
            letterSpacing: '-0.44px',
            margin: 0,
            textWrap: 'balance',
          } as React.CSSProperties}>
            EVERYTHING WE DO
          </h2>
        </motion.div>

        {/* Bubble Diagram — desktop orbital view, mobile pill grid */}
        {isMobile ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', padding: '8px 0 16px' }}>
            {bubbleItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBubble(selectedBubble === item.id ? null : item.id)}
                style={{
                  background: selectedBubble === item.id ? item.color : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${selectedBubble === item.id ? item.color : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: '999px',
                  padding: '10px 18px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '12px',
                  color: '#f7f5f0',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        ) : (
        <div style={{ position: 'relative', height: '600px', maxWidth: '900px', margin: '0 auto' }}>
          {/* Central dashed circle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '2px dashed #f7f5f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}>
            <span style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              color: '#f7f5f0',
              textAlign: 'center',
              lineHeight: '1.4',
              padding: '0 16px',
            }}>
              EVERYTHING WE DO AT AQ
            </span>
          </div>

          {/* Orbital bubbles */}
          {bubbleItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedBubble(selectedBubble === item.id ? null : item.id)}
              style={{
                position: 'absolute',
                ...item.position,
                width: `${item.size}px`,
                height: `${item.size}px`,
                borderRadius: '50%',
                background: item.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: selectedBubble === item.id ? '2px solid rgba(255,255,255,0.5)' : '2px solid rgba(255,255,255,0.1)',
                transition: 'border 0.2s',
                zIndex: selectedBubble === item.id ? 5 : 3,
              }}
            >
              <span style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: '1.3',
                padding: '0 12px',
              }}>
                {item.label}
              </span>
              <span style={{
                marginTop: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: selectedBubble === item.id ? '#54d186' : 'rgba(255,255,255,0.4)',
                transition: 'background 0.2s',
              }} />
            </motion.div>
          ))}

          {/* Description panel */}
          <AnimatePresence>
            {selectedBubble && (() => {
              const found = bubbleItems.find(b => b.id === selectedBubble)
              if (!found) return null
              return (
                <motion.div
                  key={selectedBubble}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: '-80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '16px',
                    padding: '16px 28px',
                    zIndex: 10,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <p style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '16px',
                    color: '#f7f5f0',
                    margin: 0,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}>
                    {found.description}
                  </p>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>
        )}
      </section>

      {/* ============================================
          IMPACT STATS SECTION
          ============================================ */}
      <section style={{
        background: '#b8e8c8',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '40px 0' : '80px 0',
      }}>
        {/* Top white→mint gradient */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(#ffffff 0%, #b8e8c8 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
        {/* Bottom mint→white gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(#b8e8c8 0%, #ffffff 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '0 20px' : '0 64px' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h2 style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? '28px' : '44px',
              color: '#0a0a0a',
              letterSpacing: '-0.44px',
              margin: '0 0 16px',
              textWrap: 'balance',
            } as React.CSSProperties}>
              REAL IMPACT. NOT JUST BIG TALK.
            </h2>
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '18px',
              color: '#2a5a3a',
              margin: 0,
            }}>
              "Four years. 534 documented projects. Here's what that actually looks like."
            </p>
          </motion.div>

          {/* Stats grid — 2-col on mobile, interleaved photos on desktop */}
          {isMobile ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 16px', maxWidth: '480px', margin: '0 auto' }}>
              {impactStats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{ borderLeft: '3px solid #255c3b', paddingLeft: '14px' }}
                >
                  <CountStat raw={s.raw} line1={s.line1} line2={s.line2} fontSize="36px" />
                </motion.div>
              ))}
            </div>
          ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px 40px',
            maxWidth: '1100px',
            margin: '0 auto',
            alignItems: 'center',
          }}>
            {/* Row 1: stat, photo, stat */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}>
              <CountStat raw={impactStats[0].raw} line1={impactStats[0].line1} line2={impactStats[0].line2} />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="/images/event-photo-1.jpg" alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = `/images/initiative-${3}.png` }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <CountStat raw={impactStats[1].raw} line1={impactStats[1].line1} line2={impactStats[1].line2} />
            </motion.div>

            {/* Row 2: stat, stat, photo */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <CountStat raw={impactStats[2].raw} line1={impactStats[2].line1} line2={impactStats[2].line2} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <CountStat raw={impactStats[3].raw} line1={impactStats[3].line1} line2={impactStats[3].line2} />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="/images/event-photo-2.jpg" alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = `/images/initiative-${8}.png` }} />
            </motion.div>

            {/* Row 3: photo, stat, stat */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="/images/event-photo-3.jpg" alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = `/images/initiative-${15}.png` }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <CountStat raw={impactStats[4].raw} line1={impactStats[4].line1} line2={impactStats[4].line2} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
              <CountStat raw={impactStats[5].raw} line1={impactStats[5].line1} line2={impactStats[5].line2} />
            </motion.div>

            {/* Last stat centered */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} style={{ gridColumn: '2' }}>
              <CountStat raw={impactStats[6].raw} line1={impactStats[6].line1} line2={impactStats[6].line2} />
            </motion.div>
          </div>
          )}

          {/* Stats note */}
          <p style={{
            fontFamily: "'Neutral Face Regular', sans-serif",
            fontSize: '13px',
            color: '#2a5a3a',
            textAlign: 'center',
            marginTop: '40px',
            opacity: 0.7,
          }}>
            "All figures as of April 2026 · Verified against project documentation"
          </p>
        </div>
      </section>

      {/* ============================================
          HIGHLIGHTS OF 500+ INITIATIVES SECTION
          ============================================ */}
      <section style={{ background: '#b8e8c8', padding: isMobile ? '48px 20px' : '80px 64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px' }}
        >
          <h2 style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '28px' : '44px',
            color: '#0a0a0a',
            letterSpacing: '-0.44px',
            margin: '0 0 16px',
          }}>
            Highlights of 500+ Initiatives
          </h2>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: isMobile ? '16px' : '18px',
            color: '#2a5a3a',
            margin: 0,
          }}>
            "Here are a few that show what happens when teenagers stop asking for permission."
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {projectsLoading && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ background: '#d4f0dc', borderRadius: '24px', height: '260px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        )}

        {/* 3-column grid — live data */}
        {!projectsLoading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '16px',
          }}>
            {highlightProjects.map((project, idx) => (
              <Link key={project.id} to={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.07 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Project image header */}
                <div style={{ borderRadius: '16px', marginBottom: '16px', height: '120px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <img
                    src={project.main_image || `/images/initiative-${(project.id % 43) + 1}.png`}
                    alt={project.main_image_alt ?? project.header}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                    onError={e => { (e.target as HTMLImageElement).src = `/images/initiative-${(project.id % 43) + 1}.png` }}
                  />
                  {/* Collab logo badge */}
                  {project.collab_logo && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(6px)', borderRadius: '8px', padding: '4px 6px' }}>
                      <img src={project.collab_logo} alt={project.collab_name ?? ''} style={{ maxWidth: '40px', maxHeight: '22px', objectFit: 'contain', display: 'block' }} />
                    </div>
                  )}
                  {/* Objective pill overlay */}
                  <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
                    <span style={{
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: getObjColor(project.objective),
                      borderRadius: '6px',
                      padding: '3px 8px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      {project.objective ?? 'Project'}
                    </span>
                  </div>
                </div>

                {/* Objective badge */}
                <div style={{ marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '10px',
                    color: '#ffffff',
                    background: getObjColor(project.objective),
                    borderRadius: '20px',
                    padding: '3px 10px',
                    letterSpacing: '0.06em',
                  }}>
                    {project.objective ?? 'Project'}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#0a0a0a',
                  letterSpacing: '-0.3px',
                  margin: '0 0 6px',
                  lineHeight: '1.3',
                  flex: 1,
                }}>
                  {project.header}
                </h3>

                {/* Location + date row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '11px',
                    color: '#525252',
                    maxWidth: '60%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    📍 {project.location}
                  </span>
                  <span style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '11px',
                    color: '#737373',
                  }}>
                    {formatDate(project.workshop_date)}
                  </span>
                </div>

                {/* Volunteers row */}
                {project.volunteers != null && (
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      fontFamily: "'Neutral Face Regular', sans-serif",
                      fontSize: '11px',
                      color: '#404040',
                    }}>
                      👥 {project.volunteers} volunteer{project.volunteers !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                {/* View project CTA — no nested <a> since card is already a Link */}
                <div style={{
                  background: `${getObjColor(project.objective)}18`,
                  border: `1px solid ${getObjColor(project.objective)}30`,
                  borderRadius: '8px',
                  padding: '9px',
                  textAlign: 'center',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '11px',
                  color: getObjColor(project.objective),
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}>
                  VIEW PROJECT <ArrowRight color={getObjColor(project.objective)} size={11} />
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* View all CTA — scrolls to projects browser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <motion.a
            href="#projects-browser"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: '#255c3b',
              color: '#f7f5f0',
              borderRadius: '39px',
              padding: '14px 32px',
              fontSize: '14px',
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.04em',
            }}
          >
            EXPLORE ALL {allProjects.length || '534+'} PROJECTS <ArrowRight color="#f7f5f0" size={14} />
          </motion.a>
        </motion.div>
      </section>

      {/* ============================================
          GROUNDWORK DIARIES — BLOG SECTION
          ============================================ */}
      <section style={{ background: '#ffffff', borderTop: '1px solid #e5e5e5', padding: '68px 64px 72px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
        >
          <div>
            <h2 style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '44px',
              color: '#0a0a0a',
              letterSpacing: '-0.44px',
              margin: 0,
            }}>
              Groundwork Diaries 📖
            </h2>
            <p style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '16px',
              color: '#525252',
              margin: '12px 0 0',
            }}>
              "Stories, experiments, and the occasional overthought essay — written by the people actually doing the work."
            </p>
          </div>
          <Link to="/blog" style={{ textDecoration: 'none' }}>
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: '#3e8bc2',
              color: '#f7f5f0',
              borderRadius: '39px',
              padding: '10px 20px',
              fontSize: '12px',
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            Discover more blogs <ArrowRight color="#f7f5f0" size={13} />
          </motion.span>
          </Link>
        </motion.div>

        {/* Loading state */}
        {blogsLoading && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ background: '#ece8e4', borderRadius: '24px', height: '300px' }} />
            ))}
          </div>
        )}

        {/* Live blog cards */}
        {!blogsLoading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {teaserBlogs.map((post, idx) => (
              <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(62,139,194,0.15)', transition: { duration: 0.25 } }}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.25s, transform 0.25s',
                }}
              >
                {/* Featured image with hover zoom */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', aspectRatio: '16/10', background: '#e8f4fd', flexShrink: 0, position: 'relative' }}>
                  {post.featured_image ? (
                    <motion.img
                      src={post.featured_image}
                      alt={post.headliner}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e8f4fd, #b8e8c8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                      📖
                    </div>
                  )}
                  {/* Reading time badge */}
                  {post.minutes_of_read && (
                    <span style={{
                      position: 'absolute', top: '10px', right: '10px',
                      background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(6px)',
                      color: '#f7f5f0', borderRadius: '999px', padding: '3px 9px',
                      fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '10px',
                    }}>
                      {post.minutes_of_read} min
                    </span>
                  )}
                </div>
                {/* Category pill */}
                <span style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '10px',
                  color: '#3e8bc2',
                  background: 'rgba(62,139,194,0.08)',
                  border: '1px solid rgba(62,139,194,0.18)',
                  borderRadius: '20px',
                  padding: '3px 10px',
                  letterSpacing: '0.1em',
                  display: 'inline-block',
                  marginBottom: '10px',
                  alignSelf: 'flex-start',
                }}>
                  ESSAY
                </span>
                {/* Title */}
                <h3 style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: '17px',
                  color: '#0a0a0a',
                  letterSpacing: '-0.3px',
                  margin: '0 0 10px',
                  lineHeight: '1.4',
                  flex: 1,
                }}>
                  {post.headliner}
                </h3>
                {/* Meta + Read more */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {post.written_by && <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '13px', color: '#737373' }}>{post.written_by}</span>}
                    {post.published_date && <><span style={{ color: '#d4d4d4' }}>·</span><span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '12px', color: '#a3a3a3' }}>{formatDate(post.published_date)}</span></>}
                  </div>
                  <span style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: '#3e8bc2', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
                    Read →
                  </span>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ============================================
          PARTNER NGO LOGOS TICKER
          ============================================ */}
      <section style={{ background: '#f7f5f0', padding: '48px 0', overflow: 'hidden', borderTop: '1px solid #e5e5e5' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <h2 style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: '28px',
            color: '#0a0a0a',
            letterSpacing: '-0.3px',
            margin: 0,
            textWrap: 'balance',
          } as React.CSSProperties}>
            NGOs we work with
          </h2>
        </motion.div>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              animation: 'ticker-scroll 20s linear infinite',
              width: 'max-content',
            }}
          >
            {[...Array.from({ length: 8 }, (_, i) => i + 1), ...Array.from({ length: 8 }, (_, i) => i + 1)].map((n, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '80px',
                  minWidth: '140px',
                  flexShrink: 0,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                }}
              >
                <img
                  src={`/images/ngo-logo-${n}.png`}
                  alt={`NGO partner ${n}`}
                  style={{ maxWidth: '100%', maxHeight: '52px', objectFit: 'contain', outline: '1px solid rgba(0,0,0,0.06)', outlineOffset: '-1px' }}
                  onError={e => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                    const p = el.parentElement
                    if (p) p.innerHTML = `<span style="font-family:'Neutral Face Regular',sans-serif;font-size:12px;color:#a3a3a3;text-align:center;">Partner ${n}</span>`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ALL PROJECTS BROWSER — LIVE DB SECTION
          ============================================ */}
      <section id="projects-browser" style={{ background: '#0f1a0f', padding: isMobile ? '48px 16px' : '80px 64px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '40px' }}
        >
          <h2 style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: '44px',
            color: '#f7f5f0',
            letterSpacing: '-0.44px',
            margin: '0 0 12px',
          }}>
            All {allProjects.length > 0 ? allProjects.length : '534'} Projects
          </h2>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '18px',
            color: '#54d186',
            margin: 0,
          }}>
            "Every drive, every workshop, every animal fed — all documented."
          </p>
        </motion.div>

        {/* Search + Filter row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search input */}
          <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '360px' }}>
            <input
              type="text"
              placeholder="Search projects..."
              value={projectSearch}
              onChange={e => handleSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 20px 12px 44px',
                borderRadius: '39px',
                border: '1px solid rgba(247,245,240,0.15)',
                background: 'rgba(247,245,240,0.07)',
                color: '#f7f5f0',
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#737373', fontSize: '16px', pointerEvents: 'none' }}>🔍</span>
          </div>

          {/* Category filter chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {OBJECTIVES.map(obj => (
              <motion.button
                key={obj}
                onClick={() => handleFilterChange(obj)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: projectFilter === obj ? '#54d186' : 'rgba(247,245,240,0.08)',
                  color: projectFilter === obj ? '#0a0a0a' : '#b0b0b0',
                  border: `1px solid ${projectFilter === obj ? '#54d186' : 'rgba(247,245,240,0.15)'}`,
                  borderRadius: '39px',
                  padding: '7px 16px',
                  fontSize: '12px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {obj}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px', color: '#737373' }}>
            {projectsLoading ? 'Loading...' : `Showing ${pagedProjects.length} of ${filteredProjects.length} projects`}
          </span>
        </div>

        {/* Projects grid */}
        {projectsLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '12px' }}>
            {Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
              <div key={i} style={{ background: 'rgba(247,245,240,0.05)', borderRadius: '16px', height: '160px' }} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${projectFilter}-${projectSearch}-${projectPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '10px' : '16px',
              }}
            >
              {pagedProjects.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#737373', fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px' }}>
                  No projects found. Try a different search or filter.
                </div>
              ) : pagedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                  style={{
                    background: 'rgba(247,245,240,0.05)',
                    border: '1px solid rgba(247,245,240,0.08)',
                    borderRadius: '20px',
                    padding: '20px',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {/* Objective badge */}
                  <span style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '10px',
                    color: '#ffffff',
                    background: getObjColor(project.objective),
                    borderRadius: '20px',
                    padding: '3px 10px',
                    letterSpacing: '0.06em',
                    alignSelf: 'flex-start',
                  }}>
                    {project.objective ?? 'Project'}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#f7f5f0',
                    letterSpacing: '-0.28px',
                    margin: 0,
                    lineHeight: '1.4',
                    flex: 1,
                  }}>
                    {project.header}
                  </h3>

                  {/* Key stat */}
                  {project.key_statistic && (
                    <p style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      fontSize: '13px',
                      color: '#54d186',
                      margin: 0,
                      lineHeight: '1.4',
                    }}>
                      {project.key_statistic}
                    </p>
                  )}

                  {/* Bottom meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '11px', color: '#737373', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {project.location ? `📍 ${project.location}` : ''}
                    </span>
                    <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '11px', color: '#525252' }}>
                      {formatDate(project.workshop_date)}
                    </span>
                  </div>

                  {/* Volunteers + drive link */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {project.volunteers != null && (
                      <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '11px', color: '#737373' }}>
                        👥 {project.volunteers} vol.
                      </span>
                    )}
                    {project.google_drive_link && (
                      <motion.a
                        href={project.google_drive_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ color: '#54d186' }}
                        style={{
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontSize: '11px',
                          color: '#3e8bc2',
                          textDecoration: 'none',
                          letterSpacing: '0.04em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Photos <ArrowRight color="#3e8bc2" size={10} />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!projectsLoading && totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '48px' }}>
            <motion.button
              onClick={() => setProjectPage(p => Math.max(0, p - 1))}
              disabled={projectPage === 0}
              whileHover={projectPage > 0 ? { scale: 1.05 } : {}}
              style={{
                background: projectPage === 0 ? 'rgba(247,245,240,0.04)' : 'rgba(247,245,240,0.1)',
                border: '1px solid rgba(247,245,240,0.15)',
                color: projectPage === 0 ? '#404040' : '#f7f5f0',
                borderRadius: '39px',
                padding: '10px 24px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '13px',
                cursor: projectPage === 0 ? 'default' : 'pointer',
              }}
            >
              ← Prev
            </motion.button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
              const start = Math.max(0, Math.min(projectPage - 3, totalPages - 7))
              const pageNum = start + i
              if (pageNum >= totalPages) return null
              return (
                <motion.button
                  key={pageNum}
                  onClick={() => setProjectPage(pageNum)}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    background: pageNum === projectPage ? '#54d186' : 'transparent',
                    border: `1px solid ${pageNum === projectPage ? '#54d186' : 'rgba(247,245,240,0.15)'}`,
                    color: pageNum === projectPage ? '#0a0a0a' : '#737373',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {pageNum + 1}
                </motion.button>
              )
            })}

            <motion.button
              onClick={() => setProjectPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={projectPage === totalPages - 1}
              whileHover={projectPage < totalPages - 1 ? { scale: 1.05 } : {}}
              style={{
                background: projectPage === totalPages - 1 ? 'rgba(247,245,240,0.04)' : 'rgba(247,245,240,0.1)',
                border: '1px solid rgba(247,245,240,0.15)',
                color: projectPage === totalPages - 1 ? '#404040' : '#f7f5f0',
                borderRadius: '39px',
                padding: '10px 24px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '13px',
                cursor: projectPage === totalPages - 1 ? 'default' : 'pointer',
              }}
            >
              Next →
            </motion.button>
          </div>
        )}
      </section>

      {/* ============================================
          WE BELIEVE CHANGE — 2-COLUMN SECTION
          ============================================ */}
      <section style={{ background: '#e8f4fd', padding: isMobile ? '48px 20px' : '80px 64px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '32px' : '64px',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Left: photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ borderRadius: '24px', overflow: 'hidden', height: '400px' }}
          >
            <img
              src="/images/event-photo-4.jpg"
              alt="Person near water"
              style={{ width: '100%', height: '100%', objectFit: 'cover', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
            />
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '40px',
              color: '#0a0a0a',
              letterSpacing: '-1px',
              lineHeight: '1.15',
              margin: '0 0 24px',
            }}>
              WE BELIEVE{' '}
              <span style={{ color: '#3e8bc2' }}>CHANGE</span>{' '}
              STARTS SMALL—
              <br />
              ONE IDEA. ONE ACT. ONE SOUL AT A TIME.
            </h2>
            <p style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '16px',
              color: '#404040',
              lineHeight: '1.7',
              margin: '0 0 28px',
            }}>
              Because making the world better begins with the one small step you take today.
            </p>
            <Link
              to="/about"
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                color: '#255c3b',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              Our story <ArrowRight color="#255c3b" size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          NGO PARTNERS SECTION
          ============================================ */}
      <section style={{ background: '#cfeafc', padding: isMobile ? '48px 20px' : '80px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <h2 style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '44px',
              color: '#0a0a0a',
              letterSpacing: '-0.44px',
              margin: 0,
            }}>
              NGO's we work with
            </h2>
          </motion.div>

          {/* Horizontal scrolling row */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '32px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'thin',
          }}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n, idx) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '120px',
                  minWidth: '160px',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={`/images/ngo-logo-${n}.png`}
                  alt={`NGO partner ${n}`}
                  style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                  onError={e => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                    const p = el.parentElement
                    if (p) p.innerHTML = `<span style="font-family:'Neutral Face Bold',sans-serif;font-size:12px;color:#a3a3a3;text-align:center;">Partner ${n}</span>`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          MANIFESTO SECTION
          ============================================ */}
      <section style={{ background: '#0a0a0a', padding: isMobile ? '60px 20px 48px' : '100px 64px', position: 'relative', overflow: 'hidden' }}>
        {/* Starfield dot particles */}
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          preserveAspectRatio="xMidYMid slice"
        >
          {starDots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx * 1000}
              cy={dot.cy * 1000}
              r={dot.r}
              fill="white"
              opacity={dot.op}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          <h2 style={{
            fontFamily: "'Neutral Face Bold', sans-serif",
            fontWeight: 700,
            fontSize: '48px',
            color: '#f7f5f0',
            letterSpacing: '-1px',
            margin: '0 0 32px',
            lineHeight: '1.15',
          }}>
            "AQUATERRA IS LESS ABOUT TELLING PEOPLE TO CARE, AND MORE ABOUT SHOWING WHY IT MATTERS."
          </h2>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '20px',
            color: 'rgba(247,245,240,0.8)',
            lineHeight: '1.6',
            margin: 0,
          }}>
            We don't ask you to believe in the cause. We invite you to be part of it.
          </p>
        </motion.div>
      </section>

      {/* ============================================
          COMMUNITY / JOIN THE COMMUNITY SECTION
          ============================================ */}
      <section style={{
        background: '#0a0a0a',
        padding: '64px 24px 48px',
        minHeight: '930px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* 20 floating community photos */}
        {communityFloatingPhotos.map((p, i) => {
          const posStyle: React.CSSProperties = {
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.12)',
            zIndex: 1,
          }
          if (p.top !== undefined) posStyle.top = p.top
          if (p.left !== undefined) posStyle.left = p.left
          if (p.right !== undefined) posStyle.right = p.right
          if (p.bottom !== undefined) posStyle.bottom = p.bottom

          return (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
              style={{ ...posStyle, rotate: p.rot }}
            >
              <img
                src={`/images/community-photo-${p.photo}.${p.ext}`}
                alt={`Community member ${p.photo}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
              />
            </motion.div>
          )
        })}

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: '600px' }}
        >
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '20px',
            color: '#54d186',
            margin: '0 0 16px',
          }}>
            3,500+ members strong. No permission required.
          </p>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '48px',
            color: '#ffffff',
            letterSpacing: '-0.72px',
            lineHeight: '52px',
            margin: '0 0 24px',
          }}>
            join the community
          </h2>
          <p style={{
            fontFamily: "'Neutral Face Regular', sans-serif",
            fontSize: '16px',
            color: 'rgba(247,245,240,0.65)',
            lineHeight: '1.6',
            margin: '0 0 36px',
          }}>
            Join the community that's building something real — one project, one event, one idea at a time.
          </p>
          <Link to="/volunteer/apply" style={{ textDecoration: 'none' }}>
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: '#255c3b',
              color: '#f7f5f0',
              borderRadius: '39px',
              padding: '16px 32px',
              fontSize: '14px',
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontWeight: 400,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Be a part <ArrowRight color="#f7f5f0" size={15} />
          </motion.span>
          </Link>
        </motion.div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer id="footer" style={{ background: '#0a0a0a', padding: isMobile ? '40px 24px 32px' : '64px 64px 40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap: isMobile ? '32px' : '48px',
          marginBottom: '64px',
        }}>
          {/* Col 1 — Brand + CTA */}
          <div>
            <div style={{ marginBottom: '8px' }}>
              <AquaTerraLogo fontSize={20} />
            </div>
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '20px',
              color: 'rgba(247,245,240,0.6)',
              margin: '0 0 24px',
              lineHeight: '1.5',
            }}>
              join the community
            </p>
            <Link to="/volunteer/apply" style={{ textDecoration: 'none' }}>
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                color: '#0a0a0a',
                borderRadius: '39px',
                padding: '12px 22px',
                fontSize: '14px',
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontWeight: 400,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Join Us → <ArrowRight color="#0a0a0a" size={14} />
            </motion.span>
            </Link>
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {([['Home', '/'], ['Contact Us', '/contact'], ['Collaborate with us', '/collaborations'], ['Support Us', '/support']] as [string, string][]).map(([label, path]) => (
                <Link key={label} to={path} style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(247,245,240,0.6)',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.6)')}
                >
                  {label}
                </Link>
              ))}
            </div>
            {/* Social icons */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
              <a href="https://www.instagram.com/aquaterra.kolkata/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }} onMouseEnter={e => (e.currentTarget.style.opacity = '1')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
                <InstagramIcon size={20} />
              </a>
              <a href="https://www.linkedin.com/company/aquaterra-ngo/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }} onMouseEnter={e => (e.currentTarget.style.opacity = '1')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
                <LinkedInIcon size={20} />
              </a>
            </div>
          </div>

          {/* Col 2 — Featured Projects label + wrapping flex */}
          <div style={{ gridColumn: '2 / 4' }}>
            <h4 style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '12px',
              color: 'rgba(247,245,240,0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}>
              Featured Projects
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {featuredProjects.map(project => (
                <Link
                  key={project}
                  to="/projects"
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(247,245,240,0.65)',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '20px',
                    padding: '5px 14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.65)')}
                >
                  {project}
                </Link>
              ))}
            </div>

            {/* Blog links */}
            <h4 style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: '12px',
              color: 'rgba(247,245,240,0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '32px 0 16px',
            }}>
              Groundwork Diaries
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {footerBlogLinks.map(title => (
                <Link
                  key={title}
                  to="/blog"
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(247,245,240,0.55)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.55)')}
                >
                  {title}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
              {['DOCUMENTATION', 'VOLUNTEER HANDBOOK', 'PRIVACY POLICY'].map(doc => (
                <a key={doc} href="#" style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: '11px',
                  color: 'rgba(247,245,240,0.35)',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.35)')}
                >
                  {doc}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '13px',
              color: 'rgba(247,245,240,0.35)',
            }}>
              © 2025 AquaTerra. All rights reserved.
            </span>
            <span style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '12px',
              color: 'rgba(247,245,240,0.25)',
            }}>
              Est. July 2021 · Kolkata, India · DARPAN Reg: AAFTT2300ME20251
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
            <span style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '13px',
              color: 'rgba(247,245,240,0.35)',
            }}>
              Made with ♥ for the community
            </span>
            <span style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '12px',
              color: 'rgba(247,245,240,0.25)',
            }}>
              @ngo.aquaterra · @roots.aquaterra · @ventures.aquaterra · @shikshaq.in
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}
