import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const roles = [
  { id: 'volunteer', label: 'Volunteer', desc: 'Show up for drives & workshops', icon: '🤝' },
  { id: 'photographer', label: 'Photographer', desc: 'Document our work visually', icon: '📸' },
  { id: 'writer', label: 'Blog Writer', desc: 'Contribute essays & stories', icon: '✍️' },
  { id: 'organiser', label: 'Event Organiser', desc: 'Help plan & execute events', icon: '🗂️' },
  { id: 'fundraiser', label: 'Fundraiser', desc: 'Help us raise resources', icon: '💰' },
  { id: 'other', label: 'Other / Just Curious', desc: 'Tell us what you have in mind', icon: '✨' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariant = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

export default function Contact() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    const { error } = await supabase.from('contact_submissions').insert({
      name: formState.name,
      email: formState.email,
      phone: formState.phone || null,
      role: selectedRole,
      message: formState.message,
    })
    setSubmitting(false)
    if (error) {
      setSubmitError('Something went wrong. Please try again or email us directly.')
    } else {
      setSubmitted(true)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f7f5f0' }}>
      <Nav />

      {/* Hero */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '60px',
          paddingLeft: '64px',
          paddingRight: '64px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={itemVariant}
            style={{
              fontFamily: "'Neutral Face Bold', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#54d186',
              marginBottom: '20px',
            }}
          >
            Join the Chaos
          </motion.p>
          <motion.h1 variants={itemVariant}
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
            We'd love to hear<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              from you.
            </span>
          </motion.h1>
          <motion.p variants={itemVariant}
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '17px',
              color: 'rgba(247,245,240,0.6)',
              lineHeight: 1.7,
              maxWidth: '540px',
              margin: 0,
            }}
          >
            AquaTerra runs on the energy of people who care. Whether you want to volunteer for a drive, shoot photos, write for the blog, or just say hello — we want to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* Two-column layout */}
      <section
        style={{
          padding: '0 64px 120px',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* Left: Role picker + form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.15 } }}>
                <h2
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#f7f5f0',
                    marginBottom: '20px',
                    textWrap: 'balance',
                  } as React.CSSProperties}
                >
                  How do you want to help?
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginBottom: '36px',
                  }}
                >
                  {roles.map((r) => (
                    <motion.button
                      key={r.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedRole(r.id)}
                      style={{
                        background: selectedRole === r.id ? 'rgba(84,209,134,0.12)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${selectedRole === r.id ? '#54d186' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '12px',
                        padding: '14px 16px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '20px', marginBottom: '6px' }}>{r.icon}</div>
                      <div
                        style={{
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontSize: '13px',
                          fontWeight: 700,
                          color: selectedRole === r.id ? '#54d186' : '#f7f5f0',
                          marginBottom: '3px',
                        }}
                      >
                        {r.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Neutral Face Regular', sans-serif",
                          fontSize: '11px',
                          color: 'rgba(247,245,240,0.45)',
                        }}
                      >
                        {r.desc}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {[
                    { id: 'contact-name', label: 'Full Name', type: 'text', placeholder: 'Your name', key: 'name' },
                    { id: 'contact-email', label: 'Email', type: 'email', placeholder: 'your@email.com', key: 'email' },
                    { id: 'contact-phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 9XXXXXXXXX', key: 'phone' },
                  ].map((field) => (
                    <div key={field.id} style={{ marginBottom: '16px' }}>
                      <label
                        htmlFor={field.id}
                        style={{
                          display: 'block',
                          fontFamily: "'Neutral Face Bold', sans-serif",
                          fontSize: '11px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'rgba(247,245,240,0.45)',
                          marginBottom: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formState[field.key as keyof typeof formState]}
                        onChange={(e) => setFormState((s) => ({ ...s, [field.key]: e.target.value }))}
                        required={field.key !== 'phone'}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontFamily: "'Neutral Face Regular', sans-serif",
                          fontSize: '14px',
                          color: '#f7f5f0',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: '24px' }}>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: 'block',
                        fontFamily: "'Neutral Face Bold', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(247,245,240,0.45)',
                        marginBottom: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Tell us a bit about yourself or what you have in mind…"
                      rows={4}
                      value={formState.message}
                      required
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        fontFamily: "'Neutral Face Regular', sans-serif",
                        fontSize: '14px',
                        color: '#f7f5f0',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {submitError && (
                    <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px', color: '#ff6b6b', marginBottom: '16px' }}>
                      {submitError}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.96 }}
                    disabled={submitting}
                    style={{
                      background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                      color: '#0a0a0a',
                      border: 'none',
                      borderRadius: '39px',
                      padding: '14px 32px',
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.04em',
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? 'Sending…' : 'Send It →'}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(84,209,134,0.08)',
                  border: '1px solid rgba(84,209,134,0.25)',
                  borderRadius: '20px',
                  padding: '48px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                <h3
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#54d186',
                    marginBottom: '12px',
                    textWrap: 'balance',
                  } as React.CSSProperties}
                >
                  We got your message!
                </h3>
                <p
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '15px',
                    color: 'rgba(247,245,240,0.65)',
                    lineHeight: 1.7,
                  }}
                >
                  Someone from the team will reach out soon. In the meantime, follow us on Instagram to stay up to date.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right: Info cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/919830000000"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: 'rgba(37,211,102,0.1)',
              border: '1px solid rgba(37,211,102,0.25)',
              borderRadius: '20px',
              padding: '24px 28px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.16)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)' }}
          >
            <span style={{ fontSize: '32px' }}>💬</span>
            <div>
              <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '16px', fontWeight: 700, color: '#25d366', marginBottom: '4px' }}>
                WhatsApp Community
              </div>
              <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px', color: 'rgba(247,245,240,0.55)' }}>
                Join our WhatsApp group — fastest way to connect
              </div>
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/ngo.aquaterra"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: 'rgba(193,53,132,0.08)',
              border: '1px solid rgba(193,53,132,0.2)',
              borderRadius: '20px',
              padding: '24px 28px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(193,53,132,0.14)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(193,53,132,0.08)' }}
          >
            <span style={{ fontSize: '32px' }}>📸</span>
            <div>
              <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '16px', fontWeight: 700, color: '#c13584', marginBottom: '4px' }}>
                @ngo.aquaterra
              </div>
              <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px', color: 'rgba(247,245,240,0.55)' }}>
                Follow us on Instagram
              </div>
            </div>
          </motion.a>

          {/* Direct contact */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '28px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#f7f5f0',
                marginBottom: '16px',
              }}
            >
              Direct Contact
            </h3>
            <a
              href="mailto:ngo.aquaterra@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
                color: 'rgba(247,245,240,0.7)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.7)')}
            >
              <span style={{ fontSize: '18px' }}>✉️</span>
              <div>
                <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', marginBottom: '2px' }}>Email</div>
                <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px' }}>ngo.aquaterra@gmail.com</div>
              </div>
            </a>
          </div>

          {/* Location */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '28px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#f7f5f0',
                marginBottom: '12px',
              }}
            >
              Based in Kolkata
            </h3>
            <p
              style={{
                fontFamily: "'Neutral Face Regular', sans-serif",
                fontSize: '14px',
                color: 'rgba(247,245,240,0.55)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Most of our drives happen across Kolkata and the surrounding districts. We also run annual relief efforts in the Sundarbans delta. If you're local — even better.
            </p>
          </div>

          {/* Quick Links */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '28px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#f7f5f0',
                marginBottom: '16px',
              }}
            >
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Explore Website', to: '/', internal: true },
                { label: 'Our Projects', to: '/projects', internal: true },
                { label: 'Sundarbans Project', to: '/projects', internal: true },
                { label: 'Featured on The Statesman', to: '#', internal: false },
              ].map(link => (
                link.internal ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    style={{
                      fontFamily: "'Neutral Face Regular', sans-serif",
                      fontSize: '14px',
                      color: '#4cb8d4',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#4cb8d4')}
                  >
                    {link.label} →
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Neutral Face Regular', sans-serif",
                      fontSize: '14px',
                      color: '#4cb8d4',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#4cb8d4')}
                  >
                    {link.label} ↗
                  </a>
                )
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
