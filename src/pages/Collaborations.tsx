import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

interface CollabEntry {
  name: string
  type: string
  description: string
  driveCount?: number
  color: string
  accent: string
  icon: string
}

const staticCollabs: CollabEntry[] = [
  {
    name: 'Calcutta Rescue',
    type: 'Healthcare Partner',
    description: 'Joint outreach drives bringing free medical care to underserved communities across Kolkata.',
    color: 'rgba(84,209,134,0.08)',
    accent: '#54d186',
    icon: '🏥',
  },
  {
    name: 'Prani',
    type: 'Animal Welfare',
    description: 'Co-hosted dog-feeding and street animal care drives across South Kolkata.',
    color: 'rgba(76,184,212,0.08)',
    accent: '#4cb8d4',
    icon: '🐾',
  },
  {
    name: 'Sundarbans Conservation Trust',
    type: 'Environment',
    description: 'Annual mangrove plantation and relief drives in the Sundarbans delta since 2022.',
    color: 'rgba(255,183,77,0.08)',
    accent: '#ffb74d',
    icon: '🌿',
  },
  {
    name: 'The Second Life Project',
    type: 'Clothes & Resources',
    description: 'Clothes segregation and distribution events that have reached thousands of families.',
    color: 'rgba(186,104,200,0.08)',
    accent: '#ba68c8',
    icon: '👕',
  },
  {
    name: 'Dum Dum Community Kitchen',
    type: 'Food Security',
    description: 'Regular food distribution drives reaching over 200 people per event.',
    color: 'rgba(239,83,80,0.08)',
    accent: '#ef5350',
    icon: '🍱',
  },
  {
    name: 'GreenKolkata Initiative',
    type: 'Urban Ecology',
    description: 'City-wide plantation drives and waste awareness campaigns.',
    color: 'rgba(38,198,218,0.08)',
    accent: '#26c6da',
    icon: '🌱',
  },
  {
    name: 'Srijan Foundation',
    type: 'Education',
    description: 'Stationery and book distribution drives for underprivileged students.',
    color: 'rgba(255,167,38,0.08)',
    accent: '#ffa726',
    icon: '📚',
  },
  {
    name: 'Asha Ki Kiran',
    type: 'Women Empowerment',
    description: 'Skill development workshops and hygiene kit distribution in underserved areas.',
    color: 'rgba(236,64,122,0.08)',
    accent: '#ec407a',
    icon: '💪',
  },
]

export default function Collaborations() {
  const [projectCount, setProjectCount] = useState<number | null>(null)

  useEffect(() => {
    supabase
      .from('welfare_projects')
      .select('id', { count: 'exact', head: true })
      .then(({ count }) => setProjectCount(count ?? 534))
  }, [])

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
            }}
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
            { value: '8+', label: 'Active Partners' },
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

      {/* Partners grid */}
      <section
        style={{
          padding: '0 64px 80px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {staticCollabs.map((collab, i) => (
            <motion.div
              key={collab.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                background: collab.color,
                border: `1px solid ${collab.accent}28`,
                borderRadius: '20px',
                padding: '28px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
              whileHover={{ y: -4 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${collab.accent}18`,
                    border: `1px solid ${collab.accent}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                  }}
                >
                  {collab.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#f7f5f0',
                      margin: '0 0 4px',
                    }}
                  >
                    {collab.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Neutral Face Bold', sans-serif",
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: collab.accent,
                      background: `${collab.accent}18`,
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {collab.type}
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "'Neutral Face Regular', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(247,245,240,0.6)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {collab.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Become a partner CTA */}
      <section
        style={{
          padding: '0 64px 120px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
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
              }}
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
          <Link
            to="/contact"
            style={{ textDecoration: 'none', flexShrink: 0 }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
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
