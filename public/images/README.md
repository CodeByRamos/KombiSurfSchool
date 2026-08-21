# Fotos da Kombi Surf School

Enquanto a escola não enviar as fotos oficiais, **este projeto não usa nenhuma
fotografia**. Todo espaço de imagem exibe uma composição gráfica vetorial
autoral, criada para o conceito (`components/ui/SurfArt.tsx`).

Isso é intencional: não usamos foto de banco de imagens, foto de terceiros nem
foto de outra escola de surf apresentada como se fosse da Kombi.

## Como trocar pela foto real

As pastas abaixo já existem e estão prontas:

```
public/images/
  galeria/       fotos da seção Galeria
  aulas/         uma foto por tipo de aula
  praias/        uma foto por praia
  professores/   retrato de cada instrutor
```

1. Coloque o arquivo na pasta correspondente.
2. Abra o arquivo em `data/` e troque `src: null` pelo caminho.

```ts
// data/gallery.ts — antes
{ id: 'g01', src: null,  alt: '…', … }

// depois
{ id: 'g01', src: '/images/galeria/aula-tombo.jpg', alt: 'Aluna descendo a primeira onda na Praia do Tombo', … }
```

Nada mais precisa mudar: o componente `Media` detecta que existe uma foto e
passa a usar `next/image`, com lazy loading, `sizes` responsivo e conversão para
AVIF/WebP. A composição gráfica some sozinha.

## O que pedir para a escola

- **Formato**: JPG ou WebP, lado maior a partir de 2000px.
- **Orientação**: uma boa mistura de horizontais (destaques) e verticais
  (mosaico da galeria).
- **Conteúdo que converte**: aluno de pé na primeira onda, professor orientando
  na areia, turma de crianças, a Kombi/ponto de encontro, e o mar do Guarujá em
  um dia bom.
- **Direitos**: confirme que a escola tem autorização de uso de imagem das
  pessoas retratadas, especialmente das crianças.

## Alt text

Todo `alt` deve descrever o que está na foto, em português, sem repetir
palavra-chave. É requisito de acessibilidade e o `alt` das artes atuais já segue
esse padrão.
