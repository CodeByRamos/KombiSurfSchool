# Kombi Surf School — site conceito

Site de escola de surf para a **Kombi Surf School**, do Guarujá/SP.

> **Este é um projeto conceito.** Foi construído como demonstração comercial e
> **ainda não tem autorização formal da Kombi Surf School**. Ele não é o site
> oficial da escola, não se apresenta como tal e não é indexado por buscadores
> enquanto `site.isConcept` for `true`.

O objetivo do site é responder, em dez segundos, a pergunta de quem chega:
*“quero aprender a surfar — como faço?”* — e transformar essa pessoa em aluno.

---

## A regra que organiza o projeto: nada é inventado

Escola de surf vende confiança. Um preço errado, um professor que não existe ou
um depoimento fabricado destroem exatamente o que o site deveria construir. Por
isso a pesquisa veio antes do código, e o que a pesquisa não confirmou **não
virou texto**.

Isso não é uma promessa no README: está no tipo.

```ts
// data/types.ts
type ConfirmationStatus = 'confirmado' | 'referencia' | 'pendente';

interface Fact<T> {
  value: T | null;
  status: ConfirmationStatus;
  source?: string;   // de onde veio
  note?: string;     // o que perguntar para a escola
  checkedAt?: string;// preço e horário envelhecem
}
```

Todo dado sensível — preço, duração, praia, professor, contato — é um `Fact`.
Os componentes **nunca leem `fact.value` direto**: usam `resolve(fact, fallback)`,
que devolve *“A combinar”* ou *“Consulte valores”* quando o dado está pendente.
Não existe caminho no código em que um dado não confirmado seja exibido como
afirmação.

Quando não havia dado nenhum, a seção simplesmente **não é renderizada**:

- **Professores** — nenhum nome encontrado em fonte pública → seção desligada.
- **Depoimentos** — nenhuma avaliação verificável encontrada → seção desligada.

Nenhum professor fictício, nenhum depoimento inventado, nenhuma foto de outra
escola.

### O placar do conteúdo

A página interna **`/revisao`** lista, item a item, o que está confirmado, o que
veio de fonte não verificada e o que falta. É gerada a partir dos próprios
arquivos de `data/`, então nunca fica desatualizada. Não aparece no menu, vai
com `noindex` e fica fora do sitemap — o visitante comum vê só o site.

O roteiro da conversa com a escola está em **[`CONTEUDO-PENDENTE.md`](./CONTEUDO-PENDENTE.md)**.

---

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | ambiente de desenvolvimento |
| `npm run build` | build estático em `out/` |
| `npm run lint` | ESLint (config do Next 16) |
| `npm run typecheck` | TypeScript em modo estrito |
| `npm test` | Playwright, desktop + mobile, contra o build |

O `npm test` sobe sozinho um servidor estático (`tests/static-server.mjs`) sobre
a pasta `out/`, então rode `npm run build` antes. Em uma máquina nova,
`npm run test:install` baixa o Chromium uma vez.

### Publicando

`next.config.ts` usa `output: 'export'`, então o build gera HTML estático puro em
`out/` — sobe em Vercel, Netlify, Cloudflare Pages, S3 ou qualquer hospedagem
comum, sem servidor Node.

---

## Onde mexer

```
data/            ← a escola manda informação nova? é aqui, e só aqui
  site.ts          flags do projeto, SEO base, menu
  school.ts        identidade e história da escola
  contact.ts       WhatsApp, Instagram, endereço, mensagens dos CTAs
  lessons.ts       as três trilhas de aula + política de preço
  beaches.ts       guia das praias de surf do Guarujá
  instructors.ts   vazio de propósito — preencher liga a seção
  testimonials.ts  vazio de propósito — preencher liga a seção
  gear.ts          o que levar na aula
  faq.ts           dúvidas
  gallery.ts       slots da galeria (src: null = arte gerada)
  sources.ts       registro da pesquisa: fonte por fonte
  types.ts         o modelo Fact / resolve / isKnown

app/             rotas (App Router), SEO, robots, sitemap, OG image
components/
  layout/          cabeçalho, rodapé, CTA fixo do mobile, marca
  sections/        as seções da home, na ordem em que aparecem
  ui/              botões, ícones, mídia, arte gerada, mapa, reveal
lib/
  whatsapp.ts      montagem dos links de conversa
  marine.ts        integração com a Open-Meteo (condições do mar)
  maps.ts          links de Google Maps e embed do OpenStreetMap
  seo.ts           JSON-LD
  audit.ts         alimenta a página /revisao
```

Atualizar preço, horário, praia, professor ou foto **não exige tocar em nenhum
componente** — só em `data/`.

---

## Decisões técnicas

**Next.js 16 + React 19 + TypeScript estrito + Tailwind v4.** Export estático:
o site é conteúdo, não aplicação — não há motivo para pagar servidor.

**Imagens sem foto.** Como não há foto oficial e não usamos foto de terceiros,
cada espaço de imagem recebe uma composição vetorial autoral gerada por semente
(`components/ui/SurfArt.tsx`): seis variações — onda, pôr do sol, vista aérea,
Kombi, line-up e espuma. Ganho colateral: zero requisição de rede, zero CLS e
escala em qualquer tela. Quando a foto real chegar, o componente `Media` troca
sozinho para `next/image`. Instruções em `public/images/README.md`.

**Condições do mar.** A seção “Como está o mar” consome a
[Open-Meteo](https://open-meteo.com/) (gratuita, sem chave, com CORS) para a
Praia do Tombo. Roda no navegador, depois do carregamento, com timeout de 6s e
validação do formato: se falhar, mostra um estado alternativo honesto em vez de
número inventado. Nada na página depende dela.

**Mapa.** OpenStreetMap embutido, sem chave de API e sem banner de cookies. O
iframe só é montado quando a seção entra na tela; enquanto isso (e se falhar)
fica no lugar uma peça gráfica com o endereço, não um retângulo cinza.

**Tipografia.** Anton para display, Inter para texto, via `next/font` (sem FOUT,
sem requisição a terceiro em runtime). A entrelinha da display é `0.94` de
propósito: abaixo de ~0.92 o Anton corta o acento de “ONDA É HOJE”. Há teste
travando essa regressão.

**Sem dependência de UI.** Nenhuma biblioteca de componentes, animação ou
carrossel. Acordeão é `<details>`, revelação ao rolar é `IntersectionObserver`,
lightbox é um `dialog` com foco preso — tudo com `prefers-reduced-motion`
respeitado.

---

## Conversão

A prioridade declarada foi **conversão > clareza > fotografia > UX >
performance > estética**, e o layout segue isso:

- WhatsApp no cabeçalho, no hero, em cada card de aula, em cada praia, no “o que
  levar”, nas dúvidas, no contato, no CTA final e no rodapé;
- barra fixa de WhatsApp no mobile, que aparece depois da primeira dobra (para
  não competir com o CTA do hero) e some perto do rodapé (para não cobrir os
  contatos);
- cada botão leva uma mensagem pré-escrita conforme o contexto — quem clica em
  “Kids” já chega perguntando idade mínima;
- onde não há preço, o lugar do preço vira um convite (“Consulte valores pelo
  WhatsApp”), não um vazio.

## Acessibilidade

Um `h1` por página, hierarquia de headings, `alt` em toda imagem e arte,
`aria-label` em todo botão sem texto, foco visível, navegação completa por
teclado (inclusive no lightbox e no menu mobile), link de pular para o conteúdo
e contraste conferido sobre as áreas escuras.

## SEO

`title`, `description`, `canonical`, Open Graph, Twitter Card, imagem OG gerada
no build, favicon, `sitemap.xml`, `robots.txt` e JSON-LD
(`SportsActivityLocation`, `Service`, `FAQPage`, `BreadcrumbList`). O schema só
emite dados que passaram no filtro `isKnown` — telefone e endereço não
confirmados não entram.

Tudo isso está implementado e **desligado de propósito**: enquanto
`site.isConcept` for `true`, o `robots.txt` bloqueia tudo e as páginas vão com
`noindex`. Vire a flag depois da autorização da escola.
