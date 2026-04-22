import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const impactCells = [
  { number: '3,500+', label: 'Kids educated', sub: 'educational workshops', photo: 1 },
  { number: '4,000+', label: 'Saplings planted', sub: 'across drives', photo: 2 },
  { number: '1,600+', label: 'Medical checkups', sub: 'free health camps', photo: 3 },
  { number: '1,500+', label: 'Dogs fed', sub: 'stray animal welfare', photo: 4 },
  { number: '2,500+', label: 'Event attendees', sub: 'across fundraisers', photo: 5 },
  { number: '534+', label: 'Projects', sub: 'documented welfare drives', photo: 6 },
]

const fundBreakdown = [
  { label: 'Field Drives', pct: 60, desc: 'Transport, materials, supplies for on-ground welfare drives', color: '#54d186' },
  { label: 'Materials', pct: 25, desc: 'Food, clothes, stationery, medical supplies distributed', color: '#4cb8d4' },
  { label: 'Platform & Ops', pct: 15, desc: 'Website, documentation, event infrastructure', color: '#ffb74d' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

export default function SupportUs() {
  return (
    <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", background: '#0a0a0a', minHeight: '100vh', color: '#f7f5f0' }}>
      <Nav />

      {/* ── Hero ── */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', paddingLeft: '64px', paddingRight: '64px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <motion.p variants={itemVariant}
            style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#54d186', marginBottom: '20px' }}
          >
            Support AquaTerra
          </motion.p>
          <motion.h1 variants={itemVariant}
            style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.05, letterSpacing: '-1.5px', color: '#f7f5f0', marginBottom: '24px', textWrap: 'balance' } as React.CSSProperties}
          >
            Help us do more.
          </motion.h1>
          <motion.p variants={itemVariant}
            style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '18px', color: 'rgba(247,245,240,0.6)', lineHeight: 1.7, maxWidth: '560px', margin: 0 }}
          >
            We're honest about this: NGO work costs money. Transport, supplies, food, materials. Without support, some of our most impactful drives simply don't happen. Here's how you can change that.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Two support tracks ── */}
      <section style={{ padding: '0 64px 80px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Cash sponsorship */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(84,209,134,0.06)',
            border: '1px solid rgba(84,209,134,0.2)',
            borderRadius: '24px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: '40px' }}>💸</div>
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '28px', color: '#f7f5f0', margin: 0, letterSpacing: '-0.5px', textWrap: 'balance' } as React.CSSProperties}>
            Cash Sponsorships
          </h2>
          <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.65)', lineHeight: '1.7', margin: 0 }}>
            One-time or recurring contributions that fund specific drives. Your money goes directly to field operations — no admin bloat, no bureaucracy.
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Fund a distribution drive', 'Sponsor a Sundarbans expedition', 'Cover a workshop for 30 kids', 'Support animal welfare feeds'].map(item => (
              <li key={item} style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px', color: 'rgba(247,245,240,0.6)' }}>
                {item}
              </li>
            ))}
          </ul>
          <a href="mailto:ngo.aquaterra@gmail.com?subject=Cash Sponsorship Inquiry" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: '#54d186',
                color: '#0a0a0a',
                borderRadius: '12px',
                padding: '14px 24px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Reach Out to Sponsor →
            </motion.div>
          </a>
        </motion.div>

        {/* In-kind contributions */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: 'rgba(76,184,212,0.06)',
            border: '1px solid rgba(76,184,212,0.2)',
            borderRadius: '24px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: '40px' }}>📦</div>
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '28px', color: '#f7f5f0', margin: 0, letterSpacing: '-0.5px', textWrap: 'balance' } as React.CSSProperties}>
            In-Kind Contributions
          </h2>
          <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '15px', color: 'rgba(247,245,240,0.65)', lineHeight: '1.7', margin: 0 }}>
            Goods, services, or expertise that power our drives. Clothes, stationery, food, design support, printing — all of it helps.
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Clothes for distribution drives', 'Stationery for workshops', 'Food for feeding drives', 'Professional services & skills'].map(item => (
              <li key={item} style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px', color: 'rgba(247,245,240,0.6)' }}>
                {item}
              </li>
            ))}
          </ul>
          <a href="mailto:ngo.aquaterra@gmail.com?subject=In-Kind Contribution Inquiry" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: '#4cb8d4',
                color: '#0a0a0a',
                borderRadius: '12px',
                padding: '14px 24px',
                fontFamily: "'Neutral Face Bold', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Reach Out to Contribute →
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* ── Impact bento ── */}
      <section style={{ padding: '0 64px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '40px' }}
        >
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#f7f5f0', margin: '0 0 12px', textWrap: 'balance' } as React.CSSProperties}>
            What your support actually does
          </h2>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '17px', color: 'rgba(247,245,240,0.4)', margin: 0 }}>
            Real numbers. Real impact.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {impactCells.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              <img
                src={`/images/initiative-${((i * 7 + 1) % 43) + 1}.png`}
                alt={cell.label}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 100%)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '44px', color: '#f7f5f0', lineHeight: 1, letterSpacing: '-1px', marginBottom: '4px', fontVariantNumeric: 'tabular-nums' }}>
                  {cell.number}
                </div>
                <div style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '15px', color: '#f7f5f0', marginBottom: '2px' }}>
                  {cell.label}
                </div>
                <div style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '12px', color: 'rgba(247,245,240,0.55)' }}>
                  {cell.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Transparent use of funds ── */}
      <section style={{ padding: '0 64px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '28px',
            padding: '56px 64px',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '28px', color: '#f7f5f0', margin: '0 0 8px', textWrap: 'balance' } as React.CSSProperties}>
            Where the money actually goes
          </h2>
          <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '14px', color: 'rgba(247,245,240,0.45)', margin: '0 0 40px' }}>
            No vague "overhead" line items. Here's the breakdown.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {fundBreakdown.map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <div>
                    <span style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '16px', color: '#f7f5f0', marginRight: '12px' }}>{item.label}</span>
                    <span style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '13px', color: 'rgba(247,245,240,0.45)' }}>{item.desc}</span>
                  </div>
                  <span style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontSize: '20px', color: item.color, fontVariantNumeric: 'tabular-nums', flexShrink: 0, marginLeft: '16px' }}>
                    {item.pct}%
                  </span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ height: '100%', background: item.color, borderRadius: '3px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '0 64px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#f7f5f0', marginBottom: '16px', textWrap: 'balance' } as React.CSSProperties}>
            Ready to make it count?
          </h2>
          <p style={{ fontFamily: "'Neutral Face Regular', sans-serif", fontSize: '16px', color: 'rgba(247,245,240,0.55)', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 32px' }}>
            Email us or fill in the contact form and mention "Support" in your message.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:ngo.aquaterra@gmail.com?subject=Support AquaTerra" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                style={{ background: 'linear-gradient(135deg, #54d186, #4cb8d4)', color: '#0a0a0a', borderRadius: '39px', padding: '14px 32px', fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
              >
                Email Us →
              </motion.div>
            </a>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                style={{ background: 'rgba(255,255,255,0.08)', color: '#f7f5f0', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '39px', padding: '14px 32px', fontFamily: "'Neutral Face Bold', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
              >
                Contact Form
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
