import { pendente, type Fact } from './types';

export interface GearItem {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
}

/**
 * EQUIPAMENTO
 * -----------
 * Não há informação pública sobre o que a Kombi inclui na aula. Portanto o site
 * NÃO afirma que a escola fornece prancha, leash, lycra, parafina ou roupa de
 * borracha. A seção mostra a LISTA DO QUE VOCÊ LEVA (orientação geral,
 * verdadeira para qualquer aula de surf) e trata o equipamento técnico como
 * item a confirmar no agendamento.
 */
export const providedBySchool: Fact<readonly GearItem[]> = pendente(
  'Confirmar com a escola o que está incluso na aula: prancha, leash, parafina, lycra, colete e roupa de borracha no inverno.',
);

/** Orientação geral para o aluno — não é uma afirmação sobre a escola. */
export const bringWithYou: readonly GearItem[] = [
  {
    id: 'roupa',
    label: 'Roupa de banho',
    detail: 'Já venha de sunga, biquíni ou maiô por baixo. Aula de surf começa na areia.',
  },
  {
    id: 'protetor',
    label: 'Protetor solar',
    detail: 'De preferência resistente à água e com fator alto. O sol do Guarujá não perdoa.',
  },
  {
    id: 'agua',
    label: 'Água',
    detail: 'Remar cansa mais do que parece. Leve uma garrafa e beba antes e depois.',
  },
  {
    id: 'toalha',
    label: 'Toalha e troca de roupa',
    detail: 'Para sair da água e ir embora seco e feliz.',
  },
  {
    id: 'lycra',
    label: 'Camiseta ou lycra',
    detail: 'Ajuda contra o sol e contra a irritação do peito na prancha.',
  },
  {
    id: 'disposicao',
    label: 'Disposição',
    detail: 'Não precisa estar em forma. Precisa estar disposto a cair algumas vezes.',
  },
];

export const equipmentNote =
  'O que a escola fornece na aula — prancha, leash, parafina e colete — é confirmado no momento do agendamento.';
