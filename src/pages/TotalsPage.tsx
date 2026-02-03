import { useState, useEffect } from 'react';
import { RatingService } from '../services/ratingService';
import { SchoolService } from '../services/schoolService';
import { CustomSelect } from '../components/CustomSelect';
import { Search, Calendar, ChevronLeft, ChevronRight, FileSpreadsheet, Star, User, Loader2 } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const TotalsPage = () => {
    const { t } = useLanguage();
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString());
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [teacherNames, setTeacherNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [statsData, teachers] = await Promise.all([
                RatingService.getMonthlyTeacherStats(year),
                SchoolService.getAllTeachers()
            ]);

            setStats(statsData);

            // Extract unique names from teachers DB
            const namesSet = new Set<string>();
            teachers.forEach(t => namesSet.add(t.name));
            setTeacherNames(Array.from(namesSet).sort());

            setLoading(false);
        };
        fetchData();
    }, [year]);

    const filteredTeachers = teacherNames.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const monthOptions = [
        { value: 'all', label: t('all_months') },
        ...t('months').map((m: string, i: number) => ({ value: i.toString(), label: m }))
    ];

    return (
        <div className="p-8 max-w-[1600px] mx-auto animate-fade-in font-sans">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight flex items-center gap-3">
                        <FileSpreadsheet className="text-primary" size={40} />
                        {t('admin_totals_title')}
                    </h1>
                    <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">{t('admin_totals_subtitle')}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="w-48">
                        <CustomSelect
                            options={monthOptions}
                            value={selectedMonth}
                            onChange={(val) => setSelectedMonth(val)}
                            placeholder={t('select_month')}
                        />
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={t('search_teacher')}
                            className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-64 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                        <button
                            onClick={() => setYear(y => y - 1)}
                            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="px-4 flex items-center gap-2 font-black text-slate-900">
                            <Calendar size={18} className="text-primary" />
                            {year}
                        </div>
                        <button
                            onClick={() => setYear(y => y + 1)}
                            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="glass-panel overflow-hidden border-slate-200 shadow-2xl bg-white/60 backdrop-blur-md">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
                                <th className="sticky left-0 z-20 bg-slate-50/80 backdrop-blur-md px-6 py-5 text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] w-12 border-r border-slate-200">#</th>
                                <th className="sticky left-12 z-20 bg-slate-50/80 backdrop-blur-md px-6 py-5 text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] min-w-[300px] border-r border-slate-200">{t('table_teacher')}</th>

                                {selectedMonth === 'all' ? (
                                    <>
                                        {t('months').map((month: string) => (
                                            <th key={month} className="px-4 py-5 text-center text-slate-500 font-bold uppercase tracking-wider text-[10px] min-w-[100px]">
                                                {month}
                                            </th>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <th className="px-6 py-5 text-center text-slate-500 font-bold uppercase tracking-wider text-[10px] min-w-[150px]">
                                            {t('months')[parseInt(selectedMonth)]} {t('table_avg_score')}
                                        </th>
                                        <th className="px-6 py-5 text-center text-slate-500 font-bold uppercase tracking-wider text-[10px] min-w-[150px]">
                                            {t('table_vote_count')}
                                        </th>
                                    </>
                                )}
                                <th className="px-6 py-5 text-center text-primary font-black uppercase tracking-wider text-[10px] min-w-[120px] bg-primary/5 border-l border-slate-200">{t('table_yearly_total')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={100} className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <Loader2 size={40} className="text-primary animate-spin" />
                                            <p className="text-slate-400 font-medium">{t('loading_data')}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTeachers.map((name, index) => {
                                const teacherStats = stats?.[name];
                                if (!teacherStats) return null;

                                let totalSum = 0;
                                let totalCount = 0;

                                // Calculate yearly totals
                                t('months').forEach((_: string, mIndex: number) => {
                                    totalSum += teacherStats[mIndex].sum;
                                    totalCount += teacherStats[mIndex].count;
                                });

                                const yearlyAvg = totalCount > 0 ? (totalSum / totalCount).toFixed(1) : '-';

                                return (
                                    <tr key={name} className="hover:bg-slate-50 transition-all group">
                                        <td className="sticky left-0 z-10 bg-white group-hover:bg-slate-50 px-6 py-5 text-slate-400 font-mono text-xs border-r border-b border-slate-200">{index + 1}</td>
                                        <td className="sticky left-12 z-10 bg-white group-hover:bg-slate-50 px-6 py-5 border-r border-b border-slate-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary transition-all shadow-sm">
                                                    <User size={14} />
                                                </div>
                                                <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{name}</span>
                                            </div>
                                        </td>

                                        {selectedMonth === 'all' ? (
                                            t('months').map((_: string, mIndex: number) => {
                                                const monthData = teacherStats[mIndex];
                                                const avg = monthData.count > 0 ? (monthData.sum / monthData.count).toFixed(1) : '-';

                                                return (
                                                    <td key={mIndex} className="px-4 py-5 text-center border-b border-slate-200">
                                                        <span className={`text-sm font-bold ${avg === '-' ? 'text-slate-300' :
                                                            parseFloat(avg) >= 4.5 ? 'text-emerald-600' :
                                                                parseFloat(avg) >= 3.5 ? 'text-blue-600' :
                                                                    'text-amber-600'
                                                            }`}>
                                                            {avg}
                                                        </span>
                                                    </td>
                                                );
                                            })
                                        ) : (
                                            <>
                                                <td className="px-6 py-5 text-center border-b border-slate-200">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className={`text-lg font-black ${teacherStats[parseInt(selectedMonth)].count === 0 ? 'text-slate-300' :
                                                            (teacherStats[parseInt(selectedMonth)].sum / teacherStats[parseInt(selectedMonth)].count) >= 4.5 ? 'text-emerald-600' :
                                                                'text-blue-600'
                                                            }`}>
                                                            {teacherStats[parseInt(selectedMonth)].count > 0
                                                                ? (teacherStats[parseInt(selectedMonth)].sum / teacherStats[parseInt(selectedMonth)].count).toFixed(1)
                                                                : '-'}
                                                        </span>
                                                        {teacherStats[parseInt(selectedMonth)].count > 0 && <Star size={14} className="text-yellow-500" fill="currentColor" />}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center border-b border-slate-200">
                                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                                                        {teacherStats[parseInt(selectedMonth)].count}
                                                    </span>
                                                </td>
                                            </>
                                        )}
                                        <td className="px-6 py-5 text-center bg-primary/5 group-hover:bg-primary/10 font-black text-primary border-l border-b border-slate-200 transition-colors">{yearlyAvg}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredTeachers.length === 0 && (
                    <div className="py-20 text-center text-slate-400 italic bg-white/50 backdrop-blur-sm">
                        {t('no_search_results')}
                    </div>
                )}
            </div>

            <footer className="mt-8 text-slate-400 text-xs text-center flex items-center justify-center gap-2">
                <FileSpreadsheet size={14} />
                {t('footer_info')}
            </footer>
        </div>
    );
};
