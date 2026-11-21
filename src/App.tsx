import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  Menu,
  Network,
  Mail,
  MapPin,
  Pause,
  Play,
  Phone,
  Radio,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import './App.css'

const pillars = [
  { name: 'Electricity', caption: 'Power, energy and electrical systems', className: 'hero-solution-power', route: '/solutions/electricity' },
  { name: 'Automation', caption: 'Machines and process control', className: 'hero-solution-automation', route: '/solutions/automation' },
  { name: 'IoT', caption: 'Sensors, gateways and smart assets', className: 'hero-solution-iiot', route: '/solutions/iot' },
  { name: 'IT Services', caption: 'Cloud, software and analytics', className: 'hero-solution-it', route: '/solutions/it-services' },
]
const pillarStories = [
  { title: 'Electricity', eyebrow: 'POWER & ENERGY', headline: 'Make electrical performance visible.', text: 'Connect meters, panels and energy systems so teams can monitor consumption, identify inefficiencies and manage infrastructure with confidence.', solutions: ['Power distribution and protection', 'PCC, MCC and control panels', 'Electrical system design and commissioning', 'Energy monitoring and management', 'Lighting and building systems', 'Utility metering and billing'], video: '/images/pillars/pillar2.mp4', image: '/images/stories/ekip-power-control.jpg', alt: 'Industrial electrical control panel' },
  { title: 'Automation', eyebrow: 'SMART PRODUCTION', headline: 'Make every process work smarter.', text: 'Bring machines, control systems and plant operations together to improve precision, consistency and the flow of production.', solutions: ['Process and factory automation', 'PLC, SCADA and DCS integration', 'Field instrumentation and control', 'Robotics and special-purpose machines', 'Water and wastewater automation', 'System testing and commissioning'], video: '/images/pillars/pillar1.mp4', image: '/images/stories/predictive-maintenance.jpg', alt: 'Engineer working with industrial machinery' },
  { title: 'IoT', eyebrow: 'CONNECTED EQUIPMENT', headline: 'See what your operations are telling you.', text: 'Connect sensors, machines and field devices to make asset conditions visible in real time and turn operational data into useful insight.', solutions: ['Smart sensors and IoT gateways', 'Real-time asset monitoring', 'Predictive maintenance insights', 'Smart factory and facility systems', 'Water and utility monitoring', 'Cloud-connected dashboards'], video: '/images/pillars/pillar3.mp4', image: '/images/stories/flow-meter.jpg', alt: 'Connected water meters monitoring flow through pipes' },
  { title: 'IT Services', eyebrow: 'CLOUD & APPLICATIONS', headline: 'Connect insight to action.', text: 'Link operational technology with cloud platforms, software and analytics so information reaches the people and applications that can use it.', solutions: ['Custom web and mobile applications', 'Cloud platform implementation', 'Enterprise and OT system integration', 'Data engineering and analytics', 'AI, machine learning and predictive insights', 'Cybersecurity and infrastructure management'], video: '/images/pillars/pillar4.mp4', image: '/images/pillars/Home.jpeg', alt: 'Connected city and industrial infrastructure' },
]
const automationSolutionPages = [
  { title: 'Process and factory automation', slug: 'process-factory-automation', eyebrow: 'AUTOMATION / PRODUCTION SYSTEMS', summary: 'Coordinate production sequences, equipment and process signals to make manufacturing operations more consistent and visible.', points: ['Production sequence and line control', 'Machine and process coordination', 'Operator interfaces and production status'], outcome: 'A coordinated control environment that helps production teams improve repeatability, throughput and process visibility.' },
  { title: 'PLC, SCADA and DCS integration', slug: 'plc-scada-dcs-integration', eyebrow: 'AUTOMATION / CONTROL PLATFORMS', summary: 'Integrate programmable controllers, supervisory systems and distributed control into a clear operating architecture.', points: ['PLC and controller programming', 'SCADA visualization and alarms', 'DCS integration and system connectivity'], outcome: 'Control platforms that share reliable process information with operators and connected plant systems.' },
  { title: 'Field instrumentation and control', slug: 'field-instrumentation-control', eyebrow: 'AUTOMATION / FIELD SYSTEMS', summary: 'Connect measurement and control devices to the systems that monitor and regulate industrial processes.', points: ['Instrument selection and integration', 'Measurement signal and loop integration', 'Control valve and field-device coordination'], outcome: 'A dependable field layer that provides accurate measurements and actionable control signals.' },
  { title: 'Robotics and special-purpose machines', slug: 'robotics-special-purpose-machines', eyebrow: 'AUTOMATION / MACHINES & ROBOTICS', summary: 'Apply robotics and purpose-built machinery to production, assembly, handling and other repeatable operating tasks.', points: ['Robotic cells and work-cell integration', 'Special-purpose machine design and controls', 'Machine safety and production sequencing'], outcome: 'Purpose-built automation that improves task consistency and fits the real constraints of the production floor.' },
  { title: 'Water and wastewater automation', slug: 'water-wastewater-automation', eyebrow: 'AUTOMATION / WATER SYSTEMS', summary: 'Automate treatment, pumping and utility processes with connected instrumentation, controls and operator visibility.', points: ['Pump and process sequence control', 'Treatment plant instrumentation and SCADA', 'Remote status, alarms and operational monitoring'], outcome: 'Clearer control of water and wastewater processes from field equipment through operator response.' },
  { title: 'System testing and commissioning', slug: 'system-testing-commissioning', eyebrow: 'AUTOMATION / DELIVERY & START-UP', summary: 'Verify integrated automation systems in the field and prepare them for dependable operation and handover.', points: ['Panel and system inspection', 'I/O, sequence and integration testing', 'Site commissioning and operator handover'], outcome: 'A tested, commissioned automation system with operating checks and handover information in place.' },
]
const iotServiceGroups = [
  { title: 'Industrial IoT', Icon: Radio, image: '/images/stories/iot3.jpeg', imageAlt: 'Robotic production line connected to industrial IoT monitoring systems', items: ['Industry 4.0 to Industry 5.0', 'Industrial IoT gateways', 'Smart sensors', 'Smart devices'] },
  { title: 'Smart Building', Icon: Building2, image: '/images/stories/iot4.jpeg', imageAlt: 'Connected commercial building with energy and performance dashboards', items: ['Facility management', 'Integrated building management system', 'Energy management system', 'Utility management system', 'Asset management'] },
  { title: 'Smart City', Icon: Sun, image: '/images/stories/iot1.jpeg', imageAlt: 'City connected by smart traffic, safety and energy networks', items: ['Smart parking', 'Traffic monitoring and control', 'Bike sharing', 'Smart lighting', 'Public safety', 'Payment kiosks (PoS)'] },
  { title: 'Smart Infrastructure', Icon: Network, image: '/images/stories/iot2.jpeg', imageAlt: 'Operators monitoring connected infrastructure from a control room', items: ['Networking', 'CCTV', 'Fire and safety', 'Surveillance'] },
]
const iotLayoutOptions = ['Split Cards', 'Image Tabs', 'Service Index']
const thinkingStories = [
  {
    category: 'CONNECTED UTILITIES',
    title: 'Every drop, accounted for.',
    text: 'Connect flow meters and utility data to help teams understand water use, spot unusual consumption and make better day-to-day decisions.',
    video: '/images/pillars/Flowmeter.mp4',
    imageAlt: 'Water meters installed across a network of pipes',
  },
  {
    category: 'WATER MANAGEMENT',
    title: 'A clearer view of every process.',
    text: 'Bring treatment plant equipment and process signals into one connected view, from field instrumentation to operational monitoring.',
    video: '/images/pillars/stp-wtp-wastewater-treatment.mp4',
    imageAlt: 'Aerial view of water treatment tanks',
  },
  {
    category: 'PREDICTIVE MAINTENANCE',
    title: 'Spot the signs before downtime.',
    text: 'Turn equipment data and operating trends into earlier warnings, helping maintenance teams plan work with greater confidence.',
    video: '/images/pillars/Predictive%20Maintenance.mp4',
    imageAlt: 'Engineer inspecting industrial machinery',
  },
  {
    category: 'ENERGY MANAGEMENT',
    title: 'Make energy performance visible.',
    text: 'Monitor energy use across buildings and utilities to reveal patterns, identify inefficiencies and support informed action.',
    video: '/images/pillars/energy_utilisation_animation.MP4',
    imageAlt: 'Building energy equipment on a rooftop',
  },
]

type ThinkingStory = (typeof thinkingStories)[number]

function StoryLayoutCard({ story, index, layout }: { story: ThinkingStory; index: number; layout: string }) {
  return (
    <article className={`story-layout-card story-layout-card-${layout}`} tabIndex={0}>
      <div className="story-layout-media">
        <video src={story.video} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <span className="story-layout-index">0{index + 1} / 04</span>
        <span className="story-layout-category">{story.category}</span>
      </div>
      <div className="story-layout-copy">
        <h3>{story.title}</h3>
        <p>{story.text}</p>
        <a href="#solutions" aria-label={`Explore ${story.category}: ${story.title}`}>EXPLORE STORY <ArrowUpRight size={15} /></a>
      </div>
    </article>
  )
}

function SiteHeader({ home = false }: { home?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [automationOpen, setAutomationOpen] = useState(false)
  const homePrefix = home ? '' : '/'

  return (
    <header className="site-header">
      <a className="wordmark" href={home ? '#home' : '/'} aria-label="Leeoteck India home">
        <img className="header-wordmark-logo" src="/images/pillars/leeoteck_logo.PNG" alt="Leeoteck" />
      </a>
      <nav id="primary-navigation" className={`main-nav${mobileMenuOpen ? ' is-open' : ''}`} aria-label="Main navigation" onClick={() => setMobileMenuOpen(false)}>
        <a className={`main-nav-home${home ? ' is-active' : ''}`} href={home ? '#home' : '/'}>Home</a>
        <div className={`main-nav-services${servicesOpen ? ' is-open' : ''}`} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => { setServicesOpen(false); setAutomationOpen(false) }}>
          <button type="button" className={`main-nav-trigger${!home ? ' is-active' : ''}`} aria-expanded={servicesOpen} aria-haspopup="true" onClick={(event) => { event.stopPropagation(); setServicesOpen((open) => !open) }}>
            Services <ChevronDown size={13} aria-hidden="true" />
          </button>
          <div className="services-dropdown">
            {pillars.map(({ name, route }) => name === 'Automation' ? (
              <div className={`services-dropdown-automation${automationOpen ? ' is-open' : ''}`} key={route}>
                <div className="services-dropdown-automation-row">
                  <a href={route} onClick={() => { setServicesOpen(false); setAutomationOpen(false); setMobileMenuOpen(false) }}>{name}</a>
                  <button type="button" aria-label="Show automation solutions" aria-expanded={automationOpen} onClick={(event) => { event.stopPropagation(); setAutomationOpen((open) => !open) }}>
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                </div>
                <div className="automation-submenu" aria-label="Automation solutions">
                  {automationSolutionPages.map((solution) => (
                    <a href={`${route}/${solution.slug}`} key={solution.slug} onClick={() => { setServicesOpen(false); setAutomationOpen(false); setMobileMenuOpen(false) }}>{solution.title}</a>
                  ))}
                </div>
              </div>
            ) : (
              <a href={route} key={route} onClick={() => { setServicesOpen(false); setMobileMenuOpen(false) }}>
                {name}<ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <a href={`${homePrefix}#thinking`}>Stories</a>
        <a href={`${homePrefix}#solutions`}>Solutions</a>
      </nav>
      <a className="header-contact" href={`${homePrefix}#contact`}>Contact <ArrowUpRight size={15} /></a>
      <button className="mobile-menu-toggle" type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="primary-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>
        {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>
    </header>
  )
}

function SiteFooter({ home = false }: { home?: boolean }) {
  const homePrefix = home ? '' : '/'

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand-column">
          <a className="footer-brand-name" href={`${homePrefix}#home`}>LEEOTECK <span>INDIA SOLUTIONS</span></a>
          <p className="footer-note">A Smart, Secure and Connecting World!</p>
          <a className="footer-contact-link" href="https://maps.google.com/?q=BMR+Complex+Old+Nallakunta+Hyderabad+500044" target="_blank" rel="noreferrer">
            <MapPin size={15} aria-hidden="true" /><span>#2-1-133/2, 4th Floor, BMR Complex, Old Nallakunta, Hyderabad, Telangana 500044</span>
          </a>
          <a className="footer-contact-link" href="tel:+917675962801"><Phone size={15} aria-hidden="true" /><span>+91 76759 62801</span></a>
          <a className="footer-contact-link" href="mailto:info@leeoteckindia.com"><Mail size={15} aria-hidden="true" /><span>info@leeoteckindia.com</span></a>
        </div>
        <nav className="footer-link-column" aria-label="Quick links">
          <h2>Explore</h2>
          <a href={`${homePrefix}#home`}>Home</a>
          <a href={`${homePrefix}#thinking`}>Stories</a>
          <a href={`${homePrefix}#solutions`}>Solutions</a>
          <a href={`${homePrefix}#contact`}>Contact</a>
        </nav>
        <nav className="footer-link-column" aria-label="Services">
          <h2>Services</h2>
          {pillars.map(({ name, route }) => <a href={route} key={route}>{name}</a>)}
        </nav>
      </div>
      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Leeoteck India Solutions. All rights reserved.</span>
        <span className="footer-credit">HYDERABAD, INDIA</span>
        <a className="back-top" href={`${homePrefix}#home`}>BACK TO TOP <ArrowUpRight size={14} /></a>
      </div>
    </footer>
  )
}

function HomePage() {
  const [activeHeroPillar, setActiveHeroPillar] = useState(0)
  const [selectedSolutionPillar, setSelectedSolutionPillar] = useState<number | null>(null)
  const [hoveredSolutionPillar, setHoveredSolutionPillar] = useState<number | null>(null)
  const [pillarCarouselVisible, setPillarCarouselVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible')
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [introVisible, setIntroVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [introExiting, setIntroExiting] = useState(false)
  const [introPaused, setIntroPaused] = useState(false)
  const [introMuted, setIntroMuted] = useState(true)
  const [introMediaReady, setIntroMediaReady] = useState(false)
  const [introDurationMs, setIntroDurationMs] = useState(0)
  const [introProgress, setIntroProgress] = useState(0)
  const introTimeLeft = useRef(10000)
  const introTimerStartedAt = useRef(0)
  const introVideoRef = useRef<HTMLVideoElement | null>(null)
  const introFitVideoRef = useRef<HTMLVideoElement | null>(null)
  const activeSolutionPillar = hoveredSolutionPillar ?? selectedSolutionPillar ?? 0
  const featuredSolution = pillarStories[activeSolutionPillar]

  useEffect(() => {
    const section = document.getElementById('solutions')
    if (!section || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setPillarCarouselVisible(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>('.pillar-node-video')
    videos.forEach((video) => {
      if (!pillarCarouselVisible || !pageVisible || reducedMotion) video.pause()
      else void video.play().catch(() => {})
    })
  }, [pillarCarouselVisible, pageVisible, reducedMotion])

  useEffect(() => {
    if (!introVisible || introExiting || introPaused || reducedMotion || !introMediaReady || introDurationMs > 0) return
    introTimerStartedAt.current = performance.now()
    const exitTimer = window.setTimeout(() => setIntroExiting(true), introTimeLeft.current)
    return () => {
      window.clearTimeout(exitTimer)
      if (!introExiting) {
        introTimeLeft.current = Math.max(0, introTimeLeft.current - (performance.now() - introTimerStartedAt.current))
      }
    }
  }, [introVisible, introExiting, introPaused, reducedMotion, introMediaReady, introDurationMs])

  const updateIntroProgress = (video: HTMLVideoElement) => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return
    setIntroProgress(Math.min(1, Math.max(0, video.currentTime / video.duration)))
  }
  const syncIntroVideoLayer = (video: HTMLVideoElement) => {
    const fitVideo = introFitVideoRef.current
    if (!fitVideo || fitVideo.readyState < 1) return
    if (video.videoWidth && video.videoHeight) fitVideo.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`
    if (Math.abs(fitVideo.currentTime - video.currentTime) > 0.12) fitVideo.currentTime = video.currentTime
  }

  useEffect(() => {
    if (!introVisible) return
    const videos = document.querySelectorAll<HTMLVideoElement>('.intro-motion-video')
    videos.forEach((video) => {
      if (introPaused || introExiting || reducedMotion) video.pause()
      else void video.play().catch(() => {})
    })
  }, [introVisible, introPaused, introExiting, reducedMotion])
  useEffect(() => {
    if (reducedMotion || !('IntersectionObserver' in window)) return
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    document.documentElement.classList.add('has-motion-reveals')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('has-motion-reveals')
    }
  }, [reducedMotion])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches)
    document.addEventListener('visibilitychange', updateVisibility)
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => {
      document.removeEventListener('visibilitychange', updateVisibility)
      motionPreference.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  return (
    <main className={`site-shell intro-experience${introVisible && !introExiting ? ' intro-focus-mode' : ''}${introExiting ? ' is-intro-exiting' : ''}`}>
      {introVisible && <section
        className={`brand-intro${introExiting ? ' is-exiting' : ''}${introPaused ? ' is-paused' : ''}`}
        aria-labelledby="brand-intro-title"
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && introExiting) {
            setIntroVisible(false)
            setIntroExiting(false)
          }
        }}
      >
        <video ref={introVideoRef} className="intro-background-video intro-motion-video" autoPlay muted={introMuted} playsInline preload="auto" aria-hidden="true"
          onLoadedMetadata={(event) => {
            const durationMs = event.currentTarget.duration * 1000
            syncIntroVideoLayer(event.currentTarget)
            if (Number.isFinite(durationMs) && durationMs > 0) {
              setIntroDurationMs(durationMs)
              updateIntroProgress(event.currentTarget)
            }
            setIntroMediaReady(true)
          }}
          onTimeUpdate={(event) => {
            updateIntroProgress(event.currentTarget)
            syncIntroVideoLayer(event.currentTarget)
          }}
          onSeeked={(event) => updateIntroProgress(event.currentTarget)}
          onError={() => setIntroMediaReady(true)}
          onEnded={() => { setIntroProgress(1); setIntroExiting(true) }}
        >
          <source src="/images/pillars/new_intro_video1.MP4" type="video/mp4" />
        </video>
        <video ref={introFitVideoRef} className="intro-background-video-fit intro-motion-video" autoPlay muted playsInline preload="metadata" aria-hidden="true"
          onLoadedMetadata={(event) => syncIntroVideoLayer(introVideoRef.current ?? event.currentTarget)}
        >
          <source src="/images/pillars/new_intro_video1.MP4" type="video/mp4" />
        </video>
        <div className="intro-backdrop" aria-hidden="true" />
        <div className="intro-stage">
          <div className="intro-copy">
            <p className="intro-kicker"><span /> ENGINEERING A CONNECTED FUTURE</p>
            <h1 className="intro-tagline" id="brand-intro-title">Connecting the dots.<br /><span>It’s what we do.</span></h1>
            <p className="intro-subline">Leeoteck brings machines, infrastructure, people and data together—turning every connection into clearer insight and smarter operations.</p>
            <div className="intro-capabilities"><span>INDUSTRIAL IOT</span><i /><span>AUTOMATION</span><i /><span>DIGITAL SYSTEMS</span></div>
          </div>
          <div className="intro-index" aria-hidden="true"><span>01</span><i /> CONNECTED BY DESIGN</div>
        </div>
        <div className="intro-edge-mark" aria-hidden="true">ENGINEERED FOR WHAT’S NEXT</div>
        <div className="intro-controls">
          <div className="intro-control-actions">
            <button className="intro-play-toggle" type="button" aria-label={introPaused ? 'Play intro' : 'Pause intro'} aria-pressed={introPaused} onClick={() => setIntroPaused((paused) => !paused)}>
              {introPaused ? <Play size={15} fill="currentColor" /> : <Pause size={15} fill="currentColor" />}
              <span>{introPaused ? 'Play' : 'Pause'}</span>
            </button>
            <button className="intro-audio-toggle" type="button" aria-label={introMuted ? 'Turn sound on' : 'Turn sound off'} aria-pressed={!introMuted} onClick={() => {
              const nextMuted = !introMuted
              if (introVideoRef.current) introVideoRef.current.muted = nextMuted
              setIntroMuted(nextMuted)
            }}>
              {introMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{introMuted ? 'Sound off' : 'Sound on'}</span>
            </button>
          </div>
          <button className="intro-skip" type="button" onClick={() => { setIntroPaused(false); setIntroExiting(true) }}>Skip intro <ArrowUpRight size={14} /></button>
        </div>
        <div className="intro-progress" role="progressbar" aria-label="Intro video progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(introProgress * 100)}>
          <span style={{ transform: `scaleX(${introProgress})` }} />
        </div>
      </section>}

      <SiteHeader home />

      <section className="hero" id="home" aria-labelledby="hero-title">
        <img className="hero-banner-image" src="/images/pillars/home_demo.jpeg" alt="" fetchPriority="high" />
        <svg className="hero-circuit" viewBox="0 0 1400 820" preserveAspectRatio="none" aria-hidden="true">
          <path d="M760 760 C860 570 840 430 1010 365 S1215 270 1400 170" />
          <path d="M830 820 C930 640 910 500 1080 435 S1275 340 1400 265" />
          <circle cx="1010" cy="365" r="4" /><circle cx="1215" cy="270" r="4" /><circle cx="1080" cy="435" r="3" />
        </svg>
        <div className="hero-shade" />


        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> ENGINEERING A CONNECTED FUTURE</p>
          <h1 id="hero-title">Where Industry<br />Meets <span>Intelligence.</span></h1>
          <p className="hero-intro">We connect intelligent devices, machines and systems with cloud, analytics and enterprise applications to improve productivity and reduce unplanned downtime.</p>
        </div>

        <div className="hero-solutions" aria-label="Leeoteck's four connected capability areas">
          <p className="hero-solutions-title"><span className="status-dot" /> CONNECTED CAPABILITIES</p>
          <div className="hero-solution-grid" role="group" aria-label="Highlight a capability">
            {pillars.map(({ name, caption, className }, index) => (
              <button className={`hero-solution ${className}${activeHeroPillar === index ? ' is-active' : ''}`} key={name} type="button" aria-pressed={activeHeroPillar === index} onPointerEnter={() => setActiveHeroPillar(index)} onFocus={() => setActiveHeroPillar(index)} onClick={() => setActiveHeroPillar(index)}>
                <span className="pillar-number">0{index + 1}</span>
                <span className="solution-name">{name}</span>
                <i>{caption}</i>
              </button>
            ))}
          </div>
        </div>
        <div className="hero-readout"><span>CONNECTED SYSTEM</span><i /> CAPABILITY / 0{activeHeroPillar + 1}</div>
        <a className="scroll-cue" href="#thinking"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} /></a>
      </section>

      <section className="stories-section section-pad" id="thinking" aria-labelledby="thinking-title">
        <div className="stories-heading">
          <div>
            <p className="eyebrow">LEEOTECK / OUR THINKING</p>
            <h2 id="thinking-title">Ideas that keep<br /><span>industry moving.</span></h2>
          </div>
          <p className="stories-intro">A closer look at the connected systems, practical insights and engineering ideas shaping more informed operations.</p>
        </div>
        <div className="story-layout-rail-grid" aria-label="Four Leeoteck stories">
          {thinkingStories.map((story, index) => <StoryLayoutCard key={`rail-${story.title}`} story={story} index={index} layout="rail" />)}
        </div>
      </section>

      <section className="home-video-section" id="home-video" aria-label="Leeoteck connected systems in motion">
        <video className="home-showreel" autoPlay muted loop playsInline preload="metadata" poster="/images/stories/predictive-maintenance.jpg" aria-hidden="true">
          <source src="/images/pillars/Who_we.mp4" type="video/mp4" />
        </video>
        <div className="home-video-shade" aria-hidden="true" />
        <div className="home-video-message">
          <p className="home-video-eyebrow">ENGINEERING A CONNECTED FUTURE</p>
          <h2>Connecting the dots.<br /><span>It’s what we do.</span></h2>
          <p className="home-video-description">Leeoteck brings machines, infrastructure, people and data together—turning every connection into clearer insight and smarter operations.</p>
          <nav className="home-video-links" aria-label="Explore Leeoteck">
            <button type="button">Who we are</button>
            <a href="#solutions">What we do</a>
            <a href="#contact">Careers</a>
          </nav>
        </div>
        <p className="home-video-caption"><span>LEEOTECK / SYSTEMS IN MOTION</span><i /> CONNECTED INDUSTRY</p>
        <a className="home-video-next" href="#solutions">EXPLORE SOLUTIONS <ArrowDownRight size={14} /></a>
      </section>

      <section className="solutions-carousel" id="solutions" aria-labelledby="solutions-title">
        <header className="pillar-grid-header">
          <div>
            <p className="eyebrow">WHAT WE CONNECT / FOUR PILLARS</p>
            <h2 id="solutions-title">Four disciplines.<br /><span>One connected future.</span></h2>
          </div>
          <a href="#contact">Build your connected operation <ArrowRight size={17} /></a>
        </header>
        <div className="pillar-mobile-grid" aria-label="Explore Leeoteck capability pillars">
          {pillarStories.map((pillar, index) => (
            <a className="pillar-mobile-card" href={pillars[index].route} key={pillar.title}>
              <video src={pillar.video} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
              <span className="pillar-mobile-card-shade" aria-hidden="true" />
              <span className="pillar-mobile-card-index">0{index + 1} / 04</span>
              <span className="pillar-mobile-card-copy"><span>{pillar.eyebrow}</span><strong>{pillar.title}</strong></span>
              <ArrowUpRight className="pillar-mobile-card-arrow" size={22} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="pillar-network" aria-label="Four connected Leeoteck capability pillars">
          <div className="pillar-bento-grid">
            <article className="pillar-node pillar-node-featured" key={featuredSolution.title}>
              <video className="pillar-node-video" autoPlay src={featuredSolution.video} muted loop playsInline preload="metadata" aria-hidden="true" />
              <div className="pillar-node-shade" aria-hidden="true" />
              <span className="pillar-node-index"><span>0{activeSolutionPillar + 1}</span><i /> <span>FEATURED PILLAR</span></span>
              <div className="pillar-node-copy">
                <p className="eyebrow">{featuredSolution.eyebrow}</p>
                <h3>{featuredSolution.title}</h3>
                <p>{featuredSolution.text}</p>
                <div className="pillar-solution-list">
                  <p className="pillar-solution-label">SOLUTIONS</p>
                  <ul>
                    {featuredSolution.solutions.map((solution) => <li key={solution}>{solution}</li>)}
                  </ul>
                </div>
                <div className="pillar-featured-actions">
                  <a href={pillars[activeSolutionPillar].route} aria-label={`Explore ${featuredSolution.title}`}>EXPLORE <ArrowUpRight size={15} /></a>
                  {activeSolutionPillar !== 0 && <button type="button" onClick={() => { setHoveredSolutionPillar(null); setSelectedSolutionPillar(null) }}>BACK</button>}
                </div>
              </div>
            </article>
            <div className="pillar-bento-options" role="group" aria-label="Select a pillar to feature">
              {pillarStories.slice(1).map((pillar, offset) => {
                const index = offset + 1
                const highlighted = activeSolutionPillar === index
                const selected = selectedSolutionPillar === index
                return (
                  <button
                    className={`pillar-node-option${highlighted ? ' is-active' : ''}${selected ? ' is-selected' : ''}`}
                    type="button"
                    key={pillar.title}
                    aria-pressed={selected}
                    onPointerEnter={() => setHoveredSolutionPillar(index)}
                    onPointerLeave={() => setHoveredSolutionPillar(null)}
                    onFocus={() => setHoveredSolutionPillar(index)}
                    onBlur={() => setHoveredSolutionPillar(null)}
                    onClick={() => setSelectedSolutionPillar((current) => current === index ? null : index)}
                  >
                    <video className="pillar-node-video pillar-node-option-video" autoPlay src={pillar.video} muted loop playsInline preload="metadata" aria-hidden="true" />
                    <span className="pillar-node-option-shade" aria-hidden="true" />
                    <span className="pillar-node-option-index">0{index + 1} / 04</span>
                    <span className="pillar-node-option-copy"><span>{pillar.eyebrow}</span><strong>{pillar.title}</strong></span>
                    <ArrowUpRight className="pillar-node-option-arrow" size={20} aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter home />
    </main>
  )
}

function PillarPage({ pillar }: { pillar: (typeof pillarStories)[number] }) {
  const [iotLayout, setIotLayout] = useState(0)
  const [activeIotGroup, setActiveIotGroup] = useState(0)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${pillar.title === 'IoT' ? 'IIoT Services' : pillar.title} | Leeoteck India`
    return () => { document.title = previousTitle }
  }, [pillar])

  return (
    <main className="pillar-detail-page" data-pillar={pillar.title}>
      <SiteHeader />

      {pillar.title !== 'IoT' && <section className="pillar-detail-hero">
        <img src={pillar.image} alt="" fetchPriority="high" />
        <div className="pillar-detail-hero-shade" />
        <div className="pillar-detail-hero-copy">
          <p className="eyebrow"><span className="status-dot" /> {pillar.eyebrow}</p>
          <p className="pillar-detail-kicker">LEEOTECK / {pillar.title === 'IoT' ? 'INTERNET OF THINGS SOLUTIONS AND SERVICES' : 'CONNECTED CAPABILITIES'}</p>
          <h1>{pillar.title}<br /><span>{pillar.headline}</span></h1>
          <p>{pillar.text}</p>
          <a className="pillar-detail-cta" href="#pillar-solutions">Explore solutions <ArrowDownRight size={16} /></a>
        </div>
        <span className="pillar-detail-index">CAPABILITY / 0{pillarStories.indexOf(pillar) + 1} — 04</span>
      </section>}

      {pillar.title === 'IoT' ? (
        <>
          <section className="iot-service-section" id="pillar-solutions" aria-labelledby="iot-services-title">
            <header className="iot-service-heading">
              <p className="eyebrow eyebrow-dark">LEEOTECK / CONNECTED SYSTEMS</p>
              <h2 id="iot-services-title">IIoT <span>Services</span></h2>
              <p>From connected equipment to smart buildings and infrastructure, bring operational data into a clearer view.</p>
            </header>
            <div className="iot-layout-picker" role="group" aria-label="Choose an IoT services layout">
              {iotLayoutOptions.map((option, index) => (
                <button type="button" key={option} aria-pressed={iotLayout === index} onClick={() => setIotLayout(index)}>
                  <span>0{index + 1}</span>{option}
                </button>
              ))}
            </div>
            {iotLayout === 0 ? (
              <div className={`iot-service-grid iot-layout-${iotLayout}`}>
                {iotServiceGroups.map(({ title, Icon, image, imageAlt, items }, index) => (
                  <article className="iot-service-card" key={title}>
                    <div className="iot-service-card-media">
                      {image
                        ? <img className="iot-service-card-image" src={image} alt={imageAlt} loading="eager" />
                        : <span className="iot-service-icon"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>}
                    </div>
                    <div className="iot-service-card-copy">
                      <span className="iot-service-number">0{index + 1} / 04</span>
                      <h3>{title}</h3>
                      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  </article>
                ))}
              </div>
            ) : iotLayout === 1 ? (
              <div className="iot-image-tabs-layout">
                <div className="iot-image-tabs" role="tablist" aria-label="IoT service categories">
                  {iotServiceGroups.map((group, index) => (
                    <button type="button" role="tab" key={group.title} aria-selected={activeIotGroup === index} onClick={() => setActiveIotGroup(index)}>
                      <span>0{index + 1}</span>{group.title}
                    </button>
                  ))}
                </div>
                <article className="iot-image-tab-panel" role="tabpanel">
                  <img src={iotServiceGroups[activeIotGroup].image} alt={iotServiceGroups[activeIotGroup].imageAlt} />
                  <div className="iot-service-card-copy">
                    <span className="iot-service-number">0{activeIotGroup + 1} / 04</span>
                    <h3>{iotServiceGroups[activeIotGroup].title}</h3>
                    <ul>{iotServiceGroups[activeIotGroup].items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </article>
              </div>
            ) : (
              <div className="iot-service-index-layout">
                <nav className="iot-service-index" aria-label="IoT service index">
                  {iotServiceGroups.map((group, index) => (
                    <button type="button" key={group.title} className={activeIotGroup === index ? 'is-active' : ''} onClick={() => setActiveIotGroup(index)}>
                      <span>0{index + 1}</span><strong>{group.title}</strong><ArrowUpRight size={17} />
                    </button>
                  ))}
                </nav>
                <article className="iot-index-panel">
                  <div className="iot-service-card-copy">
                    <span className="iot-service-number">0{activeIotGroup + 1} / 04</span>
                    <h3>{iotServiceGroups[activeIotGroup].title}</h3>
                    <ul>{iotServiceGroups[activeIotGroup].items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <img src={iotServiceGroups[activeIotGroup].image} alt={iotServiceGroups[activeIotGroup].imageAlt} />
                </article>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="pillar-detail-solutions" id="pillar-solutions">
          <div className="pillar-detail-section-heading">
            <p className="eyebrow eyebrow-dark">WHAT WE DELIVER</p>
            <h2>Solutions for<br /><span>{pillar.title}.</span></h2>
            <p>Connected engineering, implementation and support shaped around your operation.</p>
          </div>
          <ol className="pillar-detail-solution-list">
            {pillar.title === 'Automation'
              ? automationSolutionPages.map((solution, index) => (
                <li key={solution.slug}>
                  <a className="automation-solution-link" href={`${pillars[1].route}/${solution.slug}`}>
                    <span>0{index + 1}</span>
                    <h3>{solution.title}</h3>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </li>
              ))
              : pillar.solutions.map((solution, index) => (
                <li key={solution}>
                  <span>0{index + 1}</span>
                  <h3>{solution}</h3>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </li>
              ))}
          </ol>
        </section>
      )}

      {pillar.title !== 'IoT' && <section className="pillar-detail-next">
        <div>
          <p className="eyebrow">ONE CONNECTED FUTURE</p>
          <h2>Bring your next<br /><span>operation into focus.</span></h2>
        </div>
        <a href="/#contact">Start a conversation <ArrowUpRight size={16} /></a>
      </section>}

      <SiteFooter />
    </main>
  )
}

function AutomationSolutionPage({ solution }: { solution: (typeof automationSolutionPages)[number] }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${solution.title} | Leeoteck India`
    return () => { document.title = previousTitle }
  }, [solution])

  return (
    <main className="automation-solution-page">
      <SiteHeader />
      <section className="automation-solution-hero">
        <img src="/images/stories/iot3.jpeg" alt="Robotic production line and connected industrial automation equipment" fetchPriority="high" />
        <div className="automation-solution-hero-shade" />
        <div className="automation-solution-hero-copy">
          <a className="automation-solution-back" href={pillars[1].route}><ArrowDownRight size={14} /> All automation solutions</a>
          <p className="eyebrow"><span className="status-dot" /> {solution.eyebrow}</p>
          <h1>{solution.title}</h1>
          <p>{solution.summary}</p>
        </div>
      </section>
      <section className="automation-solution-content">
        <header>
          <p className="eyebrow eyebrow-dark">SOLUTION SCOPE</p>
          <h2>Engineered around<br /><span>your operation.</span></h2>
          <p>From system definition through integration and site delivery, we shape the work around process requirements, equipment and operator needs.</p>
        </header>
        <ol>
          {solution.points.map((point, index) => (
            <li key={point}>
              <span>0{index + 1}</span>
              <h3>{point}</h3>
              <ArrowUpRight size={17} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>
      <section className="automation-solution-outcome">
        <p className="eyebrow">OPERATIONAL OUTCOME</p>
        <p>{solution.outcome}</p>
        <a href="/#contact">Discuss this solution <ArrowUpRight size={15} /></a>
      </section>
      <SiteFooter />
    </main>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const automationSlug = path.startsWith(`${pillars[1].route}/`) ? path.slice(pillars[1].route.length + 1) : ''
  const automationSolution = automationSolutionPages.find((solution) => solution.slug === automationSlug)
  const pillar = pillarStories.find((item) => pillars.find((entry) => entry.name === item.title)?.route === path)
  if (automationSolution) return <AutomationSolutionPage solution={automationSolution} />
  return pillar ? <PillarPage pillar={pillar} /> : <HomePage />
}

export default App
