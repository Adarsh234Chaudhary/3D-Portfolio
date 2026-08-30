import React from 'react';
import { X, Award, CheckCircle2, Download, Copy, Check } from 'lucide-react';
import { Certificate } from '../types';
import { sound } from '../utils/audio';
import { formatImageUrl } from '../utils/image';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!certificate) return null;

  const handleCopyId = () => {
    sound.playClick();
    navigator.clipboard.writeText(certificate.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 font-['Space_Grotesk'] animate-in fade-in duration-200">
      {/* Backdrop with High Blur */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-2xl cursor-pointer"
        onClick={() => {
          sound.playClick();
          onClose();
        }}
      />

      {/* Main Glass Modal Window */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0b0d13]/95 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-6 sm:p-8 flex flex-col gap-6 z-10">
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#f6c344] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                  CERTIFICATE // {certificate.number}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/[0.08] text-white/80 border border-white/10">
                  {certificate.category}
                </span>
              </div>
              <h2 className="font-medium text-xl sm:text-2xl text-white tracking-tight mt-0.5">
                {certificate.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/[0.06] hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Close Certificate Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Window */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
          <img
            src={formatImageUrl(certificate.certificateImage)}
            alt={certificate.title}
            className="w-full max-h-[380px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
          />

          {/* Issuer Tag Bottom Left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/85 border border-white/20 backdrop-blur-md text-white text-xs font-mono">
            <span className="text-white/60">ISSUED BY:</span>
            <span className="font-semibold text-white">{certificate.issuer}</span>
            <span className="text-white/40">•</span>
            <span className="text-[#f6c344] font-medium">{certificate.issueDate}</span>
          </div>
        </div>

        {/* Details & Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Description & Skills */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <h4 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-1.5">
                Overview &amp; Assessment Scope
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {certificate.description}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-2">
                Certified Competencies &amp; Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skillsCovered.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-white/80 text-xs font-mono tracking-wide"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/[0.08]">
            <div className="flex flex-col gap-3">
              <div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-1">
                  Credential Identification
                </span>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-white/90">
                  <span className="truncate">{certificate.credentialId}</span>
                  <button
                    onClick={handleCopyId}
                    className="p-1 rounded text-white/50 hover:text-white transition-colors cursor-pointer"
                    title="Copy Credential ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-1">
                  Issued By
                </span>
                <p className="text-xs text-white font-medium">
                  {certificate.issuer}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.08]">
              <a
                href={formatImageUrl(certificate.certificateImage)}
                target="_blank"
                rel="noreferrer"
                download={`${certificate.id}-certificate.jpg`}
                onClick={() => sound.playClick()}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono tracking-wider transition-colors border border-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View Full Resolution</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
