/**
 * Gera public/og.jpg (1200x630) a partir de scripts/og-template.html.
 *
 * Por que um script e não a convenção `app/opengraph-image.tsx` do Next:
 * aquela rota é publicada em `/opengraph-image`, sem extensão no nome. Como o
 * projeto usa `trailingSlash: true`, o Next emite um redirect 308 de qualquer
 * caminho sem ponto para a versão com barra final — ou seja, `/opengraph-image`
 * viraria `/opengraph-image/` e daria 404 em produção. O preview do link
 * quebraria justamente no WhatsApp, que é como o site vai ser compartilhado.
 *
 * Um arquivo com extensão de verdade em /public não passa por esse redirect.
 *
 * Rode `npm run og` depois de mexer no template. Precisa do Chromium do
 * Playwright (`npm run test:install`).
 */
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const TEMPLATE = new URL('./og-template.html', import.meta.url).href;
const OUTPUT = new URL('../public/og.jpg', import.meta.url).pathname;

/**
 * As fontes entram embutidas em base64. Carregar do Google Fonts faria a imagem
 * depender de rede e sair com a fonte de fallback em qualquer máquina offline —
 * o que passa despercebido, porque o script continua "funcionando".
 */
function fontFace(family, file) {
  const data = readFileSync(new URL(`./fonts/${file}`, import.meta.url)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:400 900;font-display:block;src:url(data:font/woff2;base64,${data}) format('woff2');}`;
}

const FONT_CSS = [
  fontFace('Anton', 'anton-latin.woff2'),
  fontFace('Inter', 'inter-latin.woff2'),
].join('\n');

const preinstalled = process.env.PLAYWRIGHT_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const launchOptions = existsSync(preinstalled) ? { executablePath: preinstalled } : {};

const browser = await chromium.launch(launchOptions);
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  await page.goto(TEMPLATE, { waitUntil: 'load' });
  await page.addStyleTag({ content: FONT_CSS });

  // Espera as fontes assentarem antes de fotografar, senão sai com a fallback.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);

  const loaded = await page.evaluate(() =>
    [...document.fonts].filter((font) => font.status === 'loaded').map((font) => font.family),
  );
  if (!loaded.includes('Anton') || !loaded.includes('Inter')) {
    throw new Error(`fontes não carregaram (carregadas: ${loaded.join(', ') || 'nenhuma'})`);
  }

  // JPEG, não PNG: a arte é um degradê, e o PNG passava de 600 KB — tamanho em
  // que alguns clientes de mensagem simplesmente desistem de mostrar o preview.
  await page.screenshot({ path: OUTPUT, type: 'jpeg', quality: 88 });
  process.stdout.write('public/og.jpg gerado (1200x630)\n');
} finally {
  await browser.close();
}
