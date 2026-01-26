import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const PHONE_NUMBER = '+91XXXXXXXXXX';
const EMAIL = 'info@sbconstruction.com';
const WHATSAPP_NUMBER = '91XXXXXXXXXX';

interface ActionItem {
  icon: React.ElementType;
  label: string;
  href: string;
  bgColor: string;
}

const actions: ActionItem[] = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    bgColor: 'bg-[#25D366]',
  },
  {
    icon: Phone,
    label: 'Call',
    href: `tel:${PHONE_NUMBER}`,
    bgColor: 'bg-primary',
  },
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${EMAIL}`,
    bgColor: 'bg-blue-600',
  },
];

export const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3">
      {/* Action Items */}
      <div className="flex flex-col-reverse items-center gap-3">
        {actions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            target={action.label === 'WhatsApp' ? '_blank' : undefined}
            rel={action.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg',
              'transition-all duration-300 hover:scale-110',
              action.bgColor,
              isExpanded
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-0 pointer-events-none'
            )}
            style={{
              transitionDelay: isExpanded ? `${index * 100}ms` : `${index * 50}ms`,
            }}
            aria-label={action.label}
          >
            <action.icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Main FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl',
          'bg-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          isExpanded && 'rotate-45'
        )}
        aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
      >
        {isExpanded ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <Phone className="w-6 h-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};
