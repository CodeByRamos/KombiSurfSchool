import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { ChevronIcon } from '@/components/ui/Icons';
import { faq } from '@/data/faq';

/**
 * DÚVIDAS
 * -------
 * Usa <details>/<summary> nativo: acessível por teclado, funciona sem
 * JavaScript e não custa nada em performance.
 */
export function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-24 bg-foam py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Dúvidas"
              title={
                <>
                  Perguntas de
                  <br />
                  quem nunca
                  <br />
                  surfou
                </>
              }
              lead="Todo mundo chega com as mesmas dúvidas. Aqui estão as respostas — e o que ainda depende de uma conversa com a escola, a gente diz que depende."
            />
            <div className="mt-8">
              <WhatsAppCta label="Tirar minha dúvida" size="md" />
            </div>
          </div>

          <div className="divide-y divide-ink/12 border-y border-ink/12">
            {faq.map((item) => (
              <details key={item.id} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
                  <ChevronIcon className="size-5 shrink-0 text-ink/65 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink/65">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
