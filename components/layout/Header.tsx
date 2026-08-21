'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { navigation, site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon, CloseIcon } from '@/components/ui/Icons';
import { Wordmark } from './Wordmark';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /**
   * O cabeçalho só fica transparente sobre o hero da home. Em qualquer outra
   * página o fundo é claro, então a barra precisa ser sólida para a marca em
   * branco continuar legível.
   */
  const pathname = usePathname();
  const overHero = pathname === '/' || pathname === '';
  const solid = scrolled || open || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-ink/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="on-dark shrink-0 text-foam"
          aria-label={`${site.name} — inicio`}
          onClick={close}
        >
          <Wordmark className="h-8 w-auto" />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="on-dark text-sm font-medium text-foam/80 transition-colors hover:text-foam"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="on-dark hidden h-10 items-center gap-2 rounded-full bg-kombi px-5 text-sm font-semibold text-foam transition-colors hover:bg-kombi-dark sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Agendar aula
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="on-dark inline-flex size-10 items-center justify-center rounded-full border border-foam/25 text-foam lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? (
              <CloseIcon className="size-5" />
            ) : (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="on-dark grain relative bg-ink lg:hidden">
          <nav aria-label="Navegação mobile" className="shell py-6">
            <ul className="flex flex-col divide-y divide-foam/10">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="headline block py-4 text-3xl text-foam"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-kombi text-base font-semibold text-foam"
            >
              <WhatsAppIcon className="size-5" />
              Agendar uma aula
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
