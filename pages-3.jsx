// Pages: News, Contact, Submissions — Full Neuromorphic v2 UI

function NewsPage() {
  const posts = [
    { cat: 'Policy', date: '12 March 2026', title: 'Submission to the Justice Select Committee on coronial reform', excerpt: 'Our written evidence on delays in coronial process and the disproportionate burden these place on bereaved families.', read: '8 min read' },
    { cat: 'Casework', date: '02 February 2026', title: 'Independent review of unexplained hospital death concludes', excerpt: 'A six-month review concluded this week, with the family choosing to publish the executive summary alongside the Trust.', read: '5 min read' },
    { cat: 'News', date: '18 January 2026', title: 'The Katie Trust appoints new clinical adviser', excerpt: 'Dr Helen Mawer joins the Trust as Clinical Adviser, bringing twenty years of experience in emergency medicine.', read: '3 min read' },
    { cat: 'Reflection', date: '04 December 2025', title: 'On listening: a note for the year\'s end', excerpt: 'A short piece from our Family Liaison Lead on what we have learned about being present, in 2025.', read: '4 min read' },
    { cat: 'Casework', date: '21 November 2025', title: 'Three-year review reaches conclusion in Cork', excerpt: 'After a long and complex review, our findings have been delivered to the family. The matter now passes to them.', read: '6 min read' },
  ];
  const [filter, setFilter] = React.useState('All');
  const cats = ['All', 'Casework', 'Policy', 'News', 'Reflection'];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.cat === filter);

  const catColors = {
    Policy: 'var(--primary)',
    Casework: 'var(--primary)',
    News: '#5a7a9a',
    Reflection: '#7a6090',
  };

  return (
    <React.Fragment>
      <PageHero breadcrumb="News" eyebrow="News & blog" title="Casework, policy, and reflections from the Trust." lede="A slow, considered cadence — we publish when there is something worth saying. Subscribe to receive new posts directly." />
      <section className="section">
        <div className="container">

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: '9px 18px', borderRadius: 100, fontSize: '0.86rem', fontWeight: 600,
                border: 'none', cursor: 'pointer', transition: 'all .2s',
                background: filter === c ? 'linear-gradient(135deg, #006090, #004a70)' : 'var(--bg)',
                color: filter === c ? 'white' : 'var(--ink-soft)',
                boxShadow: filter === c
                  ? '4px 6px 14px rgba(0,0,0,0.28)'
                  : 'var(--neu-shadow-sm)',
              }}>{c}</button>
            ))}
          </div>

          {/* Post list */}
          <div style={{ display: 'grid', gap: 16 }}>
            {filtered.map((p, i) => (
              <a key={i} href="#" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="neu-card anim-fade-up" style={{
                  animationDelay: `${i * 0.07}s`,
                  display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 32, alignItems: 'start',
                  padding: 28,
                }} data-post
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div>
                    <div style={{
                      display: 'inline-block', padding: '3px 10px', borderRadius: 100,
                      fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: `color-mix(in srgb, ${catColors[p.cat] || 'var(--primary)'} 12%, transparent)`,
                      color: catColors[p.cat] || 'var(--primary)',
                      marginBottom: 8,
                    }}>{p.cat}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 500 }}>{p.date}</div>
                  </div>
                  <div>
                    <h3 style={{ marginBottom: 8, fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 500, color: 'var(--ink)' }}>{p.title}</h3>
                    <p style={{ color: 'var(--ink-soft)', maxWidth: 620, fontSize: '0.94rem', lineHeight: 1.65 }}>{p.excerpt}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: 10 }}>{p.read}</div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.86rem',
                      fontWeight: 600, color: 'var(--primary)',
                    }}>
                      Read
                      <span className="iconify" data-icon="mdi:arrow-right" style={{ fontSize: 14 }} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="neu-card" style={{
            marginTop: 80,
            background: 'linear-gradient(135deg, var(--primary-soft), var(--bg))',
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'center',
          }} data-news-cta>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Stay informed</div>
              <h3 style={{ marginBottom: 8 }}>Quarterly newsletter</h3>
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>Casework summaries, policy briefings, and a quiet word from the team. Four times a year, no more.</p>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={(e) => e.preventDefault()}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Your email address</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span className="iconify" data-icon="mdi:email-outline" style={{ fontSize: 16 }} />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 800px) {
          [data-post] { grid-template-columns: 1fr !important; gap: 16px !important; }
          [data-news-cta] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </React.Fragment>
  );
}

function ContactPage() {
  const [form, setForm] = React.useState({ type: 'New Case Referral', name: '', email: '', phone: '', message: '', consent: false });
  const [submitted, setSubmitted] = React.useState(false);
  const update = (k, v) => setForm({ ...form, [k]: v });
  const onSubmit = (e) => { e.preventDefault(); if (form.consent) setSubmitted(true); };

  if (submitted) {
    return (
      <React.Fragment>
        <PageHero breadcrumb="Contact" eyebrow="Thank you" title="Your message has reached us." lede="A confirmation has been sent to your email. We respond to every enquiry within 48 hours, excluding weekends and public holidays." />
        <section className="section">
          <div className="container-narrow">
            <div className="neu-card" style={{ marginBottom: 32 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--bg)',
                boxShadow: 'var(--neu-shadow)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <span className="iconify" data-icon="mdi:check-circle-outline" style={{ fontSize: 28, color: 'var(--primary)' }} />
              </div>
              <h3 style={{ marginBottom: 16 }}>What happens next</h3>
              <ol style={{ paddingLeft: 20, color: 'var(--ink-soft)', lineHeight: 1.9 }}>
                <li style={{ marginBottom: 8 }}>Your message arrives at the appropriate shared inbox (referrals / general / press).</li>
                <li style={{ marginBottom: 8 }}>One of our team is assigned to reply. You will hear from one person, not several.</li>
                <li>For new case referrals, the first reply will arrange a phone or in-person conversation at a time that suits you.</li>
              </ol>
            </div>
            <Link to="home" className="btn btn-ghost">← Back to home</Link>
          </div>
        </section>
      </React.Fragment>
    );
  }

  const contacts = [
    { l: 'Referrals', d: 'referrals@thekatietrust.org', n: 'For new case enquiries', icon: 'mdi:folder-account-outline' },
    { l: 'General', d: 'hello@thekatietrust.org', n: 'For all other questions', icon: 'mdi:email-outline' },
    { l: 'Press & media', d: 'press@thekatietrust.org', n: 'For journalists and media', icon: 'mdi:newspaper-variant-outline' },
    { l: 'By post', d: 'The Katie Trust\nPO Box [tbc]\nUnited Kingdom', n: 'For confidential correspondence', icon: 'mdi:mailbox-outline' },
  ];

  return (
    <React.Fragment>
      <PageHero breadcrumb="Contact" eyebrow="Contact us" title="However you choose to begin, we will be here." lede="If you are unsure, please write anyway. There is no wrong way to make first contact." />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start' }} data-contact-grid>

            {/* Contact form — neuromorphic */}
            <div className="neu-card" style={{ padding: 40 }}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Send us a message</div>
              <form onSubmit={onSubmit}>
                <div className="field">
                  <label>What is this about? *</label>
                  <select value={form.type} onChange={e => update('type', e.target.value)} required>
                    <option>New Case Referral</option>
                    <option>General Enquiry</option>
                    <option>Press / Media</option>
                  </select>
                  {form.type && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--primary)', marginTop: 8, fontWeight: 500 }}>
                      {form.type === 'New Case Referral' && '→ Routed to our family liaison team.'}
                      {form.type === 'General Enquiry' && '→ Routed to our general inbox.'}
                      {form.type === 'Press / Media' && '→ Routed to our communications lead.'}
                    </div>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} data-name-row>
                  <div className="field"><label>Your name *</label><input type="text" required value={form.name} onChange={e => update('name', e.target.value)} /></div>
                  <div className="field"><label>Email *</label><input type="email" required value={form.email} onChange={e => update('email', e.target.value)} /></div>
                </div>
                <div className="field"><label>Phone (optional)</label><input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
                <div className="field">
                  <label>Your message *</label>
                  <textarea
                    required
                    placeholder={form.type === 'New Case Referral'
                      ? "Please share whatever feels right. You don't need formal information — names, circumstances, what you are hoping for. We will follow up with a phone call."
                      : 'How can we help?'}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    style={{ minHeight: 160 }}
                  />
                </div>
                <NeuCheckbox
                  value={form.consent}
                  onChange={(v) => update('consent', v)}
                  label={
                    <span>I have read the <a href="#/privacy">Privacy Notice</a> and consent to The Katie Trust holding my information for the purpose of responding to this enquiry.</span>
                  }
                />

                <div className="neu-card-inset" style={{ marginBottom: 24, fontSize: '0.83rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>
                  <span className="iconify" data-icon="mdi:shield-check-outline" style={{ fontSize: 14, color: 'var(--primary)', verticalAlign: 'middle', marginRight: 4 }} />
                  Sent to a secure shared inbox. One named team member will reply. Response within 48 hours (excl. weekends & public holidays).
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  <span className="iconify" data-icon="mdi:send-outline" style={{ fontSize: 18 }} />
                  Send message
                </button>
              </form>
            </div>

            {/* Contact details */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Other ways to reach us</div>
              <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {contacts.map((c, i) => (
                  <div key={i} className="neu-card" style={{ padding: 22, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                      background: 'var(--primary-soft)', boxShadow: 'var(--neu-shadow-sm)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span className="iconify" data-icon={c.icon} style={{ fontSize: 20, color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>{c.l}</div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', whiteSpace: 'pre-line', marginBottom: 2, color: 'var(--ink)' }}>{c.d}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{c.n}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Crisis notice */}
              <div className="neu-card" style={{ background: 'linear-gradient(135deg, var(--primary-soft), var(--bg))', border: '1px solid rgba(56,182,232,0.15)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--primary-soft)', boxShadow: 'var(--neu-shadow-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <span className="iconify" data-icon="mdi:alert-circle-outline" style={{ fontSize: 20, color: 'var(--primary)' }} />
                </div>
                <h4 style={{ marginBottom: 8, color: 'var(--ink)' }}>If you are in immediate distress</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
                  The Katie Trust is not a crisis service. If you need urgent help, please call <strong>Samaritans on 116 123</strong> (UK & ROI), free, 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) { [data-contact-grid] { grid-template-columns: 1fr !important; } }
        @media (max-width: 500px) { [data-name-row] { grid-template-columns: 1fr !important; } }
      `}</style>
    </React.Fragment>
  );
}

function SubmissionsPage() {
  const subs = [
    { date: 'March 2026', to: 'Justice Select Committee', t: 'Written evidence on coronial reform', tag: 'Active' },
    { date: 'November 2025', to: 'Department of Health', t: 'Response to consultation on patient safety reporting', tag: 'Concluded' },
    { date: 'July 2025', to: 'Chief Coroner of England & Wales', t: 'Submission on Prevention of Future Death reports', tag: 'Concluded' },
    { date: 'April 2025', to: 'Oireachtas Justice Committee', t: 'Briefing on family rights in Irish coronial process', tag: 'Concluded' },
  ];

  const priorities = [
    'Reform of coronial process to reduce delay and improve family communication.',
    'Improved transparency in hospital and care-setting deaths.',
    'Mandatory family-liaison standards across health and justice settings.',
    'Evidence-based duty of candour, consistently applied.',
  ];

  return (
    <React.Fragment>
      <PageHero breadcrumb="Submissions / Policy Work" eyebrow="Submissions & policy work" title="Where systems have failed, we say so — clearly, calmly, with evidence." lede="The Trust contributes to consultations, inquiries, and reviews where our casework has produced lessons for the wider system. Our submissions are public unless restricted by the receiving body." />
      <section className="section">
        <div className="container">

          <div className="eyebrow" style={{ marginBottom: 24 }}>Recent submissions</div>
          <h2 style={{ marginBottom: 32 }}>Our submissions.</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 80 }}>
            {subs.map((s, i) => (
              <a key={i} href="#" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="neu-card anim-fade-up" style={{
                  animationDelay: `${i * 0.07}s`,
                  padding: 28, display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ minWidth: 120 }}>
                    <div style={{ fontFamily: 'var(--serif)', color: 'var(--primary)', fontSize: '1rem', fontWeight: 500 }}>{s.date}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', marginBottom: 4, color: 'var(--ink)' }}>{s.t}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>To: {s.to}</div>
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block', padding: '5px 14px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600,
                      background: s.tag === 'Active'
                        ? 'linear-gradient(135deg, rgba(56,182,232,0.15), rgba(56,182,232,0.08))'
                        : 'var(--primary-soft)',
                      color: s.tag === 'Active' ? 'var(--primary)' : 'var(--primary)',
                      border: `1px solid ${s.tag === 'Active' ? 'rgba(56,182,232,0.25)' : 'rgba(0,96,144,0.15)'}`,
                    }}>{s.tag}</span>
                  </div>
                  <div>
                    <span className="iconify" data-icon="mdi:download" style={{ fontSize: 20, color: 'var(--primary)' }} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Policy priorities + CTA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} data-policy-grid>
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>What we're working on</div>
              <h2 style={{ marginBottom: 32 }}>Our policy priorities.</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                {priorities.map((p, i) => (
                  <div key={i} className="neu-card" style={{ padding: 22, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0, width: 36, height: 36, borderRadius: 10,
                      background: 'var(--bg)',
                      boxShadow: 'var(--neu-shadow-sm)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span className="iconify" data-icon="mdi:check" style={{ fontSize: 18, color: 'var(--primary)' }} />
                    </div>
                    <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.95rem' }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* CTA card */}
              <div className="neu-card" style={{
                background: 'linear-gradient(135deg, #004a70 0%, #006090 100%)',
                color: 'white', padding: 'clamp(32px, 5vw, 48px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -60, right: -60,
                  width: 220, height: 220, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(56,182,232,0.10) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <span className="iconify" data-icon="mdi:gavel" style={{ fontSize: 24, color: 'white' }} />
                </div>
                <h3 style={{ color: 'white', marginBottom: 14 }}>Working on a review or inquiry?</h3>
                <p style={{ color: 'rgba(255,255,255,0.82)', marginBottom: 28, lineHeight: 1.7 }}>
                  If you are an official body conducting a review or inquiry where our casework experience may be useful, we are glad to engage.
                </p>
                <Link to="contact" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 600 }}>
                  <span className="iconify" data-icon="mdi:arrow-right" style={{ fontSize: 16 }} />
                  Contact our policy lead
                </Link>
              </div>

              {/* Annual reports note */}
              <div className="neu-card-inset" style={{ marginTop: 16 }}>
                <span className="iconify" data-icon="mdi:information-outline" style={{ fontSize: 16, color: 'var(--primary)', verticalAlign: 'middle', marginRight: 6 }} />
                <span style={{ fontSize: '0.88rem', color: 'var(--ink-muted)' }}>Annual reports and accounts are published in the <Link to="resources">Resources section</Link> once Trust registration is finalised.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 800px) {
          [data-policy-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </React.Fragment>
  );
}

Object.assign(window, { NewsPage, ContactPage, SubmissionsPage });
