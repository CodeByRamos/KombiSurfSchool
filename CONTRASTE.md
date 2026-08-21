# Contraste — auditoria WCAG 2.1 AA

Medições da paleta real do projeto (`app/globals.css`). Texto normal precisa
de **4.5:1**; texto grande (≥24px, ou ≥18.5px em negrito) precisa de **3:1**.

## Texto sobre fundo claro (`foam #F7F3EA` / `sand #ECE2D0`)

| Combinação | Contraste | Mínimo | |
| --- | --- | --- | --- |
| `text-ink/65` sobre foam | 5.36:1 | 4.5 | ✅ |
| `text-ink/70` sobre foam | 6.34:1 | 4.5 | ✅ |
| `text-ink/80` sobre foam | 8.95:1 | 4.5 | ✅ |
| `text-ink/65` sobre sand | 5.05:1 | 4.5 | ✅ |
| `text-ink/70` sobre sand | 5.91:1 | 4.5 | ✅ |
| `text-kombi-dark` sobre foam (olho de seção, destaques) | 6.41:1 | 4.5 | ✅ |
| `text-kombi-dark` sobre sand | 5.53:1 | 4.5 | ✅ |
| `text-sea-deep` sobre foam | 6.36:1 | 4.5 | ✅ |
| `text-kombi` 48px (números dos passos) | 4.78:1 | 3.0 | ✅ |

## Texto sobre fundo escuro (`ink #071A20`)

| Combinação | Contraste | Mínimo | |
| --- | --- | --- | --- |
| `text-foam/60` | 6.41:1 | 4.5 | ✅ |
| `text-foam/65` | 7.32:1 | 4.5 | ✅ |
| `text-foam/70` | 8.31:1 | 4.5 | ✅ |
| `text-foam/75` | 9.39:1 | 4.5 | ✅ |
| `text-foam/80` | 10.55:1 | 4.5 | ✅ |
| `text-foam/85` | 11.80:1 | 4.5 | ✅ |
| `text-sun` (olho de seção) | 10.79:1 | 4.5 | ✅ |
| `text-sea-light` (ícones de contato) | 8.42:1 | 4.5 | ✅ |

## Elementos interativos

| Combinação | Contraste | Mínimo | |
| --- | --- | --- | --- |
| Botão primário: `foam` sobre `kombi` | 4.78:1 | 4.5 | ✅ |
| Botão primário em hover: `foam` sobre `kombi-dark` | 6.41:1 | 4.5 | ✅ |
| Botão claro: `ink` sobre `foam` | 16.10:1 | 4.5 | ✅ |
| Selo de praia iniciante: `ink` sobre `sky` | 13.03:1 | 4.5 | ✅ |
| Selo de praia mar forte: `foam` sobre `kombi` | 4.78:1 | 4.5 | ✅ |
| Selo intermediário: `ink` sobre `sun` | 10.79:1 | 4.5 | ✅ |
| Anel de foco `kombi` sobre foam | 4.78:1 | 3.0 | ✅ |
| Anel de foco `sun` sobre ink | 10.79:1 | 3.0 | ✅ |

## Por que existem dois laranjas

O laranja de marca `#EF4B23` alcança apenas **3.33:1** com texto claro
por cima — reprovado justamente no botão principal, o elemento mais clicado do
site. A paleta separa os papéis:

- `--color-kombi: #C9330F` — botões e números grandes (4.78:1 com texto claro)
- `--color-kombi-dark: #A62A0B` — texto pequeno de destaque e hover (5.53:1 na areia)
- `--color-kombi-bright: #EF4B23` — só grafismo grande (faixa da Kombi, pontos
  decorativos, favicon), onde não há texto por cima

Mesma lógica no azul do mar: `sea` para superfícies, `sea-deep` para texto.

## O que mais foi verificado

- O texto do hero fica sobre um degradê que garante o contraste independentemente
  da arte de fundo.
- Selos sobre imagem usam fundo **sólido**: com fundo translúcido o contraste
  dependeria do que estivesse atrás.
- Foco visível em toda a navegação, com cor trocada nas áreas escuras (`.on-dark`).
- Nenhuma informação depende só de cor — o estado do mar, por exemplo, tem
  bolinha colorida **e** rótulo em texto.
