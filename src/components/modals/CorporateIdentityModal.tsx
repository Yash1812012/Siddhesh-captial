import type { CompanyIdentity } from '../../types/corporate';

interface CorporateIdentityModalProps {
  identity: CompanyIdentity;
  onCopyCin: (cin: string) => void;
}

export function CorporateIdentityModal({ identity, onCopyCin }: CorporateIdentityModalProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-white/10">
          <span className="text-xs text-neutral-400">Corporate Identification Number (CIN)</span>
          <button
            type="button"
            onClick={() => onCopyCin(identity.cin)}
            className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
          >
            {identity.cin} (Copy)
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-neutral-500 block">Registration Number</span>
            <span className="text-neutral-200 font-mono font-medium">
              {identity.registrationNumber}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">RoC Office</span>
            <span className="text-neutral-200 font-medium">{identity.rocCode}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Company Status</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {identity.status}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Incorporation Date</span>
            <span className="text-neutral-200 font-medium">{identity.dateOfIncorporation}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Company Category</span>
            <span className="text-neutral-200 font-medium">{identity.category}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Class of Company</span>
            <span className="text-neutral-200 font-medium">{identity.classOfCompany}</span>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5 text-xs text-neutral-400">
        <span className="text-neutral-300 font-medium block mb-1">Company Sub-Category:</span>
        {identity.subCategory} &bull; Non-banking credit institutions &bull; Registrar of Companies,
        Mumbai.
      </div>
    </div>
  );
}
