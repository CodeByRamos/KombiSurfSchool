# Deploy

O site é estático: HTML, CSS, JS e uma imagem. **Não tem banco, não tem
formulário, não tem API com chave.** Nenhuma variável de ambiente é necessária
para subir.

Tempo estimado: cerca de 3 minutos.

---

## 1. Subir na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new) e clique em **Import Git Repository**.
2. Escolha `CodeByRamos/KombiSurfSchool`.
3. Em **Branch**, selecione `claude/kombi-surf-school-concept-bup5cp`.
4. Deixe tudo no padrão. A Vercel detecta o Next.js sozinha:

   | Campo | Valor |
   | --- | --- |
   | Framework Preset | Next.js *(detectado)* |
   | Build Command | `npm run build` *(padrão)* |
   | Output Directory | *(padrão — não mexa)* |
   | Install Command | `npm install` *(padrão)* |
   | Node.js Version | 22.x *(vem do `.nvmrc`)* |

5. **Environment Variables: não adicione nenhuma.** Está certo assim.
6. **Deploy**.

Pronto. A Vercel devolve algo como `kombi-surf-school.vercel.app`.

### Por que não precisa configurar a URL

O canonical, o Open Graph, o sitemap e o JSON-LD usam a URL real do site. A
Vercel injeta `VERCEL_PROJECT_PRODUCTION_URL` no build e o código lê dali
(`data/site.ts`). Você só define algo se registrar um domínio próprio — aí, em
**Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL = https://kombisurfschool.com.br
```

E faça um **Redeploy**, porque a URL entra no HTML durante o build.

---

## 2. Confira antes de mandar o link

Cinco checagens rápidas. A terceira é a que mais importa.

- [ ] **Abra no celular.** É por onde o cliente vai olhar. Role até passar da
      primeira dobra e veja a barra laranja de WhatsApp aparecer embaixo.
- [ ] **Clique em “Agendar uma aula”.** Tem que abrir o WhatsApp com a mensagem
      já escrita. ⚠️ Leia o item 3 abaixo antes.
- [ ] **Mande o link para você mesmo no WhatsApp.** O preview tem que aparecer
      com a imagem laranja/azul e o título. Se aparecer só o link cru, o
      WhatsApp pode ter cacheado — troque a URL (`?v=2`) para forçar.
- [ ] **Teste a seção “Como está o mar”.** Ela busca dados reais da Open-Meteo.
      Se a API estiver fora, mostra um aviso honesto em vez de número inventado
      — isso é o comportamento correto, não um bug.
- [ ] **Abra `/revisao`.** É a página que sustenta a conversa: mostra o que está
      confirmado e o que falta a escola confirmar.

---

## 3. ⚠️ O WhatsApp antes de mostrar para o cliente

Os botões estão **ativos** e apontam para **(13) 98141-4846** — o número que
você me passou, que **não consegui confirmar em nenhuma fonte independente**.

Se ele estiver errado, quem clicar manda mensagem para um estranho. Duas saídas:

**Confirmou que o número é da escola?** Nada a fazer, já está funcionando. Só
atualize o status em `data/contact.ts` para `confirmado`, para o registro ficar
correto.

**Ainda não confirmou?** Desligue o disparo — os botões continuam no ar e
levando para a seção de contato, sem abrir conversa nenhuma:

```ts
// data/contact.ts
export const whatsappLive = false;
```

Uma alternativa boa para a demo: troque pelo **seu** número enquanto isso. Aí o
cliente clica, a conversa abre com você, e ele sente o fluxo funcionando.

```ts
// data/contact.ts
whatsapp: referencia(
  { e164: '55SEUNUMERO', display: '(13) 9XXXX-XXXX' },
  'Número temporário do desenvolvedor, só para a demonstração',
  'TROCAR pelo número da escola antes de qualquer publicação real.',
),
```

---

## 4. O site não vai aparecer no Google — de propósito

Enquanto `site.isConcept` for `true` em `data/site.ts`:

- `robots.txt` bloqueia todos os buscadores
- as páginas vão com `<meta name="robots" content="noindex, nofollow">`
- o rodapé diz, com todas as letras, que ainda não é o site oficial

Isso é intencional: o projeto ainda não tem autorização da Kombi Surf School, e
um site não autorizado indexado no nome da escola seria um problema real para
ela e para você.

Toda a estrutura de SEO já está pronta e passa a valer no dia da aprovação:

```ts
// data/site.ts
isConcept: false,
```

---

## 5. Deixar a demo privada (opcional)

O link é público, só não é indexado. Se preferir que só quem tem senha veja:

**Vercel → Settings → Deployment Protection → Password Protection.**
Requer plano Pro.

Sem o Pro, o `noindex` mais o aviso no rodapé já cobrem o essencial: ninguém
acha por acaso, e quem entra sabe que é conceito.

---

## Depois: o que vem quando o cliente disser sim

### Fotos da escola
Coloque em `public/images/` e troque `src: null` pelo caminho nos arquivos de
`data/`. Instruções em [`public/images/README.md`](./public/images/README.md).

Quando as fotos entrarem, vale ativar a otimização de imagem da Vercel — duas
linhas em `next.config.ts`:

```ts
// remova estas duas para o next/image otimizar (AVIF/WebP, resize automático)
images: { unoptimized: true },
output: 'export',
```

Sem `output: 'export'` o site passa a rodar como app Next na Vercel, com
otimização de imagem e revalidação. Enquanto não há fotos, o export estático é
mais rápido e roda em qualquer lugar.

### Domínio próprio
**Vercel → Settings → Domains.** Depois defina `NEXT_PUBLIC_SITE_URL` e
redeploy, para o canonical e o Open Graph apontarem para o domínio novo.

### Supabase
Hoje o projeto **não usa** e **não precisa** de Supabase. Ele faria sentido no
dia em que o site precisar guardar alguma coisa. Os dois casos que valem:

- **Captura de leads** — um formulário “quero uma aula” ao lado do botão de
  WhatsApp, gravando nome, contato e nível numa tabela, mais uma página
  protegida onde a escola vê os contatos. É o argumento mais forte para cobrar
  pelo site: ele deixa de informar e passa a capturar.
- **Painel de conteúdo** — preços, aulas, praias e professores saem de `data/`
  e vão para tabelas, com uma tela de edição. A escola atualiza sozinha, e isso
  justifica mensalidade em vez de projeto fechado.

Nos dois casos entram `NEXT_PUBLIC_SUPABASE_URL` e
`NEXT_PUBLIC_SUPABASE_ANON_KEY` como variáveis na Vercel, mais políticas de RLS
no banco. Nada disso é necessário para a demonstração de agora.

### Imagem de compartilhamento
Se mudar a headline do site, regenere o preview do link:

```bash
npm run og    # gera public/og.jpg a partir de scripts/og-template.html
```

---

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000
```

Antes de subir qualquer alteração:

```bash
npm run lint && npm run typecheck && npm run build && npm test
```

Os testes sobem o build com **os mesmos cabeçalhos que a Vercel serve** (lidos
do `vercel.json`), então uma política de segurança que quebre o mapa ou a
consulta de ondas falha aqui, e não na frente do cliente.
