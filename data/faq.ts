export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  /**
   * `true` quando a resposta é informação geral e verdadeira sobre aula de surf
   * (não uma afirmação específica sobre a Kombi). `false` quando depende de
   * confirmação da escola — nesse caso a resposta direciona para o WhatsApp.
   */
  readonly isGeneral: boolean;
}

/**
 * DÚVIDAS
 * -------
 * Toda resposta aqui é (a) orientação geral verdadeira sobre aula de surf ou
 * (b) um encaminhamento honesto para a escola. Nenhuma resposta afirma política
 * interna, preço, horário ou equipamento da Kombi sem confirmação.
 */
export const faq: readonly FaqItem[] = [
  {
    id: 'nadar',
    question: 'Preciso saber nadar?',
    answer:
      'Você não precisa nadar como atleta, mas precisa se sentir seguro na água. A primeira aula acontece na parte rasa, onde dá pé, e o professor fica ao seu lado o tempo todo. Se você tem pouca familiaridade com o mar, avise no agendamento — isso muda a forma como a aula é conduzida.',
    isGeneral: true,
  },
  {
    id: 'prancha',
    question: 'Preciso ter prancha?',
    answer:
      'Não. Ninguém compra prancha antes da primeira aula. Aulas de surf normalmente incluem a prancha adequada ao seu nível — quais itens estão inclusos na aula da Kombi você confirma direto com a escola no agendamento.',
    isGeneral: true,
  },
  {
    id: 'equipamento',
    question: 'A escola fornece o equipamento?',
    answer:
      'Confirme no WhatsApp. Essa informação ainda não está publicada, então preferimos que a escola responda exatamente o que está incluso — prancha, leash, parafina, colete — em vez de arriscar um palpite.',
    isGeneral: false,
  },
  {
    id: 'sozinho',
    question: 'Posso fazer aula sozinho?',
    answer:
      'Os formatos disponíveis — aula individual, em dupla ou em grupo — são combinados no agendamento. Diga como você prefere e a escola te diz o que dá para fazer no dia.',
    isGeneral: false,
  },
  {
    id: 'criancas',
    question: 'Criança pode fazer aula?',
    answer:
      'Pode. A Kombi dá aula para todas as idades, do iniciante ao intermediário. A idade mínima e o formato da aula infantil devem ser confirmados direto com a escola.',
    isGeneral: false,
  },
  {
    id: 'roupa',
    question: 'Que roupa devo usar?',
    answer:
      'Vá de roupa de banho por baixo e leve uma camiseta ou lycra para proteger do sol e do atrito com a prancha. No inverno, pergunte sobre roupa de borracha — a água do Guarujá esfria.',
    isGeneral: true,
  },
  {
    id: 'duracao',
    question: 'Quanto tempo dura a aula?',
    answer:
      'A duração é informada no agendamento. Como referência geral, aulas de surf para iniciantes costumam somar entre uma e duas horas, contando o aquecimento e a teoria na areia.',
    isGeneral: false,
  },
  {
    id: 'praia',
    question: 'Em qual praia vai ser a aula?',
    answer:
      'A praia é definida junto com a escola, porque depende do tamanho do mar, do vento e da maré no dia. O Guarujá tem praias abrigadas ótimas para começar — Pitangueiras, Enseada, Astúrias e Guaiúba — e picos mais fortes, como o Tombo, para quem já tem estrada.',
    isGeneral: true,
  },
  {
    id: 'reserva',
    question: 'Preciso reservar antes?',
    answer:
      'Sim. As aulas são agendadas por contato direto com a escola, que combina o horário e o ponto de encontro com você. Não apareça na praia sem falar antes.',
    isGeneral: true,
  },
  {
    id: 'mar-ruim',
    question: 'E se o mar estiver ruim no dia?',
    answer:
      'Mar ruim faz parte. Normalmente a escola avalia as condições e sugere trocar de praia ou remarcar o horário — a política de remarcação da Kombi você confirma no agendamento.',
    isGeneral: false,
  },
  {
    id: 'idade',
    question: 'Tem idade máxima para começar?',
    answer:
      'Não. Surfe se aprende em qualquer idade — o que muda é o ritmo da aula e o tipo de prancha. Diga sua idade e seu condicionamento no agendamento e a aula é adaptada.',
    isGeneral: true,
  },
  {
    id: 'levar',
    question: 'O que eu levo no dia?',
    answer:
      'Roupa de banho já vestida, protetor solar resistente à água, água para beber, toalha e uma troca de roupa. O resto é com o professor.',
    isGeneral: true,
  },
];
