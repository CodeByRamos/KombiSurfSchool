import { pendente, referencia } from './types';

/**
 * CONTATO
 * -------
 * ATENÇÃO (leia antes de publicar):
 *
 * O número de WhatsApp abaixo foi FORNECIDO PELO CLIENTE a partir de um
 * cadastro público e NÃO foi possível confirmá-lo em nenhuma fonte
 * independente durante a pesquisa (buscas por "Kombi Surf School" + telefone
 * não retornaram o número). Por isso ele está marcado como `referencia`, e não
 * como `confirmado`.
 *
 * `whatsappLive` controla se os CTAs abrem o WhatsApp de verdade:
 *   true  -> demonstração completa, os botões abrem a conversa (uso atual)
 *   false -> os botões levam para a seção de contato, sem disparar mensagem
 *
 * Assim que a escola confirmar o número, troque o status para `confirmado`.
 */

/** Liga/desliga o disparo real de WhatsApp nos CTAs. */
export const whatsappLive = true;

export const contact = {
  whatsapp: referencia(
    {
      /** Formato E.164 sem símbolos, usado no link wa.me. */
      e164: '5513981414846',
      display: '(13) 98141-4846',
    },
    'Informado pelo cliente a partir de cadastro público',
    'NÃO confirmado em fonte independente. Validar com a escola antes de publicar.',
    '2026-08-21',
  ),

  instagram: referencia(
    {
      handle: 'kombisurfschool',
      url: 'https://www.instagram.com/kombisurfschool/',
    },
    'https://www.instagram.com/kombisurfschool/',
    'Perfil público encontrado em busca e identificado como "kombi Surf School — Guarujá/SP". Confirmar com a escola que este é o perfil oficial vigente.',
    '2026-08-21',
  ),

  address: referencia(
    {
      street: 'Av. Assis Chateaubriand, 2093',
      district: 'Jardim Virgínia',
      city: 'Guarujá',
      state: 'SP',
      full: 'Av. Assis Chateaubriand, 2093 - Jardim Virgínia, Guarujá - SP',
      /**
       * Coordenadas aproximadas do Jardim Virgínia / Enseada (Guarujá), usadas
       * apenas para centralizar o mapa. NÃO são a posição exata do endereço.
       */
      approxLat: -23.9845,
      approxLng: -46.2205,
    },
    'Informado pelo cliente a partir de cadastro público',
    'Endereço de cadastro, NÃO confirmado. Não apresentar como loja física aberta ao público sem checar.',
    '2026-08-21',
  ),

  email: pendente<string>('E-mail de contato não localizado. Perguntar à escola.'),
  website: pendente<string>('A escola não possui site oficial localizado em busca pública.'),
  openingHours: pendente<string>('Horário de atendimento não divulgado publicamente.'),
} as const;

/** Mensagens padrão dos CTAs de WhatsApp. */
export const whatsappMessages = {
  default:
    'Olá! Vi o site da Kombi Surf School e gostaria de saber mais sobre as aulas de surf. Queria saber valores e horários disponíveis.',
  lesson: (lessonName: string) =>
    `Olá! Vi o site da Kombi Surf School e queria saber mais sobre a aula "${lessonName}" — valores, duração e horários disponíveis.`,
  beach: (beachName: string) =>
    `Olá! Vi o site da Kombi Surf School. Gostaria de saber se vocês dão aula na ${beachName} e quais horários estão disponíveis.`,
  kids: 'Olá! Vi o site da Kombi Surf School e queria saber sobre aula de surf para criança — idade mínima, valores e horários.',
  gear: 'Olá! Vi o site da Kombi Surf School e queria saber o que está incluso na aula — prancha, colete, lycra — e se preciso levar alguma coisa além de roupa de banho.',
} as const;
