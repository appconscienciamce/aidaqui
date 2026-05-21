import Image from "next/image";

const schedules = [
  { country: "España", src: "/espana.webp" },
  { country: "Argentina", src: "/argentina.webp" },
  { country: "México", src: "/mexico.webp" },
  { country: "Colombia", src: "/colombia.webp" },
];

const ctaText = "Reservar mi lugar";

export default function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          <div className="hero-badges" aria-label="Detalles de la experiencia">
            {/* SVGs must use native img — Next Image degrades vector quality at non-native sizes */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/badge-1.webp" alt="Experiencia en vivo" className="hero-badge" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/badge-2.webp" alt="22 de mayo" className="hero-badge" />
          </div>

          <h1 id="hero-title" className="hero-title">
            Hay una parte de ti que ya no puede seguir viviendo desconectada de
            su verdad.
          </h1>

          <Image
            className="hero-logo"
            src="/logotipo.png"
            alt="Activación de la Frecuencia Original"
            width={460}
            height={71}
            priority
          />

          <p className="hero-description">
            Una experiencia profunda diseñada para liberar bloqueos energéticos,
            reconectar con tu intuición y volver a sentirte alinead@ contigo.
          </p>

          <div className="hero-schedules" aria-label="Horarios por país">
            {schedules.map(({ country, src }) => (
              <div key={country} className="hero-schedule-wrap">
                <Image
                  src={src}
                  alt={`Horario ${country}`}
                  width={160}
                  height={56}
                  priority
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>

          <a
            href="https://buy.stripe.com/8x200bbsAf5A3US1ge2400E"
            className="button hero-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="outline" />
            <div className="state state--default">
              <div className="icon" aria-hidden="true">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g style={{ filter: "url(#sparkleShadow)" }}>
                    <path
                      d="M12 2.5l2.4 6.1L20.5 11l-6.1 2.4L12 19.5l-2.4-6.1L3.5 11l6.1-2.4L12 2.5z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <filter id="sparkleShadow">
                      <feDropShadow
                        dx="0"
                        dy="1"
                        stdDeviation="0.6"
                        floodOpacity="0.5"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <p>
                {ctaText.split("").map((char, i) => (
                  <span key={`cta-${char}-${i}`} style={{ "--i": i } as React.CSSProperties}>
                    {char === " " ? " " : char}
                  </span>
                ))}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
