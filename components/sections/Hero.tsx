import { SurfArt } from '@/components/ui/SurfArt';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { Button } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icons';
import { pricing } from '@/data/lessons';

/**
 * Primeira dobra.
 *
 * A headline responde, em uma linha, à pergunta que traz a pessoa até aqui:
 * "quero aprender a surfar, como faço?". Abaixo, os dois únicos caminhos
 * possíveis: agendar agora ou entender como funciona.
 */
export function Hero() {
  return (
    <section className="on-dark grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-foam">
      {/* Imagem de fundo (composição autoral enquanto não há foto oficial) */}
      <div className="absolute inset-0 -z-20">
        <div className="drift-slow absolute -inset-[3%]">
          <SurfArt variant="wave" seed={19} />
        </div>
      </div>

      {/* Escurecimento para garantir contraste do texto (AA) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,26,32,0.78) 0%, rgba(7,26,32,0.42) 40%, rgba(7,26,32,0.9) 100%)',
        }}
      />

      <div className="shell relative w-full pb-12 pt-28 md:pb-20 md:pt-32">
        <p className="eyebrow mb-6 flex items-center gap-3 text-sun">
          <span className="inline-block h-px w-8 bg-sun" aria-hidden="true" />
          Guarujá — Litoral de São Paulo
        </p>

        <h1 className="headline max-w-[16ch] text-[clamp(3rem,10.5vw,8rem)] text-foam">
          Sua primeira
          <br />
          onda é <span className="text-sun">hoje</span>
        </h1>

        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foam/85 md:mt-8 md:text-xl">
          Escola de surf no Guarujá para quem nunca subiu numa prancha, para as crianças e para quem
          já surfa e quer sair da espuma. Você chega, a gente cuida do resto.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10">
          <WhatsAppCta label="Agendar uma aula" size="lg" className="w-full sm:w-auto" />
          <Button
            href="#como-funciona"
            variant="outline"
            size="lg"
            className="w-full border-foam/40 text-foam hover:border-foam hover:bg-foam hover:text-ink sm:w-auto"
            icon={<ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />}
          >
            Como funciona
          </Button>
        </div>

        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-foam/15 pt-7 sm:grid-cols-3 md:mt-14 md:gap-y-7 md:pt-8">
          <div>
            <dt className="eyebrow text-foam/60">Níveis</dt>
            <dd className="mt-2 font-display text-xl leading-tight text-foam md:text-2xl">
              Iniciante ao intermediário
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-foam/60">Idades</dt>
            <dd className="mt-2 font-display text-xl leading-tight text-foam md:text-2xl">Todas</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="eyebrow text-foam/60">Valores</dt>
            <dd className="mt-2 font-display text-xl leading-tight text-foam md:text-2xl">
              {pricing.shortLabel} no WhatsApp
            </dd>
          </div>
        </dl>
      </div>

      <a
        href="#como-funciona"
        className="absolute bottom-6 right-5 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-foam/60 transition-colors hover:text-foam md:right-10 md:inline-flex"
      >
        Rolar
        <span className="inline-block h-8 w-px bg-foam/40" aria-hidden="true" />
      </a>
    </section>
  );
}
