import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

/**
 * DEPOIMENTOS
 * -----------
 * Nenhuma avaliação pública verificável da Kombi foi localizada, e nenhum
 * depoimento foi inventado. Enquanto `testimonials` estiver vazio, a seção
 * inteira não é renderizada.
 *
 * Para ativar: preencha data/testimonials.ts com avaliações reais, transcritas
 * sem alterar o sentido original e com link para a fonte.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" className="scroll-mt-24 bg-sand py-20 md:py-28">
      <div className="shell">
        <SectionHeading eyebrow="Quem já surfou com a gente" title="O que dizem os alunos" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id}>
              <figure className="flex h-full flex-col rounded-2xl bg-foam p-7">
                <blockquote className="flex-1 text-lg leading-relaxed text-ink/80">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-ink/10 pt-4 text-sm">
                  <span className="font-semibold text-ink">{item.author}</span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-1 block text-ink/65 underline underline-offset-2 hover:text-ink"
                  >
                    via {item.sourceName}
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
