import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppIcon, InstagramIcon, PinIcon } from '@/components/ui/Icons';
import { contact } from '@/data/contact';
import { isKnown } from '@/data/types';
import { whatsappUrl, whatsappDisplay } from '@/lib/whatsapp';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { mapsSearchUrl, mapsDirectionsUrl } from '@/lib/maps';

/**
 * ONDE NOS ENCONTRAR
 * ------------------
 * O endereço disponível é um cadastro no Jardim Virgínia, mas NÃO há indicação
 * pública de loja física aberta ao público. Por isso o texto deixa claro que a
 * aula acontece na praia e que o ponto de encontro é combinado no agendamento —
 * o mapa aparece como referência de região, não como vitrine.
 */
export function Contact() {
  const phone = whatsappDisplay();
  const instagram = isKnown(contact.instagram) ? contact.instagram.value : null;
  const address = isKnown(contact.address) ? contact.address.value : null;

  return (
    <section id="contato" className="on-dark grain relative scroll-mt-24 overflow-hidden bg-ink py-20 text-foam md:py-28">
      <div className="shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Onde nos encontrar"
              tone="light"
              title={
                <>
                  A aula é
                  <br />
                  na praia
                </>
              }
              lead="A Kombi atende nas praias do Guarujá. O ponto de encontro exato — praia, horário e onde estacionar — é combinado com você no agendamento."
            />

            <ul className="mt-10 space-y-4">
              {phone && (
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-foam/15 p-5 transition-colors hover:border-foam/40 hover:bg-foam/5"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-kombi text-foam">
                      <WhatsAppIcon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl text-foam">WhatsApp</span>
                      <span className="block text-sm text-foam/60">{phone} — resposta mais rápida</span>
                    </span>
                  </a>
                </li>
              )}

              {instagram && (
                <li>
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-foam/15 p-5 transition-colors hover:border-foam/40 hover:bg-foam/5"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-foam/25 text-foam">
                      <InstagramIcon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl text-foam">Instagram</span>
                      <span className="block text-sm text-foam/60">@{instagram.handle} — o dia a dia na água</span>
                    </span>
                  </a>
                </li>
              )}

              {address && (
                <li>
                  <a
                    href={mapsSearchUrl(address.full)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-foam/15 p-5 transition-colors hover:border-foam/40 hover:bg-foam/5"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-foam/25 text-foam">
                      <PinIcon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl text-foam">Região de referência</span>
                      <span className="block text-sm text-foam/60">
                        {address.district}, {address.city}/{address.state}
                      </span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col">
            {address && (
              <>
                <MapEmbed
                  lat={address.approxLat}
                  lng={address.approxLng}
                  title={`Mapa da região de ${address.district}, ${address.city}`}
                  label={`${address.district}, ${address.city}/${address.state}`}
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={mapsDirectionsUrl(address.full)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-foam/35 px-6 text-sm font-semibold text-foam transition-colors hover:border-foam hover:bg-foam hover:text-ink"
                  >
                    <PinIcon className="size-4" />
                    Abrir no Google Maps
                  </a>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-kombi px-6 text-sm font-semibold text-foam transition-colors hover:bg-kombi-dark"
                  >
                    <WhatsAppIcon className="size-4" />
                    Combinar ponto de encontro
                  </a>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-foam/60">
                  Endereço de referência: {address.full}. A escola atende nas praias do Guarujá —
                  confirme com a Kombi o ponto de encontro antes de sair de casa.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
