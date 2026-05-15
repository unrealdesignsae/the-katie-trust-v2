// Layout v2 — reuses original layout but with v2 styles applied
const { useState, useEffect, useRef } = React;

function useRoute() {
  const [route, setRoute] = useState(window.location.hash.replace('#/', '') || 'home');
  useEffect(() => {
    const onHash = () => {
      const r = window.location.hash.replace('#/', '') || 'home';
      setRoute(r);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

// ── Theme hook — persists to localStorage & drives data-theme on <html> ──
function useTheme() {
  const stored = localStorage.getItem('kt-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [dark, setDark] = useState(stored ? stored === 'dark' : prefersDark);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('kt-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, setDark];
}

// ── Neuromorphic moon/sun toggle ──
function ThemeToggleBtn({ dark, onToggle }) {
  return (
    <button
      className="theme-toggle-btn"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? (
        // Sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

function Link({ to, children, className, style, onClick }) {
  return (
    <a
      href={`#/${to}`}
      className={className}
      style={style}
      onClick={(e) => { onClick && onClick(e); }}
    >
      {children}
    </a>
  );
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'how-we-work', label: 'How We Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'team', label: 'Our Team' },
  { id: 'resources', label: 'Resources' },
  { id: 'news', label: 'News' },
  { id: 'submissions', label: 'Submissions' },
  { id: 'contact', label: 'Contact' },
];

function Header({ route, dark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <header className="site-header">
        <div className="header-inner">
          <Link to="home" className="brand">
            <img src="assets/katie-trust-logo.webp" alt="The Katie Trust" />
            <span className="brand-tag">Truth · Dignity · Reform</span>
          </Link>
          <nav className="nav">
            {NAV_ITEMS.map(item => (
              <Link key={item.id} to={item.id} className={route === item.id ? 'active' : ''}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-cta">
            <ThemeToggleBtn dark={dark} onToggle={onToggleTheme} />
            <Link to="contact" className="btn btn-ghost btn-sm">Refer a case</Link>
            <Link to="donate" className="btn btn-primary btn-sm">Donate</Link>
            <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M18 6L6 18M6 6l12 12"/> : <React.Fragment><path d="M3 12h18M3 6h18M3 18h18"/></React.Fragment>}
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <Link key={item.id} to={item.id} onClick={() => setOpen(false)}>{item.label}</Link>
        ))}
        <Link to="donate" onClick={() => setOpen(false)}>Donate</Link>
      </div>
    </React.Fragment>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="assets/katie-trust-logo.webp" alt="" />
            <p>The Katie Trust supports families with unanswered questions following a loved one's death — providing independent case reviews, advocacy, and a steady hand at the most difficult of times.</p>
          </div>
          <div>
            <h4>The Trust</h4>
            <ul>
              <li><Link to="about">About</Link></li>
              <li><Link to="how-we-work">How we work</Link></li>
              <li><Link to="team">Our team</Link></li>
              <li><Link to="impact">Impact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Engage</h4>
            <ul>
              <li><Link to="contact">Contact</Link></li>
              <li><Link to="news">News & blog</Link></li>
              <li><Link to="submissions">Policy work</Link></li>
              <li><Link to="resources">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><Link to="donate">Donate</Link></li>
              <li><a href="#">GoFundMe</a></li>
              <li><Link to="donate">Become a member</Link></li>
              <li><Link to="contact">Partner with us</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 The Katie Trust. Registered charity (number pending).</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#/privacy">Privacy</a>
            <a href="#/cookies">Cookies</a>
            <a href="#/terms">Terms</a>
            <a href="#/confidentiality">Confidentiality</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CookieBanner() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie preferences">
      <p>We use essential cookies to make this site work, and optional analytics cookies to understand how it's used. You can manage your preferences at any time.</p>
      <div className="actions">
        <button className="btn btn-ghost btn-sm" onClick={() => setShow(false)}>Reject</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setShow(false)}>Manage</button>
        <button className="btn btn-primary btn-sm" onClick={() => setShow(false)}>Accept</button>
      </div>
    </div>
  );
}

function ImagePh({ label, height = 400, style = {}, src }) {
  return (
    <div className="img-ph" style={{ height, ...style }}>
      <span>{label}</span>
    </div>
  );
}

function PageHero({ eyebrow, title, lede, breadcrumb }) {
  return (
    <div className="page-hero">
      <div className="container">
        {breadcrumb && (
          <div className="crumb">
            <Link to="home">Home</Link> <span>›</span> <span>{breadcrumb}</span>
          </div>
        )}
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </div>
  );
}

// Neuromorphic toggle component — matches reference CodePen
function NeuToggle({ label, value, onChange }) {
  const handleClick = () => onChange(!value);
  const handleKey = (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(!value); }
  };
  return (
    <div className="neu-toggle-wrap">
      <button
        type="button"
        className={`neu-toggle-track${value ? ' on' : ''}`}
        role="switch"
        aria-checked={value}
        aria-label={label || 'Toggle'}
        onClick={handleClick}
        onKeyDown={handleKey}
      >
        <span className="neu-toggle-thumb" aria-hidden="true" />
      </button>
      {label && (
        <span className="neu-toggle-label" onClick={handleClick}>{label}</span>
      )}
    </div>
  );
}

// Neuromorphic checkbox component — matches reference CodePen
function NeuCheckbox({ label, value, onChange, id, children }) {
  const handleClick = () => onChange(!value);
  const handleKey = (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(!value); }
  };
  const uid = id || `neu-cb-${Math.random().toString(36).slice(2)}`;
  return (
    <div
      className="neu-checkbox-wrap"
      onClick={handleClick}
      onKeyDown={handleKey}
      role="checkbox"
      aria-checked={value}
      tabIndex={0}
      id={uid}
    >
      <div className={`neu-checkbox-box${value ? ' checked' : ''}`}>
        <span className="check-mark" aria-hidden="true">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <span className="neu-checkbox-label">{label || children}</span>
    </div>
  );
}

Object.assign(window, {
  useRoute, useTheme, Link, Header, Footer, CookieBanner, ImagePh, PageHero, NAV_ITEMS,
  NeuToggle, NeuCheckbox, ThemeToggleBtn,
});
