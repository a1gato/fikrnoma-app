import { NavLink } from 'react-router-dom';
import { CLASSES } from '../data/schoolData';
import { LayoutGrid, GraduationCap, LogOut, FileSpreadsheet } from 'lucide-react';

export const Sidebar = () => {
    return (
        <aside className="w-72 bg-white/70 backdrop-blur-xl border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-50 shadow-sm">
            <header className="p-8 mb-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/40 rotate-3">
                        <GraduationCap size={28} />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter block leading-none">ADMIN</span>
                        <span className="text-[10px] text-primary font-black uppercase tracking-widest mt-1 block">Panel v1.0</span>
                    </div>
                </div>
            </header>

            <nav className="flex-1 px-4 space-y-2">
                <div className="px-4 mb-2">
                    <NavLink
                        to="/admin/totals"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-primary border border-transparent hover:border-primary/20'
                            }`
                        }
                    >
                        <FileSpreadsheet size={18} className="transition-transform group-hover:scale-110" />
                        <span className="font-bold tracking-tight text-sm">Jami Ko'rsatkichlar</span>
                    </NavLink>
                </div>

                <div className="px-4 mb-4 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1 mb-4 opacity-50">Sinfni Tanlang</p>
                    <div className="h-px bg-slate-100"></div>
                </div>

                <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 scrollbar-none">
                    {CLASSES.map((cls) => (
                        <NavLink
                            key={cls}
                            to={`/admin/class/${cls}`}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-primary'
                                }`
                            }
                        >
                            <LayoutGrid size={18} className="transition-transform group-hover:scale-110" />
                            <span className="font-bold tracking-tight text-sm">Sinf {cls}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="p-6 mt-auto">
                <NavLink
                    to="/"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-slate-50 transition-all duration-300 group shadow-sm"
                >
                    <LogOut size={18} />
                    <span className="font-bold text-sm tracking-tight text-slate-900">Ovoz Berishga Qaytish</span>
                </NavLink>
            </div>
        </aside>
    );
};
