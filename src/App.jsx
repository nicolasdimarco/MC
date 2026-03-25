import { useEffect, useRef, useState } from "react";
import logoUrl from "../logo.png";

const navItems = [
  { href: "#la-cooperativa", label: "La cooperativa" },
  { href: "#etapas-proyecto", label: "Plan estratégico" },
  { href: "#servicios", label: "Servicios" },
  { href: "#impacto", label: "Impacto" },
  { href: "#contacto", label: "Contacto" },
];

const serviceCards = [
  [
    "Residuos de Hospedaje",
    "Recolección de residuos en alojamientos para acompañar el crecimiento turístico con una gestión más ordenada y responsable.",
  ],
  [
    "Residuos Gastronómicos",
    "Servicio pensado para establecimientos gastronómicos, con logística adaptada a los volúmenes y dinámicas de temporada.",
  ],
  [
    "Restos de Obra",
    "Retiro de residuos de obra con foco en separación, trazabilidad y reducción del impacto ambiental local.",
  ],
  [
    "Restos de Poda",
    "Recolección de restos de poda con opción de chipeado in situ para disminuir traslados y aprovechar recursos.",
  ],
];

const stages = [
  [
    "Fase inicial",
    "Resolver la logística y gestión de residuos voluminosos: hospedaje, gastronomía, obras y poda.",
  ],
  [
    "Estabilización y expansión",
    "Implementar la logística para hogares y fomentar acciones para la reutilización local de residuos.",
  ],
  [
    "Consolidación",
    "Disminuir residuos, fortalecer la articulación con San Martín de los Andes y dar inicio a un sistema de economía circular, para transformar residuos en recursos.",
  ],
];

const impacts = [
  [
    "Reducción de traslados",
    "Menos viajes a San Martín de los Andes gracias a soluciones locales y una gestión más eficiente.",
  ],
  [
    "Gestión local",
    "Procesamiento, separación y tratamiento en origen para fortalecer la autonomía del pueblo.",
  ],
  [
    "Menor huella de carbono",
    "Menos emisiones asociadas al transporte y mejor aprovechamiento de los residuos recuperables.",
  ],
  [
    "Economía circular",
    "Reutilizar, reciclar, compostar y reducir para retroalimentar procesos comunitarios de valor.",
  ],
];

const communityStats = [
  { value: 400, suffix: "+", label: "viviendas permanentes en la comunidad." },
  { value: 5, suffix: "x", label: "crece la población durante el verano." },
  { value: 85, suffix: "%", label: "de las familias ya separa residuos." },
];

function AnimatedStatNumber({ value, suffix, start }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setDisplayValue(0);
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return undefined;
    }

    setDisplayValue(0);

    const totalSteps = 36;
    const stepDuration = 42;
    let currentStep = 0;
    let timerId;

    const startTimeoutId = window.setTimeout(() => {
      timerId = window.setInterval(() => {
        currentStep += 1;

        const nextValue =
          currentStep >= totalSteps
            ? value
            : Math.round((value * currentStep) / totalSteps);

        setDisplayValue(nextValue);

        if (currentStep >= totalSteps) {
          window.clearInterval(timerId);
        }
      }, stepDuration);
    }, 180);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (timerId) {
        window.clearInterval(timerId);
      }
    };
  }, [start, value]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

function useInViewOnce() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || isVisible) {
      return undefined;
    }

    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return [elementRef, isVisible];
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Zm0 1.5v.2l8 5.3 8-5.3V8H4Zm16 8V9.9l-7.6 5a.75.75 0 0 1-.8 0L4 9.9V16h16Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6.7 3.5h2.6c.4 0 .8.3.9.7l.8 3.5a1 1 0 0 1-.3 1l-1.6 1.4a14.2 14.2 0 0 0 4.8 4.8l1.4-1.6a1 1 0 0 1 1-.3l3.5.8c.4.1.7.5.7.9v2.6a1.2 1.2 0 0 1-1.2 1.2h-.8C10.4 20.5 3.5 13.6 3.5 5.9v-.8c0-.9.5-1.6 1.2-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const renderLink = (item) => (
    <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
      {item.label}
    </a>
  );

  return (
    <header className="site-header">
      <div className="shell">
        <div className="header-bar">
          <a
            className="brand"
            href="la-cooperativa"
            aria-label="Meliquina Circular"
          >
            <img
              className="brand-logo"
              src={logoUrl}
              alt="Logo de Meliquina Circular"
            />
            <div className="brand-copy">
              <span>Cooperativa de Servicios</span>
              <strong>Meliquina Circular</strong>
            </div>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map(renderLink)}
          </nav>

          <button
            className={`menu-toggle ${open ? "is-open" : ""}`}
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`mobile-panel ${open ? "is-open" : ""}`}
        >
          <nav className="mobile-nav" aria-label="Navegación móvil">
            {navItems.map(renderLink)}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [communityStatsRef, communityStatsVisible] = useInViewOnce();

  return (
    <>
      <Header />

      <main>
        <section id="la-cooperativa" className="section section--hero">
          <div className="shell">
            <div className="section-intro">
              <div className="eyebrow">La cooperativa</div>
              <h1 className="section-title">
                Promoviendo prácticas sostenibles y economía circular en Villa
                Lago Meliquina
              </h1>
              <p className="section-subtitle">
                Meliquina Circular nace del trabajo voluntario de vecinos y
                vecinas que, durante meses, se organizaron para construir una
                respuesta comunitaria sin fines de lucro para la gestión de
                residuos y al impacto adicional que genera la actividad
                turística.
              </p>
              <p className="section-subtitle">
                Hoy somos una cooperativa en formación con una misión clara:
                desarrollar un servicio local, transparente y sostenible que
                reduzca traslados, fortalezca la separación en origen y cuide el
                entorno natural de nuestro pueblo.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#servicios">
                  Conocer servicios
                </a>
                <a className="button button-secondary" href="#contacto">
                  Quiero participar
                </a>
              </div>
            </div>

            <div className="hero-grid section-group">
              <div className="community-stats">
                <div
                  ref={communityStatsRef}
                  className={`stat-grid stat-grid--animated ${communityStatsVisible ? "is-visible" : ""}`}
                >
                  {communityStats.map(({ value, suffix, label }) => (
                    <div key={label} className="stat">
                      <strong>
                        <AnimatedStatNumber
                          value={value}
                          suffix={suffix}
                          start={communityStatsVisible}
                        />
                      </strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mini-grid">
                <div className="panel">
                  <h3>Nuestra misión</h3>
                  <p>
                    Resolver la gestión de residuos de Villa Lago Meliquina
                    aplicando conceptos de economía circular, cuidado ambiental
                    y participación activa de la comunidad.
                  </p>
                </div>
                <div className="panel">
                  <h3>Nuestra visión</h3>
                  <p>
                    Ser una cooperativa referente en gestión ambiental
                    comunitaria por su impacto positivo, transparencia y
                    capacidad de disminuir residuos mediante separación y
                    tratamiento en origen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="etapas-proyecto" className="section section--stages">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <div className="eyebrow">Cómo avanzamos</div>
              <h2 className="section-title">Plan Estratégico</h2>
              <p className="section-subtitle">
                El crecimiento de la cooperativa está pensado en fases,
                priorizando las necesidades más urgentes del pueblo y ampliando
                el sistema de manera ordenada.
              </p>
            </div>

            <div className="timeline-grid section-group">
              {stages.map(([title, description], index) => (
                <article key={title} className="timeline-card">
                  <div className="timeline-step">0{index + 1}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="section section--services">
          <div className="shell">
            <div className="section-intro">
              <div className="eyebrow">Qué hacemos</div>
              <h2 className="section-title">
                Servicios y acciones para una gestión local de residuos
              </h2>
              <p className="section-subtitle">
                Nuestro modelo se apoya en los principios de la economía
                circular para disminuir el volumen que debe trasladarse fuera de
                la localidad.
              </p>
            </div>
            <div className="section-group">
              <div className="services-grid">
                {serviceCards.map(([title, description]) => (
                  <article key={title} className="service-card">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="impacto" className="section section--impact">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <div className="eyebrow">Impacto esperado</div>
              <h2 className="section-title">
                Proyección de cambios para Meliquina
              </h2>
              <p className="section-subtitle">
                El objetivo es consolidar una gestión local de residuos que
                reduzca traslados, fortalezca la separación en origen y
                multiplique el valor ambiental y comunitario.
              </p>
            </div>

            <div className="section-group">
              <div className="benefits-grid">
                {impacts.map(([title, description]) => (
                  <article key={title} className="benefit-card">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="section section--contact">
          <div className="shell">
            <div className="contact-eyebrow-row">
              <div className="eyebrow">Contacto</div>
            </div>

            <div className="contact-grid contact-grid--hero">
              <div className="section-intro section-intro--contact">
                <h2 className="section-title">
                  Trabajemos juntos por un futuro más circular para Meliquina
                </h2>
                <p className="section-subtitle">
                  Si realizás una actividad que pueda sumarse a nuestra
                  propuesta, si te interesa asociarte, o si necesitás contratar
                  nuestros servicios, queremos escucharte.
                </p>
              </div>

              <aside className="contact-card contact-card--accent contact-card--wide">
                <p>
                  Podés escribirnos por mail o por WhatsApp para consultar sobre
                  asociación, servicios, alianzas o acciones compartidas con la
                  cooperativa.
                </p>

                <div className="contact-details">
                  <a
                    className="contact-link"
                    href="mailto:meliquinacircular@gmail.com"
                  >
                    <span className="contact-icon" aria-hidden="true">
                      <MailIcon />
                    </span>
                    <span>meliquinacircular@gmail.com</span>
                  </a>
                  <a className="contact-link" href="tel:+5492972433181">
                    <span className="contact-icon" aria-hidden="true">
                      <PhoneIcon />
                    </span>
                    <span>+54 9 2972433181</span>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-bar">
          <div>
            © 2026 Meliquina Circular · Cooperativa en formación sin fines de
            lucro
          </div>
          <div>
            Villa Lago Meliquina · Economía circular y gestión comunitaria
          </div>
        </div>
      </footer>
    </>
  );
}
