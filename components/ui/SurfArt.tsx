import type { CSSProperties } from 'react';

/**
 * SurfArt — composições gráficas originais
 * ----------------------------------------
 * A escola ainda não enviou fotos e este projeto NÃO usa foto de terceiros nem
 * imagem de outra escola. Enquanto isso, cada slot de imagem do site recebe uma
 * composição vetorial autoral, gerada a partir de uma semente para ficar
 * estável entre builds.
 *
 * Vantagens práticas: zero requisição de rede, zero CLS, escala em qualquer
 * tela e some sozinha quando a foto real chega (ver componente `Media`).
 */

export type ArtVariant = 'wave' | 'sunset' | 'aerial' | 'kombi' | 'lineup' | 'foam';

interface SurfArtProps {
  variant?: ArtVariant;
  seed?: number;
  className?: string;
  style?: CSSProperties;
  /** Reduz o contraste para uso atrás de texto. */
  muted?: boolean;
}

/** PRNG determinístico simples (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Constrói uma crista de onda suave ao longo da largura do quadro. */
function crest(y: number, amplitude: number, phase: number, width = 1200): string {
  const steps = 6;
  const segment = width / steps;
  let d = `M 0 ${y + Math.sin(phase) * amplitude}`;
  for (let i = 0; i < steps; i += 1) {
    const x0 = i * segment;
    const x1 = x0 + segment;
    const yStart = y + Math.sin(phase + i * 0.9) * amplitude;
    const yEnd = y + Math.sin(phase + (i + 1) * 0.9) * amplitude;
    d += ` C ${x0 + segment * 0.4} ${yStart} ${x1 - segment * 0.4} ${yEnd} ${x1} ${yEnd}`;
  }
  d += ` L ${width} 800 L 0 800 Z`;
  return d;
}

export function SurfArt({ variant = 'wave', seed = 7, className, style, muted = false }: SurfArtProps) {
  const random = rng(seed);
  const uid = `art-${variant}-${seed}`;
  const jitter = random();
  const opacity = muted ? 0.75 : 1;

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', opacity, ...style }}
    >
      <defs>
        <linearGradient id={`${uid}-deep`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b3a46" />
          <stop offset="55%" stopColor="#0a2a34" />
          <stop offset="100%" stopColor="#061c23" />
        </linearGradient>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc76b" />
          <stop offset="38%" stopColor="#f2814a" />
          <stop offset="72%" stopColor="#2c6d7d" />
          <stop offset="100%" stopColor="#0c2a34" />
        </linearGradient>
        <linearGradient id={`${uid}-shallow`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fd6d6" />
          <stop offset="100%" stopColor="#2f9aa6" />
        </linearGradient>
        <linearGradient id={`${uid}-sandg`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#efe3cd" />
          <stop offset="100%" stopColor="#d9c5a4" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffd37a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffd37a" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {variant === 'wave' && (
        <>
          <rect width="1200" height="800" fill={`url(#${uid}-deep)`} />
          <circle cx={220 + jitter * 160} cy="130" r="260" fill={`url(#${uid}-glow)`} opacity="0.45" />

          {/* Series ao fundo */}
          <path d={crest(322, 20, jitter * 6)} fill="#0d4a58" opacity="0.9" />
          <path d={crest(392, 24, jitter * 6 + 1.2)} fill="#0f5c6b" />

          {/* Onda principal: parede subindo da direita e lip curvando para a esquerda */}
          <path
            d={`M 1200 ${300 + jitter * 24} C 900 ${318 + jitter * 20} 640 ${392} 380 ${520} C 250 ${584} 120 ${628} 0 ${646} L 0 800 L 1200 800 Z`}
            fill={`url(#${uid}-shallow)`}
          />
          <path
            d={`M 1200 ${300 + jitter * 24} C 900 ${318 + jitter * 20} 640 ${392} 380 ${520} C 250 ${584} 120 ${628} 0 ${646}`}
            fill="none"
            stroke="#eafaf9"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Lip virando — a crista que despenca */}
          <path
            d={`M 1200 ${300 + jitter * 24} C 1010 ${306} 900 ${340} 838 ${404} C 900 ${372} 1010 ${348} 1200 ${344} Z`}
            fill="#f4fbfa"
            opacity="0.92"
          />
          {/* Sombra sob a parede, para dar volume */}
          <path
            d={`M 1200 ${352} C 940 ${372} 700 ${446} 470 ${556} C 300 ${634} 140 ${674} 0 ${690} L 0 800 L 1200 800 Z`}
            fill="#0c5766"
            opacity="0.55"
          />

          {/* Espuma que corre na frente da onda */}
          <path d={crest(686, 22, jitter * 6 + 3.6)} fill="#e9f6f5" opacity="0.95" />
          <path
            d={crest(662, 18, jitter * 6 + 2.1)}
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            opacity="0.5"
          />
        </>
      )}

      {variant === 'sunset' && (
        <>
          <rect width="1200" height="800" fill={`url(#${uid}-sky)`} />
          <circle cx={600 + (jitter - 0.5) * 260} cy="330" r="300" fill={`url(#${uid}-glow)`} />
          <circle cx={600 + (jitter - 0.5) * 260} cy="330" r="86" fill="#ffd98a" />
          <rect y="430" width="1200" height="370" fill="#134350" />
          <rect y="430" width="1200" height="370" fill={`url(#${uid}-deep)`} opacity="0.55" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={560 + (jitter - 0.5) * 260 - 52 + (i % 2) * 14}
              y={452 + i * 26}
              width={104 - i * 12}
              height={8}
              rx="4"
              fill="#ffd98a"
              opacity={0.6 - i * 0.09}
            />
          ))}
          <path d={crest(600, 18, jitter * 4)} fill="#0e3945" opacity="0.9" />
          <path d={crest(700, 14, jitter * 4 + 1.5)} fill="#0a2a34" />
        </>
      )}

      {variant === 'aerial' && (
        <>
          <rect width="1200" height="800" fill={`url(#${uid}-deep)`} />
          <path d="M 0 800 L 0 470 C 300 430 640 520 1200 400 L 1200 800 Z" fill={`url(#${uid}-shallow)`} />
          <path d="M 0 800 L 0 620 C 340 590 700 690 1200 570 L 1200 800 Z" fill={`url(#${uid}-sandg)`} />
          <path
            d="M 0 612 C 340 582 700 682 1200 562"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            opacity="0.75"
            strokeLinecap="round"
          />
          <path
            d="M 0 470 C 300 430 640 520 1200 400"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            opacity="0.45"
            strokeLinecap="round"
          />
          <path d={crest(300, 16, jitter * 5)} fill="#0d4d5c" opacity="0.5" />
        </>
      )}

      {variant === 'kombi' && (
        <>
          <rect width="1200" height="800" fill={`url(#${uid}-sky)`} />
          <circle cx="880" cy="190" r="230" fill={`url(#${uid}-glow)`} opacity="0.75" />
          <rect y="392" width="1200" height="104" fill="#14454f" />
          <rect y="486" width="1200" height="314" fill={`url(#${uid}-sandg)`} />
          <path d="M 0 494 C 320 470 720 520 1200 478 L 1200 502 L 0 524 Z" fill="#ffffff" opacity="0.6" />
          {/* Silhueta de Kombi estilizada — desenho autoral, sem marca nem logotipo */}
          <g transform="translate(390 250) scale(1.05)">
            <rect x="0" y="70" width="420" height="150" rx="34" fill="#0d2b33" />
            <path d="M 8 108 C 8 78 30 62 66 62 L 356 62 C 392 62 414 80 414 110 L 414 128 L 8 128 Z" fill="#0d2b33" />
            <rect x="34" y="82" width="150" height="46" rx="10" fill="#8fd6d6" opacity="0.85" />
            <rect x="200" y="82" width="120" height="46" rx="10" fill="#8fd6d6" opacity="0.7" />
            <rect x="0" y="150" width="420" height="16" fill="#ef4b23" />
            <circle cx="94" cy="222" r="38" fill="#08181e" />
            <circle cx="94" cy="222" r="15" fill="#d6c8b0" />
            <circle cx="330" cy="222" r="38" fill="#08181e" />
            <circle cx="330" cy="222" r="15" fill="#d6c8b0" />
            {/* Prancha no bagageiro */}
            <path d="M 60 44 C 150 22 300 22 380 44 C 300 60 150 60 60 44 Z" fill="#f7f3ea" />
            <path d="M 60 44 C 150 30 300 30 380 44" fill="none" stroke="#ef4b23" strokeWidth="3" />
          </g>
        </>
      )}

      {variant === 'lineup' && (
        <>
          <rect width="1200" height="800" fill={`url(#${uid}-deep)`} />
          <circle cx="960" cy="120" r="220" fill={`url(#${uid}-glow)`} opacity="0.4" />
          <path d={crest(300, 12, jitter * 3)} fill="#0f5060" opacity="0.7" />
          <path d={crest(430, 20, jitter * 3 + 1.1)} fill="#136472" />
          <path d={crest(560, 26, jitter * 3 + 2.2)} fill="#1a808d" />
          <path d={crest(562, 26, jitter * 3 + 2.2)} fill="none" stroke="#dff2f2" strokeWidth="4" opacity="0.6" />
          <path d={crest(700, 22, jitter * 3 + 3.3)} fill="#e9f6f5" opacity="0.9" />
          {/* Silhuetas sentadas na prancha, esperando a série */}
          {[
            { x: 250, y: 402 },
            { x: 520, y: 386 },
            { x: 770, y: 408 },
            { x: 960, y: 392 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y})`} opacity="0.9">
              <ellipse cx="0" cy="26" rx="52" ry="7" fill="#08222a" />
              <circle cx="0" cy="-2" r="9" fill="#08222a" />
              <path d="M -9 26 C -9 8 9 8 9 26 Z" fill="#08222a" />
            </g>
          ))}
        </>
      )}

      {variant === 'foam' && (
        <>
          <rect width="1200" height="800" fill={`url(#${uid}-sandg)`} />
          {/* Areia molhada, mais escura junto da água */}
          <path d="M 0 800 L 0 596 C 420 520 780 632 1200 548 L 1200 800 Z" fill="#cbb996" opacity="0.5" />
          {/* Camadas de mar, do raso ao fundo — a água ocupa a maior parte do quadro */}
          <path d="M 0 0 L 1200 0 L 1200 500 C 780 584 420 466 0 566 Z" fill={`url(#${uid}-shallow)`} />
          <path d="M 0 0 L 1200 0 L 1200 320 C 800 396 400 288 0 372 Z" fill="#12707f" />
          <path d="M 0 0 L 1200 0 L 1200 168 C 820 226 400 138 0 202 Z" fill="#0d4a58" />
          {/* A borda de espuma: onde a primeira aula sempre começa */}
          <path
            d="M 0 566 C 420 466 780 584 1200 500"
            fill="none"
            stroke="#ffffff"
            strokeWidth="40"
            opacity="0.92"
            strokeLinecap="round"
          />
          <path
            d="M 0 612 C 420 514 780 630 1200 548"
            fill="none"
            stroke="#ffffff"
            strokeWidth="14"
            opacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M 0 660 C 420 566 780 678 1200 598"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            opacity="0.32"
            strokeLinecap="round"
          />
          <path
            d="M 0 372 C 400 288 800 396 1200 320"
            fill="none"
            stroke="#bfe3e6"
            strokeWidth="5"
            opacity="0.45"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Grão — dá textura de impressão em vez de vetor chapado */}
      <rect width="1200" height="800" filter={`url(#${uid}-grain)`} opacity="0.09" style={{ mixBlendMode: 'overlay' }} />
    </svg>
  );
}
