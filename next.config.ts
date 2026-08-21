import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // O conceito e servido como site estatico. Quando as fotos oficiais da escola
    // chegarem, basta remover `unoptimized` (ou migrar para um host com Image
    // Optimization) para ativar AVIF/WebP automaticos do next/image.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
