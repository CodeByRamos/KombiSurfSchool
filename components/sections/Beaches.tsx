'use client';

import { useState } from 'react';
import { Media } from '@/components/ui/Media';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowIcon, PinIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { beaches, seasonNote } from '@/data/beaches';
import { mapsSearchUrl } from '@/lib/maps';
import { whatsappUrl } from '@/lib/whatsapp';
import { whatsappMessages } from '@/data/contact';
import type { ArtVariant } from '@/components/ui/SurfArt';

const art: Record<string, { variant: ArtVariant; seed: number }> = {
  pitangueiras: { variant: 'aerial', seed: 401 },
  enseada: { variant: 'foam', seed: 402 },
  asturias: { variant: 'lineup', seed: 403 },
  tombo: { variant: 'wave', seed: 404 },
  guaiuba: { variant: 'aerial', seed: 405 },
  pernambuco: { variant: 'sunset', seed: 406 },
};

const levelStyles: Record<string, string> = {
  iniciante: 'bg-sea-light/25 text-ink',
  'iniciante-intermediario': 'bg-sun/30 text-ink',
  'intermediario-avancado': 'bg-kombi/15 text-kombi-dark',
};

/**
 * ONDE SURFAMOS
 * -------------
 * IMPORTANTE: não há confirmação pública de em quais praias a Kombi dá aula.
 * Por isso a seção é apresentada como o mapa das praias de surf do Guarujá
 * (informação pública e verificável) e o texto deixa claro que a praia da sua
 * aula é definida junto com a escola. Nenhuma praia é apresentada como "praia
 * da Kombi".
 */
export function Beaches() {
  const [activeSlug, setActiveSlug] = useState(beaches[0]?.slug ?? '');
  const active = beaches.find((beach) => beach.slug === activeSlug) ?? beaches[0];

  if (!active) return null;

  const activeArt = art[active.slug] ?? { variant: 'wave' as ArtVariant, seed: 1 };

  return (
    <section id="praias" className="on-dark grain relative scroll-mt-24 overflow-hidden bg-ink py-20 text-foam md:py-28">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="Onde surfamos"
          tone="light"
          title={
            <>
              O Guarujá inteiro
              <br />
              é sala de aula
            </>
          }
          lead="A praia da sua aula não é fixa: ela é escolhida no dia, junto com a escola, conforme o tamanho do mar, o vento e a maré. Estas são as praias de surf do Guarujá e para quem cada uma funciona melhor."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          {/* Lista de praias */}
          <div className="order-2 lg:order-1">
            <ul className="divide-y divide-foam/12 border-y border-foam/12">
              {beaches.map((beach) => {
                const isActive = beach.slug === active.slug;
                return (
                  <li key={beach.slug}>
                    <button
                      type="button"
                      onClick={() => setActiveSlug(beach.slug)}
                      aria-current={isActive ? 'true' : undefined}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
                    >
                      <span className="min-w-0">
                        <span
                          className={`headline block text-2xl transition-colors md:text-3xl ${
                            isActive ? 'text-sun' : 'text-foam/80 group-hover:text-foam'
                          }`}
                        >
                          {beach.name}
                        </span>
                        <span className="mt-1.5 block text-[13px] text-foam/50">{beach.levelLabel}</span>
                      </span>
                      <ArrowIcon
                        className={`size-5 shrink-0 transition-all ${
                          isActive ? 'text-sun' : 'text-foam/30 group-hover:translate-x-1 group-hover:text-foam/60'
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-foam/55">{seasonNote}</p>
          </div>

          {/* Detalhe da praia selecionada */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-800 md:aspect-[16/10]">
              <Media
                src={null}
                alt={`Composição gráfica representando a ${active.name}, no Guarujá`}
                variant={activeArt.variant}
                seed={activeArt.seed}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <span
                className={`absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                  levelStyles[active.level] ?? 'bg-foam text-ink'
                }`}
              >
                {active.levelLabel}
              </span>
            </div>

            <div className="mt-7">
              <h3 className="headline text-3xl text-foam md:text-4xl">{active.name}</h3>
              <p className="mt-4 leading-relaxed text-foam/70">{active.description}</p>
              <p className="mt-4 text-sm leading-relaxed text-foam/50">{active.wave}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {active.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-foam/20 px-3.5 py-1.5 text-xs text-foam/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={mapsSearchUrl(active.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-foam/35 px-6 text-sm font-semibold text-foam transition-colors hover:border-foam hover:bg-foam hover:text-ink"
                >
                  <PinIcon className="size-4" />
                  Ver no mapa
                </a>
                <a
                  href={whatsappUrl(whatsappMessages.beach(active.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-kombi px-6 text-sm font-semibold text-foam transition-colors hover:bg-kombi-dark"
                >
                  <WhatsAppIcon className="size-4" />
                  Aula nesta praia
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
