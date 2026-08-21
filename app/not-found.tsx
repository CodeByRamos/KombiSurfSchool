import { Button } from '@/components/ui/Button';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';

export const metadata = { title: 'Página não encontrada' };

export default function NotFound() {
  return (
    <section className="on-dark grain relative flex min-h-[80svh] items-center overflow-hidden bg-ink text-foam">
      <div className="shell relative py-24 text-center">
        <p className="eyebrow text-sun">Erro 404</p>
        <h1 className="headline mx-auto mt-6 max-w-[14ch] text-[clamp(2.5rem,9vw,6rem)] text-foam">
          Essa onda passou
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-foam/70">
          A página que você procurou não existe. Mas a aula de surf continua de pé.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppCta label="Agendar uma aula" />
          <Button
            href="/"
            variant="outline"
            size="lg"
            className="border-foam/40 text-foam hover:border-foam hover:bg-foam hover:text-ink"
          >
            Voltar para o início
          </Button>
        </div>
      </div>
    </section>
  );
}
