import { pendente, type Fact } from './types';

export type BeachLevel = 'iniciante' | 'iniciante-intermediario' | 'intermediario-avancado';

export interface Beach {
  readonly slug: string;
  readonly name: string;
  readonly district: string;
  /** Descrição factual do pico, baseada em guias públicos de surf do Guarujá. */
  readonly description: string;
  readonly level: BeachLevel;
  readonly levelLabel: string;
  readonly wave: string;
  readonly highlights: readonly string[];
  readonly mapsQuery: string;
  /** Coordenadas aproximadas, usadas apenas para links de mapa. */
  readonly lat: number;
  readonly lng: number;
  readonly source: string;
}

/**
 * PRAIAS
 * ------
 * IMPORTANTE: não foi possível confirmar em fonte pública EM QUAIS praias a
 * Kombi Surf School dá aula. Por isso esta seção é apresentada no site como um
 * GUIA DAS PRAIAS DE SURF DO GUARUJÁ — informação pública e verificável sobre a
 * região — e não como "as praias da Kombi".
 *
 * O texto da seção deixa explícito que a praia de cada aula é definida junto
 * com a escola, conforme as condições do mar. Assim que a escola confirmar os
 * picos onde atua, basta preencher `schoolOperatesAt` abaixo.
 */
export const schoolOperatesAt: Fact<readonly string[]> = pendente(
  'Praias de atuação da Kombi não confirmadas. Perguntar quais picos a escola usa e se há um pico principal fixo.',
);

export const beaches: readonly Beach[] = [
  {
    slug: 'pitangueiras',
    name: 'Praia das Pitangueiras',
    district: 'Pitangueiras',
    description:
      'A praia mais central e movimentada do Guarujá, com toda a infraestrutura a poucos passos da areia. As ondas são menores e mais suaves que a média da cidade, o que faz dela um dos melhores lugares da região para a primeira aula.',
    level: 'iniciante',
    levelLabel: 'Ótima para começar',
    wave: 'Fundo de areia com profundidade gradual e ondas que quebram de forma previsível.',
    highlights: ['Fundo de areia', 'Ondas suaves', 'Infraestrutura completa', 'Fácil acesso'],
    mapsQuery: 'Praia das Pitangueiras, Guarujá - SP',
    lat: -23.9938,
    lng: -46.2564,
    source: 'https://rawguaruja.com/blog/praias-para-surf',
  },
  {
    slug: 'enseada',
    name: 'Praia da Enseada',
    district: 'Enseada',
    description:
      'A maior praia do Guarujá, com quase seis quilômetros de areia e vários picos ao longo da extensão. As ondas costumam ser pequenas e generosas, e sempre dá para achar um trecho mais vazio para aprender com calma.',
    level: 'iniciante',
    levelLabel: 'Ótima para começar',
    wave: 'Beach break longo, com picos variáveis e séries geralmente pequenas.',
    highlights: ['Muito espaço', 'Ondas pequenas', 'Vários picos', 'Boa para grupos'],
    mapsQuery: 'Praia da Enseada, Guarujá - SP',
    lat: -23.9884,
    lng: -46.2264,
    source: 'https://rawguaruja.com/blog/praias-para-surf',
  },
  {
    slug: 'asturias',
    name: 'Praia das Astúrias',
    district: 'Astúrias',
    description:
      'Praia protegida entre costões, procurada por iniciantes e por quem anda de longboard. As ondas são mais fracas que nas praias vizinhas, o que dá tempo de sobra para remar, levantar e corrigir a postura.',
    level: 'iniciante',
    levelLabel: 'Ótima para começar',
    wave: 'Ondas fracas e bem formadas, com bastante tempo de descida.',
    highlights: ['Ondas fracas', 'Enseada protegida', 'Clássica de longboard'],
    mapsQuery: 'Praia das Astúrias, Guarujá - SP',
    lat: -23.9979,
    lng: -46.2478,
    source: 'https://rawguaruja.com/blog/praias-para-surf',
  },
  {
    slug: 'tombo',
    name: 'Praia do Tombo',
    district: 'Tombo',
    description:
      'O pico de surf mais conhecido do Guarujá e a única praia de São Paulo com o selo Bandeira Azul, que atesta qualidade da água, infraestrutura e gestão ambiental. Recebe ondas o ano inteiro e sedia competições — o mar aqui é mais sério, mas os cantos protegidos abrigam quem está começando.',
    level: 'intermediario-avancado',
    levelLabel: 'Mar mais forte',
    wave: 'Ondas cavadas e tubulares em mar aberto voltado para o sul; as melhores condições aparecem com vento terral pela manhã.',
    highlights: ['Selo Bandeira Azul', 'Ondas o ano todo', 'Palco de campeonatos', 'Cantos protegidos'],
    mapsQuery: 'Praia do Tombo, Guarujá - SP',
    lat: -24.0087,
    lng: -46.2418,
    source: 'https://praiasguaruja.com.br/praias/tombo/',
  },
  {
    slug: 'guaiuba',
    name: 'Praia da Guaiúba',
    district: 'Guaiúba',
    description:
      'Praia pequena e abrigada, com as ondas mais miúdas entre os picos conhecidos do Guarujá. Funciona bem em dias de mar grande, quando as outras praias ficam pesadas demais para aula.',
    level: 'iniciante',
    levelLabel: 'Ótima para começar',
    wave: 'Enseada abrigada, com ondas bem pequenas na maior parte do tempo.',
    highlights: ['Ondas miúdas', 'Bem abrigada', 'Alternativa em mar grande'],
    mapsQuery: 'Praia da Guaiúba, Guarujá - SP',
    lat: -23.9822,
    lng: -46.2049,
    source: 'https://rawguaruja.com/blog/praias-para-surf',
  },
  {
    slug: 'pernambuco',
    name: 'Praia de Pernambuco',
    district: 'Pernambuco',
    description:
      'Praia mais reservada na porção sul do município, tradicional na cena do surf local. Mar mais limpo de gente, com picos que funcionam bem quando entra swell de sul.',
    level: 'iniciante-intermediario',
    levelLabel: 'Começar e evoluir',
    wave: 'Beach break com picos que respondem bem a swell de sul e sudeste.',
    highlights: ['Menos movimentada', 'Cena local de surf', 'Boa para evoluir'],
    mapsQuery: 'Praia de Pernambuco, Guarujá - SP',
    lat: -23.9986,
    lng: -46.1723,
    source: 'https://rawguaruja.com/blog/praias-para-surf',
  },
];

/**
 * Contexto de temporada, a partir de guias públicos de surf do Guarujá:
 * o litoral recebe ondas surfáveis praticamente o ano inteiro, com auge entre
 * abril e setembro, quando os swells de sul e sudeste são mais frequentes.
 */
export const seasonNote =
  'O Guarujá tem onda praticamente o ano inteiro. Entre abril e setembro os swells de sul e sudeste chegam com mais força; no verão o mar costuma ficar mais manso — ótimo para quem está começando.';

/** Coordenadas usadas pela seção "Como está o mar" (Praia do Tombo). */
export const seaConditionsSpot = {
  name: 'Praia do Tombo',
  lat: -24.0087,
  lng: -46.2418,
} as const;
