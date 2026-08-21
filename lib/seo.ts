import { site } from '@/data/site';
import { contact } from '@/data/contact';
import { beaches } from '@/data/beaches';
import { faq } from '@/data/faq';
import { isKnown } from '@/data/types';

/**
 * JSON-LD
 * -------
 * Marcação estruturada para busca local. Só entram no schema os dados que
 * passaram pelo filtro `isKnown` — telefone, endereço e perfil social não
 * confirmados simplesmente não são emitidos, para não propagar dado errado.
 *
 * Enquanto `site.isConcept` for true a página vai com noindex, então o schema
 * fica válido mas não alimenta nenhum índice.
 */
export function localBusinessJsonLd() {
  const wa = isKnown(contact.whatsapp) ? contact.whatsapp.value : null;
  const address = isKnown(contact.address) ? contact.address.value : null;
  const instagram = isKnown(contact.instagram) ? contact.instagram.value : null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${site.url}/#escola`,
    name: site.name,
    description: site.description,
    url: site.url,
    ...(wa ? { telephone: `+${wa.e164}` } : {}),
    ...(instagram ? { sameAs: [instagram.url] } : {}),
    ...(address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            addressCountry: 'BR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: address.approxLat,
            longitude: address.approxLng,
          },
        }
      : {}),
    areaServed: beaches.map((beach) => ({
      '@type': 'Place',
      name: `${beach.name}, Guarujá - SP`,
    })),
    sport: 'Surfing',
    knowsLanguage: ['pt-BR'],
  };
}

export function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Aula de surf',
    provider: { '@id': `${site.url}/#escola` },
    areaServed: { '@type': 'City', name: 'Guarujá' },
    audience: { '@type': 'Audience', audienceType: 'Iniciantes, crianças e surfistas intermediários' },
    description:
      'Aulas de surf no Guarujá para iniciantes, crianças e surfistas intermediários, com agendamento por WhatsApp.',
  };
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Aulas de surf', item: `${site.url}/#aulas` },
      { '@type': 'ListItem', position: 3, name: 'Praias', item: `${site.url}/#praias` },
    ],
  };
}
