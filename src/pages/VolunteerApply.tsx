import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { supabase, type VolunteerApplication } from '../lib/supabase'

const INTEREST_OPTIONS = [
  'Projects & Drives',
  'Events',
  'Marketing & Socials',
  'Content Writing',
  'Photography / Video',
  'Finance & Operations',
  'HR & Community',
  'Website & Tech',
  'Collaborations',
  'Education (ShikshAQ)',
]

const AVAILABILITY_OPTIONS = [
  'Weekends only',
  'Weekday evenings',
  'Both weekdays & weekends',
  'School / college holidays only',
  'Flexible',
]

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgrad', 'Working Professional', 'Other']

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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Neutral Face Bold', sans-serif",
  fontSize: '12px',
  color: 'rgba(247,245,240,0.6)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '8px',
}

export default function VolunteerApply() {
  const navigate = useNavigate()
  const [form, setForm] = useState<VolunteerApplication>({
    full_name: '',
    email: '',
    phone: '',
    age: '',
    college: '',
    year_of_study: '',
    interests: [],
    availability: '',
    why_aquaterra: '',
    previous_experience: '',
    instagram_handle: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof VolunteerApplication, value: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleInterest = (interest: string) => {
    const current = form.interests ?? []
    set('interests', current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.full_name.trim() || !form.email.trim() || !form.why_aquaterra.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    setError(null)
    const { error: sbError } = await supabase.from('volunteer_applications').insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || null,
      age: form.age?.trim() || null,
      college: form.college?.trim() || null,
      year_of_study: form.year_of_study || null,
      interests: form.interests && form.interests.length > 0 ? form.interests : null,
      availability: form.availability || null,
      why_aquaterra: form.why_aquaterra.trim(),
      previous_experience: form.previous_experience?.trim() || null,
      instagram_handle: form.instagram_handle?.trim() || null,
    })
    setSubmitting(false)
    if (sbError) {
      setError('Something went wrong. Try emailing us at ngo.aquaterra@gmail.com')
    } else {
      navigate('/volunteer/thank-you')
    }
  }

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh', color: '#f7f5f0' }}>
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', paddingLeft: '64px', paddingRight: '64px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#54d186', marginBottom: '16px' }}>
            Join AquaTerra
          </p>
          <h1 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-1.5px', color: '#f7f5f0', marginBottom: '20px', textWrap: 'balance' } as React.CSSProperties}>
            Apply to Volunteer
          </h1>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '19px', color: 'rgba(247,245,240,0.6)', lineHeight: 1.65, maxWidth: '560px', margin: 0 }}>
            We're not looking for the most qualified. We're looking for people who actually show up.
          </p>
        </motion.div>
      </section>

      {/* Form */}
      <section style={{ padding: '0 64px 120px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '56px 64px' }}
        >
          <form onSubmit={handleSubmit} noValidate>
            {/* Personal info */}
            <h3 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '28px', marginTop: 0 }}>
              01 — About You
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label htmlFor="vol-name" style={labelStyle}>Full Name *</label>
                <input id="vol-name" type="text" required placeholder="Your full name" value={form.full_name} onChange={e => set('full_name', e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
              </div>
              <div>
                <label htmlFor="vol-email" style={labelStyle}>Email *</label>
                <input id="vol-email" type="email" required placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
              </div>
              <div>
                <label htmlFor="vol-phone" style={labelStyle}>Phone (optional)</label>
                <input id="vol-phone" type="tel" placeholder="+91 98765 43210" value={form.phone ?? ''} onChange={e => set('phone', e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
              </div>
              <div>
                <label htmlFor="vol-insta" style={labelStyle}>Instagram Handle (optional)</label>
                <input id="vol-insta" type="text" placeholder="@yourhandle" value={form.instagram_handle ?? ''} onChange={e => set('instagram_handle', e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
              </div>
              <div>
                <label htmlFor="vol-age" style={labelStyle}>Age (optional)</label>
                <input id="vol-age" type="text" placeholder="e.g. 19" value={form.age ?? ''} onChange={e => set('age', e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
              </div>
              <div>
                <label htmlFor="vol-college" style={labelStyle}>College / Institution (optional)</label>
                <input id="vol-college" type="text" placeholder="Jadavpur University, etc." value={form.college ?? ''} onChange={e => set('college', e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
              </div>
            </div>

            {/* Year of study */}
            <div style={{ marginBottom: '40px' }}>
              <p style={labelStyle}>Year of Study / Status</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {YEAR_OPTIONS.map(yr => (
                  <motion.button key={yr} type="button" whileTap={{ scale: 0.96 }}
                    onClick={() => set('year_of_study', form.year_of_study === yr ? '' : yr)}
                    style={{
                      background: form.year_of_study === yr ? 'rgba(84,209,134,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${form.year_of_study === yr ? 'rgba(84,209,134,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '999px', padding: '7px 16px',
                      fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px',
                      color: form.year_of_study === yr ? '#54d186' : 'rgba(247,245,240,0.65)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>{yr}</motion.button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <h3 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>
              02 — What You're Into
            </h3>
            <div style={{ marginBottom: '40px' }}>
              <p style={labelStyle}>Areas of Interest (pick any)</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {INTEREST_OPTIONS.map(interest => {
                  const active = form.interests?.includes(interest)
                  return (
                    <motion.button key={interest} type="button" whileTap={{ scale: 0.96 }}
                      onClick={() => toggleInterest(interest)}
                      style={{
                        background: active ? 'rgba(84,209,134,0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${active ? 'rgba(84,209,134,0.4)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '999px', padding: '8px 18px',
                        fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px',
                        color: active ? '#54d186' : 'rgba(247,245,240,0.65)',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}>{interest}</motion.button>
                  )
                })}
              </div>
            </div>

            {/* Availability */}
            <div style={{ marginBottom: '40px' }}>
              <p style={labelStyle}>Availability</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AVAILABILITY_OPTIONS.map(opt => (
                  <motion.button key={opt} type="button" whileTap={{ scale: 0.96 }}
                    onClick={() => set('availability', form.availability === opt ? '' : opt)}
                    style={{
                      background: form.availability === opt ? 'rgba(84,209,134,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${form.availability === opt ? 'rgba(84,209,134,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '999px', padding: '7px 16px',
                      fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px',
                      color: form.availability === opt ? '#54d186' : 'rgba(247,245,240,0.65)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>{opt}</motion.button>
                ))}
              </div>
            </div>

            {/* Why AquaTerra */}
            <h3 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>
              03 — The Real Stuff
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="vol-why" style={labelStyle}>Why do you want to join AquaTerra? *</label>
              <textarea id="vol-why" required rows={5} placeholder="Don't give us a generic answer. Tell us what actually made you click apply." value={form.why_aquaterra}
                onChange={e => set('why_aquaterra', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
            </div>
            <div style={{ marginBottom: '36px' }}>
              <label htmlFor="vol-exp" style={labelStyle}>Any previous volunteer or NGO experience? (optional)</label>
              <textarea id="vol-exp" rows={3} placeholder="Tell us what you've done before — or that this is your first time. Both are fine." value={form.previous_experience ?? ''}
                onChange={e => set('previous_experience', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(84,209,134,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')} />
            </div>

            {error && (
              <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px', color: '#ef5350', marginBottom: '16px' }}>{error}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              disabled={submitting}
              style={{
                background: submitting ? 'rgba(84,209,134,0.35)' : 'linear-gradient(135deg, #54d186, #4cb8d4)',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '39px',
                padding: '18px 48px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                letterSpacing: '0.03em',
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Application →'}
            </motion.button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
