// App v2 — uses v2 layout + HomePageV2, falls back to v1 pages for all other routes

const TWEAK_DEFAULTS = {
  "primaryColor": "#006090",
  "accentColor": "#b88a3e",
  "headingFont": "Cormorant Garamond",
  "bodyFont": "Manrope",
  "donateProminence": "moderate",
  "density": "airy",
  "darkMode": false,
  "showImagery": true,
  "heroHeadline": "For families with unanswered questions following a loved one's death."
};

function useTweaks(defaults) {
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const saved = localStorage.getItem('kt-tweaks-v2');
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch { return defaults; }
  });
  const setTweak = (key, val) => {
    setTweaks(prev => {
      const next = { ...prev, [key]: val };
      try { localStorage.setItem('kt-tweaks-v2', JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return [tweaks, setTweak];
}

function AppV2() {
  const route = useRoute();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [dark, setDark] = useTheme();

  React.useEffect(() => { window.__tweakHeadline = tweaks.heroHeadline; }, [tweaks.heroHeadline]);

  // Apply brand/layout tweaks — colour tokens are handled purely by
  // [data-theme="dark"] CSS rules; do NOT set inline colour overrides
  // here or they will win over the stylesheet cascade.
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--primary', tweaks.primaryColor);
    r.setProperty('--accent', tweaks.accentColor);
    r.setProperty('--serif', `'${tweaks.headingFont}', Georgia, serif`);
    r.setProperty('--sans', `'${tweaks.bodyFont}', -apple-system, sans-serif`);
    r.setProperty('--container', tweaks.density === 'compact' ? '1100px' : '1200px');
    document.body.style.fontSize = tweaks.density === 'compact' ? '16px' : '17px';
    document.body.classList.toggle('no-imagery', !tweaks.showImagery);
  }, [tweaks]);

  React.useEffect(() => {
    document.body.dataset.donate = tweaks.donateProminence;
  }, [tweaks.donateProminence]);

  // Load fonts dynamically
  React.useEffect(() => {
    const id = 'gf-dynamic-v2';
    let link = document.getElementById(id);
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const fams = [tweaks.headingFont, tweaks.bodyFont].filter((v, i, a) => a.indexOf(v) === i);
    link.href = 'https://fonts.googleapis.com/css2?' + fams.map(f => `family=${encodeURIComponent(f)}:wght@300;350;400;500;600;700`).join('&') + '&display=swap';
  }, [tweaks.headingFont, tweaks.bodyFont]);

  // Route map — home uses v2, all others fall back to v1 pages
  const pages = {
    'home':          HomePageV2,
    'about':         AboutPage,
    'how-we-work':   HowWeWorkPage,
    'impact':        ImpactPage,
    'team':          TeamPage,
    'donate':        DonatePage,
    'resources':     ResourcesPage,
    'news':          NewsPage,
    'contact':       ContactPage,
    'submissions':   SubmissionsPage,
    'privacy':       PolicyPageV2,
    'cookies':       PolicyPageV2,
    'terms':         PolicyPageV2,
    'confidentiality': PolicyPageV2,
  };
  const Page = pages[route] || HomePageV2;

  return (
    <React.Fragment>
      <Header route={route} dark={dark} onToggleTheme={() => setDark(d => !d)} />
      <main>
        <Page route={route} subpage={route} />
      </main>
      <Footer />
      <CookieBanner />
      <TweaksPanelWrapper tweaks={tweaks} setTweak={setTweak} dark={dark} setDark={setDark} />
    </React.Fragment>
  );
}

function PolicyPageV2({ subpage }) {
  const titles = {
    privacy:         ['Privacy notice', 'How we collect, store and use your information.'],
    cookies:         ['Cookie policy', 'What cookies we use and how to manage them.'],
    terms:           ['Terms of use', 'Conditions of using thekatietrust.org.'],
    confidentiality: ['Confidentiality statement', 'How we hold your information in confidence.'],
  };
  const [title, lede] = titles[subpage] || titles.privacy;
  return (
    <React.Fragment>
      <PageHero breadcrumb={title} eyebrow="Governance" title={title} lede={lede} />
      <section className="section">
        <div className="container-narrow" style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: 20 }}>The Katie Trust takes data protection, confidentiality, and the trust placed in us by families and supporters with the utmost seriousness.</p>
          <h3 style={{ color: 'var(--ink)', marginTop: 40, marginBottom: 16 }}>What we collect</h3>
          <p style={{ marginBottom: 16 }}>Only what is necessary — the information you provide via the contact form (name, email, phone, message), and basic technical information about how the site is used.</p>
          <h3 style={{ color: 'var(--ink)', marginTop: 40, marginBottom: 16 }}>How we store it</h3>
          <p style={{ marginBottom: 16 }}>Securely, in systems controlled by the Trust. Casework information is held separately, on access-controlled systems.</p>
          <p style={{ marginTop: 40, fontStyle: 'italic' }}>This is a placeholder draft. Final legal text will be provided by the Trust's data-protection adviser before launch.</p>
        </div>
      </section>
    </React.Fragment>
  );
}

function TweaksPanelWrapper({ tweaks, setTweak, dark, setDark }) {
  return (
    <TweaksPanel>
      <TweakSection label="Brand colours">
        <TweakColor label="Primary" value={tweaks.primaryColor} onChange={v => setTweak('primaryColor', v)} />
        <TweakColor label="Accent"  value={tweaks.accentColor}  onChange={v => setTweak('accentColor', v)} />
      </TweakSection>
      <TweakSection label="Typography">
        <TweakSelect label="Heading font" value={tweaks.headingFont} options={['Fraunces','Playfair Display','EB Garamond','Cormorant Garamond','Lora','Inter','DM Serif Display']} onChange={v => setTweak('headingFont', v)} />
        <TweakSelect label="Body font"    value={tweaks.bodyFont}    options={['Inter','Source Sans 3','Work Sans','IBM Plex Sans','Nunito Sans','Manrope']} onChange={v => setTweak('bodyFont', v)} />
      </TweakSection>
      <TweakSection label="Layout">
        <TweakRadio  label="Density"    value={tweaks.density}    options={[{value:'compact',label:'Compact'},{value:'airy',label:'Airy'}]} onChange={v => setTweak('density', v)} />
        <TweakToggle label="Dark mode"  value={dark}              onChange={v => setDark(v)} />
        <TweakToggle label="Show imagery" value={tweaks.showImagery} onChange={v => setTweak('showImagery', v)} />
      </TweakSection>
      <TweakSection label="Donate prominence">
        <TweakRadio label="Style" value={tweaks.donateProminence} options={[{value:'soft',label:'Soft'},{value:'moderate',label:'Moderate'},{value:'strong',label:'Strong'}]} onChange={v => setTweak('donateProminence', v)} />
      </TweakSection>
      <TweakSection label="Hero copy">
        <TweakText label="Headline" value={tweaks.heroHeadline} onChange={v => setTweak('heroHeadline', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppV2 />);
