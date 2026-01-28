import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../lib/translations';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const langs: { code: Language; label: string; flag: string }[] = [
        { code: 'uz', label: 'UZ', flag: '🇺🇿' },
        { code: 'ru', label: 'RU', flag: '🇷🇺' },
        { code: 'en', label: 'EN', flag: '🇺🇸' }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-slate-200 p-1.5 rounded-2xl shadow-2xl shadow-primary/10">
            <div className="p-2 text-primary">
                <Globe size={18} />
            </div>
            {langs.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2
                        ${language === lang.code
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                            : 'hover:bg-slate-100 text-slate-500'}`}
                >
                    <span className="text-base">{lang.flag}</span>
                    {lang.label}
                </button>
            ))}
        </div>
    );
};
