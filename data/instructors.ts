import { pendente, type Fact } from './types';

export interface Instructor {
  readonly id: string;
  readonly name: Fact<string>;
  readonly role: Fact<string>;
  readonly experience: Fact<string>;
  readonly certifications: Fact<readonly string[]>;
  readonly specialty: Fact<string>;
  readonly bio: Fact<string>;
  readonly photo: string | null;
  readonly instagram: Fact<string>;
}

/**
 * PROFESSORES
 * -----------
 * A pesquisa pública NÃO retornou nomes de professores da Kombi Surf School.
 * (Outras escolas do Guarujá divulgam seus instrutores; a Kombi, não.)
 *
 * Por isso `instructors` está VAZIO de propósito. A seção "Quem vai te ensinar"
 * só aparece no site quando houver ao menos um professor confirmado — nenhum
 * nome, foto, certificação ou biografia foi inventado.
 *
 * Para ativar: preencha o array abaixo com dados reais enviados pela escola.
 */
export const instructors: readonly Instructor[] = [];

export const instructorsStatus: Fact<string> = pendente(
  'Nenhum professor identificado em fonte pública. Pedir à escola: nome, foto, tempo de experiência, certificações (ex.: primeiros socorros e salvamento) e especialidade de cada instrutor.',
);

/** Estrutura pronta para receber os dados. Copie e preencha. */
export const instructorTemplate: Instructor = {
  id: 'exemplo',
  name: pendente('Nome do professor'),
  role: pendente('Função (ex.: instrutor-chefe)'),
  experience: pendente('Tempo de experiência'),
  certifications: pendente('Certificações'),
  specialty: pendente('Especialidade (ex.: iniciantes, kids)'),
  bio: pendente('Bio curta, de uma a duas frases'),
  photo: null,
  instagram: pendente('@ do professor, se houver'),
};
