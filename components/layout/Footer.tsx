import Link from 'next/link';
import { contact } from '@/data/contact';
import { site, navigation } from '@/data/site';
import { isKnown } from '@/data/types';
import { whatsappUrl, whatsappDisplay } from '@/lib/whatsapp';
import { mapsSearchUrl } from '@/lib/maps';
import { InstagramIcon, WhatsAppIcon, PinIcon } from '@/components/ui/Icons';
import { Wordmark } from './Wordmark';

export function Footer() {
  const instagram = isKnown(contact.instagram) ? contact.instagram.value : null;
  const address = isKnown(contact.address) ? contact.address.value : null;
  const phone = whatsappDisplay();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark grain relative overflow-hidden bg-ink text-foam">
      <div className="shell relative z-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Wordmark className="h-9 w-auto text-foam" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-foam/65">
              Aula de surf no Guarujá, no litoral de São Paulo. Iniciantes, crianças e quem quer
              evoluir.
            </p>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 items-center gap-2.5 rounded-full bg-kombi px-6 text-sm font-semibold text-foam transition-colors hover:bg-kombi-dark"
            >
              <WhatsAppIcon className="size-4" />
              Falar com a Kombi
            </a>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="eyebrow mb-5 text-sun">Navegar</h2>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-foam/70 transition-colors hover:text-foam">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5 text-sun">Contato</h2>
            <ul className="space-y-3.5 text-sm text-foam/70">
              {phone && (
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-foam"
                  >
                    <WhatsAppIcon className="size-4 shrink-0 text-sea-light" />
                    {phone}
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-foam"
                  >
                    <InstagramIcon className="size-4 shrink-0 text-sea-light" />
                    @{instagram.handle}
                  </a>
                </li>
              )}
              {address && (
                <li>
                  <a
                    href={mapsSearchUrl(address.full)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 transition-colors hover:text-foam"
                  >
                    <PinIcon className="mt-0.5 size-4 shrink-0 text-sea-light" />
                    <span>
                      {address.street}
                      <br />
                      {address.district} — {address.city}/{address.state}
                    </span>
                  </a>
                </li>
              )}
              <li className="pt-1 text-foam/45">
                As aulas acontecem na praia. O ponto de encontro é combinado no agendamento.
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-14 mb-6 text-foam" />

        <div className="flex flex-col gap-4 text-xs text-foam/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Guarujá — SP.
          </p>
          {site.isConcept && (
            <p className="max-w-xl md:text-right">
              {site.conceptNotice}{' '}
              <Link href="/revisao/" className="underline underline-offset-2 hover:text-foam/70">
                Ver o que falta confirmar
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
