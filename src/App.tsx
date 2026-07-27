import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { MedicalRecord, UserProfile } from './types';
import { LanguageSelector } from './components/LanguageSelector';
import { MedicalPassport } from './components/MedicalPassport';
import { QRView } from './components/QRView';
import { 
  Bell, 
  QrCode, 
  User, 
  Shield, 
  Activity,
  Heart,
  Droplets,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';

const MOCK_PROFILE: UserProfile = {
  name: "Aryan Sharma",
  abhaId: "12-3456-7890-1234",
  age: "18",
  gender: "Male",
  bloodGroup: "O+"
};

const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: '1',
    title: 'General Consultation',
    doctorName: 'Dr. Rajesh Patil',
    date: '2024-03-15',
    type: 'prescription',
    notes: 'Rest for 3 days'
  },
  {
    id: '2',
    title: 'Blood Test Report',
    doctorName: 'Metropolis Labs',
    date: '2024-03-10',
    type: 'lab_report'
  },
  {
    id: '3',
    title: 'COVID-19 Booster',
    doctorName: 'MBMC Health Center',
    date: '2023-12-05',
    type: 'vaccination'
  }
];

export default function App() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [records, setRecords] = useState<MedicalRecord[]>(MOCK_RECORDS);
  const [showQR, setShowQR] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    // Simulate a digital update
    const timer = setTimeout(() => {
      toast.info(t('digital_updates'), {
        description: "Your recent lab results are now available in your Medical Passport.",
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [t]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">{t('app_name')}</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600">MBMC Digital Health</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-8 space-y-8">
        {/* Welcome & Language */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t('welcome')}, {profile.name.split(' ')[0]}</h2>
            <p className="text-slate-500 text-sm mt-1">{t('paperless_desc')}</p>
          </div>
          <LanguageSelector />
        </div>

        {/* ABHA Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl shadow-blue-200 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="relative flex justify-between items-start mb-8">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-100">{t('abha_id')}</span>
            </div>
            <Shield className="w-6 h-6 text-white/50" />
          </div>

          <div className="relative mb-8">
            <p className="text-2xl font-mono font-bold tracking-[0.2em]">{profile.abhaId}</p>
          </div>

          <div className="relative flex justify-between items-end">
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-[10px] text-blue-100 uppercase font-bold tracking-wider mb-1">{t('age')}</p>
                <p className="text-sm font-bold">{profile.age}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-blue-100 uppercase font-bold tracking-wider mb-1">{t('gender')}</p>
                <p className="text-sm font-bold">{profile.gender}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-blue-100 uppercase font-bold tracking-wider mb-1">{t('blood_group')}</p>
                <p className="text-sm font-bold">{profile.bloodGroup}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowQR(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-2xl transition-all active:scale-90"
            >
              <QrCode className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BPM</p>
            <p className="text-lg font-bold text-slate-900">72</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SpO2</p>
            <p className="text-lg font-bold text-slate-900">98%</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sleep</p>
            <p className="text-lg font-bold text-slate-900">7.5h</p>
          </div>
        </div>

        {/* Medical Passport Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-900">{t('medical_passport')}</h3>
          </div>
          <MedicalPassport 
            records={records} 
            onAddRecord={() => toast.success("Feature coming soon: Uploading new medical records.")} 
          />
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-slate-100 px-8 py-4 z-40">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <Shield className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('medical_passport')}</span>
          </button>
          <button 
            onClick={() => setShowQR(true)}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <QrCode className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('qr_code')}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('profile')}</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {showQR && (
          <QRView profile={profile} onClose={() => setShowQR(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
