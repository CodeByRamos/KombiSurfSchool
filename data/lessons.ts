import { confirmado, pendente, type Fact } from './types';

export type LessonLevel = 'iniciante' | 'intermediario' | 'todos';

export interface Lesson {
  readonly slug: string;
  readonly name: string;
  /** Frase curta de vitrine. */
  readonly hook: string;
  /** Para quem é — só entra aqui o que a pesquisa sustenta. */
  readonly audience: string;
  readonly level: LessonLevel;
  readonly levelLabel: string;
  readonly description: string;
  readonly duration: Fact<string>;
  readonly price: Fact<string>;
  readonly includes: Fact<readonly string[]>;
  readonly groupSize: Fact<string>;
  readonly location: Fact<string>;
  readonly minAge: Fact<string>;
  readonly ctaMessageKey: 'default' | 'kids';
}

/**
 * AULAS
 * -----
 * A fonte pública confirma apenas que a escola atende "todas as idades" e
 * trabalha com níveis iniciante e intermediário, com agendamento de horário.
 * Por isso existem exatamente três trilhas aqui. Formato (individual/grupo),
 * duração, preço e itens inclusos NÃO foram confirmados e aparecem no site
 * como "a combinar" ou "consulte valores" — nunca como número inventado.
 */
export const lessons: readonly Lesson[] = [
  {
    slug: 'primeira-onda',
    name: 'Primeira Onda',
    hook: 'Nunca subiu numa prancha? Começa aqui.',
    audience: 'Quem nunca surfou ou surfou poucas vezes',
    level: 'iniciante',
    levelLabel: 'Iniciante',
    description:
      'A aula de estreia: segurança na água, leitura básica do mar, posição na prancha e as primeiras remadas até ficar de pé na espuma. O ritmo acompanha você, não o contrário.',
    duration: pendente<string>('Duração da aula não divulgada. Confirmar com a escola.'),
    price: pendente<string>('Valor não divulgado publicamente. Confirmar com a escola.'),
    includes: pendente<readonly string[]>('Itens inclusos (prancha, leash, lycra, colete) a confirmar.'),
    groupSize: pendente<string>('Formato individual ou em grupo a confirmar.'),
    location: pendente<string>('Praia definida conforme as condições do mar — confirmar praias de atuação.'),
    minAge: pendente<string>('Idade mínima a confirmar.'),
    ctaMessageKey: 'default',
  },
  {
    slug: 'evolucao',
    name: 'Evolução',
    hook: 'Já fica de pé. Agora é sair da espuma.',
    audience: 'Quem já surfa e quer destravar o próximo nível',
    level: 'intermediario',
    levelLabel: 'Intermediário',
    description:
      'Para quem já pega espuma e quer remar para fora, entender a série, escolher a onda certa e trabalhar a descida e as primeiras manobras com correção de técnica.',
    duration: pendente<string>('Duração da aula não divulgada. Confirmar com a escola.'),
    price: pendente<string>('Valor não divulgado publicamente. Confirmar com a escola.'),
    includes: pendente<readonly string[]>('Itens inclusos a confirmar.'),
    groupSize: pendente<string>('Formato individual ou em grupo a confirmar.'),
    location: pendente<string>('Praia definida conforme as condições do mar — confirmar praias de atuação.'),
    minAge: pendente<string>('Idade mínima a confirmar.'),
    ctaMessageKey: 'default',
  },
  {
    slug: 'kids',
    name: 'Kids',
    hook: 'O mar como primeira escola.',
    audience: 'Crianças e adolescentes',
    level: 'todos',
    levelLabel: 'Todas as idades',
    description:
      'Aula pensada para os pequenos: água rasa, muita brincadeira e o básico de segurança antes de qualquer manobra. O objetivo é criar intimidade com o mar.',
    duration: pendente<string>('Duração da aula não divulgada. Confirmar com a escola.'),
    price: pendente<string>('Valor não divulgado publicamente. Confirmar com a escola.'),
    includes: pendente<readonly string[]>('Itens inclusos a confirmar.'),
    groupSize: pendente<string>('Formato individual ou em grupo a confirmar.'),
    location: pendente<string>('Praia definida conforme as condições do mar — confirmar praias de atuação.'),
    minAge: pendente<string>('Idade mínima a confirmar — informação muito pedida por pais.'),
    ctaMessageKey: 'kids',
  },
];

/** Confirmado em fonte pública: a escola atende todas as idades. */
export const lessonsIntro = confirmado(
  'A Kombi dá aula para todas as idades — do primeiro contato com o mar a quem já surfa e quer evoluir.',
  'https://www.instagram.com/kombisurfschool/',
  '2026-08-21',
);

/**
 * PREÇOS
 * ------
 * Nenhum valor da Kombi Surf School foi encontrado em fonte pública
 * (Instagram, buscadores, diretórios, plataformas de turismo).
 * Enquanto isso, o site inteiro usa "Consulte valores pelo WhatsApp".
 */
export const pricing = {
  hasPublicPricing: false,
  values: pendente<readonly { label: string; price: string }[]>(
    'Nenhuma tabela de preços pública localizada. Pedir a tabela vigente à escola.',
  ),
  ctaLabel: 'Consulte valores pelo WhatsApp',
  shortLabel: 'Consulte valores',
} as const;
