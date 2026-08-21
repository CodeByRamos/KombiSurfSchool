'use client';

import { useEffect, useState } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import { pricing } from '@/data/lessons';
import { WhatsAppIcon } from '@/components/ui/Icons';

/**
 * Barra fixa de conversão no mobile.
 * Aparece depois da primeira dobra (para não competir com o CTA do hero) e some
 * quando o rodapé entra em cena, para não cobrir os contatos.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.75;
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.scrollHeight - 320;
      setShow(past && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      /**
       * Quando fora de cena usamos `invisible` (e não só opacidade): assim o
       * link some do foco do teclado e dos leitores de tela, em vez de virar um
       * alvo transparente sobre o conteúdo.
       */
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-all duration-300 md:hidden ${
        show ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-kombi text-base font-semibold text-foam shadow-[0_8px_28px_-8px_rgba(7,26,32,0.55)]"
        aria-label="Agendar aula de surf pelo WhatsApp"
      >
        <WhatsAppIcon className="size-5" />
        Agendar aula
        <span className="text-foam/70">·</span>
        <span className="text-sm font-normal text-foam/80">{pricing.shortLabel}</span>
      </a>
    </div>
  );
}
