import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label?: string;
    disabled?: boolean;
}

import { useLanguage } from '../contexts/LanguageContext';

export const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder,
    label,
    disabled
}) => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative space-y-2 ${disabled ? 'opacity-50 pointer-events-none' : ''}`} ref={containerRef}>
            {label && <label className="block text-sm font-medium text-slate-400">{label}</label>}

            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer transition-all hover:border-primary/30 shadow-sm ${isOpen ? 'ring-4 ring-primary/10 border-primary' : ''}`}
            >
                <span className={!selectedOption ? 'text-slate-400' : 'text-slate-900 font-bold'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-fade-up max-h-[300px] flex flex-col">
                    <div className="p-3 border-b border-slate-100 sticky top-0 bg-white/50 backdrop-blur-md">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-primary/30 transition-all text-slate-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="py-1 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${value === option.value
                                        ? 'bg-primary/5 text-primary font-bold'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                >
                                    {option.label}
                                    {value === option.value && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm" />}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-sm text-slate-400 italic">
                                {t('no_results')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
