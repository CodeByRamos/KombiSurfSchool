/**
 * CONDIÇÕES DO MAR
 * ----------------
 * Integração com a Open-Meteo Marine API + Forecast API.
 *
 * Por que Open-Meteo:
 *   - gratuita para uso não comercial, sem chave de API e sem cadastro
 *   - CORS liberado, então roda direto no navegador (nada de backend)
 *   - dados de ondulação (altura, período, direção) e vento
 *
 * Docs: https://open-meteo.com/en/docs/marine-weather-api
 *       https://open-meteo.com/en/docs
 *
 * A seção é 100% opcional: se a requisição falhar, demorar ou vier num formato
 * inesperado, o componente mostra um estado alternativo e o site segue normal.
 * Nada bloqueia o carregamento da página.
 */

export interface MarineSnapshot {
  readonly waveHeight: number | null;
  readonly wavePeriod: number | null;
  readonly waveDirection: number | null;
  readonly waterTemp: number | null;
  readonly windSpeed: number | null;
  readonly windDirection: number | null;
  readonly airTemp: number | null;
  readonly fetchedAt: string;
}

const MARINE_ENDPOINT = 'https://marine-api.open-meteo.com/v1/marine';
const WEATHER_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const TIMEOUT_MS = 6000;

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

async function getJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function fetchMarineSnapshot(lat: number, lng: number): Promise<MarineSnapshot> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const marineUrl =
    `${MARINE_ENDPOINT}?latitude=${lat}&longitude=${lng}` +
    '&current=wave_height,wave_direction,wave_period,sea_surface_temperature' +
    '&timezone=America%2FSao_Paulo';

  const weatherUrl =
    `${WEATHER_ENDPOINT}?latitude=${lat}&longitude=${lng}` +
    '&current=temperature_2m,wind_speed_10m,wind_direction_10m' +
    '&timezone=America%2FSao_Paulo';

  try {
    const [marineRaw, weatherRaw] = await Promise.all([
      getJson(marineUrl, controller.signal),
      getJson(weatherUrl, controller.signal).catch(() => null),
    ]);

    const marine = asRecord(asRecord(marineRaw).current);
    const weather = asRecord(asRecord(weatherRaw).current);

    return {
      waveHeight: num(marine.wave_height),
      wavePeriod: num(marine.wave_period),
      waveDirection: num(marine.wave_direction),
      waterTemp: num(marine.sea_surface_temperature),
      windSpeed: num(weather.wind_speed_10m),
      windDirection: num(weather.wind_direction_10m),
      airTemp: num(weather.temperature_2m),
      fetchedAt: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timer);
  }
}

const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'L', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];

export function compassLabel(degrees: number | null): string | null {
  if (degrees === null) return null;
  const index = Math.round(((degrees % 360) + 360) % 360 / 22.5) % 16;
  return COMPASS[index] ?? null;
}

/**
 * Leitura em linguagem de aluno, a partir da altura da ondulação.
 * Deliberadamente conservadora: nunca diz "pode entrar", só descreve o mar.
 */
export function readingFor(waveHeight: number | null): { label: string; hint: string; tone: 'calm' | 'medium' | 'strong' } {
  if (waveHeight === null) {
    return { label: 'Sem leitura agora', hint: 'Confirme as condições com a escola no agendamento.', tone: 'medium' };
  }
  if (waveHeight < 0.6) {
    return { label: 'Mar pequeno', hint: 'Condição típica de dia tranquilo — a favorita de quem está começando.', tone: 'calm' };
  }
  if (waveHeight < 1.2) {
    return { label: 'Mar médio', hint: 'Dá para aula em praia abrigada. A escola escolhe o melhor canto no dia.', tone: 'medium' };
  }
  return { label: 'Mar grande', hint: 'Dia de mar forte. Em geral a aula vai para uma praia mais protegida.', tone: 'strong' };
}
