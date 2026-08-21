'use client';

import { useEffect, useRef, useState } from 'react';
import { SurfArt } from './SurfArt';
import { PinIcon } from './Icons';
import { osmEmbedUrl } from '@/lib/maps';

interface MapEmbedProps {
  lat: number;
  lng: number;
  title: string;
  /** Texto mostrado sobre o mapa de apoio enquanto o embed não carrega. */
  label: string;
}

/**
 * Mapa com carregamento progressivo.
 *
 * Escolhas por trás disso:
 *   - o iframe só é montado quando a seção entra na tela, então o site não faz
 *     requisição a terceiro para quem nunca rola até aqui (bom para LCP e para
 *     privacidade do visitante);
 *   - usamos OpenStreetMap, que não exige chave de API nem banner de cookies;
 *   - enquanto o embed não confirma o carregamento — e também se ele falhar,
 *     for bloqueado por extensão ou estourar o tempo — fica no lugar uma peça
 *     gráfica com o endereço e o pino, em vez do retângulo cinza de iframe
 *     quebrado.
 */
export function MapEmbed({ lat, lng, title, label }: MapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Se o embed não confirmar o carregamento a tempo, seguimos com a peça gráfica.
  useEffect(() => {
    if (!mounted || loaded) return;
    const timer = setTimeout(() => setLoaded((current) => current), 8000);
    return () => clearTimeout(timer);
  }, [mounted, loaded]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-foam/15 bg-ink-800"
    >
      {/* Peça gráfica de apoio: costa e faixa de areia, com o pino da região. */}
      <div className="absolute inset-0" aria-hidden="true">
        <SurfArt variant="aerial" seed={321} muted />
      </div>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
        aria-hidden={loaded ? 'true' : undefined}
        style={{
          background: 'linear-gradient(180deg, rgba(7,26,32,0.55), rgba(7,26,32,0.8))',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 400ms ease',
        }}
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-kombi text-foam">
          <PinIcon className="size-5" />
        </span>
        <span className="font-display text-xl text-foam">{label}</span>
      </div>

      {mounted && (
        <iframe
          title={title}
          src={osmEmbedUrl(lat, lng)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 size-full border-0"
          style={{
            filter: 'grayscale(0.3) contrast(1.05)',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
        />
      )}
    </div>
  );
}
