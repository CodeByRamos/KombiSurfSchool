import type { Metadata, Viewport } from 'next';
import { Anton, Inter } from 'next/font/google';
import { site } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCta } from '@/components/layout/MobileCta';
import './globals.css';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const OG_ALT = 'Kombi Surf School — aula de surf no Guarujá';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: site.titleTemplate,
  },
  description: site.description,
  keywords: [...site.keywords],
  alternates: { canonical: '/' },
  applicationName: site.name,
  authors: [{ name: site.name }],
  category: 'sports',
  /**
   * Enquanto for conceito, o site NÃO deve ser indexado nem se apresentar como
   * site oficial. Vire `site.isConcept` para false depois da aprovação da
   * escola e toda a estrutura de SEO passa a valer.
   */
  robots: site.isConcept
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true, googleBot: { index: true, follow: true } },
  /**
   * A imagem de compartilhamento é um arquivo comum em /public, gerado por
   * `npm run og`. Não usamos a convenção `app/opengraph-image.tsx` do Next
   * porque ela publica em `/opengraph-image`, sem extensão — e com
   * `trailingSlash: true` esse caminho é redirecionado (308) para
   * `/opengraph-image/`, que não existe. O preview quebraria justamente no
   * WhatsApp, que é como o link vai circular.
   */
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [{ url: '/og.jpg', alt: OG_ALT }],
  },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${inter.variable}`}>
      <head>
        {/* Pré-conexão com a API de condições do mar (seção "Como está o mar") */}
        <link rel="preconnect" href="https://marine-api.open-meteo.com" crossOrigin="" />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-foam"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
