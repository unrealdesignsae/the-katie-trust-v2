// Katie Trust v3 — Neuromorphic HomePage
// Neuromorphic components: Hero, Feature Cards, Stats, Mission Band, Process Stepper, Testimonial, Donate CTA

/* ─────────────────────────────────────────────
   GENERATIVE MOUNTAIN SCENE — Three.js background
───────────────────────────────────────────── */
function MountainScene() {
  const mountRef = React.useRef(null);
  const lightRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof THREE === 'undefined') return;
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 3);
    camera.rotation.x = -0.3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(14, 9, 160, 160);

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      wireframe: false,
      uniforms: {
        time: { value: 0 },
        pointLightPosition: { value: new THREE.Vector3(0, 0, 5) },
        color: { value: new THREE.Color('#4fc3f7') },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
        vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
        vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise(vec3 v){
          const vec2 C=vec2(1./6.,1./3.);
          const vec4 D=vec4(0.,.5,1.,2.);
          vec3 i=floor(v+dot(v,C.yyy));
          vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);
          vec3 l=1.-g;
          vec3 i1=min(g.xyz,l.zxy);
          vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx;
          vec3 x2=x0-i2+C.yyy;
          vec3 x3=x0-D.yyy;
          i=mod289v3(i);
          vec4 p=permute(permute(permute(
            i.z+vec4(0.,i1.z,i2.z,1.))
            +i.y+vec4(0.,i1.y,i2.y,1.))
            +i.x+vec4(0.,i1.x,i2.x,1.));
          float n_=0.142857142857;
          vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z);
          vec4 y_=floor(j-7.*x_);
          vec4 x=x_*ns.x+ns.yyyy;
          vec4 y=y_*ns.x+ns.yyyy;
          vec4 h=1.-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy);
          vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.+1.;
          vec4 s1=floor(b1)*2.+1.;
          vec4 sh=-step(h,vec4(0.));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
          vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);
          vec3 p1=vec3(a0.zw,h.y);
          vec3 p2=vec3(a1.xy,h.z);
          vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
          vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
          m=m*m;
          return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }
        void main(){
          vNormal=normal; vPosition=position;
          float d=snoise(vec3(position.x*.8,position.y*.8-time*.18,0.))*.65;
          d+=snoise(vec3(position.x*1.6,position.y*1.6-time*.18,0.))*.32;
          vec3 np=position+normal*d;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(np,1.);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 pointLightPosition;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main(){
          vec3 n=normalize(vNormal);
          vec3 ld=normalize(pointLightPosition-vPosition);
          float diff=max(dot(n,ld),0.);
          float fres=pow(1.-dot(n,vec3(0.,0.,1.)),2.);
          vec3 col=color*diff+color*fres*.5;
          gl_FragColor=vec4(col,.85);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 5);
    lightRef.current = pointLight;
    scene.add(pointLight);

    let frameId;
    const animate = (t) => {
      material.uniforms.time.value = t * 0.0003;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      const pos = new THREE.Vector3(x * 5, 2, 2 - y * 2);
      if (lightRef.current) lightRef.current.position.copy(pos);
      material.uniforms.pointLightPosition.value = pos;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (el && el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />;
}

function NeuFeatureCard({ eyebrow, title, body, cta, to, icon, delay = 0 }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="neu-card anim-fade-up"
      style={{ animationDelay: `${delay}s`, position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Flat icon badge — uses unified .icon-box system */}
      <div className="icon-box icon-box--lg" style={{ marginBottom: 24 }}>
        <span className="iconify" data-icon={icon} />
      </div>
      {/* Aqua eyebrow pill */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>
      <h3 style={{ marginBottom: 14, minHeight: 80, fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 28, fontSize: '0.95rem', lineHeight: 1.65 }}>{body}</p>
      {/* Teal divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(79,195,247,0.30), transparent)', margin: '0 0 20px' }} />
      <Link to={to} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)',
        transition: 'gap .2s',
      }}>
        {cta}
        <span className="iconify" data-icon="mdi:arrow-right" style={{ fontSize: 16 }} />
      </Link>
      {/* Live dot */}
      <div style={{
        position: 'absolute', top: 22, right: 22,
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 10px 3px 6px',
        borderRadius: 100,
        background: hovered ? 'rgba(79,195,247,0.12)' : 'rgba(79,195,247,0.07)',
        border: '1px solid rgba(79,195,247,0.25)',
        fontSize: '0.65rem', fontWeight: 700,
        letterSpacing: '0.08em',
        color: 'var(--primary)',
        fontFamily: 'var(--sans)',
        textTransform: 'uppercase',
        transition: 'all .25s',
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4fc3f7', boxShadow: '0 0 6px rgba(79,195,247,0.8)' }} />
        Live
      </div>
    </div>
  );
}

function NeuStatCard({ num, label, icon, delay = 0 }) {
  return (
    <div className="neu-stat anim-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="icon-box" style={{ margin: '0 auto 16px' }}>
        <span className="iconify" data-icon={icon} />
      </div>
      <div className="neu-stat-num">{num}</div>
      <div className="neu-stat-label">{label}</div>
    </div>
  );
}

function NeuProcessStep({ num, title, body, isLast, isActive }) {
  return (
    <div style={{ display: 'flex', gap: 24, position: 'relative' }}>
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: 'absolute', left: 27, top: 58, bottom: -24,
          width: 2,
          background: 'linear-gradient(to bottom, rgba(0,153,204,0.55), rgba(0,153,204,0.08))',
        }} />
      )}
      {/* Step badge */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: isActive
            ? 'linear-gradient(135deg, #0099cc 0%, #0077aa 100%)'
            : 'var(--surface)',
          backdropFilter: 'blur(18px) saturate(170%)',
          WebkitBackdropFilter: 'blur(18px) saturate(170%)',
          border: isActive
            ? '2px solid rgba(0,153,204,0.65)'
            : '1px solid var(--line)',
          boxShadow: isActive
            ? '0 0 0 0 rgba(79,195,247,0.5), 0 4px 24px rgba(0,153,204,0.40), inset 0 1px 0 rgba(255,255,255,0.28)'
            : 'var(--neu-shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--sans)',
          fontSize: '0.85rem',
          color: isActive ? '#fff' : 'var(--ink-soft)',
          fontWeight: isActive ? 700 : 500,
          animation: isActive ? 'stepper-glow 2.4s ease-in-out infinite' : 'none',
          position: 'relative',
          zIndex: 1,
          transition: 'all .3s',
        }}>
          {isActive
            ? <span className="iconify" data-icon="mdi:check" style={{ fontSize: 22, color: '#fff' }} />
            : num}
        </div>
      </div>
      <div style={{ paddingBottom: 36, paddingTop: 12 }}>
        <h4 style={{
          marginBottom: 6,
          fontFamily: 'var(--sans)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--ink)',
        }}>{title}</h4>
        <p style={{
          color: 'var(--ink-soft)',
          fontSize: '0.93rem',
          maxWidth: 420,
          lineHeight: 1.65,
        }}>{body}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TILT CARD — 3-D perspective + cursor spotlight
───────────────────────────────────────────── */
function TiltCard({ children, tiltLimit = 14, scale = 1.04, perspective = 1100, effect = 'evade', spotlight = true, style }) {
  const cardRef = React.useRef(null);
  const [transform, setTransform] = React.useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
  );
  const [spot, setSpot] = React.useState({ x: 50, y: 50 });
  const [hovered, setHovered] = React.useState(false);
  const dir = effect === 'evade' ? -1 : 1;

  function onMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    const xRot = (py - 0.5) * (tiltLimit * 2) * dir;
    const yRot = (px - 0.5) * -(tiltLimit * 2) * dir;
    setTransform(
      `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale},${scale},${scale})`
    );
    if (spotlight) setSpot({ x: px * 100, y: py * 100 });
  }

  function onLeave() {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`);
    setHovered(false);
  }

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        willChange: 'transform',
        transform,
        transition: 'transform 0.22s ease-out',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
      {spotlight && (
        <div style={{
          pointerEvents: 'none',
          position: 'absolute', inset: 0, zIndex: 10,
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            position: 'absolute',
            width: '200%', height: '200%',
            borderRadius: '50%',
            left: `${spot.x}%`,
            top:  `${spot.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 42%)',
          }} />
        </div>
      )}
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
        color: 'var(--primary)',
        lineHeight: 0.6,
        marginBottom: 24,
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
        <div className="icon-box icon-box--sm">
          <span className="iconify" data-icon="mdi:account" />
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
      justifyContent: 'center', alignItems: 'flex-start',
      padding: 'clamp(32px, 5vw, 72px) clamp(24px, 6vw, 96px)',
      paddingTop: 'clamp(80px, 14vh, 140px)',
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
      <div className="kt-hero-cta-row" style={{
        display: 'flex', gap: 14, flexWrap: 'wrap',
        marginBottom: 'clamp(20px, 3vh, 36px)',
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

      {/* Trust badge strip — aqua pill tags */}
      <div style={{
        display: 'flex', gap: 10, flexWrap: 'wrap',
        animation: 'kt-fade-up 0.8s 0.44s ease both',
      }}>
        {['Independent & confidential', 'No cost to families', 'Trauma-informed care'].map((label, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '5px 14px',
            borderRadius: 100,
            background: 'rgba(14,96,120,0.35)',
            backdropFilter: 'blur(14px) saturate(180%)',
            WebkitBackdropFilter: 'blur(14px) saturate(180%)',
            border: '1px solid rgba(79,195,247,0.25)',
            color: '#81d4fa',
            fontSize: '0.75rem',
            fontWeight: 600,
            fontFamily: 'var(--sans)',
            letterSpacing: '0.04em',
          }}>
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
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: '100px 0' }}>
        {/* Subtle teal ambient orb */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            {/* No color override — eyebrow uses var(--primary) on light bg */}
            <div className="eyebrow" style={{ margin: '0 auto 20px' }}>How we can help</div>
            {/* h2 uses var(--ink) via CSS — no hardcoded white */}
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
        background: 'var(--bg-warm)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle ambient orbs */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(79,195,247,0.05) 0%, transparent 55%), radial-gradient(circle at 80% 50%, rgba(184,138,62,0.04) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />
        <div className="container-narrow text-center" style={{ position: 'relative', zIndex: 1 }}>
          {/* eyebrow on light bg — uses var(--primary) */}
          <div className="eyebrow" style={{ margin: '0 auto 24px' }}>Our mission</div>
          {/* Inset quote box — TiltCard interactive */}
          <TiltCard
            tiltLimit={12}
            scale={1.03}
            perspective={1100}
            effect="evade"
            spotlight={true}
            style={{
              background: 'var(--surface)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: 24,
              padding: 'clamp(40px, 6vw, 64px)',
              border: '1px solid var(--line)',
              boxShadow: 'var(--neu-shadow)',
            }}
          >
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
              lineHeight: 1.4,
              fontWeight: 350,
              color: 'var(--ink)',
              position: 'relative', zIndex: 20,
            }}>
              &ldquo;When a death goes unexplained, families are too often left alone with the silence. We exist to stand with them &mdash; and to push, gently and persistently, until the questions are answered.&rdquo;
            </p>
            <div style={{
              marginTop: 32,
              fontSize: '0.82rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              position: 'relative', zIndex: 20,
            }}>
              <div style={{ width: 30, height: 1, background: 'var(--line)' }} />
              The Katie Trust
              <div style={{ width: 30, height: 1, background: 'var(--line)' }} />
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ——— IMPACT STATS ——— */}
      <section className="section" style={{
        background: 'var(--bg)',
        position: 'relative',
      }}>
        {/* Subtle frosted overlay behind stat cards */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(ellipse at 60% 50%, rgba(0,153,204,0.05) 0%, transparent 65%)',
        }} />
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} data-stat-grid>
              {stats.map((s, i) => (
                <NeuStatCard key={i} {...s} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— PROCESS STEPPER ——— */}
      <section style={{
        background: 'var(--bg-warm)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle ambient orbs */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,96,144,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
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
                <NeuProcessStep key={i} num={s.n} title={s.t} body={s.b} isLast={i === steps.length - 1} isActive={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— TESTIMONIAL ——— */}
      <section className="section" style={{
        background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg) 100%)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(0,153,204,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(79,195,247,0.04) 0%, transparent 60%)',
        }} />
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="eyebrow">Voices from families</div>
            <h2>What families have said.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} data-three-col data-testimonial-grid>
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
            background: 'rgba(14,24,36,0.75)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            color: 'white',
            padding: 'clamp(48px, 7vw, 88px)',
            borderRadius: 28,
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 64,
            alignItems: 'center',
            boxShadow: '0 32px 100px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.12)',
            position: 'relative',
            overflow: 'hidden',
          }} data-cta-grid>
            {/* Subtle blue glow only — no gold */}
            <div style={{
              position: 'absolute', top: -60, right: -60,
              width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,96,144,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="eyebrow">Support our work</div>
              <h2 style={{ color: 'white', marginBottom: 20 }}>Help us reach the next family.</h2>
              <p style={{ color: '#a8b8c4', fontSize: '1.05rem', maxWidth: 520, lineHeight: 1.7 }}>
                Every review costs time, expertise, and care. The Trust is funded entirely by donations from people who believe families deserve answers.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}>
              <Link to="donate" className="donate-link-row primary">
                <span className="iconify" data-icon="mdi:credit-card-outline" style={{ fontSize: 18 }} />
                Donate via Stripe
              </Link>
              <a href="#" className="donate-link-row secondary">
                <span className="iconify" data-icon="mdi:hand-heart-outline" style={{ fontSize: 18 }} />
                Donate via GoFundMe
              </a>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 4 }}>
                Secure · Trusted · 100% to The Trust
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Donate CTA block — collapses to single column on tablet */
        @media (max-width: 860px) {
          [data-cta-grid] { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        /* Hero h1 — tighten min-height on cards for mobile */
        @media (max-width: 580px) {
          .neu-card h3 { min-height: auto !important; }
        }
      `}</style>
    </React.Fragment>
  );
}

Object.assign(window, { HomePageV2 });
