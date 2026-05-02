import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { supabase, type WelfareProject, OBJECTIVES, type ObjectiveFilter } from '../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

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

const objectiveBg: Record<string, string> = {
  Workshop: 'rgba(62,139,194,0.15)',
  'Feeding Dogs': 'rgba(224,140,60,0.15)',
  'Plantation Drive': 'rgba(37,92,59,0.2)',
  'Distribution Drive': 'rgba(124,77,188,0.15)',
  'Sundarbans Relief': 'rgba(26,107,107,0.2)',
  'Old Age Home Visit': 'rgba(176,64,96,0.15)',
  'Fundraising Event': 'rgba(204,51,51,0.15)',
  Others: 'rgba(102,102,102,0.15)',
}

function getObjColor(obj: string | null) {
  return objectiveColor[obj ?? ''] ?? '#404040'
}
function getObjBg(obj: string | null) {
  return objectiveBg[obj ?? ''] ?? 'rgba(64,64,64,0.15)'
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getProjectImage(project: WelfareProject): string {
  if (project.main_image) return project.main_image
  if (project.image_1) return project.image_1
  return `/images/initiative-${(project.id % 43) + 1}.png`
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

const PAGE_SIZE = 12

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35 } },
}

function SkeletonCard() {
  return (
    <div
      style={{
        background: '#141414',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ width: '100%', aspectRatio: '16/9', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ padding: '20px' }}>
        <div style={{ width: '80px', height: '20px', background: 'rgba(255,255,255,0.07)', borderRadius: '6px', marginBottom: '12px' }} />
        <div style={{ width: '90%', height: '16px', background: 'rgba(255,255,255,0.07)', borderRadius: '6px', marginBottom: '8px' }} />
        <div style={{ width: '70%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }} />
      </div>
    </div>
  )
}

function useIsMobile(bp = 768) {
  const [m, setM] = useState(() => window.innerWidth < bp)
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp)
    window.addEventListener('resize', h, { passive: true })
    return () => window.removeEventListener('resize', h)
  }, [bp])
  return m
}

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProjects, setAllProjects] = useState<WelfareProject[]>([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  // State lives in URL so filters are bookmarkable & shareable
  const filter = (searchParams.get('filter') as ObjectiveFilter) ?? 'All'
  const search = searchParams.get('q') ?? ''
  const page = parseInt(searchParams.get('page') ?? '0', 10)

  useEffect(() => {
    supabase
      .from('welfare_projects')
      .select('id,slug,is_draft,header,featured,location,key_statistic,workshop_date,objective,volunteers,google_drive_link,status,short_summary,collab_name,collab_logo,main_image,main_image_alt,image_1')
      .eq('is_draft', false)
      .order('workshop_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setAllProjects(data as WelfareProject[])
        setLoading(false)
      })
  }, [])

  const handleFilterChange = useCallback((f: ObjectiveFilter) => {
    setSearchParams(p => { p.set('filter', f); p.delete('page'); return p })
  }, [setSearchParams])

  const handleSearchChange = useCallback((v: string) => {
    setSearchParams(p => { if (v) p.set('q', v); else p.delete('q'); p.delete('page'); return p })
  }, [setSearchParams])

  const setPage = useCallback((n: number) => {
    setSearchParams(p => { if (n) p.set('page', String(n)); else p.delete('page'); return p })
  }, [setSearchParams])

  const filtered = useMemo(() => {
    let list = allProjects
    if (filter !== 'All') {
      list = list.filter(p => p.objective?.toLowerCase().includes(filter.toLowerCase()))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        p =>
          p.header?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.key_statistic?.toLowerCase().includes(q)
      )
    }
    return list
  }, [allProjects, filter, search])

  const paged = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page]
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  const pageNumbers = useMemo(() => {
    const nums: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) nums.push(i)
    } else {
      nums.push(0)
      if (page > 2) nums.push('...')
      for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) nums.push(i)
      if (page < totalPages - 3) nums.push('...')
      nums.push(totalPages - 1)
    }
    return nums
  }, [totalPages, page])

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        style={{
          background: '#0a0a0a',
          paddingTop: '120px',
          paddingBottom: '80px',
          paddingLeft: isMobile ? '20px' : '64px',
          paddingRight: isMobile ? '20px' : '64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(84,209,134,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '860px' }}
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
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#54d186', display: 'inline-block' }} />
            <span
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '11px',
                color: '#54d186',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              All Projects
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 7vw, 80px)',
              color: '#f7f5f0',
              margin: '0 0 20px',
              lineHeight: 1.05,
              letterSpacing: '-1px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            534 Projects.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #54d186, #3e8bc2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Every Single One.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '20px',
              color: 'rgba(247,245,240,0.6)',
              margin: 0,
              lineHeight: '1.6',
              maxWidth: '600px',
            }}
          >
            From mangrove plantations in the Sundarbans to feeding stray dogs at 2am — documented.
          </p>
        </motion.div>
      </section>

      {/* ── Filters ── */}
      <section
        style={{
          padding: isMobile ? '0 16px 24px' : '0 64px 40px',
          position: 'sticky',
          top: '64px',
          zIndex: 40,
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '20px',
            paddingBottom: '16px',
          }}
        >
          {OBJECTIVES.map((obj) => (
            <motion.button
              key={obj}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleFilterChange(obj)}
              style={{
                background: filter === obj
                  ? (obj === 'All' ? '#ffffff' : getObjColor(obj))
                  : 'rgba(255,255,255,0.05)',
                color: filter === obj ? (obj === 'All' ? '#0a0a0a' : '#ffffff') : 'rgba(247,245,240,0.65)',
                border: `1px solid ${filter === obj ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '999px',
                padding: '7px 16px',
                fontSize: '12px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              }}
            >
              {obj}
            </motion.button>
          ))}
        </div>

        <div style={{ position: 'relative', maxWidth: '420px' }}>
          <svg
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search projects, locations..."
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '10px 14px 10px 40px',
              fontSize: '13px',
              fontFamily: "'Neutral Face Regular', sans-serif",
              color: '#f7f5f0',
            }}
          />
        </div>
      </section>

      {/* ── Results count ── */}
      <section style={{ padding: isMobile ? '16px 16px 8px' : '28px 64px 8px' }}>
        <p
          style={{
            fontFamily: "'Neutral Face Regular', sans-serif",
            fontSize: '13px',
            color: 'rgba(247,245,240,0.4)',
            margin: 0,
          }}
        >
          {loading
            ? 'Loading projects...'
            : `Showing ${paged.length} of ${filtered.length} projects`}
        </p>
      </section>

      {/* ── Grid ── */}
      <section style={{ padding: isMobile ? '8px 16px 60px' : '8px 64px 80px' }}>
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: 'rgba(247,245,240,0.3)',
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '16px',
            }}
          >
            No projects match your search.{' '}
            <button
              onClick={() => { handleFilterChange('All'); handleSearchChange(''); setPage(0) }}
              style={{
                background: 'none',
                border: 'none',
                color: '#54d186',
                cursor: 'pointer',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '16px',
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${search}-${page}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.15 } }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '20px',
              }}
            >
              {paged.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      style={{
                        background: '#111111',
                        borderRadius: '20px',
                        padding: '0',
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        transition: 'box-shadow 0.25s',
                        position: 'relative',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.18)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.08)'
                      }}
                    >
                      {/* Image */}
                      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img
                          src={getProjectImage(project)}
                          alt={project.main_image_alt ?? project.header}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            outline: '1px solid rgba(255,255,255,0.1)',
                            outlineOffset: '-1px',
                            borderRadius: '20px 20px 0 0',
                          }}
                          onError={e => {
                            const img = e.target as HTMLImageElement
                            if (project.image_1 && img.src !== project.image_1) {
                              img.src = project.image_1
                            } else {
                              img.src = `/images/initiative-${(project.id % 43) + 1}.png`
                            }
                          }}
                        />
                        {/* Collab badge */}
                        {project.collab_name && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              background: 'rgba(10,10,10,0.75)',
                              backdropFilter: 'blur(8px)',
                              borderRadius: '8px',
                              padding: '4px 10px',
                              fontSize: '10px',
                              fontFamily: "'Neutral Face Bold', sans-serif",
                              color: '#f7f5f0',
                              letterSpacing: '0.04em',
                              maxWidth: '120px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {project.collab_name}
                          </div>
                        )}
                        {/* Featured badge */}
                        {project.featured && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '10px',
                              left: '10px',
                              background: 'rgba(255,215,0,0.15)',
                              border: '1px solid rgba(255,215,0,0.3)',
                              borderRadius: '6px',
                              padding: '3px 8px',
                              fontSize: '10px',
                              fontFamily: "'Neutral Face Bold', sans-serif",
                              color: '#ffd700',
                              letterSpacing: '0.05em',
                            }}
                          >
                            FEATURED
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: '20px' }}>
                        {/* Objective badge */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: getObjBg(project.objective),
                            border: `1px solid ${getObjColor(project.objective)}33`,
                            borderRadius: '6px',
                            padding: '4px 10px',
                            marginBottom: '12px',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: getObjColor(project.objective),
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "'Neutral Face Bold', sans-serif",
                              fontSize: '10px',
                              color: getObjColor(project.objective),
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {project.objective ?? 'Others'}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: "'Neutral Face Bold', sans-serif",
                            fontWeight: 700,
                            fontSize: '15px',
                            color: '#f7f5f0',
                            margin: '0 0 8px',
                            lineHeight: '1.4',
                            textWrap: 'balance',
                          } as React.CSSProperties}
                        >
                          {project.header}
                        </h3>

                        {/* Short summary */}
                        {project.short_summary && (
                          <p
                            style={{
                              fontFamily: "'Neutral Face Regular', sans-serif",
                              fontSize: '12px',
                              color: 'rgba(247,245,240,0.5)',
                              margin: '0 0 12px',
                              lineHeight: '1.5',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            } as React.CSSProperties}
                          >
                            {project.short_summary}
                          </p>
                        )}

                        {/* Meta */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {project.location && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'rgba(247,245,240,0.45)',
                                fontSize: '12px',
                                fontFamily: "'Neutral Face Regular', sans-serif",
                              }}
                            >
                              <LocationIcon />
                              {project.location}
                            </div>
                          )}
                          {project.workshop_date && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'rgba(247,245,240,0.45)',
                                fontSize: '12px',
                                fontFamily: "'Neutral Face Regular', sans-serif",
                              }}
                            >
                              <CalendarIcon />
                              {formatDate(project.workshop_date)}
                            </div>
                          )}
                          {project.volunteers != null && project.volunteers > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'rgba(247,245,240,0.45)',
                                fontSize: '12px',
                                fontFamily: "'Neutral Face Regular', sans-serif",
                                fontVariantNumeric: 'tabular-nums',
                              }}
                            >
                              <PeopleIcon />
                              {project.volunteers} volunteers
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Pagination ── */}
        {!loading && filtered.length > PAGE_SIZE && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '56px',
            }}
          >
            <motion.button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '8px 16px',
                color: page === 0 ? 'rgba(255,255,255,0.2)' : '#f7f5f0',
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '13px',
                transition: 'opacity 0.2s',
              }}
            >
              ← Prev
            </motion.button>

            {pageNumbers.map((num, i) =>
              num === '...' ? (
                <span key={`dots-${i}`} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', padding: '0 4px' }}>
                  …
                </span>
              ) : (
                <motion.button
                  key={num}
                  onClick={() => setPage(num as number)}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    background: page === num ? '#54d186' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${page === num ? '#54d186' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '10px',
                    width: '40px',
                    height: '40px',
                    color: page === num ? '#0a0a0a' : '#f7f5f0',
                    cursor: 'pointer',
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontSize: '13px',
                    transition: 'background 0.2s, color 0.2s',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {(num as number) + 1}
                </motion.button>
              )
            )}

            <motion.button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '8px 16px',
                color: page === totalPages - 1 ? 'rgba(255,255,255,0.2)' : '#f7f5f0',
                cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '13px',
                transition: 'opacity 0.2s',
              }}
            >
              Next →
            </motion.button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
