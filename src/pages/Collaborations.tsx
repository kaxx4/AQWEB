import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

interface CollabPartner {
  collab_name: string
  collab_logo: string | null
  collab_logo_alt: string | null
  projectCount: number
}

const fallbackNgoLogos = Array.from({ length: 8 }, (_, i) => i + 1)

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

export default function Collaborations() {
  const [partners, setPartners] = useState<CollabPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [projectCount, setProjectCount] = useState<number | null>(null)

  useEffect(() => {
    supabase
      .from('welfare_projects')
      .select('id', { count: 'exact', head: true })
      .then(({ count }) => setProjectCount(count ?? 534))

    supabase
      .from('welfare_projects')
      .select('collab_name, collab_logo, collab_logo_alt')
      .not('collab_name', 'is', null)
      .eq('is_draft', false)
      .then(({ data }) => {
        if (data) {
          const map = new Map<string, CollabPartner>()
          for (const row of data) {
            const name = row.collab_name as string
            if (!map.has(name)) {
              map.set(name, { collab_name: name, collab_logo: row.collab_logo, collab_logo_alt: row.collab_logo_alt, projectCount: 0 })
            }
            const entry = map.get(name)!
            entry.projectCount += 1
          }
          setPartners(Array.from(map.values()).sort((a, b) => b.projectCount - a.projectCount))
        }
        setLoading(false)
      })
  }, [])

  const accentColors = ['#54d186', '#4cb8d4', '#ffb74d', '#ba68c8', '#ef5350', '#26c6da', '#ffa726', '#ec407a']

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f7f5f0' }}>
      <Nav />

      {/* Hero */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '80px',
          paddingLeft: '64px',
          paddingRight: '64px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#4cb8d4',
              marginBottom: '20px',
            }}
          >
            Partners & Collaborations
          </p>
          <h1
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 68px)',
              lineHeight: 1.08,
              letterSpacing: '-1.5px',
              color: '#f7f5f0',
              marginBottom: '24px',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Better together than<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #4cb8d4, #54d186)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              we ever were alone.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '17px',
              color: 'rgba(247,245,240,0.6)',
              lineHeight: 1.7,
              maxWidth: '560px',
            }}
          >
            AquaTerra's reach is amplified by the organisations we work alongside. Every collaboration multiplies the impact of our drives — more hands, more reach, more good.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '60px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {[
            { value: `${partners.length || '8'}+`, label: 'Active Partners' },
            { value: `${projectCount ?? '534'}+`, label: 'Collaborative Drives' },
            { value: '2021', label: 'Since' },
            { value: 'Pan-Kolkata', label: 'Reach' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '32px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #4cb8d4, #54d186)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '6px',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(247,245,240,0.45)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Partners from DB */}
      {!loading && partners.length > 0 && (
        <section style={{ padding: '0 64px 60px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '22px', fontWeight: 700, color: '#f7f5f0', marginBottom: '32px', textWrap: 'balance' } as React.CSSProperties}>
            Our Collaboration Partners
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {partners.map((partner, i) => {
              const accent = accentColors[i % accentColors.length]
              return (
                <motion.div
                  key={partner.collab_name}
                  variants={cardVariant}
                  whileHover={{ y: -4 }}
                  style={{
                    background: `${accent}0d`,
                    border: `1px solid ${accent}28`,
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    {partner.collab_logo ? (
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '14px',
                          background: 'rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={partner.collab_logo}
                          alt={partner.collab_logo_alt ?? partner.collab_name}
                          style={{ maxWidth: '44px', maxHeight: '44px', objectFit: 'contain', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '14px',
                          background: `${accent}22`,
                          border: `1px solid ${accent}33`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontSize: '18px',
                          color: accent,
                        }}
                      >
                        {partner.collab_name[0]}
                      </div>
                    )}
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#f7f5f0',
                          margin: '0 0 4px',
                          textWrap: 'balance',
                        } as React.CSSProperties}
                      >
                        {partner.collab_name}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: accent,
                          background: `${accent}18`,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {partner.projectCount} {partner.projectCount === 1 ? 'project' : 'projects'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>
      )}

      {/* Static NGO logo grid as fallback / always shown */}
      <section style={{ padding: '0 64px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '22px', fontWeight: 700, color: '#f7f5f0', marginBottom: '32px', textWrap: 'balance' } as React.CSSProperties}>
          NGO Network
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {fallbackNgoLogos.map((n) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (n - 1) * 0.06 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100px',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              <img
                src={`/images/ngo-logo-${n}.png`}
                alt={`NGO Partner ${n}`}
                style={{ maxWidth: '100%', maxHeight: '64px', objectFit: 'contain', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                onError={e => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                  const p = el.parentElement
                  if (p) p.innerHTML = `<span style="font-family:'Neutral Face Regular',sans-serif;font-size:12px;color:#555;text-align:center;">Partner ${n}</span>`
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Become a partner CTA */}
      <section style={{ padding: '0 64px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(84,209,134,0.07), rgba(76,184,212,0.07))',
            border: '1px solid rgba(84,209,134,0.15)',
            borderRadius: '28px',
            padding: '72px 80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <h2
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                color: '#f7f5f0',
                marginBottom: '16px',
                textWrap: 'balance',
              } as React.CSSProperties}
            >
              Want to collaborate with us?
            </h2>
            <p
              style={{
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '16px',
                color: 'rgba(247,245,240,0.6)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              If you're an NGO, student club, or organisation that shares our values, we'd love to plan something together. Our events are open, informal, and driven by people who genuinely care.
            </p>
          </div>
          <Link to="/contact" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                color: '#0a0a0a',
                borderRadius: '39px',
                padding: '16px 36px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Get in Touch →
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
