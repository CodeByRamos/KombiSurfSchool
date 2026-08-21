import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Lessons } from '@/components/sections/Lessons';
import { SeaConditions } from '@/components/sections/SeaConditions';
import { Beaches } from '@/components/sections/Beaches';
import { About } from '@/components/sections/About';
import { Instructors } from '@/components/sections/Instructors';
import { Gear } from '@/components/sections/Gear';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from '@/lib/seo';

/**
 * A ordem das seções segue a ordem das perguntas de quem quer aprender a surfar:
 * o que é -> como funciona -> quais aulas -> como está o mar -> onde -> quem é
 * -> o que levar -> como é -> dúvidas -> onde encontrar -> agendar.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={serviceJsonLd()} />
      <JsonLd data={faqJsonLd()} />
      <JsonLd data={breadcrumbJsonLd()} />

      <Hero />
      <Marquee />
      <HowItWorks />
      <Lessons />
      <SeaConditions />
      <Beaches />
      <About />
      <Instructors />
      <Gear />
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact />
      <FinalCta />
    </>
  );
}
