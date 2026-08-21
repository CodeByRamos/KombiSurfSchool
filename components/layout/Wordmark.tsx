interface WordmarkProps {
  className?: string;
  /** Versão empilhada para o rodapé. */
  stacked?: boolean;
}

/**
 * Marca desenhada para o conceito — uma Kombi reduzida ao essencial ao lado do
 * nome. É uma proposta de identidade, não o logotipo oficial da escola.
 */
export function Wordmark({ className = 'h-8 w-auto', stacked = false }: WordmarkProps) {
  if (stacked) {
    return (
      <svg viewBox="0 0 200 92" className={className} role="img" aria-label="Kombi Surf School">
        <g fill="currentColor">
          <path d="M14 34c0-6 4-10 10-10h60c6 0 10 4 10 10v4H14z" />
          <rect x="14" y="38" width="80" height="22" rx="5" />
          <circle cx="32" cy="62" r="7" />
          <circle cx="76" cy="62" r="7" />
        </g>
        <path d="M22 20c14-5 44-5 58 0-14 4-44 4-58 0z" fill="currentColor" opacity="0.55" />
        <text
          x="0"
          y="88"
          fill="currentColor"
          fontFamily="var(--font-display), sans-serif"
          fontSize="24"
          letterSpacing="0.02em"
        >
          KOMBI SURF SCHOOL
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 264 40" className={className} role="img" aria-label="Kombi Surf School">
      <g fill="currentColor">
        <path d="M4 18c0-4.4 3-7.4 7.4-7.4h27C42.8 10.6 46 13.6 46 18v2.4H4z" />
        <rect x="4" y="20.4" width="42" height="12" rx="3" />
        <circle cx="15" cy="33.6" r="4.4" />
        <circle cx="36" cy="33.6" r="4.4" />
      </g>
      <path d="M9 8.4c7.6-2.8 24-2.8 31.6 0-7.6 2.4-24 2.4-31.6 0z" fill="currentColor" opacity="0.6" />
      <text
        x="58"
        y="29"
        fill="currentColor"
        fontFamily="var(--font-display), sans-serif"
        fontSize="24"
        letterSpacing="0.01em"
      >
        KOMBI SURF SCHOOL
      </text>
    </svg>
  );
}
