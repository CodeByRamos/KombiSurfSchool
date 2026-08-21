import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = 'Kombi Surf School — aula de surf no Guarujá';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

/** Imagem de compartilhamento, gerada no build (sem dependência externa). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(160deg, #0B3A46 0%, #071A20 62%, #0E2A33 100%)',
          color: '#F7F3EA',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 8, background: '#EF4B23' }} />
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: 'uppercase', color: '#FFBE45' }}>
            Guarujá — SP
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
            Sua primeira onda
          </div>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: -2, color: '#FFBE45' }}>
            é hoje
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: 'rgba(247,243,234,0.75)' }}>
            Aulas de surf para iniciantes, crianças e quem quer evoluir.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 28 }}>
          <div style={{ display: 'flex', fontWeight: 700 }}>{site.name}</div>
          <div style={{ display: 'flex', color: 'rgba(247,243,234,0.6)' }}>Agende pelo WhatsApp</div>
        </div>
      </div>
    ),
    size,
  );
}
