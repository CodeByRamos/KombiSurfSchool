'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Media } from '@/components/ui/Media';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CloseIcon, ArrowIcon } from '@/components/ui/Icons';
import { gallery, galleryCategories, type GalleryCategory } from '@/data/gallery';

/**
 * Mosaico: linhas de altura fixa + `grid-flow-dense`, para que as peças de
 * tamanhos diferentes se encaixem sem deixar buraco quando um filtro reduz a
 * lista. Os spans só valem a partir de `sm` — no celular tudo vira uma coluna.
 */
const spanClasses: Record<string, string> = {
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  square: '',
};

/**
 * GALERIA
 * -------
 * Mosaico editorial com lightbox acessível (teclado, foco preso no diálogo,
 * Escape para fechar). Enquanto não há fotos oficiais, cada slot exibe uma
 * composição gráfica autoral — nunca foto de outra escola.
 */
export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'todas'>('todas');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () => (filter === 'todas' ? gallery : gallery.filter((item) => item.category === filter)),
    [filter],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        const next = (current + delta + items.length) % items.length;
        return next;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'Tab') {
        // Mantém o foco dentro do lightbox
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, step]);

  const activeItem = openIndex !== null ? items[openIndex] : null;

  return (
    <section id="galeria" className="scroll-mt-24 bg-foam py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Galeria" title="Um dia comum no Guarujá" />

          <div className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
            <ul
              className="flex gap-2 md:flex-wrap md:justify-end"
              role="tablist"
              aria-label="Filtrar galeria por categoria"
            >
              {galleryCategories.map((category) => {
                const isActive = filter === category.id;
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setFilter(category.id)}
                      className={`h-9 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-ink text-foam'
                          : 'border border-ink/15 text-ink/70 hover:border-ink/35 hover:text-ink'
                      }`}
                    >
                      {category.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="mt-14 text-ink/65">Nenhuma imagem nesta categoria ainda.</p>
        ) : (
          <ul className="mt-12 grid grid-flow-dense auto-rows-[13rem] grid-cols-1 gap-3 sm:auto-rows-[11rem] sm:grid-cols-2 lg:auto-rows-[12rem] lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={item.id} className={spanClasses[item.span] ?? ''}>
                <button
                  type="button"
                  onClick={(event) => {
                    lastFocused.current = event.currentTarget;
                    setOpenIndex(index);
                  }}
                  className="group relative block size-full overflow-hidden rounded-xl bg-ink"
                  aria-label={`Abrir imagem: ${item.caption}`}
                >
                  <Media
                    src={item.src}
                    alt={item.alt}
                    variant={item.art}
                    seed={item.seed}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(0deg, rgba(7,26,32,0.8), transparent)' }}
                      aria-hidden="true"
                    />
                    <span className="relative text-sm font-medium text-foam">{item.caption}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.caption}
          ref={dialogRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            type="button"
            onClick={close}
            className="on-dark absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-foam/25 text-foam transition-colors hover:bg-foam hover:text-ink"
            aria-label="Fechar imagem"
          >
            <CloseIcon />
          </button>

          <div className="relative w-full max-w-4xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-800">
              <Media
                src={activeItem.src}
                alt={activeItem.alt}
                variant={activeItem.art}
                seed={activeItem.seed}
                sizes="90vw"
              />
            </div>
            <p className="mt-4 text-center text-sm text-foam/70">{activeItem.caption}</p>
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                className="on-dark absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-foam/25 text-foam transition-colors hover:bg-foam hover:text-ink md:left-8"
                aria-label="Imagem anterior"
              >
                <ArrowIcon className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="on-dark absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-foam/25 text-foam transition-colors hover:bg-foam hover:text-ink md:right-8"
                aria-label="Próxima imagem"
              >
                <ArrowIcon className="size-4" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
