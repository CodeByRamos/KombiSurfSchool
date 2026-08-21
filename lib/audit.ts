import { school } from '@/data/school';
import { contact, whatsappLive } from '@/data/contact';
import { lessons, pricing } from '@/data/lessons';
import { schoolOperatesAt } from '@/data/beaches';
import { instructors, instructorsStatus } from '@/data/instructors';
import { testimonials, testimonialsStatus } from '@/data/testimonials';
import { providedBySchool } from '@/data/gear';
import { gallery } from '@/data/gallery';
import type { ConfirmationStatus, Fact } from '@/data/types';

export interface AuditEntry {
  readonly area: string;
  readonly item: string;
  readonly status: ConfirmationStatus;
  readonly note?: string;
  readonly source?: string;
}

function entry(area: string, item: string, fact: Fact<unknown>): AuditEntry {
  return {
    area,
    item,
    status: fact.status,
    ...(fact.note ? { note: fact.note } : {}),
    ...(fact.source ? { source: fact.source } : {}),
  };
}

/** Varre os arquivos de /data e monta o inventário do que está confirmado. */
export function buildAudit(): readonly AuditEntry[] {
  const entries: AuditEntry[] = [
    entry('Escola', 'O que a escola faz', school.what),
    entry('Escola', 'Modelo de agendamento', school.bookingModel),
    entry('Escola', 'Ano de fundação', school.foundedYear),
    entry('Escola', 'Fundador(a)', school.founder),
    entry('Escola', 'Origem do nome "Kombi"', school.nameStory),
    entry('Escola', 'Metodologia de ensino', school.methodology),
    entry('Escola', 'Tempo de atuação', school.yearsOfExperience),
    entry('Escola', 'Diferenciais', school.differentials),
    entry('Escola', 'Projetos e parcerias', school.projects),
    entry('Escola', 'Seguidores no Instagram', school.instagramFollowers),

    entry('Contato', 'WhatsApp / telefone', contact.whatsapp),
    entry('Contato', 'Perfil no Instagram', contact.instagram),
    entry('Contato', 'Endereço', contact.address),
    entry('Contato', 'E-mail', contact.email),
    entry('Contato', 'Site oficial', contact.website),
    entry('Contato', 'Horário de atendimento', contact.openingHours),

    entry('Praias', 'Praias onde a escola atua', schoolOperatesAt),

    entry('Preços', 'Tabela de valores', pricing.values),

    entry('Professores', 'Equipe de instrutores', instructorsStatus),

    entry('Depoimentos', 'Avaliações públicas', testimonialsStatus),

    entry('Equipamento', 'O que a escola fornece na aula', providedBySchool),
  ];

  for (const lesson of lessons) {
    entries.push(
      entry('Aulas', `${lesson.name} — duração`, lesson.duration),
      entry('Aulas', `${lesson.name} — valor`, lesson.price),
      entry('Aulas', `${lesson.name} — itens inclusos`, lesson.includes),
      entry('Aulas', `${lesson.name} — formato (individual/grupo)`, lesson.groupSize),
      entry('Aulas', `${lesson.name} — praia`, lesson.location),
      entry('Aulas', `${lesson.name} — idade mínima`, lesson.minAge),
    );
  }

  return entries;
}

export function auditSummary() {
  const entries = buildAudit();
  const count = (status: ConfirmationStatus) => entries.filter((item) => item.status === status).length;

  return {
    total: entries.length,
    confirmado: count('confirmado'),
    referencia: count('referencia'),
    pendente: count('pendente'),
    photosMissing: gallery.filter((item) => item.src === null).length,
    photosTotal: gallery.length,
    instructorsCount: instructors.length,
    testimonialsCount: testimonials.length,
    whatsappLive,
  };
}
