import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { SurfArt } from '@/components/ui/SurfArt';
import { pricing } from '@/data/lessons';

/** Último empurrão antes do rodapé. Uma decisão, um botão. */
export function FinalCta() {
  return (
    <section className="grain relative isolate overflow-hidden bg-sea py-24 text-foam md:py-32">
      <div className="absolute inset-0 -z-20 opacity-45">
        <SurfArt variant="foam" seed={909} />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, rgba(14,127,140,0.88), rgba(7,26,32,0.92))' }}
      />

      <div className="shell relative text-center">
        <h2 className="headline mx-auto max-w-[14ch] text-[clamp(2.5rem,8vw,6rem)] text-foam">
          Bora pegar sua primeira onda?
        </h2>
        <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-foam/80">
          Manda uma mensagem contando quem vai surfar e quando você pode. A Kombi responde com o
          horário, a praia e os valores.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <WhatsAppCta label="Agendar uma aula" size="lg" className="w-full sm:w-auto" />
        </div>
        <p className="mt-6 text-sm text-foam/65">{pricing.ctaLabel}</p>
      </div>
    </section>
  );
}
