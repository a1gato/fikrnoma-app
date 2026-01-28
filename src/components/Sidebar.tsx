import { Link, useLocation } from 'react-router-dom';
import { CLASSES } from '../data/schoolData';
import { LayoutDashboard, BookOpen, ChevronRight, FileSpreadsheet } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const Sidebar = () => {
    const { t } = useLanguage();
    const location = useLocation();

    return (
        <aside className="w-80 h-screen bg-white/70 backdrop-blur-2xl border-r border-slate-200 flex flex-col sticky top-0 shadow-2xl shadow-primary/5">
            <div className="p-8 border-b border-slate-100 bg-white/50">
                <Link to="/admin" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('header_title')}</h2>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Admin Panel</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {/* Main Links */}
                <div className="space-y-1">
                    <Link
                        to="/admin/totals"
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group ${location.pathname === '/admin/totals' || location.pathname === '/admin'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                            }`}
                    >
                        <FileSpreadsheet size={20} className={location.pathname === '/admin/totals' ? 'text-white' : 'text-slate-400 group-hover:text-primary'} />
                        {t('sidebar_totals')}
                    </Link>
                </div>

                {/* Classes Section */}
                <div>
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <BookOpen className="text-primary" size={12} />
                        {t('sidebar_classes')}
                    </h3>
                    <div className="space-y-1">
                        {CLASSES.map((cls) => (
                            <Link
                                key={cls}
                                to={`/admin/class/${cls}`}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all group ${location.pathname === `/admin/class/${cls}`
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${location.pathname === `/admin/class/${cls}` ? 'bg-primary' : 'bg-slate-200 group-hover:bg-primary'}`} />
                                    {cls}
                                </div>
                                <ChevronRight size={14} className={location.pathname === `/admin/class/${cls}` ? 'text-primary' : 'opacity-0 group-hover:opacity-100 text-primary transition-all'} />
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <Link to="/vote" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all font-bold text-sm group">
                    <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    {t('back_to_vote')}
                </Link>
            </div>
        </aside>
    );
};
