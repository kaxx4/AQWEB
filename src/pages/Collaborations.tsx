import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { supabase, type CollaborationSubmission } from '../lib/supabase'

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

const COLLAB_TYPES = [
  'Co-hosted Event',
  'Donation Drive',
  'Educational Workshop',
  'Sponsorship',
  'Media / Press',
  'Research / Academic',
  'Other',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px',
  padding: '14px 16px',
  fontSize: '15px',
  fontFamily: "'Neutral Face Regular', sans-serif",
  color: '#f7f5f0',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

export default function Collaborations() {
  const [partners, setPartners] = useState<CollabPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [projectCount, setProjectCount] = useState<number | null>(null)

  // Form state
  const [form, setForm] = useState<CollaborationSubmission>({
    org_name: '', contact_name: '', email: '', phone: '', collab_type: '', message: '',
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleFormChange = (field: keyof CollaborationSubmission, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.org_name.trim() || !form.contact_name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError('Please fill in all required fields.')
      return
    }
    setFormSubmitting(true)
    setFormError(null)
    const { error } = await supabase.from('collaboration_submissions').insert({
      org_name: form.org_name.trim(),
      contact_name: form.contact_name.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || null,
      collab_type: form.collab_type?.trim() || null,
      message: form.message.trim(),
    })
    setFormSubmitting(false)
    if (error) {
      setFormError('Something went wrong. Try emailing us directly at ngo.aquaterra@gmail.com')
    } else {
      setFormSuccess(true)
    }
  }

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

      {/* ── Collaboration Form ── */}
      <section style={{ padding: '0 64px 80px', maxWidth: '1200px', margin: '0 auto' }} ref={formRef}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'rgba(76,184,212,0.04)',
            border: '1px solid rgba(76,184,212,0.15)',
            borderRadius: '28px',
            padding: '64px 72px',
          }}
        >
          <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4cb8d4', marginBottom: '16px' }}>
            Work With Us
          </p>
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#f7f5f0', marginBottom: '12px', letterSpacing: '-0.5px', textWrap: 'balance' } as React.CSSProperties}>
            Want to collaborate?
          </h2>
          <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: 'rgba(247,245,240,0.55)', lineHeight: 1.7, margin: '0 0 48px', maxWidth: '520px' }}>
            Tell us about your organisation. We'll get back to you within 48 hours.
          </p>

          {formSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '48px 0' }}
            >
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>🤝</div>
              <h3 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '24px', color: '#f7f5f0', marginBottom: '12px' }}>We got your message!</h3>
              <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.55)', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto' }}>
                Our team will review your collaboration request and get back to you within 48 hours. Keep an eye on your inbox.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label htmlFor="collab-org" style={{ display: 'block', fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Organisation Name *
                  </label>
                  <input
                    id="collab-org"
                    type="text"
                    required
                    placeholder="Your NGO / Club / Company"
                    value={form.org_name}
                    onChange={e => handleFormChange('org_name', e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,184,212,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>
                <div>
                  <label htmlFor="collab-contact" style={{ display: 'block', fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Your Name *
                  </label>
                  <input
                    id="collab-contact"
                    type="text"
                    required
                    placeholder="Point of contact"
                    value={form.contact_name}
                    onChange={e => handleFormChange('contact_name', e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,184,212,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>
                <div>
                  <label htmlFor="collab-email" style={{ display: 'block', fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    id="collab-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => handleFormChange('email', e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,184,212,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>
                <div>
                  <label htmlFor="collab-phone" style={{ display: 'block', fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Phone (optional)
                  </label>
                  <input
                    id="collab-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone ?? ''}
                    onChange={e => handleFormChange('phone', e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,184,212,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>
              </div>

              {/* Collab type pills */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Type of Collaboration
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {COLLAB_TYPES.map(type => (
                    <motion.button
                      key={type}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleFormChange('collab_type', form.collab_type === type ? '' : type)}
                      style={{
                        background: form.collab_type === type ? 'rgba(76,184,212,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${form.collab_type === type ? 'rgba(76,184,212,0.5)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '999px',
                        padding: '7px 16px',
                        fontFamily: "'Neutral Face Regular', sans-serif",
                        fontSize: '13px',
                        color: form.collab_type === type ? '#4cb8d4' : 'rgba(247,245,240,0.65)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="collab-message" style={{ display: 'block', fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Tell us about the collaboration *
                </label>
                <textarea
                  id="collab-message"
                  required
                  rows={5}
                  placeholder="What do you have in mind? Share your idea, your organisation's mission, and what you're hoping to build together."
                  value={form.message}
                  onChange={e => handleFormChange('message', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,184,212,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {formError && (
                <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px', color: '#ef5350', marginBottom: '16px' }}>
                  {formError}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                disabled={formSubmitting}
                style={{
                  background: formSubmitting ? 'rgba(76,184,212,0.4)' : 'linear-gradient(135deg, #4cb8d4, #54d186)',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '39px',
                  padding: '16px 40px',
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: formSubmitting ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.03em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {formSubmitting ? 'Sending...' : 'Send Collaboration Request →'}
              </motion.button>
            </form>
          )}
        </motion.div>
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
