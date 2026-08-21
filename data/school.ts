import { confirmado, pendente, referencia, type Fact } from './types';

/**
 * Identidade e história da escola.
 * Tudo que não foi possível confirmar em fonte pública está como `pendente`.
 */
export const school = {
  name: 'Kombi Surf School',
  displayName: 'Kombi Surf School',
  city: 'Guarujá',
  state: 'SP',
  region: 'Litoral Sul de São Paulo',

  tagline: 'Escola de surf no Guarujá',

  /** Confirmado: o perfil público se descreve como escola de surf no Guarujá. */
  what: confirmado(
    'Escola de surf no Guarujá (SP), com aulas para todas as idades — de quem nunca entrou no mar a quem já surfa e quer evoluir.',
    'https://www.instagram.com/kombisurfschool/',
    '2026-08-21',
  ),

  /** Confirmado: o agendamento é feito por contato direto. */
  bookingModel: confirmado(
    'As aulas são agendadas por contato direto com a escola, que combina o horário e o ponto de encontro.',
    'https://www.instagram.com/kombisurfschool/',
    '2026-08-21',
  ),

  foundedYear: pendente<string>('Ano de fundação não localizado em fonte pública. Perguntar à escola.'),
  founder: pendente<string>('Fundador(a) não localizado em fonte pública. Perguntar à escola.'),
  nameStory: pendente<string>(
    'A origem do nome "Kombi" não foi confirmada. Provavelmente ligada à Kombi como símbolo da cultura surf brasileira, mas isso NÃO pode ser afirmado sem checar com a escola.',
  ),
  methodology: pendente<string>('Metodologia própria não descrita em fonte pública. Perguntar à escola.'),
  yearsOfExperience: pendente<string>('Tempo de atuação não confirmado.'),
  differentials: pendente<string>('Diferenciais precisam ser levantados em conversa com a escola.'),
  projects: pendente<string>('Projetos sociais, competições e parcerias — a levantar.'),

  /**
   * Prova social real: tamanho da comunidade no Instagram, conforme aparecia em
   * resultados de busca pública. Números de seguidores mudam — por isso é
   * `referencia` com data, e o site arredonda ("+8 mil").
   */
  instagramFollowers: referencia<number>(
    8085,
    'https://www.instagram.com/kombisurfschool/',
    'Contagem vista em busca pública; muda com o tempo. Arredondar ao exibir.',
    '2026-08-21',
  ),
} as const;

/** Blocos de texto "Sobre" que só entram no site quando confirmados. */
export interface AboutBlock {
  readonly id: string;
  readonly question: string;
  readonly answer: Fact<string>;
}

export const aboutBlocks: readonly AboutBlock[] = [
  { id: 'quando', question: 'Quando a Kombi começou?', answer: school.foundedYear },
  { id: 'quem', question: 'Quem está por trás da escola?', answer: school.founder },
  { id: 'porque-kombi', question: 'Por que "Kombi"?', answer: school.nameStory },
  { id: 'metodo', question: 'Como é o método de ensino?', answer: school.methodology },
];
