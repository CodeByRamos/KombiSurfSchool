import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';

/**
 * COMO FUNCIONA
 * -------------
 * Descreve apenas o que é verificável: a aula é agendada por contato direto, a
 * escola combina horário e ponto de encontro, e o encontro acontece na praia.
 * Nada aqui afirma processo interno da escola que não tenha sido confirmado.
 */
const steps = [
  {
    number: '01',
    title: 'Chama no WhatsApp',
    text: 'Conta quem vai surfar, se já teve alguma experiência e quando você pode. Uma mensagem resolve.',
  },
  {
    number: '02',
    title: 'Combina dia e praia',
    text: 'A escola olha as condições do mar e sugere o melhor horário e a praia mais adequada ao seu nível.',
  },
  {
    number: '03',
    title: 'Encontra o professor na areia',
    text: 'Antes da água vem o básico: alongamento, segurança no mar e como ficar de pé na prancha.',
  },
  {
    number: '04',
    title: 'Entra no mar',
    text: 'E aí é só surfar. Você vai cair, vai levantar e vai sair da água querendo marcar a próxima.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-foam py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Como funciona"
          title={
            <>
              Quatro passos entre
              <br />
              você e a água
            </>
          }
          lead="Não tem burocracia, não tem plano, não tem matrícula. Tem uma conversa e uma aula marcada."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} as="li" delay={index * 80} className="bg-foam">
              <div className="flex h-full flex-col p-7 md:p-8">
                <span className="font-display text-5xl text-kombi/25">{step.number}</span>
                <h3 className="mt-5 font-display text-2xl leading-tight text-ink">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl bg-ink p-7 text-foam md:flex-row md:items-center md:justify-between md:p-9">
          <p className="max-w-xl text-lg leading-relaxed text-foam/85">
            <strong className="font-semibold text-foam">Aula é sempre agendada.</strong> Não apareça
            na praia sem falar antes — o horário depende da maré e do tamanho do mar no dia.
          </p>
          <WhatsAppCta label="Marcar meu horário" variant="light" className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
