import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'light';
type Size = 'md' | 'lg';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  'aria-label'?: string;
  icon?: ReactNode;
}

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition duration-200 ease-out active:translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-kombi text-foam hover:bg-kombi-dark',
  outline: 'border-2 border-current bg-transparent hover:bg-ink hover:text-foam hover:border-ink',
  ghost: 'text-current underline-offset-4 hover:underline px-0!',
  light: 'bg-foam text-ink hover:bg-sand',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external,
  className = '',
  icon,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal = external ?? /^https?:/.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {icon}
      {children}
    </Link>
  );
}
