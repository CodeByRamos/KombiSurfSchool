/** Faixa de movimento entre o hero e o conteúdo. Puro ritmo visual. */
export function Marquee() {
  const items = [
    'Aula de surf',
    'Guarujá',
    'Iniciantes',
    'Kids',
    'Evolução',
    'Do zero ao primeiro drop',
    'Mar todo dia',
  ];
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-sand py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {track.map((item, index) => (
          <span key={index} className="flex items-center gap-10">
            <span className="font-display text-xl text-ink/70 md:text-2xl">{item}</span>
            <span className="size-1.5 rounded-full bg-kombi-bright" />
          </span>
        ))}
      </div>
    </div>
  );
}
