/**
 * Modelo de confiabilidade de conteúdo
 * ------------------------------------
 * Este projeto é um SITE CONCEITO, produzido para demonstração comercial.
 * Nenhuma informação pode ser inventada. Por isso todo dado sensível do site
 * (preços, horários, praias, professores, contatos) é embrulhado em um `Fact`
 * que carrega, junto com o valor, o quanto aquele valor foi verificado.
 *
 * Os componentes NUNCA leem `fact.value` direto: usam `resolve()`, que devolve
 * um fallback honesto ("A combinar", "Consulte valores") quando o dado ainda
 * está pendente. Assim é impossível publicar um dado inventado por descuido.
 */

export type ConfirmationStatus =
  /** Confirmado por fonte pública verificável OU pela própria escola. */
  | 'confirmado'
  /** Encontrado em fonte pública ou informado pelo cliente, mas ainda não validado pela escola. */
  | 'referencia'
  /** Não foi possível confirmar. NUNCA é exibido como afirmação. */
  | 'pendente';

export interface Fact<T> {
  readonly value: T | null;
  readonly status: ConfirmationStatus;
  /** De onde veio o dado (URL, "cliente", "pesquisa pública"). */
  readonly source?: string;
  /** Observação interna para a revisão com a escola. */
  readonly note?: string;
  /** Data (ISO) em que o dado foi levantado — preços e horários envelhecem. */
  readonly checkedAt?: string;
}

export function confirmado<T>(value: T, source: string, checkedAt?: string): Fact<T> {
  return { value, status: 'confirmado', source, checkedAt };
}

export function referencia<T>(value: T, source: string, note?: string, checkedAt?: string): Fact<T> {
  return { value, status: 'referencia', source, note, checkedAt };
}

export function pendente<T>(note: string): Fact<T> {
  return { value: null, status: 'pendente', note };
}

/**
 * Lê um Fact com segurança. Se o dado estiver pendente (ou vazio), devolve o
 * fallback honesto em vez do valor.
 */
export function resolve<T>(fact: Fact<T>, fallback: T): T {
  if (fact.status === 'pendente') return fallback;
  if (fact.value === null || fact.value === undefined) return fallback;
  return fact.value;
}

/** True quando o dado pode ser apresentado como afirmação no site. */
export function isKnown<T>(fact: Fact<T>): boolean {
  return fact.status !== 'pendente' && fact.value !== null && fact.value !== undefined;
}

/** Fallbacks padrão usados em todo o site quando falta informação. */
export const FALLBACK = {
  price: 'Consulte valores',
  duration: 'Duração a combinar',
  schedule: 'Consulte disponibilidade',
  generic: 'A confirmar com a escola',
  short: 'A combinar',
} as const;
