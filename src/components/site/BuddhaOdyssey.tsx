import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { IMAGES } from "@/lib/site-data";

/* ============================================================
   CONFIGURATION
   ============================================================ */

const STAGES = 10;

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export function BuddhaOdyssey({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /*
   * Track the complete page scroll.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /*
   * Smooth scroll progress.
   */
  const smoothP = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.8,
  });

  /* ==========================================================
     BUDDHA X MOVEMENT

     Keep the Buddha inside the screen.
     ========================================================== */

  const statueX = useTransform(
    smoothP,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [
      "-8vw",
      "4vw",
      "-6vw",
      "8vw",
      "-7vw",
      "6vw",
      "-8vw",
      "7vw",
      "-6vw",
      "5vw",
      "-10vw",
    ],
  );

  /* ==========================================================
     BUDDHA Y MOVEMENT
     ========================================================== */

  const statueY = useTransform(
    smoothP,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [
      "4vh",
      "-5vh",
      "7vh",
      "-6vh",
      "7vh",
      "-5vh",
      "6vh",
      "-8vh",
    ],
  );

  /* ==========================================================
     BUDDHA ROTATION
     ========================================================== */

  const statueRotate = useTransform(
    smoothP,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-2, 1.2, -1.4, 1.5, -1.2, -2],
  );

  /* ==========================================================
     BUDDHA SCALE

     Never gets too small.
     ========================================================== */

  const statueScale = useTransform(
    smoothP,
    [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [
      0.72,
      0.88,
      0.78,
      0.95,
      0.82,
      0.98,
      0.84,
      0.72,
    ],
  );

  /* ==========================================================
     BUDDHA OPACITY
     ========================================================== */

  const statueOpacity = useTransform(
    smoothP,
    [0, 0.03, 0.9, 0.97, 1],
    [0.25, 1, 1, 0.9, 0.35],
  );

  /* ==========================================================
     HALO
     ========================================================== */

  const haloPulse = useTransform(
    smoothP,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [
      0.7,
      0.95,
      0.75,
      1.05,
      0.82,
      1.0,
      0.8,
      0.7,
    ],
  );

  const haloHue = useTransform(
    smoothP,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 1, 0],
  );

  /* ==========================================================
     DUST
     ========================================================== */

  const dustY = useTransform(
    smoothP,
    [0, 1],
    ["0%", "-100%"],
  );

  const dustDensity = useTransform(
    smoothP,
    [0, 0.15, 0.8, 1],
    [0.15, 0.8, 0.8, 0.25],
  );

  /* ==========================================================
     BACKGROUND VIGNETTE
     ========================================================== */

  const vignetteOpacity = useTransform(
    smoothP,
    [0, 0.1, 0.5, 0.9, 1],
    [0.2, 0.85, 1, 0.85, 0.25],
  );

  /* ==========================================================
     RIPPLE 1
     ========================================================== */

  const rippleScale = useTransform(
    smoothP,
    (p) => 0.75 + (p % 0.2) * 4,
  );

  const rippleOpacity = useTransform(
    smoothP,
    (p) =>
      (1 - ((p * 5) % 1)) * 0.28,
  );

  /* ==========================================================
     RIPPLE 2
     ========================================================== */

  const ripple2Scale = useTransform(
    smoothP,
    (p) =>
      1 + ((p + 0.1) % 0.25) * 4,
  );

  const ripple2Opacity = useTransform(
    smoothP,
    (p) =>
      (1 - (((p + 0.13) * 4.4) % 1)) *
      0.18,
  );

  /* ==========================================================
     IMAGE COLOR
     ========================================================== */

  const imageBrightness = useTransform(
    smoothP,
    [0, 0.2, 0.5, 0.8, 1],
    [0.7, 1, 0.92, 1.04, 0.82],
  );

  const imageSaturate = useTransform(
    smoothP,
    [0, 0.2, 0.5, 0.8, 1],
    [0.65, 1.05, 0.95, 1.15, 0.9],
  );

  const imageSepia = useTransform(
    smoothP,
    [0, 0.3, 0.6, 1],
    [0.18, 0.03, 0.07, 0.12],
  );

  const imageContrast = useTransform(
    smoothP,
    [0, 0.5, 1],
    [0.95, 1.06, 1],
  );

  /* ==========================================================
     GOLD GLOW
     ========================================================== */

  const glowOpacity = useTransform(
    smoothP,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.1, 0.75, 0.35, 0.85, 0.4, 0.1],
  );

  /* ==========================================================
     MOUSE TILT
     ========================================================== */

  const [mounted, setMounted] =
    useState(false);

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const reduced =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    setMounted(!reduced);
  }, []);

  /* ==========================================================
     RETURN
     ========================================================== */

  return (
    <div
      ref={ref}
      className="
        relative
        isolate
        min-h-screen
        bg-background
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
          ===================================================== */}

      <motion.div
        style={{
          opacity: vignetteOpacity,
        }}
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
        "
      >
        {/* Main radial light */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120vw 75vh at 50% 45%, oklch(0.79 0.09 84 / 0.10), transparent 62%)",
          }}
        />

        {/* Moving color */}

        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              haloHue,
              (h) =>
                `radial-gradient(circle at 50% 50%, oklch(0.92 0.07 ${
                  78 + h * 10
                } / 0.07), oklch(0.63 0.05 158 / 0.04) 45%, transparent 72%)`,
            ),
          }}
        />
      </motion.div>

      {/* =====================================================
          FLOATING PARTICLES
          ===================================================== */}

      <motion.div
        style={{
          y: dustY,
          opacity: dustDensity,
        }}
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[2]
          overflow-hidden
        "
      >
        {Array.from({
          length: 70,
        }).map((_, i) => {
          const left =
            (i * 67) % 100;

          const size =
            1 + ((i * 17) % 4);

          const delay =
            (i % 11) * 0.35;

          const duration =
            9 + (i % 8) * 1.4;

          const bright =
            i % 4 === 0;

          return (
            <span
              key={i}
              className="
                absolute
                block
                rounded-full
              "
              style={{
                left: `${left}%`,
                bottom: `-${(i * 11) % 28}px`,
                width: `${size}px`,
                height: `${size}px`,

                background: bright
                  ? "oklch(0.92 0.07 92 / 0.95)"
                  : "oklch(0.79 0.09 84 / 0.55)",

                filter: bright
                  ? "blur(0.2px) drop-shadow(0 0 6px oklch(0.79 0.09 84 / 0.6))"
                  : "blur(0.3px)",

                animation:
                  `lumea-drift ${duration}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </motion.div>

      {/* =====================================================
          CENTER HALO
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-1/2
          top-1/2
          z-[3]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        {/* Main halo */}

        <motion.div
          style={{
            scale: haloPulse,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[78vmin]
            w-[78vmin]
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          {/* Outer glow */}

          <div
            className="
              absolute
              -inset-4
              rounded-full
            "
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, oklch(0.79 0.09 84 / 0), oklch(0.79 0.09 84 / 0.14), oklch(0.92 0.07 92 / 0.25), oklch(0.88 0.055 88 / 0.16), oklch(0.79 0.09 84 / 0.14), oklch(0.79 0.09 84 / 0))",

              filter:
                "blur(50px)",
            }}
          />

          {/* Inner light */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[84%]
              w-[84%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
            "
            style={{
              background:
                "radial-gradient(circle at 50% 50%, oklch(0.94 0.08 94 / 0.28), oklch(0.79 0.09 84 / 0.10) 45%, transparent 72%)",

              filter:
                "blur(2px)",
            }}
          />

          {/* Inner ring */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[58%]
              w-[58%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-gold/22
            "
            style={{
              boxShadow:
                "inset 0 0 80px oklch(0.79 0.09 84 / 0.22)",
            }}
          />

          {/* Outer ring */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[78%]
              w-[78%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-gold/10
            "
          />
        </motion.div>

        {/* ===================================================
            RIPPLE
            =================================================== */}

        <motion.div
          style={{
            scale: rippleScale,
            opacity: rippleOpacity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[70vmin]
            w-[70vmin]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-gold/30
          "
        />

        <motion.div
          style={{
            scale: ripple2Scale,
            opacity: ripple2Opacity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[70vmin]
            w-[70vmin]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-gold-soft/25
          "
        />

        {/* ===================================================
            BUDDHA
            =================================================== */}

        <motion.div
          style={{
            x: statueX,
            y: statueY,
            scale: statueScale,
            rotate: statueRotate,
            opacity: statueOpacity,
          }}
          onPointerMove={(e) => {
            if (!mounted) return;

            setTilt({
              x:
                (e.clientX /
                  window.innerWidth -
                  0.5) *
                8,

              y:
                (e.clientY /
                  window.innerHeight -
                  0.5) *
                6,
            });
          }}
          onPointerLeave={() => {
            if (!mounted) return;

            setTilt({
              x: 0,
              y: 0,
            });
          }}
          className="
            relative
            flex
            items-center
            justify-center
          "
        >
          <motion.div
            animate={
              mounted
                ? {
                    x: tilt.x * 0.45,
                    y: tilt.y * 0.45,
                  }
                : {
                    x: 0,
                    y: 0,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 25,
              mass: 0.55,
            }}
            className="
              relative
              flex
              items-center
              justify-center
            "
          >
            {/* =================================================
                BUDDHA IMAGE
                ================================================= */}

           <motion.figure
  className="
    relative
    h-[48vh]
    w-[36vh]
    max-h-[600px]
    max-w-[80vw]
    overflow-hidden
    rounded-[2rem]
    border
    border-gold/18
    bg-black/20
    shadow-[0_30px_90px_-30px_oklch(0.79_0.09_84_/_0.4)]

    sm:h-[52vh]
    sm:w-[39vh]

    md:h-[56vh]
    md:w-[42vh]

    lg:h-[60vh]
    lg:w-[45vh]
  "
>
              {/* Image background */}

              <div
                className="
                  absolute
                  inset-0
                  bg-black
                "
              />

              {/* Buddha */}

              <motion.img
                src={IMAGES.buddha}
                alt="Gautama Buddha"
                draggable={false}
                className="
                  relative
                  z-10
                  block
                  h-full
                  w-full
                  object-contain
                "
                width={1200}
                height={1600}
                fetchPriority="high"
                style={{
                  filter: useTransform(
                    [
                      imageBrightness,
                      imageSaturate,
                      imageSepia,
                      imageContrast,
                    ],
                    ([
                      brightness,
                      saturate,
                      sepia,
                      contrast,
                    ]) =>
                      `brightness(${brightness}) saturate(${saturate}) sepia(${sepia}) contrast(${contrast})`,
                  ),
                }}
              />

              {/* =================================================
                  IMAGE LIGHT
                  ================================================= */}

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-20
                "
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.14 0.006 70 / 0.22) 0%, transparent 40%, transparent 62%, oklch(0.14 0.006 70 / 0.55) 100%), radial-gradient(130% 72% at 50% 0%, oklch(0.92 0.07 92 / 0.22), transparent 58%)",

                  mixBlendMode:
                    "screen",
                }}
              />

              {/* =================================================
                  GOLDEN CENTER GLOW
                  ================================================= */}

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-30
                  mix-blend-overlay
                "
                style={{
                  background:
                    "radial-gradient(92% 72% at 50% 36%, oklch(0.92 0.07 92 / 0.28), transparent 65%)",
                }}
              />

              {/* =================================================
                  BOTTOM LIGHT
                  ================================================= */}

              <motion.div
                aria-hidden="true"
                style={{
                  opacity:
                    glowOpacity,
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-30
                "
              >
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-1/3
                  "
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, oklch(0.79 0.09 84 / 0.18), oklch(0.79 0.09 84 / 0.38))",

                    filter:
                      "blur(14px)",
                  }}
                />
              </motion.div>

              {/* =================================================
                  SOFT EDGE
                  ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-40
                  rounded-[2.4rem]
                  ring-1
                  ring-inset
                  ring-gold/10
                "
              />
            </motion.figure>

            {/* =================================================
                FLOOR GLOW
                ================================================= */}

            <motion.div
              style={{
                opacity:
                  glowOpacity,
              }}
              aria-hidden="true"
              className="
                absolute
                -bottom-8
                left-1/2
                h-10
                w-[82%]
                -translate-x-1/2
                rounded-[50%]
                bg-gold/40
                blur-3xl
              "
            />

            <motion.div
              aria-hidden="true"
              className="
                absolute
                -bottom-5
                left-1/2
                h-4
                w-[70%]
                -translate-x-1/2
                rounded-[50%]
                bg-gold/28
                blur-2xl
              "
            />
          </motion.div>
        </motion.div>
      </div>

      {/* =======================================================
          PAGE CONTENT

          IMPORTANT:
          This is above the Buddha/background.
          ======================================================= */}

      <main
        className="
          relative
          z-20
          min-h-screen
          w-full
        "
      >
        {children}
      </main>

      {/* =======================================================
          STAGE NAVIGATION
          ======================================================= */}

      <StageMarkers
        progress={smoothP}
      />
    </div>
  );
}

/* ============================================================
   STAGE MARKERS
   ============================================================ */

function StageMarkers({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const labels = [
    "Arrival",
    "Sanctuary",
    "Rituals",
    "Apothecary",
    "Journey",
    "Belonging",
    "Whispers",
    "Gallery",
    "Boutique",
    "Farewell",
  ];

  const opacity = useTransform(
    progress,
    [0.02, 0.06, 0.94, 0.98],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{
        opacity,
      }}
      className="
        pointer-events-none
        fixed
        right-5
        top-1/2
        z-[50]
        hidden
        -translate-y-1/2
        lg:block
      "
    >
      <ol
        className="
          flex
          flex-col
          gap-3
        "
      >
        {labels.map(
          (label, index) => {
            const start =
              index / STAGES;

            const end =
              (index + 1) / STAGES;

            const dot = useTransform(
              progress,
              (p) => {
                if (
                  p >= start &&
                  p < end
                ) {
                  return 1;
                }

                if (p < start) {
                  return 0.25;
                }

                return 0.5;
              },
            );

            const active = useTransform(
              progress,
              (p) =>
                p >= start &&
                p < end
                  ? 1
                  : 0,
            );

            return (
              <li
                key={`${label}-${index}`}
                className="
                  flex
                  items-center
                  justify-end
                  gap-3
                "
              >
                {/* Label */}

                <motion.span
                  style={{
                    opacity: dot,
                  }}
                  className="
                    text-[0.52rem]
                    uppercase
                    tracking-[0.28em]
                    text-ivory/70
                  "
                >
                  {label}
                </motion.span>

                {/* Dot */}

                <motion.span
                  style={{
                    opacity: dot,

                    scale: useTransform(
                      dot,
                      (value) =>
                        0.65 +
                        value * 0.6,
                    ),

                    boxShadow:
                      useTransform(
                        active,
                        (value) =>
                          value
                            ? "0 0 0 1px oklch(0.79 0.09 84 / 0.6), 0 0 18px 4px oklch(0.79 0.09 84 / 0.5)"
                            : "none",
                      ),
                  }}
                  className="
                    block
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-gold
                  "
                />
              </li>
            );
          },
        )}
      </ol>
    </motion.div>
  );
}