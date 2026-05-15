// Katie Trust v2 — Neuromorphic HomePage
// Neuromorphic components: Hero, Feature Cards, Stats, Mission Band, Process Stepper, Testimonial, Donate CTA

function NeuFeatureCard({ eyebrow, title, body, cta, to, icon, delay = 0 }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="neu-card anim-fade-up"
      style={{ animationDelay: `${delay}s`, position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon badge */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: hovered ? 'var(--primary-soft)' : 'var(--bg)',
        boxShadow: 'var(--neu-shadow-sm)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
        transition: 'all .25s',
      }}>
        <span className="iconify" data-icon={icon} style={{ fontSize: 22, color: 'var(--primary)' }} />
      </div>
      <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>
      <h3 style={{ marginBottom: 14, minHeight: 80, fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 28, fontSize: '0.95rem', lineHeight: 1.65 }}>{body}</p>
      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, var(--primary-soft), transparent)', margin: '0 0 20px' }} />
      <Link to={to} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)',
        transition: 'gap .2s',
      }}>
        {cta}
        <span className="iconify" data-icon="mdi:arrow-right" style={{ fontSize: 16 }} />
      </Link>
      {/* Accent corner dot */}
      <div style={{
        position: 'absolute', top: 24, right: 24,
        width: 10, height: 10, borderRadius: '50%',
        background: 'var(--accent)',
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity .25s',
      }} />
    </div>
  );
}

function NeuStatCard({ num, label, icon, delay = 0 }) {
  return (
    <div className="neu-stat anim-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: 'var(--primary-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
        boxShadow: 'var(--neu-shadow-sm)',
      }}>
        <span className="iconify" data-icon={icon} style={{ fontSize: 20, color: 'var(--primary)' }} />
      </div>
      <div className="neu-stat-num">{num}</div>
      <div className="neu-stat-label">{label}</div>
    </div>
  );
}

function NeuProcessStep({ num, title, body, isLast }) {
  return (
    <div style={{ display: 'flex', gap: 24, position: 'relative' }}>
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: 'absolute', left: 27, top: 56, bottom: -24,
          width: 2,
          background: 'linear-gradient(to bottom, var(--primary-soft), transparent)',
        }} />
      )}
      {/* Step badge */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--bg)',
          boxShadow: 'var(--neu-shadow)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--serif)',
          fontSize: '1.1rem',
          color: 'var(--primary)',
          fontWeight: 500,
          border: '1px solid var(--line-soft)',
        }}>
          {num}
        </div>
      </div>
      <div style={{ paddingBottom: 36, paddingTop: 14 }}>
        <h4 style={{ marginBottom: 8, fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 600 }}>{title}</h4>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.93rem', maxWidth: 420, lineHeight: 1.65 }}>{body}</p>
      </div>
    </div>
  );
}

function NeuTestimonialCard({ quote, name, meta }) {
  return (
    <div className="neu-card" style={{ position: 'relative' }}>
      {/* Quote mark */}
      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: '6rem',
        color: 'var(--accent)',
        lineHeight: 0.6,
        marginBottom: 24,
        opacity: 0.6,
      }}>"</div>
      <p style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
        lineHeight: 1.5,
        fontWeight: 350,
        marginBottom: 28,
        color: 'var(--ink)',
      }}>{quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--primary-soft)',
          boxShadow: 'var(--neu-shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="iconify" data-icon="mdi:account" style={{ fontSize: 20, color: 'var(--primary)' }} />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{name}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{meta}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CINEMATIC HERO — Content overlay
───────────────────────────────────────────── */
function HeroCinematicContent() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', alignItems: 'flex-start',
      padding: 'clamp(32px, 5vw, 72px) clamp(24px, 6vw, 96px)',
      paddingBottom: 'clamp(48px, 7vh, 100px)',
    }}>

      {/* Overline — plain text, no pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        marginBottom: 24,
        animation: 'kt-fade-up 0.7s ease both',
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#4fc3f7',
          display: 'inline-block', flexShrink: 0,
        }} />
        <span style={{
          fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.09em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)',
          fontFamily: 'var(--sans)',
        }}>UK &amp; Ireland · Independent · Confidential</span>
      </div>

      {/* Main headline */}
      <h1 style={{
        fontFamily: "var(--serif)",
        fontSize: 'clamp(2.6rem, 6.5vw, 6rem)',
        fontWeight: 300,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        color: '#fff',
        maxWidth: '14ch',
        marginBottom: 'clamp(16px, 3vh, 32px)',
        animation: 'kt-fade-up 0.8s 0.12s ease both',
        textShadow: '0 2px 40px rgba(0,0,0,0.5)',
      }}>
        For families with{' '}
        <em style={{
          fontStyle: 'italic', fontWeight: 400,
          color: 'rgba(200,230,255,0.95)',
        }}>unanswered{' '}questions.</em>
      </h1>

      {/* Sub-headline */}
      <p style={{
        fontFamily: 'var(--sans)',
        fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
        fontWeight: 300,
        lineHeight: 1.65,
        color: 'rgba(255,255,255,0.72)',
        maxWidth: '52ch',
        marginBottom: 'clamp(32px, 4vh, 52px)',
        animation: 'kt-fade-up 0.8s 0.22s ease both',
      }}>
        We provide independent case reviews, quiet advocacy, and trusted
        companionship — at no cost — to families across the UK and Ireland
        who deserve the full truth about a loved one's death.
      </p>

      {/* CTA row */}
      <div style={{
        display: 'flex', gap: 14, flexWrap: 'wrap',
        marginBottom: 'clamp(32px, 5vh, 64px)',
        animation: 'kt-fade-up 0.8s 0.32s ease both',
      }}>
        <Link to="contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.97)',
          color: '#002740',
          fontFamily: 'var(--sans)',
          fontWeight: 600, fontSize: '0.92rem', letterSpacing: '0.01em',
          padding: '13px 26px', borderRadius: 100,
          textDecoration: 'none',
          transition: 'transform .2s, box-shadow .2s',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)'; }}
        >
          Begin a referral
          <span className="iconify" data-icon="mdi:arrow-right" style={{ fontSize: 18 }} />
        </Link>
        <Link to="how-we-work" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: 'rgba(255,255,255,0.92)',
          fontFamily: 'var(--sans)',
          fontWeight: 500, fontSize: '0.92rem',
          padding: '13px 26px', borderRadius: 100,
          textDecoration: 'none',
          transition: 'background .2s, border-color .2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
        >
          How we work
        </Link>
      </div>

      {/* Trust badge strip — plain text */}
      <div style={{
        display: 'flex', gap: 20, flexWrap: 'wrap',
        animation: 'kt-fade-up 0.8s 0.44s ease both',
      }}>
        {['Independent &amp; confidential', 'No cost to families', 'Trauma-informed care'].map((label, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: '0.78rem', fontWeight: 500,
            color: 'rgba(255,255,255,0.72)',
            fontFamily: 'var(--sans)',
            letterSpacing: '0.01em',
          }}>
            <span className="iconify" data-icon="mdi:check"
              style={{ fontSize: 13, color: '#81d4fa', flexShrink: 0 }} />
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 28, right: 'clamp(24px, 4vw, 60px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        animation: 'kt-fade-up 0.8s 0.6s ease both',
        opacity: 0.55,
      }}>
        <span style={{
          fontSize: '0.68rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#fff',
          fontFamily: 'var(--sans)', writingMode: 'vertical-rl',
        }}>Scroll</span>
        <div style={{
          width: 1, height: 44,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CINEMATIC HERO — GSAP parallax driver
───────────────────────────────────────────── */
function HeroParallaxDriver() {
  React.useEffect(() => {
    const wrap = document.getElementById('kt-hero-videowrap');
    if (!wrap) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let rafId = null;

    const STRENGTH = 22; // px travel
    const LERP = 0.055;  // smoothing (0 = frozen, 1 = instant)

    function lerp(a, b, t) { return a + (b - a) * t; }

    function onMove(e) {
      const W = window.innerWidth, H = window.innerHeight;
      mouseX = ((e.clientX / W) - 0.5) * 2;   // -1 … 1
      mouseY = ((e.clientY / H) - 0.5) * 2;
    }

    function tick() {
      curX = lerp(curX, mouseX, LERP);
      curY = lerp(curY, mouseY, LERP);
      wrap.style.transform =
        `scale(1.08) translate(${curX * -STRENGTH}px, ${curY * -STRENGTH}px)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    // Entrance animation via GSAP if available
    if (window.gsap) {
      gsap.fromTo('#hero-section', { opacity: 0 }, {
        opacity: 1, duration: 1.2, ease: 'power2.out',
      });
    } else {
      document.getElementById('hero-section').style.opacity = '1';
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}

function HomePageV2() {
  const headline = window.__tweakHeadline || "For families with unanswered questions following a loved one's death.";

  const features = [
    {
      eyebrow: 'For families',
      title: 'A loved one has died and questions remain',
      body: 'We listen first. When you are ready, we can review the circumstances, the paperwork, and the response from authorities.',
      cta: 'Begin a referral',
      to: 'contact',
      icon: 'mdi:heart-outline',
    },
    {
      eyebrow: 'For professionals',
      title: 'You are supporting a family who needs help',
      body: 'Coroners, solicitors, family liaison officers and clinicians can refer families to us in confidence.',
      cta: 'How we work',
      to: 'how-we-work',
      icon: 'mdi:briefcase-outline',
    },
    {
      eyebrow: 'For media & funders',
      title: 'You want to understand or support the work',
      body: 'Read our impact, recent submissions, and find press contacts and funding routes.',
      cta: 'See our impact',
      to: 'impact',
      icon: 'mdi:chart-line',
    },
  ];

  const stats = [
    { num: '40+', label: 'Families supported', icon: 'mdi:account-group-outline' },
    { num: '12',  label: 'Reviews concluded',  icon: 'mdi:file-check-outline' },
    { num: '4',   label: 'Policy submissions',  icon: 'mdi:gavel' },
    { num: '100%',label: 'Free to families',    icon: 'mdi:shield-check-outline' },
  ];

  const steps = [
    { n: '01', t: 'You reach out',  b: 'A family member, a friend, or a professional makes contact through our referral form, by phone, or by post.' },
    { n: '02', t: 'We listen',      b: 'A first conversation — by phone or in person — to understand the circumstances and what the family is hoping to find.' },
    { n: '03', t: 'We assess',      b: 'A small panel reviews the case to determine whether independent review is appropriate and what we can realistically achieve.' },
    { n: '04', t: 'We review',      b: 'We examine documents, request further records, and consult experts. Families are kept informed at every stage.' },
  ];

  return (
    <React.Fragment>
      {/* ——— CINEMATIC HERO ——— */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0a0f14' }} id="hero-section">

        {/* Video background layer */}
        <div id="kt-hero-videowrap" style={{
          position: 'absolute', inset: '-8%',
          transform: 'scale(1.08)', transformOrigin: 'center center',
        }}>
          <video
            id="kt-hero-video"
            autoPlay muted loop playsInline
            onLoadedMetadata={(e) => { e.target.playbackRate = 1.0; }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          >
            {/* CloudFront cinematic background */}
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Multi-layer overlay — deep navy tint matching Katie Trust palette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: [
            'radial-gradient(ellipse at 50% 0%, rgba(0,60,90,0.45) 0%, transparent 65%)',
            'linear-gradient(to bottom, rgba(0,20,35,0.55) 0%, rgba(0,30,50,0.20) 35%, rgba(0,20,35,0.70) 72%, rgba(0,15,30,0.92) 100%)',
          ].join(', '),
        }} />

        {/* Subtle grain texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundSize: '180px 180px',
          pointerEvents: 'none',
          opacity: 0.6,
        }} />

        {/* ── Hero headline — vertically centred, slightly above midpoint ── */}
        <HeroCinematicContent />

        {/* ── GSAP parallax driver (mounts after render) ── */}
        <HeroParallaxDriver />
      </section>

      {/* ——— HOW WE CAN HELP ——— */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="eyebrow">How we can help</div>
            <h2 style={{ maxWidth: 680, margin: '0 auto' }}>Whoever you are, there is a way to begin.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} data-three-col>
            {features.map((f, i) => (
              <NeuFeatureCard key={i} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— MISSION BAND ——— */}
      <section style={{
        background: 'linear-gradient(135deg, #004a70 0%, #006090 50%, #004a70 100%)',
        color: 'white',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(184,138,62,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div className="container-narrow text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Our mission</div>
          {/* Inset quote box */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            borderRadius: 20,
            padding: 'clamp(40px, 6vw, 64px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
              lineHeight: 1.4,
              fontWeight: 350,
            }}>
              "When a death goes unexplained, families are too often left alone with the silence. We exist to stand with them — and to push, gently and persistently, until the questions are answered."
            </p>
            <div style={{
              marginTop: 32,
              fontSize: '0.82rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.6,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            }}>
              <div style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.4)' }} />
              The Katie Trust
              <div style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ——— IMPACT STATS ——— */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }} data-two-col>
            <div>
              <div className="eyebrow">The work, in numbers</div>
              <h2 style={{ marginBottom: 20 }}>Independent. Persistent. Quietly effective.</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: 40, fontSize: '1rem', lineHeight: 1.7 }}>
                We do not chase metrics. But because supporters and funders ask, here is what the work has produced so far.
              </p>
              <Link to="impact" className="btn btn-ghost">
                Read our full impact
                <span className="iconify" data-icon="mdi:arrow-right" style={{ fontSize: 16 }} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {stats.map((s, i) => (
                <NeuStatCard key={i} {...s} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— PROCESS STEPPER ——— */}
      <section style={{ background: 'var(--bg-warm)', padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} data-two-col>
            <div>
              <div className="eyebrow">Our process</div>
              <h2 style={{ marginBottom: 20 }}>A clear path through a difficult time.</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: 40, lineHeight: 1.7 }}>
                Our work is structured but never bureaucratic. Each family sets the pace — we walk alongside, not ahead.
              </p>
              <Link to="how-we-work" className="btn btn-primary">
                Learn more
                <span className="iconify" data-icon="mdi:arrow-right" style={{ fontSize: 16 }} />
              </Link>
            </div>
            <div>
              {steps.map((s, i) => (
                <NeuProcessStep key={i} num={s.n} title={s.t} body={s.b} isLast={i === steps.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— TESTIMONIAL ——— */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="eyebrow">Voices from families</div>
            <h2>What families have said.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} data-three-col>
            {[
              {
                quote: 'They listened when no one else would. For the first time in two years, I felt that someone had heard us.',
                name: 'A family in Yorkshire',
                meta: 'Case concluded 2025',
              },
              {
                quote: 'The report was honest. It told the truth of what happened, and that was what we had been asking for all along.',
                name: 'A family in Cork',
                meta: 'Case concluded 2024',
              },
              {
                quote: 'I cannot say what it meant to have someone treat our questions seriously, and gently.',
                name: 'A family in Glasgow',
                meta: 'Case concluded 2024',
              },
            ].map((t, i) => (
              <NeuTestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— DONATE CTA ——— */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1e2a35 0%, #2a3a4a 100%)',
            color: 'white',
            padding: 'clamp(48px, 7vw, 88px)',
            borderRadius: 24,
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 64,
            alignItems: 'center',
            boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }} data-cta-grid>
            {/* Glow orbs */}
            <div style={{
              position: 'absolute', top: -60, right: -60,
              width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,96,144,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -40, left: -40,
              width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(184,138,62,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="eyebrow" style={{ color: '#ffd88a' }}>Support our work</div>
              <h2 style={{ color: 'white', marginBottom: 20 }}>Help us reach the next family.</h2>
              <p style={{ color: '#a8b8c4', fontSize: '1.05rem', maxWidth: 520, lineHeight: 1.7 }}>
                Every review costs time, expertise, and care. The Trust is funded entirely by donations from people who believe families deserve answers.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}>
              <Link to="donate" className="btn btn-accent btn-lg" style={{ justifyContent: 'center' }}>
                <span className="iconify" data-icon="mdi:credit-card-outline" style={{ fontSize: 18 }} />
                Donate via Stripe
              </Link>
              <a href="#" className="btn btn-ghost btn-lg" style={{
                borderColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
              }}>
                <span className="iconify" data-icon="mdi:hand-heart-outline" style={{ fontSize: 18 }} />
                Donate via GoFundMe
              </a>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 4 }}>
                Secure · Trusted · 100% to The Trust
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          [data-hero-grid], [data-two-col], [data-cta-grid] { grid-template-columns: 1fr !important; gap: 48px !important; }
          [data-three-col] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </React.Fragment>
  );
}

Object.assign(window, { HomePageV2 });
