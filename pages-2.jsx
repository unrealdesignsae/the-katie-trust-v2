// Pages: Team, Donate, Resources — Full Neuromorphic v3 UI

/* ── Inline SVG social icons ── */
function IconLinkedIn() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function IconTwitter() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

/* ── Photo card ── */
function TeamPhotoCard({ member, w, h, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  return (
    <div
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        width: w, height: h, borderRadius: 14, overflow: 'hidden', flexShrink: 0,
        cursor: 'pointer', transition: 'opacity 0.4s',
        opacity: isDimmed ? 0.45 : 1,
      }}
    >
      <img
        src={member.image} alt={member.name}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transition: 'filter 0.5s',
          filter: isActive ? 'grayscale(0) brightness(1.05)' : 'grayscale(1) brightness(0.72)',
        }}
      />
    </div>
  );
}

/* ── Member name row ── */
function TeamMemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social && Object.keys(member.social).length > 0;

  const socialIcons = {
    linkedin: <IconLinkedIn />,
    twitter:  <IconTwitter />,
    instagram: <IconInstagram />,
  };

  return (
    <div
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer', transition: 'opacity 0.3s', opacity: isDimmed ? 0.35 : 1 }}
    >
      {/* Name row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Indicator pill */}
        <div style={{
          height: 12, borderRadius: 6, flexShrink: 0,
          background: 'var(--ink)',
          width: isActive ? 20 : 16,
          opacity: isActive ? 1 : 0.25,
          transition: 'width 0.3s, opacity 0.3s',
        }} />
        <span style={{
          fontFamily: 'var(--sans)', fontSize: '1.2rem', fontWeight: 600,
          color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
          letterSpacing: '-0.01em', transition: 'color 0.3s',
          lineHeight: 1,
        }}>
          {member.name}
        </span>
        {/* Social icons — slide in on hover */}
        {hasSocial && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4, marginLeft: 2,
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'opacity 0.2s, transform 0.2s',
            pointerEvents: isActive ? 'auto' : 'none',
          }}>
            {Object.entries(member.social).map(([platform, href]) => (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={platform}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 5, borderRadius: 6,
                  color: 'var(--ink-muted)',
                  background: 'var(--surface)',
                  transition: 'color 0.15s, background 0.15s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-soft)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-muted)'; e.currentTarget.style.background = 'var(--surface)'; }}
              >
                {socialIcons[platform] || null}
              </a>
            ))}
          </div>
        )}
      </div>
      {/* Role */}
      <p style={{
        marginTop: 5, paddingLeft: 26,
        fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--ink-muted)', fontFamily: 'var(--sans)',
      }}>
        {member.role}
      </p>
    </div>
  );
}

/* ── TeamShowcase ── */
function TeamShowcase({ members }) {
  const [hoveredId, setHoveredId] = React.useState(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  /* Heights for each photo column — width is always 100% of its grid cell */
  const colDefs = [
    { items: col1, mt: 0,  h: 218 },
    { items: col2, mt: 60, h: 242 },
    { items: col3, mt: 28, h: 228 },
  ];

  return (
    /* Outer grid: 3 photo cols + 1 name col, all equal-ish fr — fills container */
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1.08fr 1.04fr 1.1fr',
      gap: 12,
      alignItems: 'start',
      width: '100%',
    }}>
      {/* Three photo columns */}
      {colDefs.map((col, ci) => (
        <div key={ci} style={{
          display: 'flex', flexDirection: 'column',
          gap: 10, marginTop: col.mt,
        }}>
          {col.items.map((m) => (
            <TeamPhotoCard
              key={m.id} member={m}
              w="100%" h={col.h}
              hoveredId={hoveredId} onHover={setHoveredId}
            />
          ))}
        </div>
      ))}

      {/* Name list — fourth column */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: 22, paddingTop: 12, paddingLeft: 20,
      }}>
        {members.map((m) => (
          <TeamMemberRow key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} />
        ))}
      </div>
    </div>
  );
}

function TeamPage() {
  const team = [
    { id: '1', name: 'Reece Anderson',   role: 'Founder & Director',    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=450&fit=crop', social: { linkedin: '#', twitter: '#' } },
    { id: '2', name: 'Dr. Helen Mawer',  role: 'Clinical Adviser',      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=450&fit=crop', social: { linkedin: '#' } },
    { id: '3', name: "James O'Connell",  role: 'Legal Adviser',         image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=450&fit=crop', social: { linkedin: '#', twitter: '#' } },
    { id: '4', name: 'Sarah Whyte',      role: 'Family Liaison Lead',   image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=450&fit=crop', social: { linkedin: '#', instagram: '#' } },
    { id: '5', name: 'Dr. Aisling Brennan', role: 'Research Lead',      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=450&fit=crop', social: { twitter: '#', linkedin: '#' } },
    { id: '6', name: 'Mark Henderson',   role: 'Trustee',               image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=450&fit=crop', social: { linkedin: '#' } },
  ];

  return (
    <React.Fragment>
      <PageHero
        breadcrumb="Our Team"
        eyebrow="Our team"
        title="A small team. Quietly experienced."
        lede="The work of the Trust is carried out by a small group of clinicians, lawyers, family-liaison practitioners, and trustees, supported by a network of expert advisers." />

      <section className="section">
        <div className="container">
          <TeamShowcase members={team} />

          {/* Advisory network */}
          <div style={{
            marginTop: 80,
            background: 'linear-gradient(135deg, #004a70 0%, #006090 100%)',
            color: 'white', borderRadius: 20,
            padding: 'clamp(40px, 6vw, 64px)',
            textAlign: 'center',
            boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>Advisory network</div>
            <h3 style={{ color: 'white', marginBottom: 12 }}>An advisory network of clinicians, lawyers and academics.</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.7 }}>
              We draw on specialist advisers across medicine, law, and public policy as cases require — at no cost to families.
            </p>
            <Link to="contact" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 600 }}>Join our network →</Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}



function DonatePage() {
  const [amount, setAmount] = React.useState(50);
  const [monthly, setMonthly] = React.useState(true);
  const presets = [25, 50, 100, 250];
  const costs = [
    { amt: '£25', what: 'A morning of family-liaison phone support' },
    { amt: '£100', what: 'A medical-record request and initial review' },
    { amt: '£500', what: 'A specialist clinical opinion on a complex case' },
    { amt: '£2,500', what: 'A full independent case review, end to end' },
  ];

  return (
    <React.Fragment>
      <PageHero
        breadcrumb="Support / Donate"
        eyebrow="Support our work"
        title="Every donation helps a family find an answer."
        lede="The Katie Trust is funded entirely by donations. We accept no funding that compromises our independence — which makes us reliant on people who believe families deserve the truth." />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'start' }} data-donate-grid>

            {/* Donation form */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Make a donation</div>
              <h2 style={{ marginBottom: 24 }}>Give what you can.</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: 32, lineHeight: 1.7 }}>
                Donations are processed securely via Stripe. We are notified immediately, and you will receive a receipt by email.
              </p>

              <div className="neu-card" style={{ padding: 36 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Choose an amount</div>
                {/* Preset buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 18 }}>
                  {presets.map((p) => (
                    <button key={p} onClick={() => setAmount(p)} style={{
                      padding: '14px 8px',
                      border: 'none',
                      borderRadius: 10,
                      background: amount === p ? 'linear-gradient(135deg, #006090, #004a70)' : 'var(--bg)',
                      boxShadow: amount === p
                        ? '4px 6px 14px rgba(0,0,0,0.28)'
                        : 'var(--neu-shadow-sm)',
                      fontWeight: 600, fontSize: '1rem',
                      color: amount === p ? 'white' : 'var(--ink)',
                      fontFamily: 'var(--serif)',
                      transition: 'all .2s',
                      cursor: 'pointer',
                    }}>£{p}</button>
                  ))}
                </div>
                {/* Custom amount */}
                <div className="field" style={{ marginBottom: 18 }}>
                  <label>Custom amount (£)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                    min="1"
                  />
                </div>
                {/* Monthly toggle */}
                <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <NeuToggle label="Make this a monthly gift" value={monthly} onChange={setMonthly} />
                </div>
                <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  <span className="iconify" data-icon="mdi:credit-card-outline" style={{ fontSize: 18 }} />
                  Donate £{amount}{monthly ? '/month' : ''} via Stripe →
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: 12 }}>
                  Secured by Stripe · UK Gift Aid eligible
                </div>
              </div>

              {/* GoFundMe alternative */}
              <div className="neu-card-inset" style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <strong>Prefer GoFundMe?</strong>
                  <div style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', marginTop: 2 }}>Some supporters prefer the GoFundMe platform.</div>
                </div>
                <a href="#" className="btn btn-ghost btn-sm">Donate via GoFundMe →</a>
              </div>
            </div>

            {/* What your gift makes possible */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Your gift in action</div>
              <h2 style={{ marginBottom: 32 }}>What your gift makes possible.</h2>
              <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {costs.map((c, i) => (
                  <div key={i} className="neu-card" style={{ padding: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{
                      flexShrink: 0,
                      fontFamily: 'var(--serif)', fontSize: '1.6rem', color: 'var(--primary)',
                      minWidth: 80,
                    }}>{c.amt}</div>
                    <div style={{ color: 'var(--ink-soft)', lineHeight: 1.55, fontSize: '0.94rem' }}>{c.what}</div>
                  </div>
                ))}
              </div>

              {/* Membership */}
              <div className="neu-card" style={{
                background: 'linear-gradient(135deg, var(--accent-soft), var(--primary-soft))',
                border: '1px solid rgba(56, 182, 232, 0.2)',
              }}>
                <div className="icon-box icon-box--accent" style={{ marginBottom: 16 }}>
                  <span className="iconify" data-icon="mdi:star-circle-outline" />
                </div>
                <h4 style={{ marginBottom: 10 }}>Become a Katie Trust Member</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', marginBottom: 18, lineHeight: 1.65 }}>
                  From £8/month, members receive case insights, policy briefings, and access to our quarterly newsletter. Members fund the long-term stability of the Trust.
                </p>
                <a href="#" className="btn btn-accent btn-sm">Join from £8/month</a>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 10 }}>Coming soon — register your interest</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { [data-donate-grid] { grid-template-columns: 1fr !important; } }`}</style>
    </React.Fragment>
  );
}

function ResourcesPage() {
  const [open, setOpen] = React.useState(0);
  const faqs = [
    { q: 'Who can refer a case to the Katie Trust?', a: 'Anyone — a family member, a friend, a coroner, a solicitor, a clinician, a family liaison officer. There is no formal threshold to begin a conversation. We will assess together whether independent review is appropriate.' },
    { q: 'Is there a cost to families?', a: 'No. Our work is free to families and funded entirely by donations and grants. We accept no funding that would compromise our independence.' },
    { q: 'How long does a case review take?', a: 'It depends on the complexity. A typical review takes between three and nine months. We keep families informed at every stage and never rush a finding.' },
    { q: 'Will my information be kept confidential?', a: 'Yes. Information is held securely, accessed only by named team members, and never shared without your consent. Our full confidentiality statement is in the footer.' },
    { q: 'Do you replace official inquests or investigations?', a: 'No. We are independent and complementary. Our reviews can sit alongside coronial proceedings and may be useful to them, but we are not a substitute for the official process.' },
    { q: "Can professionals refer cases on a family's behalf?", a: "Yes — with the family's informed consent. The contact form has a 'New Case Referral' option that flags your enquiry to the right team." },
    { q: 'How is the Trust governed?', a: 'A board of trustees with a mix of legal, clinical, and lived-experience backgrounds. Annual reports and accounts are published in the Resources section once registration is finalised.' },
    { q: 'How can I support the Trust?', a: 'You can donate, become a member, fundraise on our behalf, or share our work. See the Support / Donate page for the full range.' },
  ];
  const downloads = [
    { t: 'What to expect from us', s: 'A short PDF for families considering referral. 6 pages.', icon: 'mdi:file-document-outline' },
    { t: 'Information for professionals', s: 'Briefing for coroners, solicitors, and clinicians. 8 pages.', icon: 'mdi:briefcase-outline' },
    { t: 'Annual report 2025', s: 'Casework, finances, and outlook. Published March 2026.', icon: 'mdi:chart-bar' },
    { t: 'Confidentiality statement', s: 'How we hold and protect your information.', icon: 'mdi:shield-lock-outline' },
  ];

  return (
    <React.Fragment>
      <PageHero
        breadcrumb="Resources / FAQs"
        eyebrow="Resources & FAQs"
        title="Things you might want to know — and things to take with you."
        lede="Plain-language answers to the questions families and professionals ask most often, alongside documents you may want to download or share." />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start' }} data-res-grid>

            {/* FAQ accordion */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Frequently asked questions</div>
              <h2 style={{ marginBottom: 32 }}>Common questions.</h2>
              <div className="neu-card" style={{ padding: 0, overflow: 'hidden' }}>
                {faqs.map((f, i) => (
                  <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                    <button
                      onClick={() => setOpen(open === i ? -1 : i)}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '22px 28px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
                        fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 400,
                        background: open === i ? 'var(--surface)' : 'transparent',
                        transition: 'background .2s',
                      }}
                    >
                      <span>{f.q}</span>
                      <div style={{
                        flexShrink: 0, width: 28, height: 28, borderRadius: 8,
                        background: open === i ? 'var(--primary)' : 'var(--bg)',
                        boxShadow: 'var(--neu-shadow-sm)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: open === i ? 'white' : 'var(--primary)',
                        transition: 'all .2s',
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block', transition: 'transform .2s', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                          <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                    </button>
                    {open === i && (
                      <div style={{
                        padding: '0 28px 24px',
                        color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '0.96rem',
                        background: 'var(--surface)',
                      }}>
                        {f.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Downloads + help */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Documents</div>
              <h2 style={{ marginBottom: 32, fontSize: '1.8rem' }}>Downloads</h2>
              <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {downloads.map((d, i) => (
                  <a key={i} href="#" style={{ textDecoration: 'none' }}>
                    <div className="neu-card" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center', transition: 'all .2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div className="icon-box">
                        <span className="iconify" data-icon={d.icon} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 2, fontSize: '0.95rem' }}>{d.t}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{d.s}</div>
                      </div>
                      <span className="iconify" data-icon="mdi:download" style={{ fontSize: 18, color: 'var(--primary)', flexShrink: 0 }} />
                    </div>
                  </a>
                ))}
              </div>

              {/* Need to talk */}
              <div className="neu-card" style={{ background: 'linear-gradient(135deg, var(--primary-soft), var(--bg))' }}>
                <div className="icon-box" style={{ marginBottom: 14 }}>
                  <span className="iconify" data-icon="mdi:chat-outline" />
                </div>
                <h4 style={{ marginBottom: 8 }}>Need to talk?</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', marginBottom: 18, lineHeight: 1.65 }}>
                  If your question isn't here, we are happy to help by phone or email.
                </p>
                <Link to="contact" className="btn btn-primary btn-sm">Get in touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { [data-res-grid] { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </React.Fragment>
  );
}

Object.assign(window, { TeamPage, DonatePage, ResourcesPage });