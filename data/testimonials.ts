import { pendente, referencia, type Fact } from './types';
import { school } from './school';

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly sourceName: string;
  readonly sourceUrl: string;
  readonly rating?: number;
  readonly date?: string;
}

/**
 * DEPOIMENTOS
 * -----------
 * Não foi localizada nenhuma avaliação pública verificável da Kombi Surf School
 * (Google Maps, TripAdvisor, Facebook e plataformas de turismo não retornaram
 * resultados para a escola).
 *
 * Este array está VAZIO de propósito. NENHUM depoimento foi criado.
 * A seção de depoimentos só é renderizada quando houver avaliações reais aqui,
 * transcritas sem alterar o sentido original e com link para a fonte.
 */
export const testimonials: readonly Testimonial[] = [];

export const testimonialsStatus: Fact<string> = pendente(
  'Nenhuma avaliação pública localizada. Pedir à escola o link do perfil no Google Meu Negócio (se existir) ou autorização para usar mensagens de alunos.',
);

/**
 * Prova social que EXISTE e é verificável: o tamanho da comunidade da escola no
 * Instagram. É exibida arredondada e com data de checagem.
 */
export const socialProof = {
  instagramFollowers: school.instagramFollowers,
  label: referencia(
    'comunidade no Instagram',
    'https://www.instagram.com/kombisurfschool/',
    'Número de seguidores varia. Reconferir antes de publicar.',
    '2026-08-21',
  ),
} as const;
