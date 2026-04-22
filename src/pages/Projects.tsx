import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
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

function DriveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
    </svg>
  )
}

const PAGE_SIZE = 12

function SkeletonCard() {
  return (
    <div
      style={{
        background: '#141414',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.06)',
        height: '220px',
      }}
    >
      <div style={{ width: '80px', height: '22px', background: 'rgba(255,255,255,0.07)', borderRadius: '6px', marginBottom: '16px' }} />
      <div style={{ width: '90%', height: '18px', background: 'rgba(255,255,255,0.07)', borderRadius: '6px', marginBottom: '8px' }} />
      <div style={{ width: '70%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', marginBottom: '20px' }} />
      <div style={{ width: '60%', height: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '6px' }} />
      <div style={{ width: '50%', height: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
    </div>
  )
}

export default function Projects() {
  const [allProjects, setAllProjects] = useState<WelfareProject[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<ObjectiveFilter>('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    supabase
      .from('welfare_projects')
      .select('id,slug,is_draft,header,featured,location,key_statistic,workshop_date,objective,volunteers,google_drive_link,status')
      .eq('is_draft', false)
      .order('workshop_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setAllProjects(data as WelfareProject[])
        setLoading(false)
      })
  }, [])

  const handleFilterChange = useCallback((f: ObjectiveFilter) => {
    setFilter(f)
    setPage(0)
  }, [])

  const handleSearchChange = useCallback((v: string) => {
    setSearch(v)
    setPage(0)
  }, [])

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
          paddingLeft: '64px',
          paddingRight: '64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle gradient blob */}
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
            }}
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
          padding: '0 64px 40px',
          position: 'sticky',
          top: '64px',
          zIndex: 40,
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Objective chips */}
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
              whileTap={{ scale: 0.97 }}
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
                transition: 'all 0.2s',
              }}
            >
              {obj}
            </motion.button>
          ))}
        </div>

        {/* Search */}
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
              outline: 'none',
            }}
          />
        </div>
      </section>

      {/* ── Results count ── */}
      <section style={{ padding: '28px 64px 8px' }}>
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
      <section style={{ padding: '8px 64px 80px' }}>
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
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
              onClick={() => { setFilter('All'); setSearch(''); setPage(0) }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
              }}
            >
              {paged.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      style={{
                        background: '#111111',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(255,255,255,0.07)',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.border = '1px solid rgba(255,255,255,0.15)'
                        el.style.background = '#161616'
                        el.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.border = '1px solid rgba(255,255,255,0.07)'
                        el.style.background = '#111111'
                        el.style.transform = 'translateY(0)'
                      }}
                    >
                      {/* Featured badge */}
                      {project.featured && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
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
                          ★ FEATURED
                        </div>
                      )}

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
                          marginBottom: '14px',
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
                          paddingRight: project.featured ? '70px' : '0',
                        }}
                      >
                        {project.header}
                      </h3>

                      {/* Key stat */}
                      {project.key_statistic && (
                        <p
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontStyle: 'italic',
                            fontSize: '13px',
                            color: '#54d186',
                            margin: '0 0 14px',
                            lineHeight: '1.4',
                          }}
                        >
                          {project.key_statistic}
                        </p>
                      )}

                      {/* Meta info */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
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
                            }}
                          >
                            <PeopleIcon />
                            {project.volunteers} volunteers
                          </div>
                        )}
                      </div>

                      {/* Drive link */}
                      {project.google_drive_link && (
                        <a
                          href={project.google_drive_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '14px',
                            background: 'rgba(76,184,212,0.1)',
                            border: '1px solid rgba(76,184,212,0.25)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '11px',
                            fontFamily: "'Neutral Face Bold', sans-serif",
                            color: '#4cb8d4',
                            textDecoration: 'none',
                            letterSpacing: '0.04em',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(76,184,212,0.18)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(76,184,212,0.1)'
                          }}
                        >
                          <DriveIcon />
                          View Photos
                        </a>
                      )}
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
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '8px 16px',
                color: page === 0 ? 'rgba(255,255,255,0.2)' : '#f7f5f0',
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '13px',
                transition: 'all 0.2s',
              }}
            >
              ← Prev
            </button>

            {pageNumbers.map((num, i) =>
              num === '...' ? (
                <span key={`dots-${i}`} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', padding: '0 4px' }}>
                  …
                </span>
              ) : (
                <button
                  key={num}
                  onClick={() => setPage(num as number)}
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
                    transition: 'all 0.2s',
                  }}
                >
                  {(num as number) + 1}
                </button>
              )
            )}

            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '8px 16px',
                color: page === totalPages - 1 ? 'rgba(255,255,255,0.2)' : '#f7f5f0',
                cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '13px',
                transition: 'all 0.2s',
              }}
            >
              Next →
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
