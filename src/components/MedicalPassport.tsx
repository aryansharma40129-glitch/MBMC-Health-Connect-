import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MedicalRecord, RecordType } from '../types';
import { 
  FileText, 
  FlaskConical, 
  Syringe, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { VoiceSearch } from './VoiceSearch';

interface MedicalPassportProps {
  records: MedicalRecord[];
  onAddRecord: () => void;
}

export function MedicalPassport({ records, onAddRecord }: MedicalPassportProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<RecordType | 'all'>('all');

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || record.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [records, searchQuery, activeTab]);

  const recordIcons = {
    prescription: <FileText className="w-5 h-5 text-blue-500" />,
    lab_report: <FlaskConical className="w-5 h-5 text-purple-500" />,
    vaccination: <Syringe className="w-5 h-5 text-green-500" />,
  };

  const tabs: { id: RecordType | 'all'; label: string }[] = [
    { id: 'all', label: t('records') },
    { id: 'prescription', label: t('prescriptions') },
    { id: 'lab_report', label: t('lab_reports') },
    { id: 'vaccination', label: t('vaccinations') },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
          />
        </div>
        <VoiceSearch onResult={setSearchQuery} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <motion.div
                key={record.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    record.type === 'prescription' && "bg-blue-50",
                    record.type === 'lab_report' && "bg-purple-50",
                    record.type === 'vaccination' && "bg-green-50"
                  )}>
                    {recordIcons[record.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{record.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {record.doctorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {record.date}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-4">
                <Filter className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">{t('no_records')}</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Button */}
      <button
        onClick={onAddRecord}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-300 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
