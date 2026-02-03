import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { ClassName } from '../data/schoolData';
import { RatingService } from '../services/ratingService';
import { SchoolService } from '../services/schoolService';
import { Star, User, BookOpen, MessageSquare, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const ClassRatings = () => {
    const { t } = useLanguage();
    const { className } = useParams<{ className: string }>();
    const [expandedTeacher, setExpandedTeacher] = useState<string | null>(null);
    const [teacherStats, setTeacherStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const cls = className as ClassName;

    useEffect(() => {
        const fetchRatings = async () => {
            if (!cls) {
                setTeacherStats([]);
                setLoading(false);
                return;
            }
            setLoading(true);

            // Fetch all ratings for the class and teachers at once
            const [allRatings, teachersData] = await Promise.all([
                RatingService.getRatingsByClass(cls),
                SchoolService.getTeachersByClass(cls)
            ]);

            if (teachersData.length === 0) {
                setTeacherStats([]);
                setLoading(false);
                return;
            }

            const stats = teachersData.map(t => {
                const teacherRatings = allRatings.filter(r => r.teacherId === t.id);
                const sum = teacherRatings.reduce((acc, r) => acc + r.score, 0);
                const average = teacherRatings.length > 0 ? sum / teacherRatings.length : 0;

                return {
                    ...t,
                    average,
                    count: teacherRatings.length,
                    ratings: teacherRatings.filter(r => r.comment)
                };
            });

            setTeacherStats(stats.sort((a, b) => b.average - a.average));
            setLoading(false);
        };
        fetchRatings();
    }, [cls]);

    if (!cls) {
        return <div className="p-8 text-center text-muted">{t('select_class_view')}</div>;
    }

    const toggleExpand = (teacherId: string) => {
        setExpandedTeacher(expandedTeacher === teacherId ? null : teacherId);
    };

    return (
        <div className="p-8 max-w-[1200px] mx-auto animate-fade-in font-sans">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight flex items-center gap-3">
                    <BookOpen className="text-primary" size={40} />
                    {cls}
                </h1>
                <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">{t('student_feedback')}</p>
            </header>

            <div className="glass-panel overflow-hidden border-slate-200 shadow-2xl bg-white shadow-primary/5">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="px-6 py-4 text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] w-12">#</th>
                            <th className="px-6 py-4 text-left text-slate-500 font-bold uppercase tracking-wider text-[10px]">{t('table_teacher')}</th>
                            <th className="px-6 py-4 text-left text-slate-500 font-bold uppercase tracking-wider text-[10px]">{t('subject')}</th>
                            <th className="px-6 py-4 text-center text-slate-500 font-bold uppercase tracking-wider text-[10px] w-32">{t('table_avg_score')}</th>
                            <th className="px-6 py-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[10px] w-32">{t('table_vote_count')}</th>
                            <th className="px-6 py-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[10px] w-20"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <Loader2 size={40} className="text-primary animate-spin" />
                                        <p className="text-slate-400 font-medium">{t('loading_data')}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : teacherStats.length > 0 ? (
                            teacherStats.map((teacher, index) => (
                                <React.Fragment key={teacher.id}>
                                    <tr
                                        onClick={() => toggleExpand(teacher.id)}
                                        className="hover:bg-slate-50 transition-all cursor-pointer group"
                                    >
                                        <td className="px-6 py-5 text-slate-400 font-mono text-sm">{index + 1}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                    <User size={18} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-lg">{teacher.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-lg text-sm group-hover:bg-white transition-all">
                                                {teacher.subject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className={`text-xl font-black ${teacher.average >= 4.5 ? 'text-emerald-600' :
                                                    teacher.average >= 3.5 ? 'text-blue-600' :
                                                        teacher.average >= 2.5 ? 'text-amber-600' :
                                                            teacher.average > 0 ? 'text-rose-600' : 'text-slate-200'
                                                    }`}>
                                                    {teacher.average > 0 ? teacher.average.toFixed(1) : '-'}
                                                </span>
                                                <Star size={16} className={teacher.average > 0 ? "text-yellow-500" : "text-slate-200"} fill={teacher.average > 0 ? "currentColor" : "none"} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <span className="text-slate-600 font-bold bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 font-mono">
                                                {teacher.count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                                {expandedTeacher === teacher.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedTeacher === teacher.id && (
                                        <tr className="bg-slate-50/50 animate-fade-in border-l-4 border-primary">
                                            <td colSpan={6} className="px-8 py-8">
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                                            <MessageSquare size={16} className="text-primary" />
                                                            {t('student_feedback')} ({teacher.ratings.length})
                                                        </h4>
                                                    </div>

                                                    {teacher.ratings.length > 0 ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {teacher.ratings.map((r: any, i: number) => (
                                                                <div key={i} className="flex flex-col gap-2 p-5 rounded-2xl bg-white border border-slate-100 group/comment transition-all hover:border-primary/20 hover:shadow-md hover:shadow-primary/5" style={{ animationDelay: `${i * 0.05}s` }}>
                                                                    <div className="flex justify-between items-start mb-1">
                                                                        <div className="flex gap-1">
                                                                            {[1, 2, 3, 4, 5].map(s => (
                                                                                <Star key={s} size={10} className={r.score >= s ? "text-yellow-500" : "text-slate-200"} fill={r.score >= s ? "currentColor" : "none"} />
                                                                            ))}
                                                                        </div>
                                                                        <span className="text-[10px] text-slate-400 font-mono">
                                                                            {new Date(r.timestamp).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-slate-700 text-sm leading-relaxed italic font-medium">"{r.comment}"</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-10 bg-white/50 rounded-3xl border border-dashed border-slate-200 text-slate-400 italic">
                                                            Hozircha izohlar mavjud emas.
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-slate-500 italic">
                                    Ushbu sinfga hali o'qituvchilar biriktirilmagan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
