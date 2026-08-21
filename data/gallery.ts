export type GalleryCategory = 'surf' | 'aulas' | 'alunos' | 'praia' | 'professores' | 'lifestyle';

export interface GalleryItem {
  readonly id: string;
  /**
   * Caminho da foto oficial da escola. Enquanto for `null`, o site renderiza uma
   * composição gráfica original (não é foto de ninguém, não é foto de outra
   * escola). Basta apontar para /images/... quando as fotos chegarem.
   */
  readonly src: string | null;
  readonly alt: string;
  readonly category: GalleryCategory;
  /** Legenda curta e neutra. Não descreve pessoas nem fatos não verificados. */
  readonly caption: string;
  readonly span: 'tall' | 'wide' | 'square';
  /** Semente da arte gerada (mantém a composição estável entre builds). */
  readonly seed: number;
  readonly art: 'wave' | 'sunset' | 'aerial' | 'kombi' | 'lineup' | 'foam';
}

export const galleryCategories: readonly { id: GalleryCategory | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'surf', label: 'Surf' },
  { id: 'aulas', label: 'Aulas' },
  { id: 'alunos', label: 'Alunos' },
  { id: 'praia', label: 'Praia' },
  { id: 'professores', label: 'Professores' },
  { id: 'lifestyle', label: 'Lifestyle' },
];

/**
 * GALERIA
 * -------
 * A escola ainda não enviou fotos e não usamos foto de terceiro nem imagem de
 * outra escola. Cada slot abaixo está com `src: null` e exibe uma composição
 * gráfica original criada para o conceito.
 *
 * Para publicar as fotos reais: coloque os arquivos em /public/images/galeria/
 * e troque `src: null` por `src: '/images/galeria/arquivo.jpg'`. Nada mais
 * precisa mudar — o componente já trata proporção, lazy loading e lightbox.
 */
export const gallery: readonly GalleryItem[] = [
  { id: 'g01', src: null, alt: 'Composição gráfica de uma série de ondas quebrando ao amanhecer', category: 'surf', caption: 'Série entrando', span: 'tall', seed: 11, art: 'wave' },
  { id: 'g02', src: null, alt: 'Composição gráfica do sol baixo sobre a linha do horizonte no mar', category: 'lifestyle', caption: 'Fim de tarde no Guarujá', span: 'wide', seed: 23, art: 'sunset' },
  { id: 'g03', src: null, alt: 'Composição gráfica vista de cima da faixa de areia encontrando a água', category: 'praia', caption: 'A faixa de areia', span: 'square', seed: 37, art: 'aerial' },
  { id: 'g04', src: null, alt: 'Composição gráfica de uma Kombi estacionada de frente para o mar', category: 'lifestyle', caption: 'Estacionou de frente pro mar', span: 'wide', seed: 41, art: 'kombi' },
  { id: 'g05', src: null, alt: 'Composição gráfica de surfistas esperando a onda no outside', category: 'aulas', caption: 'Esperando a série', span: 'square', seed: 53, art: 'lineup' },
  { id: 'g06', src: null, alt: 'Composição gráfica da espuma branca chegando na areia', category: 'alunos', caption: 'Onde começa a primeira aula', span: 'tall', seed: 67, art: 'foam' },
  { id: 'g07', src: null, alt: 'Composição gráfica de parede de onda limpa com vento terral', category: 'surf', caption: 'Terral de manhã cedo', span: 'square', seed: 71, art: 'wave' },
  { id: 'g08', src: null, alt: 'Composição gráfica do costão e da enseada vistos do mar', category: 'praia', caption: 'Enseada protegida', span: 'wide', seed: 83, art: 'aerial' },
  { id: 'g09', src: null, alt: 'Composição gráfica de silhuetas na beira da água ao entardecer', category: 'professores', caption: 'Briefing na areia', span: 'wide', seed: 97, art: 'lineup' },
];
