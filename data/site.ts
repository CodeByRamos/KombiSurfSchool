/**
 * CONFIGURAÇÃO DO SITE
 * --------------------
 * `isConcept = true` significa: este projeto é uma DEMONSTRAÇÃO / CONCEITO,
 * ainda sem autorização formal da Kombi Surf School para publicação oficial.
 *
 * Enquanto `isConcept` for true:
 *   - o robots.txt bloqueia a indexação;
 *   - as páginas enviam <meta name="robots" content="noindex, nofollow">;
 *   - o site não se apresenta como site oficial da escola.
 *
 * Toda a infraestrutura de SEO (title, description, canonical, Open Graph,
 * sitemap, JSON-LD) está implementada e passa a valer no dia em que a escola
 * aprovar: basta virar esta flag para false e ajustar `url`.
 */
/**
 * URL pública do site — usada no canonical, no Open Graph, no sitemap e no
 * JSON-LD. Precisa estar certa: é ela que faz o preview do link renderizar
 * quando você manda o endereço no WhatsApp para o cliente.
 *
 * A resolução, em ordem:
 *   1. NEXT_PUBLIC_SITE_URL       — defina quando houver domínio próprio
 *   2. VERCEL_PROJECT_PRODUCTION_URL — a Vercel injeta sozinha no build
 *   3. o placeholder abaixo       — só em desenvolvimento
 *
 * Como o site é gerado no build, ler do ambiente aqui já resolve tudo: nenhuma
 * das páginas precisa saber a URL em tempo de execução.
 */
const FALLBACK_URL = 'https://kombisurfschool.example';

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

  return FALLBACK_URL;
}

export const site = {
  isConcept: true,
  url: resolveSiteUrl(),
  name: 'Kombi Surf School',
  shortName: 'Kombi',
  locale: 'pt-BR',
  themeColor: '#071A20',
  title: 'Kombi Surf School — Aula de surf no Guarujá',
  titleTemplate: '%s | Kombi Surf School',
  description:
    'Aula de surf no Guarujá para iniciantes, crianças e quem quer evoluir. Prancha, praia e professor combinados no agendamento. Fale pelo WhatsApp e marque sua primeira aula.',
  keywords: [
    'escola de surf Guarujá',
    'aula de surf Guarujá',
    'surf Guarujá',
    'aula de surf para iniciantes Guarujá',
    'aula de surf para crianças Guarujá',
    'surf para iniciantes Guarujá',
    'escola de surf Praia do Tombo',
  ],
  /** Rodapé do conceito — honesto, discreto, sem poluir a experiência. */
  conceptNotice:
    'Site conceito, criado como demonstração. Ainda não é o site oficial da Kombi Surf School — informações sujeitas a confirmação pela escola.',
} as const;

export const navigation: readonly { href: string; label: string }[] = [
  { href: '/#aulas', label: 'Aulas' },
  { href: '/#praias', label: 'Praias' },
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/#sobre', label: 'A Kombi' },
  { href: '/#duvidas', label: 'Dúvidas' },
  { href: '/#contato', label: 'Contato' },
];
