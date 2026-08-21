# Fontes da imagem de compartilhamento

Subconjuntos latinos de **Anton** e **Inter**, os dois sob a
[SIL Open Font License 1.1](https://scripts.sil.org/OFL) — redistribuição
permitida.

Ficam aqui para que `npm run og` gere a imagem **sem depender de rede**: o
script embute as fontes na página antes de fotografar. Sem isso, uma geração
offline sairia com a fonte de fallback e a imagem ficaria diferente da do site.

São os mesmos arquivos que o `next/font` baixa no build, copiados de
`.next/static/media/`. Se um dia trocar a tipografia do site, troque aqui também.
