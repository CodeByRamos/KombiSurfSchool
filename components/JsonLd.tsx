interface JsonLdProps {
  data: unknown;
}

/** Injeta um bloco JSON-LD. O conteúdo vem só de /data e /lib, nunca do usuário. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
