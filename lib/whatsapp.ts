import { contact, whatsappLive, whatsappMessages } from '@/data/contact';
import { isKnown } from '@/data/types';

/**
 * Monta o link de WhatsApp.
 *
 * Se o número não estiver disponível (ou `whatsappLive` estiver desligado),
 * devolve a âncora da seção de contato em vez de um link quebrado — o CTA
 * continua visível, só não dispara mensagem.
 */
export function whatsappUrl(message: string = whatsappMessages.default): string {
  const wa = contact.whatsapp;
  if (!whatsappLive || !isKnown(wa) || !wa.value) return '/#contato';
  return `https://wa.me/${wa.value.e164}?text=${encodeURIComponent(message)}`;
}

/** True quando o CTA realmente abre o WhatsApp. */
export function whatsappEnabled(): boolean {
  return whatsappLive && isKnown(contact.whatsapp) && contact.whatsapp.value !== null;
}

export function whatsappDisplay(): string | null {
  const wa = contact.whatsapp;
  if (!isKnown(wa) || !wa.value) return null;
  return wa.value.display;
}

export function telHref(): string | null {
  const wa = contact.whatsapp;
  if (!isKnown(wa) || !wa.value) return null;
  return `tel:+${wa.value.e164}`;
}

export { whatsappMessages };
