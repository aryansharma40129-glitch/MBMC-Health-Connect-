import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../types';
import { motion } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';

interface QRViewProps {
  profile: UserProfile;
  onClose: () => void;
}

export function QRView({ profile, onClose }: QRViewProps) {
  const { t } = useTranslation();
  
  // In a real app, this would be a signed token or a secure URL
  const qrData = JSON.stringify({
    abhaId: profile.abhaId,
    timestamp: new Date().toISOString(),
    access: 'medical_history_view'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-400" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-blue-50 rounded-2xl mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('qr_code')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('qr_desc')}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-100 flex justify-center mb-6 shadow-inner">
          <QRCodeSVG 
            value={qrData}
            size={200}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "https://picsum.photos/seed/health/40/40",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{t('abha_id')}</span>
            <span className="text-sm font-mono font-bold text-blue-700">{profile.abhaId}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{t('profile')}</span>
            <span className="text-sm font-bold text-gray-900">{profile.name}</span>
          </div>
        </div>

        <p className="mt-6 text-[10px] text-center text-gray-400 uppercase tracking-widest font-medium">
          Secure MBMC Health-Link Token
        </p>
      </motion.div>
    </motion.div>
  );
}
