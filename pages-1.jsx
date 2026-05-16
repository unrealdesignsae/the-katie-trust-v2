// Pages: About, How We Work, Impact — Full Neuromorphic v2 UI

function AboutPage() {
  const values = [
    ['Truth.', 'We follow the facts wherever they lead, and we do not look away from what they reveal.'],
    ['Dignity.', 'Every family is treated with the respect their loss demands. There is no template for grief.'],
    ['Independence.', 'We accept no funding that compromises our work. Our findings belong to the families we serve.'],
    ['Reform.', 'Where systems have failed, we say so — clearly, calmly, and with evidence.'],
  ];
  return (
    <React.Fragment>
      <PageHero
        breadcrumb="About"
        eyebrow="About The Katie Trust"
        title="Founded in love. Sustained by purpose."
        lede="The Katie Trust was established in memory of Katie — a daughter, a sister, a friend — whose death raised questions that were not answered with the seriousness they deserved." />

      <section className="section">
        <div className="container-narrow">
          {/* Intro block */}
          <div className="neu-card anim-fade-up" style={{ marginBottom: 48 }}>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 18 }}>
              <strong style={{ color: 'var(--ink)' }}>This is not a standard charity.</strong> We were created because too many families, after the death of someone they loved, find themselves alone with their questions — facing institutions that close ranks and a system that moves on too quickly.
            </p>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              We exist to stand with those families. To listen first. To gather what is known. To ask, with care and persistence, the questions that have not yet been asked.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1400&q=85&auto=format&fit=crop"
            alt="Lady Justice statue — scales and sword against a clear blue sky"
            style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center top', borderRadius: 16, margin: '0 0 64px', display: 'block' }}
          />

          {/* Values */}
          <div className="eyebrow" style={{ marginBottom: 24 }}>Our values</div>
          <h2 style={{ marginBottom: 40 }}>What we stand for.</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {values.map(([h, b], i) => (
              <div key={i} className="neu-card anim-fade-up" style={{ animationDelay: `${i * 0.1}s`, display: 'grid', gridTemplateColumns: '4px 1fr', gap: 28, alignItems: 'start', padding: 32 }}>
                <div style={{ background: 'var(--primary)', borderRadius: 4, height: '100%', minHeight: 60, opacity: 0.7 }} />
                <div>
                  <h3 style={{ marginBottom: 8, color: 'var(--ink)', fontSize: '1.15rem' }}>{h}</h3>
                  <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>{b}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="neu-card-inset" style={{ marginTop: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ marginBottom: 6 }}>Ready to learn more?</h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>See how we work, or get in touch directly.</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="how-we-work" className="btn btn-primary">How we work</Link>
              <Link to="contact" className="btn btn-ghost">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

/* ── Process Accordion ── */
function ProcessAccordion({ steps }) {
  const [openId, setOpenId] = React.useState('01');

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto 0' }}>
      <style>{`
        .proc-item { border-top: 1px solid var(--line); }
        .proc-item:last-child { border-bottom: 1px solid var(--line); }

        .proc-trigger {
          width: 100%; text-align: left; background: none; border: none;
          cursor: pointer; padding: 0 0 0 24px;
          display: flex; align-items: flex-start; gap: 20px;
          transition: color 0.25s;
        }
        @media (min-width: 768px) { .proc-trigger { padding-left: 56px; } }

        .proc-trigger[data-open="false"] { color: var(--ink); opacity: 0.22; }
        .proc-trigger[data-open="false"]:hover { opacity: 0.45; }
        .proc-trigger[data-open="true"]  { color: var(--primary); opacity: 1; }

        .proc-num {
          font-size: 0.72rem; font-family: var(--sans); font-weight: 600;
          letter-spacing: 0.05em; color: var(--ink-muted);
          margin-top: 28px; flex-shrink: 0; min-width: 24px;
          transition: color 0.25s;
        }
        .proc-trigger[data-open="true"] .proc-num { color: var(--primary); }

        .proc-title {
          font-family: var(--serif);
          font-size: clamp(1.9rem, 4vw, 3.2rem);
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          line-height: 1.08;
          margin: 18px 0;
          transition: color 0.25s;
        }

        .proc-body-wrap {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.35s ease;
        }
        .proc-body-wrap[data-open="false"] { max-height: 0; opacity: 0; }
        .proc-body-wrap[data-open="true"]  { max-height: 300px; opacity: 1; }

        .proc-body {
          padding: 0 24px 28px 44px;
          font-family: var(--sans);
          font-size: 1rem;
          line-height: 1.75;
          color: var(--ink-soft);
          max-width: 680px;
        }
        @media (min-width: 768px) { .proc-body { padding-left: 80px; } }
      `}</style>

      {steps.map((s) => {
        const isOpen = openId === s.n;
        return (
          <div key={s.n} className="proc-item">
            <button
              className="proc-trigger"
              data-open={isOpen ? 'true' : 'false'}
              onClick={() => setOpenId(isOpen ? null : s.n)}
              aria-expanded={isOpen}
            >
              <span className="proc-num">{s.n}</span>
              <span className="proc-title">{s.t}</span>
            </button>

            <div className="proc-body-wrap" data-open={isOpen ? 'true' : 'false'}>
              <p className="proc-body">{s.b}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HowWeWorkPage() {
  const steps = [
    { n: '01', t: 'You reach out', b: 'A family member, a friend, or a professional makes contact through our referral form, by phone, or by post. There is no formal threshold to begin a conversation.' },
    { n: '02', t: 'We listen', b: 'A first conversation — by phone or in person, whichever suits — to understand the circumstances and what the family is hoping to find.' },
    { n: '03', t: 'We assess', b: 'A small panel reviews the case to determine whether independent review is appropriate, what form it should take, and what we can realistically achieve.' },
    { n: '04', t: 'We review', b: 'Where we proceed, we examine documents, request further records, and consult experts where needed. Families are kept informed at every stage.' },
    { n: '05', t: 'We report', b: 'We produce a clear, written account of our findings — for the family first, and for institutions, coroners, or others where appropriate.' },
    { n: '06', t: 'We continue', b: 'We do not disappear once a report is written. Where reform is needed, we keep pushing. Where the family wants quiet, we step back.' },
  ];
  return (
    <React.Fragment>
      <PageHero
        breadcrumb="How We Work"
        eyebrow="Our process"
        title="A clear path through a difficult time."
        lede="Our work is structured but never bureaucratic. Each family sets the pace — we walk alongside, not ahead." />

      <section className="section">
        <div className="container">
          <ProcessAccordion steps={steps} />

          {/* CTA */}
          <div className="neu-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginTop: 80 }}>
            <div>
              <h3 style={{ marginBottom: 6 }}>If you are unsure, please write anyway.</h3>
              <p style={{ color: 'var(--ink-soft)' }}>There is no wrong way to begin. We respond to every enquiry within 48 hours (excluding weekends and public holidays).</p>
            </div>
            <Link to="contact" className="btn btn-primary">Contact us</Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function ImpactPage() {
  const stats = [
    { n: '40+', l: 'Families supported since founding', icon: 'mdi:account-group-outline' },
    { n: '12',  l: 'Independent case reviews concluded', icon: 'mdi:file-check-outline' },
    { n: '4',   l: 'Policy submissions to government', icon: 'mdi:gavel' },
    { n: '7',   l: 'Procedural changes secured', icon: 'mdi:check-decagram-outline' },
  ];
  const stories = [
    { region: 'Yorkshire', year: '2025', quote: 'They listened when no one else would. For the first time in two years, I felt heard.', meta: 'Mother of an adult son' },
    { region: 'Cork', year: '2024', quote: 'The report was honest. It told the truth of what happened, and that was what we had been asking for all along.', meta: 'Sister of a young woman' },
    { region: 'Glasgow', year: '2024', quote: 'I cannot say what it meant to have someone treat our questions seriously, and gently.', meta: 'Father of a teenage daughter' },
  ];
  return (
    <React.Fragment>
      <PageHero
        breadcrumb="Impact"
        eyebrow="Impact & testimonials"
        title="The measure of our work is the families we serve."
        lede="We do not chase metrics. But because supporters and funders ask, here is what the work has produced — and what families have said about it." />

      <section className="section">
        <div className="container">
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 80 }} data-four-col>
            {stats.map((s, i) => (
              <div key={i} className="neu-stat anim-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="icon-box" style={{ margin: '0 auto 16px' }}>
                  <span className="iconify" data-icon={s.icon} />
                </div>
                <div className="neu-stat-num">{s.n}</div>
                <div className="neu-stat-label">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="eyebrow" style={{ marginBottom: 16 }}>Voices from families</div>
          <h2 style={{ marginBottom: 40 }}>What families have said.</h2>
          <div style={{ display: 'grid', gap: 24 }}>
            {stories.map((s, i) => (
              <div key={i} className="neu-card" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 40, alignItems: 'start' }} data-quote>
                <div className="neu-card-inset" style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: 4 }}>{s.region}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{s.year}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '3.5rem', color: 'var(--accent)', lineHeight: 0.7, marginBottom: 16, opacity: 0.7 }}>"</div>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', lineHeight: 1.55, fontWeight: 350, marginBottom: 18 }}>{s.quote}</p>
                  <div style={{ fontSize: '0.88rem', color: 'var(--ink-muted)' }}>— {s.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          [data-four-col] { grid-template-columns: 1fr 1fr !important; }
          [data-quote] { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          [data-four-col] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </React.Fragment>
  );
}

// Legacy HomePage (v1 fallback — not used in v2 router)
function HomePage() {
  const headline = window.__tweakHeadline || "For families with unanswered questions following a loved one's death.";
  return (
    <React.Fragment>
      <section style={{ padding: '80px 0 100px', background: 'var(--bg-warm)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }} data-hero-grid>
          <div>
            <div className="eyebrow">The Katie Trust</div>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)', marginBottom: 28 }}>{headline}</h1>
            <p style={{ fontSize: '1.18rem', color: 'var(--ink-soft)', maxWidth: 540, lineHeight: 1.6, marginBottom: 36 }}>
              We provide independent case reviews, advocacy, and quiet companionship — across the UK and Ireland — to families who deserve the truth.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="contact" className="btn btn-primary btn-lg">Refer a case</Link>
              <Link to="how-we-work" className="btn btn-ghost btn-lg">How we work</Link>
            </div>
          </div>
          <ImagePh label="Quiet landscape — soft light through trees" height={520} />
        </div>
      </section>
      <style>{`@media (max-width: 900px) { [data-hero-grid] { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </React.Fragment>
  );
}

Object.assign(window, { HomePage, AboutPage, HowWeWorkPage, ImpactPage });