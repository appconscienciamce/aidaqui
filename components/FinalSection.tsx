import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ctaPrimary = "QUIERO RESERVAR MI LUGAR";
const ctaSupport = "CONTACTA CON SOPORTE";

const schedules = [
  { country: "España",    src: "/espana.webp" },
  { country: "Argentina", src: "/argentina.webp" },
  { country: "México",    src: "/mexico.webp" },
  { country: "Colombia",  src: "/colombia.webp" },
];

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Skip animations on mobile — ScrollTrigger start point can miss on short viewports
    // leaving elements stuck at opacity:0
    if (window.matchMedia("(max-width: 700px)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => tl.play(),
          onEnterBack: () => {},
        },
        paused: true,
        onComplete: () => {
          // Guarantee final state — clears inline styles GSAP set
          gsap.set(el.querySelectorAll(".final-logo, .final-title, .final-actions > *, .final-schedule-wrap"), {
            clearProps: "opacity,transform",
          });
        },
      });

      tl.from(el.querySelector(".final-logo"), {
        opacity: 0, y: -16, duration: 0.6, ease: "power2.out",
      });

      const titleEl = el.querySelector<HTMLElement>(".final-title");
      if (titleEl) {
        const split = new SplitType(titleEl, { types: "lines" });
        split.lines?.forEach((line) => {
          const w = document.createElement("div");
          w.style.overflow = "hidden";
          line.parentNode?.insertBefore(w, line);
          w.appendChild(line);
        });
        tl.from(split.lines, {
          y: "100%", opacity: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
        }, "-=0.3");
      }

      tl.from(el.querySelectorAll(".final-actions > *"), {
        opacity: 0, y: 20, stagger: 0.14, duration: 0.6, ease: "power2.out",
      }, "-=0.4");

      tl.from(el.querySelectorAll(".final-schedule-wrap"), {
        opacity: 0, y: 14, stagger: 0.09, duration: 0.5, ease: "power2.out",
      }, "-=0.3");

      // If section already visible on load, play immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        tl.play();
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="final-section" aria-labelledby="final-title">
        <div className="final-bg" aria-hidden="true" />
        <div className="final-overlay" aria-hidden="true" />

        <div className="final-shell">
          <Image
            src="/logotipo.png"
            alt="Activación de la Frecuencia Original"
            width={420}
            height={65}
            className="final-logo"
            style={{ width: "100%", maxWidth: 420, height: "auto" }}
          />

          <h2 className="final-title" id="final-title">
            Te espero este 22 de mayo vía Zoom para <mark className="final-highlight">recordar quién eres</mark> más allá del ruido, el miedo y las versiones que ya no te representan.
          </h2>

          <div className="final-actions">
            <a
              href="https://buy.stripe.com/8x200bbsAf5A3US1ge2400E"
              className="button final-cta-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="outline" />
              <div className="state state--default">
                <div className="icon" aria-hidden="true">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <g style={{ filter: "url(#sparkleFinal)" }}>
                      <path
                        d="M12 2.5l2.4 6.1L20.5 11l-6.1 2.4L12 19.5l-2.4-6.1L3.5 11l6.1-2.4L12 2.5z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <filter id="sparkleFinal">
                        <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <p>
                  {ctaPrimary.split("").map((char, i) => (
                    <span key={i} style={{ "--i": i } as React.CSSProperties}>
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </p>
              </div>
            </a>

            <button className="button final-cta-support" type="button">
              <div className="outline" />
              <div className="state state--default">
                <div className="icon" aria-hidden="true">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p>
                  {ctaSupport.split("").map((char, i) => (
                    <span key={i} style={{ "--i": i } as React.CSSProperties}>
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </p>
              </div>
            </button>
          </div>

          <div className="final-schedules" aria-label="Horarios por país">
            {schedules.map(({ country, src }) => (
              <div key={country} className="final-schedule-wrap">
                <Image
                  src={src}
                  alt={`Horario ${country}`}
                  width={160}
                  height={56}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>

          <div className="final-rule" aria-hidden="true">
            <span className="final-rule__line" />
            <span className="final-rule__gem">✦</span>
            <span className="final-rule__line" />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Aida Qui · Todos los derechos reservados
        </p>
      </footer>
    </>
  );
}
