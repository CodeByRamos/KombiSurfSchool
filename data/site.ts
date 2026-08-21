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
export const site = {
  isConcept: true,
  url: 'https://kombisurfschool.example',
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
