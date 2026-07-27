import { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US'; // Default, can be improved to match i18n

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [onResult]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
      setIsListening(true);
    }
  }, [isListening, recognition]);

  if (!recognition) return null;

  return (
    <div className="relative flex items-center">
      <button
        onClick={toggleListening}
        className={`p-3 rounded-full transition-all ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        }`}
        title={t('voice_search')}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
      
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl border border-blue-100 whitespace-nowrap z-50"
          >
            <span className="text-sm font-medium text-blue-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              {t('listening')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
