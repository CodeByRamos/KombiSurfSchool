import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { bringWithYou, equipmentNote } from '@/data/gear';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { whatsappMessages } from '@/data/contact';

/**
 * O QUE LEVAR
 * -----------
 * Não há informação pública sobre o que a Kombi inclui na aula, então esta
 * seção NÃO afirma que a escola fornece prancha, leash ou roupa de borracha.
 * Ela lista o que o ALUNO leva — orientação geral, verdadeira para qualquer
 * aula de surf — e trata o equipamento técnico como item a confirmar.
 */
export function Gear() {
  return (
    <section id="levar" className="scroll-mt-24 bg-sand py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Antes da aula"
            title={
              <>
                Leve pouco.
                <br />
                O mar cuida
                <br />
                do resto
              </>
            }
            lead="Primeira aula de surf não pede equipamento nem preparo físico. Pede roupa de banho, protetor solar e vontade de cair algumas vezes."
          />

          <div>
            <ul className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2">
              {bringWithYou.map((item, index) => (
                <Reveal key={item.id} as="li" delay={index * 60} className="bg-sand">
                  <div className="h-full p-6">
                    <h3 className="font-display text-xl text-ink">{item.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.detail}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-ink/12 p-6">
              <h3 className="font-display text-xl text-ink">E a prancha?</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">
                Você não precisa ter uma para começar. {equipmentNote}
              </p>
              <div className="mt-5">
                <WhatsAppCta
                  label="Perguntar o que está incluso"
                  message={whatsappMessages.gear}
                  size="md"
                  variant="outline"
                  className="border-ink/25 text-ink"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
