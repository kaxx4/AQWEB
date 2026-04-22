import { useState } from 'react'
import { motion } from 'motion/react'
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

export default function Contact() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Would hook into Supabase / email service in production
    setSubmitted(true)
  }

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
              color: '#54d186',
              marginBottom: '20px',
            }}
          >
            Join the Chaos
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
            }}
          >
            Good things happen when<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              people show up.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'Neutral Face Regular', sans-serif",
              fontSize: '17px',
              color: 'rgba(247,245,240,0.6)',
              lineHeight: 1.7,
              maxWidth: '540px',
            }}
          >
            AquaTerra runs on the energy of people who care. Whether you want to volunteer for a drive, shoot photos, write for the blog, or just say hello — we want to hear from you.
          </p>
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
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!submitted ? (
            <>
              <h2
                style={{
                  fontFamily: "'Neutral Face Bold', sans-serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#f7f5f0',
                  marginBottom: '20px',
                }}
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
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    style={{
                      background: selectedRole === r.id ? 'rgba(84,209,134,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedRole === r.id ? '#54d186' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '12px',
                      padding: '14px 16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
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
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  { id: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 9XXXXXXXXX' },
                ].map((field) => (
                  <div key={field.id} style={{ marginBottom: '16px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: "'Neutral Face Bold', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(247,245,240,0.45)',
                        marginBottom: '8px',
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formState[field.id as keyof typeof formState]}
                      onChange={(e) => setFormState((s) => ({ ...s, [field.id]: e.target.value }))}
                      required={field.id !== 'phone'}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        fontFamily: "'Neutral Face Regular', sans-serif",
                        fontSize: '14px',
                        color: '#f7f5f0',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(247,245,240,0.45)',
                      marginBottom: '8px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us a bit about yourself or what you have in mind…"
                    rows={4}
                    value={formState.message}
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
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                    color: '#0a0a0a',
                    border: 'none',
                    borderRadius: '39px',
                    padding: '14px 32px',
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  Send It →
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
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
                }}
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
        </motion.div>

        {/* Right: Info cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {/* Direct contact */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#f7f5f0',
                marginBottom: '20px',
              }}
            >
              Direct Contact
            </h3>
            {[
              { icon: '✉️', label: 'Email', value: 'ngo.aquaterra@gmail.com', href: 'mailto:ngo.aquaterra@gmail.com' },
              { icon: '📸', label: 'Instagram', value: '@ngo.aquaterra', href: 'https://www.instagram.com/ngo.aquaterra' },
              { icon: '💼', label: 'LinkedIn', value: 'AquaTerra NGO', href: 'https://www.linkedin.com/company/aquaterra-ngo' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                  color: 'rgba(247,245,240,0.7)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f7f5f0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,245,240,0.7)')}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,245,240,0.35)', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px' }}>{item.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Location */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
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

          {/* Stats */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(84,209,134,0.06), rgba(76,184,212,0.06))',
              border: '1px solid rgba(84,209,134,0.15)',
              borderRadius: '20px',
              padding: '32px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}
          >
            {[
              { value: '534+', label: 'Drives completed' },
              { value: '2021', label: 'Founded' },
              { value: 'DARPAN', label: 'Certified NGO' },
              { value: 'Free', label: 'Always free to join' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Neutral Face Bold', sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #54d186, #4cb8d4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '4px',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Neutral Face Regular', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(247,245,240,0.45)',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
