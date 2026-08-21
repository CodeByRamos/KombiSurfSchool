import { SectionHeading } from '@/components/ui/SectionHeading';
import { Media } from '@/components/ui/Media';
import { instructors } from '@/data/instructors';
import { resolve, FALLBACK } from '@/data/types';

/**
 * QUEM VAI TE ENSINAR
 * -------------------
 * A pesquisa pública não retornou nenhum nome de professor da Kombi. Nenhum
 * nome, foto, certificação ou biografia foi inventado — por isso, enquanto
 * `instructors` estiver vazio, a seção inteira NÃO é renderizada.
 *
 * Para ativar: preencha data/instructors.ts com os dados enviados pela escola.
 */
export function Instructors() {
  if (instructors.length === 0) return null;

  return (
    <section id="professores" className="scroll-mt-24 bg-sand py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Quem vai te ensinar"
          title="A equipe na areia"
          lead="Quem entra na água com você."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <article key={instructor.id} className="overflow-hidden rounded-2xl bg-foam">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Media
                  src={instructor.photo}
                  alt={`Retrato de ${resolve(instructor.name, 'professor da Kombi Surf School')}`}
                  variant="lineup"
                  seed={777}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-ink">
                  {resolve(instructor.name, FALLBACK.generic)}
                </h3>
                <p className="mt-1 text-sm text-kombi">{resolve(instructor.role, FALLBACK.short)}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/65">
                  {resolve(instructor.bio, FALLBACK.generic)}
                </p>
                <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/45">Experiência</dt>
                    <dd className="text-right text-ink">{resolve(instructor.experience, FALLBACK.short)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/45">Especialidade</dt>
                    <dd className="text-right text-ink">{resolve(instructor.specialty, FALLBACK.short)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/45">Certificações</dt>
                    <dd className="text-right text-ink">
                      {resolve(instructor.certifications, [FALLBACK.short]).join(', ')}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
