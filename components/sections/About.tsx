import { SectionHeading } from '@/components/ui/SectionHeading';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { school } from '@/data/school';
import { socialProof } from '@/data/testimonials';
import { isKnown, resolve } from '@/data/types';
import { contact } from '@/data/contact';

/**
 * SOBRE A KOMBI
 * -------------
 * A história da escola (fundação, fundador, origem do nome, metodologia) NÃO
 * foi encontrada em fonte pública. Este bloco então trabalha apenas com o que é
 * verificável — o que a escola faz, para quem, e o tamanho da comunidade no
 * Instagram — e o restante fica reservado para quando a escola contar.
 */
export function About() {
  const followers = socialProof.instagramFollowers;
  const followersLabel =
    isKnown(followers) && followers.value ? `+${Math.floor(followers.value / 1000)} mil` : null;
  const instagram = isKnown(contact.instagram) ? contact.instagram.value : null;

  return (
    <section id="sobre" className="scroll-mt-24 bg-foam py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="A Kombi"
              title={
                <>
                  Uma escola
                  <br />
                  de pé na areia
                </>
              }
            />

            <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink/70">
              <p>{resolve(school.what, 'Escola de surf no Guarujá.')}</p>
              <p>
                A Kombi trabalha com quem está chegando agora no mar e com quem já pega espuma e quer
                o próximo passo.{' '}
                {resolve(school.bookingModel, 'As aulas são agendadas por contato direto.')}
              </p>
              <p className="text-base text-ink/55">
                O resto da história — quando a escola nasceu, quem está por trás e de onde vem o nome
                Kombi — a gente prefere contar do jeito certo, com a palavra de quem viveu. Em breve,
                aqui.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-ink/10 pt-8 sm:grid-cols-3">
              <div>
                <dt className="eyebrow text-ink/40">Onde</dt>
                <dd className="mt-2 font-display text-2xl leading-tight text-ink">Guarujá</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/40">Níveis</dt>
                <dd className="mt-2 font-display text-2xl leading-tight text-ink">
                  Iniciante e intermediário
                </dd>
              </div>
              {followersLabel && (
                <div>
                  <dt className="eyebrow text-ink/40">Comunidade</dt>
                  <dd className="mt-2 font-display text-2xl leading-tight text-ink">
                    {instagram ? (
                      <a
                        href={instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-kombi decoration-2 underline-offset-4 hover:text-kombi"
                      >
                        {followersLabel}
                      </a>
                    ) : (
                      followersLabel
                    )}
                    <span className="mt-1 block text-sm font-normal normal-case tracking-normal text-ink/45">
                      no Instagram
                    </span>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-10">
              <WhatsAppCta label="Falar com a Kombi" />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={100}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink sm:mt-10">
                <Media
                  src={null}
                  alt="Composição gráfica de uma Kombi estacionada de frente para o mar"
                  variant="kombi"
                  seed={512}
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink">
                <Media
                  src={null}
                  alt="Composição gráfica do mar do Guarujá ao entardecer"
                  variant="sunset"
                  seed={613}
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
