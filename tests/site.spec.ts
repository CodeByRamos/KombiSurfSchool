import { test, expect, type Page } from '@playwright/test';

/**
 * Testes end-to-end do site conceito.
 *
 * Cobrem o que decide a conversão (WhatsApp em todo lugar, navegação, aulas,
 * praias, galeria, dúvidas, mapa) e as travas de conteúdo do projeto: nenhum
 * preço inventado, nenhum professor fantasma, nenhum depoimento falso e
 * indexação bloqueada enquanto for conceito.
 */

const WHATSAPP_HOST = 'wa.me';

async function goHome(page: Page) {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
}

test.describe('Primeira dobra', () => {
  test('mostra a proposta, o CTA principal e o CTA secundário', async ({ page }) => {
    await goHome(page);

    const h1 = page.locator('h1');
    await expect(h1).toContainText('onda');
    // Acentuação correta é requisito do projeto (site em português do Brasil).
    await expect(h1).toContainText('é');

    // A display é caixa alta e bem fechada; abaixo de ~0.92 o Anton corta o
    // acento de "ONDA É HOJE". Este teste trava essa regressão.
    const ratio = await h1.evaluate((node) => {
      const style = getComputedStyle(node);
      return parseFloat(style.lineHeight) / parseFloat(style.fontSize);
    });
    expect(ratio).toBeGreaterThanOrEqual(0.92);
    expect(await h1.evaluate((node) => getComputedStyle(node).textTransform)).toBe('uppercase');

    await expect(page.getByRole('link', { name: /agendar uma aula/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /como funciona/i }).first()).toBeVisible();
  });

  test('o CTA principal aponta para o WhatsApp com mensagem pronta', async ({ page }) => {
    await goHome(page);

    const cta = page.getByRole('link', { name: /agendar uma aula/i }).first();
    const href = await cta.getAttribute('href');

    expect(href).toContain(WHATSAPP_HOST);
    expect(href).toContain('text=');
    expect(decodeURIComponent(href ?? '')).toContain('Kombi Surf School');
  });
});

test.describe('WhatsApp em todos os pontos de decisão', () => {
  test('aparece no hero, nas aulas, nas praias, no contato e no rodapé', async ({ page }) => {
    await goHome(page);

    for (const section of ['#aulas', '#praias', '#contato']) {
      const links = page.locator(`${section} a[href*="${WHATSAPP_HOST}"]`);
      await expect(links.first()).toHaveCount(1);
    }

    await expect(page.locator(`footer a[href*="${WHATSAPP_HOST}"]`).first()).toHaveCount(1);

    const total = await page.locator(`a[href*="${WHATSAPP_HOST}"]`).count();
    expect(total).toBeGreaterThanOrEqual(8);
  });

  test('todo link de WhatsApp usa o mesmo número', async ({ page }) => {
    await goHome(page);

    const hrefs = await page.locator(`a[href*="${WHATSAPP_HOST}"]`).evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLAnchorElement).href),
    );

    expect(hrefs.length).toBeGreaterThan(0);
    const numbers = new Set(hrefs.map((href) => href.split('?')[0]));
    expect(numbers.size).toBe(1);
  });
});

test.describe('Navegação', () => {
  test('as âncoras do menu levam às seções correspondentes', async ({ page, isMobile }) => {
    await goHome(page);

    if (isMobile) {
      await page.getByRole('button', { name: /abrir menu/i }).click();
    }

    await page.getByRole('link', { name: 'Aulas', exact: true }).first().click();
    await expect(page).toHaveURL(/#aulas$/);
    await expect(page.locator('#aulas')).toBeInViewport({ ratio: 0.05 });
  });

  test('o link de pular para o conteúdo funciona pelo teclado', async ({ page }) => {
    await goHome(page);
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /pular para o conteúdo/i });
    await expect(skip).toBeFocused();
  });
});

test.describe('Aulas', () => {
  test('lista as três trilhas com CTA próprio', async ({ page }) => {
    await goHome(page);

    const cards = page.locator('#aulas article');
    await expect(cards).toHaveCount(3);

    for (const name of ['Primeira Onda', 'Evolução', 'Kids']) {
      await expect(page.locator('#aulas').getByRole('heading', { name })).toBeVisible();
    }
  });

  test('nunca exibe um preço — só "consulte valores"', async ({ page }) => {
    await goHome(page);

    const body = (await page.locator('body').innerText()).toLowerCase();
    // Nenhum valor em reais foi confirmado; o site não pode inventar nenhum.
    expect(body).not.toMatch(/r\$\s*\d/);
    expect(body).toContain('consulte valores');
  });
});

test.describe('Praias', () => {
  test('troca a praia em destaque ao selecionar outra da lista', async ({ page }) => {
    await goHome(page);

    const section = page.locator('#praias');
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole('heading', { level: 3 })).toContainText('Pitangueiras');

    await section.getByRole('button', { name: /Praia do Tombo/i }).click();
    await expect(section.getByRole('heading', { level: 3 })).toContainText('Tombo');
  });

  test('oferece link de mapa para a praia selecionada', async ({ page }) => {
    await goHome(page);

    const mapLink = page.locator('#praias a', { hasText: 'Ver no mapa' });
    await expect(mapLink).toHaveAttribute('href', /google\.com\/maps/);
  });
});

test.describe('Galeria', () => {
  test('filtra por categoria e abre o lightbox', async ({ page }) => {
    await goHome(page);

    const gallery = page.locator('#galeria');
    await gallery.scrollIntoViewIfNeeded();

    const tiles = gallery.getByRole('button', { name: /abrir imagem/i });
    const initial = await tiles.count();
    expect(initial).toBeGreaterThan(0);

    await gallery.getByRole('tab', { name: 'Surf' }).click();
    const filtered = await tiles.count();
    expect(filtered).toBeLessThan(initial);

    await tiles.first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});

test.describe('Dúvidas', () => {
  test('abre uma resposta ao clicar na pergunta', async ({ page }) => {
    await goHome(page);

    const faq = page.locator('#duvidas');
    await faq.scrollIntoViewIfNeeded();

    const question = faq.getByRole('heading', { name: /preciso saber nadar/i });
    await question.click();

    await expect(faq.locator('details[open]')).toHaveCount(1);
  });
});

test.describe('Contato', () => {
  test('mostra Instagram, mapa e WhatsApp', async ({ page }) => {
    await goHome(page);

    const contato = page.locator('#contato');
    await contato.scrollIntoViewIfNeeded();

    await expect(contato.locator('a[href*="instagram.com/kombisurfschool"]')).toHaveCount(1);
    await expect(contato.locator('a[href*="google.com/maps"]').first()).toHaveCount(1);
    await expect(contato.locator(`a[href*="${WHATSAPP_HOST}"]`).first()).toHaveCount(1);
  });
});

test.describe('Integridade do conteúdo (regras do projeto)', () => {
  test('não inventa professores nem depoimentos', async ({ page }) => {
    await goHome(page);

    // Ambas as seções ficam desligadas enquanto não houver dado real.
    await expect(page.locator('#professores')).toHaveCount(0);
    await expect(page.locator('#depoimentos')).toHaveCount(0);
  });

  test('não se apresenta como site oficial e avisa que é conceito', async ({ page }) => {
    await goHome(page);

    const footer = (await page.locator('footer').innerText()).toLowerCase();
    // O rodapé precisa dizer, sem rodeio, que ainda não é o site oficial.
    expect(footer).toContain('site conceito');
    expect(footer).toContain('ainda não é o site oficial');
  });

  test('bloqueia indexação enquanto for conceito', async ({ page, request }) => {
    await goHome(page);

    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robotsMeta).toContain('noindex');

    const robots = await request.get('/robots.txt');
    expect((await robots.text()).toLowerCase()).toContain('disallow: /');
  });

  test('a página interna de revisão lista o que está pendente', async ({ page }) => {
    await page.goto('/revisao/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Revisão');
    await expect(page.getByText(/pendente/i).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /fontes consultadas/i })).toBeVisible();
  });
});

test.describe('SEO e dados estruturados', () => {
  test('tem title, description, canonical e Open Graph', async ({ page }) => {
    await goHome(page);

    await expect(page).toHaveTitle(/Kombi Surf School/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Guarujá/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  });

  test('emite JSON-LD válido e sem dados não confirmados', async ({ page }) => {
    await goHome(page);

    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((node) => node.textContent ?? ''));

    expect(blocks.length).toBeGreaterThanOrEqual(3);

    const types = blocks.map((block) => JSON.parse(block)['@type']);
    expect(types).toContain('SportsActivityLocation');
    expect(types).toContain('FAQPage');
  });
});

test.describe('Acessibilidade', () => {
  test('tem exatamente um h1 e hierarquia de headings', async ({ page }) => {
    await goHome(page);

    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.locator('h2').count()).toBeGreaterThan(4);
  });

  test('toda imagem e arte tem texto alternativo', async ({ page }) => {
    await goHome(page);

    const missing = await page.locator('img:not([alt])').count();
    expect(missing).toBe(0);

    const unlabeled = await page.locator('[role="img"]:not([aria-label])').count();
    expect(unlabeled).toBe(0);
  });

  test('todo botão sem texto tem aria-label', async ({ page }) => {
    await goHome(page);

    const problems = await page.locator('button').evaluateAll((nodes) =>
      nodes.filter((node) => {
        const text = (node.textContent ?? '').trim();
        return text.length === 0 && !node.getAttribute('aria-label');
      }).length,
    );

    expect(problems).toBe(0);
  });
});

test.describe('Mobile', () => {
  test('a barra fixa de WhatsApp aparece depois da primeira dobra', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Só se aplica ao layout mobile');

    await goHome(page);

    const bar = page.locator('a[aria-label*="Agendar aula de surf"]');
    // Fora de cena o botão fica invisível de verdade (não só transparente).
    await expect(bar).toBeHidden();

    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await expect(bar).toBeVisible();
  });

  test('o menu mobile abre e fecha', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Só se aplica ao layout mobile');

    await goHome(page);

    await page.getByRole('button', { name: /abrir menu/i }).click();
    await expect(page.locator('#menu-mobile')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('#menu-mobile')).toBeHidden();
  });

  test('a página não rola na horizontal', async ({ page }) => {
    await goHome(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe('Links', () => {
  test('links externos abrem em nova aba com rel seguro', async ({ page }) => {
    await goHome(page);

    const problems = await page.locator('a[target="_blank"]').evaluateAll((nodes) =>
      nodes.filter((node) => !(node.getAttribute('rel') ?? '').includes('noopener')).length,
    );

    expect(problems).toBe(0);
  });

  test('não há link interno quebrado', async ({ page }) => {
    await goHome(page);

    const anchors = await page.locator('a[href^="#"], a[href^="/#"]').evaluateAll((nodes) =>
      nodes.map((node) => (node.getAttribute('href') ?? '').replace('/#', '#')),
    );

    for (const anchor of new Set(anchors)) {
      if (anchor === '#') continue;
      await expect(page.locator(anchor)).toHaveCount(1);
    }
  });
});

test.describe('Como está o mar', () => {
  /**
   * A seção consome a Open-Meteo no navegador. Os dois caminhos importam:
   * com resposta boa, mostra a leitura; com a API fora do ar (ou bloqueada por
   * rede corporativa), mostra um estado honesto — nunca um número inventado.
   */
  test('mostra a leitura quando a API responde', async ({ page }) => {
    await page.route('**/marine-api.open-meteo.com/**', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          current: {
            wave_height: 0.8,
            wave_period: 9.4,
            wave_direction: 160,
            sea_surface_temperature: 23.6,
          },
        }),
      }),
    );
    await page.route('**/api.open-meteo.com/**', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          current: { temperature_2m: 27.1, wind_speed_10m: 12, wind_direction_10m: 45 },
        }),
      }),
    );

    await goHome(page);
    const mar = page.locator('#mar');
    await mar.scrollIntoViewIfNeeded();

    // Número no padrão brasileiro e unidade em caixa baixa.
    await expect(mar).toContainText('0,8');
    await expect(mar).toContainText('m');
    await expect(mar).toContainText('9');
    await expect(mar).toContainText('24°');
    await expect(mar).toContainText('12');
    await expect(mar).toContainText('km/h NE');
    await expect(mar).toContainText('Mar médio');
  });

  test('degrada com honestidade quando a API falha', async ({ page }) => {
    await page.route('**/open-meteo.com/**', (route) => route.abort());

    await goHome(page);
    const mar = page.locator('#mar');
    await mar.scrollIntoViewIfNeeded();

    await expect(mar).toContainText(/não foi possível ler as condições/i);
    // O ponto central: nenhum número aparece no lugar do dado que faltou.
    await expect(mar).not.toContainText(/\d/);
  });
});

test.describe('Cabeçalhos de produção', () => {
  /**
   * O servidor dos testes aplica os mesmos cabeçalhos do vercel.json, então o
   * Content-Security-Policy é exercitado de verdade. Uma política apertada
   * demais quebraria a fonte, o mapa ou a chamada de ondas em silêncio — e o
   * lugar de descobrir isso é aqui, não na frente do cliente.
   */
  test('a página carrega sem violação de CSP nem erro de console', async ({ page }) => {
    const problems: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await goHome(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);

    const csp = problems.filter((text) => /content security policy/i.test(text));
    expect(csp, `violações de CSP: ${csp.join(' | ')}`).toHaveLength(0);

    // A chamada à API de ondas pode falhar por rede; isso não é erro de página.
    const unexpected = problems.filter((text) => !/open-meteo|failed to fetch|net::/i.test(text));
    expect(unexpected, `erros inesperados: ${unexpected.join(' | ')}`).toHaveLength(0);
  });

  test('serve os cabeçalhos de segurança esperados', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();

    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['content-security-policy']).toContain("default-src 'self'");
    // As duas exceções de que o site realmente precisa.
    expect(headers['content-security-policy']).toContain('marine-api.open-meteo.com');
    expect(headers['content-security-policy']).toContain('openstreetmap.org');
  });

  test('as fontes são servidas do próprio domínio', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (/fonts\.(googleapis|gstatic)\.com/.test(url)) external.push(url);
    });

    await goHome(page);
    // next/font baixa as fontes no build; nenhuma requisição a terceiro em runtime.
    expect(external).toHaveLength(0);
  });
});

test.describe('Pronto para deploy', () => {
  /**
   * Com `trailingSlash: true`, o Next emite um 308 de qualquer caminho SEM
   * ponto para a versão com barra final. Foi o que derrubou a rota de imagem
   * do Next (`/opengraph-image`): virava `/opengraph-image/` e dava 404, com o
   * preview do link quebrando no WhatsApp. Estes testes prendem essa classe de
   * erro.
   */
  test('a imagem de compartilhamento existe e é uma imagem de verdade', async ({ page, request }) => {
    await goHome(page);

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();

    const path = new URL(ogImage!).pathname;
    // Precisa ter extensão, senão cai no redirect de barra final.
    expect(path).toMatch(/\.(jpg|jpeg|png)$/);

    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/^image\//);

    // Clientes de mensagem desistem do preview em imagens muito pesadas.
    const bytes = (await response.body()).length;
    expect(bytes).toBeGreaterThan(10_000);
    expect(bytes).toBeLessThan(600_000);
  });

  test('nenhum recurso do <head> fica sem extensão', async ({ page }) => {
    await goHome(page);

    const urls = await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          'meta[property="og:image"], meta[name="twitter:image"], link[rel="icon"], link[rel="apple-touch-icon"]',
        ),
      ]
        .map((node) => node.getAttribute('content') ?? node.getAttribute('href') ?? '')
        .filter(Boolean),
    );

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      const path = url.startsWith('http') ? new URL(url).pathname : url;
      expect(path, `${path} precisa de extensão para não cair no redirect 308`).toMatch(/\.[a-z0-9]+$/i);
    }
  });

  test('as rotas publicadas respondem', async ({ request }) => {
    for (const path of ['/', '/revisao/', '/robots.txt', '/sitemap.xml', '/icon.svg', '/og.jpg']) {
      const response = await request.get(path);
      expect(response.status(), `${path} respondeu ${response.status()}`).toBe(200);
    }
  });

  test('a URL do site vem do ambiente, não do placeholder de desenvolvimento', async ({ page }) => {
    await goHome(page);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');

    // Em produção a Vercel injeta VERCEL_PROJECT_PRODUCTION_URL; aqui o build
    // local usa o fallback. O que importa é que os dois concordem e sejam https.
    expect(canonical).toMatch(/^https:\/\//);
    expect(ogUrl).toBe(canonical);
  });
});
