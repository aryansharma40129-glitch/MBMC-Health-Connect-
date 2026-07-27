import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { cn } from '../lib/utils';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' },
  ];

  return (
    <div className="flex items-center gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
      <Languages className="w-4 h-4 text-gray-500 ml-1" />
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded-full transition-all",
            i18n.language === lang.code
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
