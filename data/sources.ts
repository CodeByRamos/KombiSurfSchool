/**
 * REGISTRO DE PESQUISA
 * --------------------
 * Tudo que foi consultado para montar este conceito, com o que cada fonte
 * confirmou. Serve de prova de procedência na conversa com a escola e alimenta
 * a página interna /revisao.
 */

export interface ResearchSource {
  readonly id: string;
  readonly label: string;
  readonly url: string;
  readonly found: string;
  readonly reliability: 'alta' | 'media' | 'nao-verificada';
}

export const reliabilityLabel: Record<ResearchSource['reliability'], string> = {
  alta: 'Alta',
  media: 'Média',
  'nao-verificada': 'Não verificada',
};

export const researchSources: readonly ResearchSource[] = [
  {
    id: 'ig',
    label: 'Instagram @kombisurfschool',
    url: 'https://www.instagram.com/kombisurfschool/',
    found:
      'Perfil público "kombi Surf School", Guarujá/SP. Descrito em resultados de busca como escola de surf para todas as idades, níveis iniciante e intermediário, com agendamento de horário pelo perfil. Cerca de 8.085 seguidores na data da checagem. O acesso direto ao Instagram estava bloqueado no ambiente de pesquisa, então os dados vieram dos resultados de busca, não da leitura da página.',
    reliability: 'media',
  },
  {
    id: 'cliente-telefone',
    label: 'Telefone (13) 98141-4846',
    url: '',
    found:
      'Informado pelo cliente a partir de cadastro público. NÃO foi possível confirmar em nenhuma fonte independente durante a pesquisa.',
    reliability: 'nao-verificada',
  },
  {
    id: 'cliente-endereco',
    label: 'Endereço Av. Assis Chateaubriand, 2093 — Jardim Virgínia',
    url: '',
    found:
      'Informado pelo cliente a partir de cadastro público. As buscas pelo endereço retornaram apenas anúncios imobiliários da avenida, nenhum registro da escola nesse número.',
    reliability: 'nao-verificada',
  },
  {
    id: 'tombo',
    label: 'Praia do Tombo — guia público',
    url: 'https://praiasguaruja.com.br/praias/tombo/',
    found:
      'Única praia de São Paulo com selo Bandeira Azul (desde 2010), ondas o ano inteiro com auge entre abril e setembro, beach break de fundo de areia, melhores condições com vento terral pela manhã, sede de competições e escolas de surf atuando nos cantos protegidos.',
    reliability: 'alta',
  },
  {
    id: 'praias-guaruja',
    label: 'Guia de praias para surf no Guarujá',
    url: 'https://rawguaruja.com/blog/praias-para-surf',
    found:
      'Pitangueiras, Enseada e Astúrias são as praias mais indicadas para iniciantes (ondas menores, fundo de areia, profundidade gradual). O Tombo é indicado como intermediário/avançado. A Guaiúba tem as menores ondas da região. Temporada mais forte entre abril e setembro, com swells de sul e sudeste.',
    reliability: 'alta',
  },
  {
    id: 'waves-tombo',
    label: 'Waves — pico Tombo, Guarujá/SP',
    url: 'https://www.waves.com.br/surf/ondas/picos/sp/guaruja/tombo/',
    found: 'Ficha pública do pico do Tombo, com previsão e características de onda.',
    reliability: 'alta',
  },
  {
    id: 'busca-avaliacoes',
    label: 'Busca por avaliações públicas (Google Maps, TripAdvisor, Facebook)',
    url: '',
    found:
      'Nenhuma avaliação pública da Kombi Surf School foi localizada. Por isso o site não possui seção de depoimentos preenchida.',
    reliability: 'alta',
  },
  {
    id: 'busca-professores',
    label: 'Busca por professores e instrutores',
    url: '',
    found:
      'Nenhum nome de professor da Kombi foi localizado em fonte pública. Outras escolas do Guarujá divulgam seus instrutores; a Kombi, não. A seção de professores fica desativada até a escola enviar os dados.',
    reliability: 'alta',
  },
  {
    id: 'busca-precos',
    label: 'Busca por preços e horários',
    url: '',
    found:
      'Nenhuma tabela de preços, duração de aula ou grade de horários da Kombi foi localizada. O site usa "Consulte valores pelo WhatsApp" em todos os pontos de preço.',
    reliability: 'alta',
  },
];

/** Pontos em que fontes públicas divergem — precisam de decisão da escola. */
export const conflicts: readonly { topic: string; detail: string }[] = [
  {
    topic: 'Nível da Praia do Tombo',
    detail:
      'Os guias divergem: alguns tratam o Tombo como pico intermediário/avançado (onda cavada e tubular), outros mencionam escolas licenciadas atendendo iniciantes nos cantos protegidos em maré baixa. O site descreve as duas coisas, sem afirmar que a Kombi dá aula lá.',
  },
  {
    topic: 'Endereço x atuação na praia',
    detail:
      'O endereço de cadastro fica no Jardim Virgínia, mas não há indicação pública de loja física aberta ao público. O site trata o endereço como referência de região e deixa claro que a aula acontece na praia, com ponto de encontro combinado.',
  },
];
