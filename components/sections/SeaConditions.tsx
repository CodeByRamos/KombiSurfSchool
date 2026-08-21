'use client';

import { useEffect, useState } from 'react';
import { compassLabel, fetchMarineSnapshot, readingFor, type MarineSnapshot } from '@/lib/marine';
import { seaConditionsSpot } from '@/data/beaches';
import { WaveIcon } from '@/components/ui/Icons';

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: MarineSnapshot }
  | { status: 'error' };

/**
 * COMO ESTÁ O MAR
 * ---------------
 * Dados ao vivo da Open-Meteo (gratuita, sem chave, com CORS) para a Praia do
 * Tombo — o pico de referência do Guarujá. Ver documentação em lib/marine.ts.
 *
 * A seção é deliberadamente opcional: carrega depois da página, não bloqueia
 * nada e, se a API falhar, mostra um estado alternativo honesto em vez de
 * números inventados. Reserva a própria altura para não causar CLS.
 */
export function SeaConditions() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let alive = true;
    fetchMarineSnapshot(seaConditionsSpot.lat, seaConditionsSpot.lng)
      .then((data) => {
        if (alive) setState({ status: 'ready', data });
      })
      .catch(() => {
        if (alive) setState({ status: 'error' });
      });
    return () => {
      alive = false;
    };
  }, []);

  const data = state.status === 'ready' ? state.data : null;
  const reading = readingFor(data?.waveHeight ?? null);

  /**
   * Número e unidade vão separados de propósito: a fonte de display é caixa
   * alta, e "0,8 M" ou "12 KM/H" ficariam errados. A unidade sai em caixa baixa.
   * Números seguem o padrão brasileiro (vírgula decimal).
   */
  const metrics: { label: string; value: string | null; unit: string | null }[] = [
    {
      label: 'Ondulação',
      value: data?.waveHeight != null ? data.waveHeight.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : null,
      unit: 'm',
    },
    {
      label: 'Período',
      value: data?.wavePeriod != null ? String(Math.round(data.wavePeriod)) : null,
      unit: 's',
    },
    {
      label: 'Vento',
      value: data?.windSpeed != null ? String(Math.round(data.windSpeed)) : null,
      unit: data?.windSpeed != null ? `km/h ${compassLabel(data.windDirection) ?? ''}`.trim() : null,
    },
    {
      label: 'Água',
      value: data?.waterTemp != null ? `${Math.round(data.waterTemp)}°` : null,
      unit: 'C',
    },
  ];

  return (
    <section
      id="mar"
      aria-labelledby="mar-titulo"
      className="scroll-mt-24 border-y border-ink/10 bg-foam py-14 md:py-16"
    >
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-center">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2 text-kombi-dark">
              <WaveIcon className="size-4" />
              Como está o mar
            </p>
            <h2 id="mar-titulo" className="headline text-3xl text-ink md:text-4xl">
              {seaConditionsSpot.name}, agora
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
              {state.status === 'error'
                ? 'Não foi possível ler as condições agora. Confirme o mar do dia direto com a escola.'
                : reading.hint}
            </p>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-foam px-4 py-5 text-center sm:px-3">
                  <dt className="eyebrow text-ink/65">{metric.label}</dt>
                  <dd className="mt-2 font-display text-2xl text-ink md:text-3xl">
                    {state.status === 'loading' ? (
                      <span
                        className="mx-auto block h-7 w-14 animate-pulse rounded bg-ink/10"
                        aria-label="Carregando"
                      />
                    ) : metric.value ? (
                      <>
                        {metric.value}
                        {metric.unit && (
                          <span className="ml-1 text-lg normal-case text-ink/70 md:text-xl">
                            {metric.unit}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-ink/65">—</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink/65">
              <span
                className={`inline-block size-2 rounded-full ${
                  reading.tone === 'calm'
                    ? 'bg-sea'
                    : reading.tone === 'strong'
                      ? 'bg-kombi'
                      : 'bg-sun'
                }`}
                aria-hidden="true"
              />
              <span className="font-medium text-ink/65">
                {state.status === 'error' ? 'Leitura indisponível' : reading.label}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Dados de ondulação e vento por{' '}
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ink"
                >
                  Open-Meteo
                </a>
                . Não substitui a orientação do professor na praia.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
