import type { ContactDetails } from '../../types/corporate';

interface ContactModalProps {
  contact: ContactDetails;
  onCopyAddress: (addr: string) => void;
  onCopyEmail: (email: string) => void;
  onCopyPhone: (phone: string) => void;
}

export function ContactModal({
  contact,
  onCopyAddress,
  onCopyEmail,
  onCopyPhone,
}: ContactModalProps) {
  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
          Registered Office Address
        </span>
        <p className="text-white font-medium leading-relaxed">{contact.address}</p>
        <button
          type="button"
          onClick={() => onCopyAddress(contact.address)}
          className="text-xs text-emerald-400 hover:underline pt-1 inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Copy Full Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
            Official Email Address
          </span>
          <a
            href={`mailto:${contact.email}`}
            className="text-white font-mono hover:underline break-all"
          >
            {contact.email}
          </a>
          <button
            type="button"
            onClick={() => onCopyEmail(contact.email)}
            className="block text-xs text-emerald-400 hover:underline mt-2 cursor-pointer"
          >
            Copy Email
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
            Direct Contact Phone
          </span>
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="text-white font-mono hover:underline text-base font-medium"
          >
            {contact.phone}
          </a>
          <button
            type="button"
            onClick={() => onCopyPhone(contact.phone)}
            className="block text-xs text-emerald-400 hover:underline mt-2 cursor-pointer"
          >
            Copy Phone
          </button>
        </div>
      </div>
    </div>
  );
}
