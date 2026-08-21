import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'dark',
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div className={`${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${tone === 'light' ? 'text-sun' : 'text-kombi'}`}>{eyebrow}</p>
      )}
      <Tag
        className={`headline text-[clamp(2.25rem,6vw,4.25rem)] ${
          tone === 'light' ? 'text-foam' : 'text-ink'
        }`}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={`mt-6 text-lg leading-relaxed ${
            tone === 'light' ? 'text-foam/75' : 'text-ink/70'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
