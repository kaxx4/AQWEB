import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const sections = [
  {
    id: 'what-is-aq',
    icon: '🌍',
    title: 'What is AquaTerra?',
    body: `AquaTerra is a youth-led NGO from Kolkata, founded in July 2021 from a WhatsApp group of 12 students. Today we run welfare drives, fundraising events, Sundarbans expeditions, educational workshops, dog-feeding drives, plantation drives, and more — all documented.

We've grown into a full student ecosystem with three in-house startups: ROOTS (limited-drop streetwear), ShikshAQ (free tutor matching), and AQ Ventures.

We are DARPAN certified and registered with the Government of India (AAFTT2300ME20251).`,
  },
  {
    id: 'roles',
    icon: '🧩',
    title: 'Roles & Departments',
    body: `AquaTerra has 10+ departments and no rigid hierarchy:

• Projects — Planning and executing welfare drives
• Events — Fundraising and cultural events (Disco Diwali, Paradox, Starry Night)
• Socials — Instagram, content creation, photography
• HR & Community — Onboarding, culture, member welfare
• Finance — Budgeting and transparency tracking
• Collaborations — Partner outreach, NGO relationships
• Website & Tech — The platform you're reading this on
• Education (ShikshAQ) — Free tutor matching for Kolkata students
• ROOTS — Streetwear brand running on mission proceeds
• Documentation — Recording every project for posterity

You don't apply to a specific department. You show up, contribute, and find your place.`,
  },
  {
    id: 'participation',
    icon: '⚡',
    title: 'How Participation Works',
    body: `AquaTerra is built on a simple principle: show up or step aside.

There are three tiers of engagement:

1. Community Member — Follow our work, attend open events, receive updates. No commitment needed.

2. Active Volunteer — You're in the team. You attend drives, contribute to departments, and build real relationships. This is where most of the magic happens.

3. Core Team — Extended responsibility. You lead drives, manage departments, represent AQ. Earn LoRs and Certificates here.

Progression isn't a ladder. It's earned by doing.`,
  },
  {
    id: 'lor',
    icon: '🏅',
    title: 'LoRs & Certificates',
    body: `We give out Letters of Recommendation and Certificates of Appreciation to volunteers who genuinely contribute.

To be eligible:
• Attend a minimum of 3 documented drives
• Contribute to at least one department or project
• Demonstrate ownership (not just attendance)

LoRs are written by the founding team and reflect real work. We don't issue them for participation trophies.

All certificates are signed and verifiable.`,
  },
  {
    id: 'culture',
    icon: '🤝',
    title: 'Culture & Values',
    body: `We are anti-performative. We are not a resume line item factory.

Our culture:
• Ownership over attendance
• Honesty over optics — if a drive was hard, we say so
• Meritocracy, not seniority
• Radical transparency in finances
• No gatekeeping — everyone knows what's happening
• Rest is respected — burnout culture is actively resisted

We don't do hierarchy for its own sake. The person with the best idea leads the project, regardless of their title.`,
  },
  {
    id: 'conduct',
    icon: '📋',
    title: 'Code of Conduct',
    body: `Basic expectations for all AquaTerra volunteers:

1. Show up when you say you will. If you can't, communicate early — no-shows without notice affect the team.

2. Treat beneficiaries with dignity. No photos of individuals without consent.

3. Be honest in documentation. If a project reached 50 people, say 50 — not 500.

4. Respect fellow volunteers across all backgrounds, colleges, and communities.

5. Social media posts about drives must follow our guidelines — tag @ngo.aquaterra and avoid misleading captions.

Violations are handled directly by the core team. Repeated misconduct results in removal from the programme.`,
  },
  {
    id: 'projects',
    icon: '📍',
    title: 'Types of Projects We Run',
    body: `In four years we've documented 534+ welfare drives. Here's what we do:

• Distribution Drives — Clothes, food, stationery to underserved communities
• Dog Feeding Drives — Late-night feeding runs for stray dogs across Kolkata
• Plantation Drives — Mangrove restoration and urban greening
• Educational Workshops — Skill workshops, career talks, and tutoring sessions
• Medical Camps — Free health checkups in partnership with medical professionals
• Sundarbans Expeditions — Relief work and environmental projects in the Sundarbans delta
• Fundraising Events — Large-scale events (Paradox, Disco Diwali, Starry Night) that fund the above

Every project is logged, photographed, and published.`,
  },
]

export default function VolunteerHandbook() {
  const [open, setOpen] = useState<string | null>('what-is-aq')

  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh', color: '#f7f5f0' }}>
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', paddingLeft: '64px', paddingRight: '64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#54d186', marginBottom: '16px' }}>
            Volunteer Resources
          </p>
          <h1 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-1.5px', color: '#f7f5f0', marginBottom: '20px', textWrap: 'balance' } as React.CSSProperties}>
            Volunteer Handbook
          </h1>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '19px', color: 'rgba(247,245,240,0.6)', lineHeight: 1.65, maxWidth: '520px', margin: '0 0 48px' }}>
            Everything you need to know to be a real part of this.
          </p>

          {/* CTA */}
          <Link to="/volunteer/apply" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #54d186, #4cb8d4)', color: '#0a0a0a', borderRadius: '39px', padding: '14px 32px', fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer', letterSpacing: '0.03em' }}>
              Apply to Volunteer →
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Accordion sections */}
      <section style={{ padding: '0 64px 120px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                background: open === section.id ? 'rgba(84,209,134,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${open === section.id ? 'rgba(84,209,134,0.2)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === section.id ? null : section.id)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{section.icon}</span>
                <span style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '18px', color: '#f7f5f0', flex: 1, letterSpacing: '-0.3px' }}>
                  {section.title}
                </span>
                <motion.span
                  animate={{ rotate: open === section.id ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-block', fontSize: '20px', color: open === section.id ? '#54d186' : 'rgba(247,245,240,0.4)', flexShrink: 0 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div style={{ padding: '0 32px 32px 72px' }}>
                      <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.7)', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-wrap' }}>
                        {section.body}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '80px', textAlign: 'center' }}
        >
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#f7f5f0', marginBottom: '16px', textWrap: 'balance' } as React.CSSProperties}>
            Ready to actually do something?
          </h2>
          <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: 'rgba(247,245,240,0.55)', marginBottom: '32px' }}>
            Takes less than 5 minutes. No fancy resume needed.
          </p>
          <Link to="/volunteer/apply" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #54d186, #4cb8d4)', color: '#0a0a0a', borderRadius: '39px', padding: '16px 40px', fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '16px', cursor: 'pointer', letterSpacing: '0.03em' }}>
              Apply Now →
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
