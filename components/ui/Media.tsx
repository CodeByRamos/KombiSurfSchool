import Image from 'next/image';
import { SurfArt, type ArtVariant } from './SurfArt';

interface MediaProps {
  /** Caminho da foto real. Quando `null`, entra a composição gráfica autoral. */
  src: string | null;
  alt: string;
  variant?: ArtVariant;
  seed?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  muted?: boolean;
}

/**
 * Ponto único de troca entre "conceito" e "foto oficial".
 *
 * Enquanto `src` for null, renderiza arte vetorial autoral — nunca uma foto de
 * terceiro apresentada como se fosse da escola. Assim que a Kombi enviar as
 * fotos, basta preencher `src` nos arquivos de /data e este componente passa a
 * usar next/image com AVIF/WebP, lazy loading e sizes responsivos.
 */
export function Media({
  src,
  alt,
  variant = 'wave',
  seed = 7,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  muted = false,
}: MediaProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className={className ?? 'object-cover'}
      />
    );
  }

  return (
    <div className={className ?? 'absolute inset-0'} role="img" aria-label={alt}>
      <SurfArt variant={variant} seed={seed} muted={muted} />
    </div>
  );
}
