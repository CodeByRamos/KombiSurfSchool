# O que precisamos confirmar com a Kombi Surf School

Este é o roteiro da conversa com a escola. Cada item abaixo está hoje no site
como “a combinar”, “consulte valores” ou simplesmente **não aparece** — porque
nada foi inventado.

A versão navegável e sempre atualizada desta lista está em **`/revisao`**
(página interna, fora do menu e fora dos buscadores).

---

## 1. Contato — prioridade máxima

| Item | Situação | O que precisamos |
| --- | --- | --- |
| WhatsApp `(13) 98141-4846` | **Não confirmado** | É o número certo e ativo? É o canal oficial de agendamento? |
| Instagram `@kombisurfschool` | Encontrado em busca | É o perfil oficial vigente? |
| Endereço `Av. Assis Chateaubriand, 2093` | **Não confirmado** | É endereço de atendimento, ponto de encontro ou só cadastro? Existe local físico aberto ao público? |
| E-mail | Não localizado | Existe e-mail de contato? |
| Horário de atendimento | Não divulgado | Que horas dá para chamar no WhatsApp? |

> ⚠️ Os botões de WhatsApp do site **estão ativos** e apontam para o número
> acima. Se ele não estiver certo, avise: é uma linha em `data/contact.ts`
> (`whatsappLive = false` desliga o disparo sem tirar os botões do ar).

## 2. Preços

Nenhum valor da Kombi foi encontrado publicamente. O site inteiro usa
**“Consulte valores pelo WhatsApp”**.

Precisamos de:

- valor da aula avulsa (iniciante / intermediário / kids);
- valor de pacotes, se houver;
- diferença entre aula individual, em dupla e em grupo;
- formas de pagamento (Pix, cartão, dinheiro);
- data da tabela — para marcarmos quando ela envelhecer.

## 3. Aulas

Para cada uma das três trilhas do site (**Primeira Onda**, **Evolução**, **Kids**):

- duração da aula;
- formato: individual, dupla ou grupo — e o tamanho máximo da turma;
- o que está incluso (prancha, leash, parafina, colete, lycra);
- idade mínima — principalmente na Kids, é a dúvida nº 1 dos pais;
- existe aula experimental? pacote de primeira vez?
- existe alguma modalidade além do surf (stand up paddle, por exemplo)?

## 4. Praias

Hoje o site apresenta um **guia das praias de surf do Guarujá** (informação
pública) e explica que a praia da aula é definida junto com a escola.

Precisamos saber:

- em quais praias a Kombi realmente dá aula;
- existe um pico principal / ponto fixo de encontro?
- como funciona a escolha da praia em dia de mar grande;
- há autorização/licença para atuar em alguma praia específica?

## 5. Professores

A seção “Quem vai te ensinar” **está desligada** porque nenhum nome foi
encontrado e nada foi inventado. Para ativá-la, precisamos, de cada instrutor:

- nome e como prefere ser chamado;
- foto (retrato ou em ação);
- há quanto tempo dá aula;
- certificações (primeiros socorros, salvamento, federação);
- especialidade (iniciantes, kids, evolução);
- uma ou duas frases de bio;
- @ do Instagram, se quiser divulgar.

## 6. História da escola

A seção “A Kombi” hoje diz o essencial e reserva o resto. Falta:

- quando a escola começou;
- quem fundou;
- **por que “Kombi”** — a melhor história do site provavelmente está aqui;
- metodologia de ensino, se houver método próprio;
- diferenciais em relação às outras escolas do Guarujá;
- projetos sociais, campeonatos, parcerias.

## 7. Depoimentos

Nenhuma avaliação pública verificável foi localizada e **nenhum depoimento foi
criado**. Para ativar a seção:

- link do perfil no Google Meu Negócio (se existir);
- ou autorização para transcrever mensagens reais de alunos, com o nome de quem
  escreveu.

Depoimento entra transcrito como foi escrito, com link para a fonte quando
houver. Não editamos o sentido de uma avaliação.

## 8. Fotos

Nenhuma foto oficial foi recebida. Veja `public/images/README.md` para o que
pedir e como substituir.

## 9. Políticas

- Precisa reservar com quantas horas de antecedência?
- Como funciona a remarcação quando o mar está ruim?
- Existe política de cancelamento/reembolso?
- A escola atende em dias de chuva?

---

## Antes de publicar de verdade

- [ ] Confirmar o WhatsApp e virar o status para `confirmado` em `data/contact.ts`
- [ ] Confirmar endereço e natureza do local
- [ ] Preencher preços, duração e formato das aulas
- [ ] Confirmar praias de atuação
- [ ] Receber fotos oficiais e autorização de uso de imagem
- [ ] Receber dados dos professores (ou manter a seção desligada)
- [ ] Escrever a história da escola com a palavra de quem viveu
- [ ] **Autorização formal da escola para publicar o site**
- [ ] Trocar `site.isConcept` para `false` em `data/site.ts` (libera indexação)
- [ ] Ajustar `site.url` para o domínio real
