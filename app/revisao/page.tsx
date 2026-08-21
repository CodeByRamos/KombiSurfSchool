import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAudit, auditSummary } from '@/lib/audit';
import { researchSources, conflicts, reliabilityLabel } from '@/data/sources';
import { site } from '@/data/site';
import type { ConfirmationStatus } from '@/data/types';

export const metadata: Metadata = {
  title: 'Revisão de conteúdo',
  description: 'Página interna: o que já está confirmado e o que ainda depende da escola.',
  robots: { index: false, follow: false, nocache: true },
};

const statusStyle: Record<ConfirmationStatus, { label: string; className: string }> = {
  confirmado: { label: 'Confirmado', className: 'bg-sea/15 text-sea-deep' },
  referencia: { label: 'A validar', className: 'bg-sun/25 text-ink' },
  pendente: { label: 'Pendente', className: 'bg-kombi/12 text-kombi-dark' },
};

/**
 * MODO DEMO — página interna
 * --------------------------
 * O visitante comum nunca cai aqui: a página não é linkada na navegação (só
 * discretamente no rodapé), vai com noindex e fica de fora do sitemap.
 *
 * É o inventário que sustenta a conversa com a escola: o que está confirmado,
 * o que veio de fonte pública mas precisa de validação, o que ainda falta, e de
 * onde cada informação saiu.
 */
export default function RevisaoPage() {
  const entries = buildAudit();
  const summary = auditSummary();
  const areas = [...new Set(entries.map((item) => item.area))];

  return (
    <div className="bg-foam pb-24 pt-32">
      <div className="shell max-w-4xl">
        <p className="eyebrow text-kombi-dark">Uso interno</p>
        <h1 className="headline mt-4 text-[clamp(2.25rem,6vw,3.75rem)] text-ink">
          Revisão de conteúdo
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/70">
          {site.conceptNotice} Esta página lista, item a item, o que já foi confirmado em fonte
          pública, o que veio de fonte não verificada e o que ainda precisa vir da escola. Ela não
          aparece na navegação e não é indexada.
        </p>

        {/* Resumo */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-4">
          {[
            { label: 'Confirmados', value: summary.confirmado },
            { label: 'A validar', value: summary.referencia },
            { label: 'Pendentes', value: summary.pendente },
            { label: 'Fotos faltando', value: `${summary.photosMissing}/${summary.photosTotal}` },
          ].map((stat) => (
            <div key={stat.label} className="bg-foam p-5 text-center">
              <dt className="eyebrow text-ink/65">{stat.label}</dt>
              <dd className="mt-2 font-display text-3xl text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-2xl border border-kombi/25 bg-kombi/5 p-6">
          <h2 className="font-display text-xl text-ink">Atenção antes de publicar</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink/70">
            <li>
              <strong className="font-semibold text-ink">WhatsApp:</strong> os CTAs estao{' '}
              {summary.whatsappLive ? 'ativos' : 'desativados'} e apontam para o número informado
              pelo cliente, que NÃO foi confirmado em fonte independente. Validar com a escola ou
              desligar em <code className="rounded bg-ink/8 px-1.5 py-0.5 text-sm">data/contact.ts</code>{' '}
              (<code className="rounded bg-ink/8 px-1.5 py-0.5 text-sm">whatsappLive</code>).
            </li>
            <li>
              <strong className="font-semibold text-ink">Indexação:</strong> bloqueada enquanto{' '}
              <code className="rounded bg-ink/8 px-1.5 py-0.5 text-sm">site.isConcept</code> for{' '}
              <code className="rounded bg-ink/8 px-1.5 py-0.5 text-sm">true</code>.
            </li>
            <li>
              <strong className="font-semibold text-ink">Professores e depoimentos:</strong> as duas
              seções estão desligadas porque não há dado real ({summary.instructorsCount}{' '}
              professores, {summary.testimonialsCount} depoimentos). Nada foi inventado.
            </li>
            <li>
              <strong className="font-semibold text-ink">Imagens:</strong> todas as{' '}
              {summary.photosMissing} imagens são composições gráficas autorais criadas para o
              conceito. Nenhuma foto de terceiro ou de outra escola foi usada.
            </li>
          </ul>
        </div>

        {/* Inventário por área */}
        {areas.map((area) => (
          <section key={area} className="mt-12">
            <h2 className="font-display text-2xl text-ink">{area}</h2>
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {entries
                .filter((item) => item.area === area)
                .map((item, index) => {
                  const style = statusStyle[item.status];
                  return (
                    <li key={`${item.item}-${index}`} className="py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <span className="font-medium text-ink">{item.item}</span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${style.className}`}
                        >
                          {style.label}
                        </span>
                      </div>
                      {item.note && <p className="mt-1.5 text-sm text-ink/65">{item.note}</p>}
                      {item.source && (
                        <p className="mt-1 truncate text-xs text-ink/65">Fonte: {item.source}</p>
                      )}
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}

        {/* Fontes */}
        <section className="mt-14">
          <h2 className="font-display text-2xl text-ink">Fontes consultadas</h2>
          <ul className="mt-4 space-y-5">
            {researchSources.map((source) => (
              <li key={source.id} className="rounded-2xl border border-ink/12 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-semibold text-ink">{source.label}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/65">
                    Confiabilidade: {reliabilityLabel[source.reliability]}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{source.found}</p>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block break-all text-xs text-sea-deep underline underline-offset-2"
                  >
                    {source.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Conflitos */}
        <section className="mt-14">
          <h2 className="font-display text-2xl text-ink">Informações conflitantes</h2>
          <ul className="mt-4 space-y-4">
            {conflicts.map((conflict) => (
              <li key={conflict.topic} className="rounded-2xl bg-sand p-5">
                <h3 className="font-semibold text-ink">{conflict.topic}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{conflict.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <Link href="/" className="text-sm font-semibold text-kombi-dark underline underline-offset-4">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
