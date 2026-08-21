import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { lessons, lessonsIntro, pricing } from '@/data/lessons';
import { FALLBACK, isKnown, resolve } from '@/data/types';
import { whatsappMessages } from '@/data/contact';
import { whatsappUrl } from '@/lib/whatsapp';
import type { ArtVariant } from '@/components/ui/SurfArt';

const art: Record<string, { variant: ArtVariant; seed: number }> = {
  'primeira-onda': { variant: 'foam', seed: 101 },
  evolucao: { variant: 'wave', seed: 202 },
  kids: { variant: 'lineup', seed: 303 },
};

/**
 * AULAS
 * -----
 * Cada ficha mostra o que foi confirmado (público, nível, proposta da aula) e
 * trata duração, formato, equipamento e preço como "a combinar" — porque nenhum
 * desses dados foi encontrado em fonte pública. O fallback vem do próprio modelo
 * de dados (`resolve`), então é impossível vazar um valor inventado.
 */
export function Lessons() {
  return (
    <section id="aulas" className="scroll-mt-24 bg-sand py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Aulas de surf"
            title={
              <>
                Escolha por onde
                <br />
                você quer começar
              </>
            }
            lead={resolve(lessonsIntro, 'Aulas de surf no Guarujá para diferentes níveis.')}
          />
          <p className="shrink-0 text-sm leading-relaxed text-ink/65 md:max-w-[17rem] md:text-right">
            Duração, formato e valores são combinados no agendamento, de acordo com o seu nível e com
            o mar do dia.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {lessons.map((lesson, index) => {
            const cardArt = art[lesson.slug] ?? { variant: 'wave' as ArtVariant, seed: 11 };
            const message =
              lesson.ctaMessageKey === 'kids'
                ? whatsappMessages.kids
                : whatsappMessages.lesson(lesson.name);

            const specs = [
              { label: 'Nível', value: lesson.levelLabel, known: true },
              { label: 'Para quem', value: lesson.audience, known: true },
              { label: 'Duração', value: resolve(lesson.duration, FALLBACK.short), known: isKnown(lesson.duration) },
              { label: 'Formato', value: resolve(lesson.groupSize, FALLBACK.short), known: isKnown(lesson.groupSize) },
              { label: 'Equipamento', value: resolve(lesson.includes, [FALLBACK.short]).join(', '), known: isKnown(lesson.includes) },
              { label: 'Praia', value: resolve(lesson.location, 'Definida no dia'), known: isKnown(lesson.location) },
            ];

            return (
              <Reveal key={lesson.slug} delay={index * 90}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-foam">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Media
                      src={null}
                      alt={`Composição gráfica representando a aula ${lesson.name}`}
                      variant={cardArt.variant}
                      seed={cardArt.seed}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-foam/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                      {lesson.levelLabel}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-3xl text-ink">{lesson.name}</h3>
                    <p className="mt-2 text-sm font-medium text-kombi-dark">{lesson.hook}</p>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{lesson.description}</p>

                    <dl className="mt-6 space-y-2.5 border-t border-ink/10 pt-5 text-sm">
                      {specs.map((spec) => (
                        <div key={spec.label} className="flex items-baseline justify-between gap-4">
                          <dt className="shrink-0 text-ink/65">{spec.label}</dt>
                          <dd
                            className={`text-right ${
                              spec.known ? 'font-medium text-ink' : 'italic text-ink/65'
                            }`}
                          >
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="shrink-0 text-ink/65">Valor</dt>
                        <dd className="text-right font-semibold text-ink">{FALLBACK.price}</dd>
                      </div>
                    </dl>

                    <div className="mt-auto pt-7">
                      <Button
                        href={whatsappUrl(message)}
                        variant="primary"
                        size="md"
                        className="w-full"
                        icon={<WhatsAppIcon className="size-4" />}
                        aria-label={`Falar no WhatsApp sobre a aula ${lesson.name}`}
                      >
                        Quero esta aula
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink/65">
          {pricing.ctaLabel}. A Kombi monta o valor de acordo com o formato da aula — individual, em
          dupla ou em grupo — e com a quantidade de aulas.
        </p>
      </div>
    </section>
  );
}
