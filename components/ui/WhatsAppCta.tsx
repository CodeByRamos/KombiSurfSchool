import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from './Button';
import { WhatsAppIcon } from './Icons';

interface WhatsAppCtaProps {
  message?: string;
  label?: string;
  size?: 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'light';
  className?: string;
}

export function WhatsAppCta({
  message,
  label = 'Agendar uma aula',
  size = 'lg',
  variant = 'primary',
  className,
}: WhatsAppCtaProps) {
  return (
    <Button
      href={whatsappUrl(message)}
      variant={variant}
      size={size}
      className={className}
      icon={<WhatsAppIcon className="size-5 shrink-0" />}
      aria-label={`${label} pelo WhatsApp`}
    >
      {label}
    </Button>
  );
}
