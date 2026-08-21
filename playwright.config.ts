import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

/**
 * Testes end-to-end contra o build estático exportado — exatamente o que vai
 * para produção — servido pelo servidor mínimo em tests/static-server.mjs.
 *
 * O Chromium já vem instalado neste ambiente, por isso `executablePath` aponta
 * para ele em vez de baixar um novo. Em outra máquina, rode `npm run test:install`
 * uma vez e remova a linha (ou deixe: o Playwright ignora se o caminho não existir
 * e o launchOptions for omitido).
 */
/** Caminho do Chromium pré-instalado, quando existir. */
const chromiumPath = process.env.PLAYWRIGHT_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const launchOptions = existsSync(chromiumPath) ? { executablePath: chromiumPath } : {};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list']],
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
    locale: 'pt-BR',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], launchOptions } },
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions } },
  ],
  webServer: {
    command: 'node tests/static-server.mjs',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
