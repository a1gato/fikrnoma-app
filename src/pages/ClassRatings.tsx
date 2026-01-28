import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TEACHERS_BY_CLASS } from '../data/schoolData';
import type { ClassName } from '../data/schoolData';
import { RatingService } from '../services/ratingService';
import { Star, User, BookOpen, MessageSquare, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

export const ClassRatings = () => {
    const { className } = useParams<{ className: string }>();
    const [expandedTeacher, setExpandedTeacher] = useState<string | null>(null);
    const [teacherStats, setTeacherStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const cls = className as ClassName;

    useEffect(() => {
        const fetchRatings = async () => {
            if (!cls || !TEACHERS_BY_CLASS[cls]) {
                setTeacherStats([]); // Clear stats if class is invalid
                setLoading(false);
                return;
            }
            setLoading(true);
            const teachers = TEACHERS_BY_CLASS[cls];

            const statsPromises = teachers.map(async t => {
                const ratings = await RatingService.getTeacherRatings(t.id);
                const sum = ratings.reduce((acc, r) => acc + r.score, 0);
                const average = ratings.length > 0 ? sum / ratings.length : 0;

                return {
                    ...t,
                    average,
                    count: ratings.length,
                    ratings: ratings.filter(r => r.comment)
                };
            });

            const stats = await Promise.all(statsPromises);
            setTeacherStats(stats.sort((a, b) => b.average - a.average));
            setLoading(false);
        };
        fetchRatings();
    }, [cls]);

    if (!cls || !TEACHERS_BY_CLASS[cls]) {
        return <div className="p-8 text-center text-muted">Select a class to view ratings</div>;
    }

    const teachers = TEACHERS_BY_CLASS[cls];

    const toggleExpand = (teacherId: string) => {
        setExpandedTeacher(expandedTeacher === teacherId ? null : teacherId);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto animate-fade-in font-sans">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Sinf {cls}</h1>
                    <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">O'qituvchilar ko'rsatkichlari</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl text-sm text-slate-500 border border-slate-200 flex items-center gap-3 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Jami o'qituvchilar: <span className="text-slate-900 font-bold">{teachers.length}</span>
                </div>
            </header>

            <div className="glass-panel overflow-hidden border-slate-200 shadow-xl bg-white/40">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50/50 backdrop-blur-md">
                            <th className="w-16 px-6 py-4">#</th>
                            <th className="px-6 py-4">O'qituvchi</th>
                            <th className="px-6 py-4">Fan</th>
                            <th className="px-6 py-4 text-right">O'rtacha ball</th>
                            <th className="px-6 py-4 text-right">Ovozlar</th>
                            <th className="w-16 px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <Loader2 size={40} className="text-primary animate-spin" />
                                        <p className="text-slate-400 font-medium">Ma'lumotlar yuklanmoqda...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : teacherStats.length > 0 ? (
                            teacherStats.map((teacher, index) => (
                                <React.Fragment key={teacher.id}>
                                    <tr
                                        onClick={() => toggleExpand(teacher.id)}
                                        className={`group cursor-pointer transition-all duration-300 ${expandedTeacher === teacher.id ? 'bg-primary/5' : 'hover:bg-slate-50'}`}
                                    >
                                        <td className="px-6 py-5 text-slate-400 font-mono text-sm">{index + 1}</td>
                                        <td className="px-6 py-5 font-bold text-slate-900">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-2xl transition-all duration-500 ${expandedTeacher === teacher.id ? 'bg-primary text-white rotate-12 shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400 group-hover:scale-110 group-hover:text-primary group-hover:bg-primary/10'}`}>
                                                    <User size={18} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-lg tracking-tight">{teacher.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">
                                                <BookOpen size={12} />
                                                {teacher.subject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2.5">
                                                <span className={`text-xl font-black ${teacher.average >= 4.5 ? 'text-green-600' :
                                                    teacher.average >= 3.5 ? 'text-blue-600' :
                                                        teacher.average >= 2.5 ? 'text-yellow-600' :
                                                            teacher.average > 0 ? 'text-red-500' : 'text-slate-300'
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
                                                            O'quvchilar fikrlari ({teacher.ratings.length})
                                                        </h4>
                                                    </div>

                                                    {teacher.ratings.length > 0 ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {teacher.ratings.filter((r: any) => r.comment).map((r: any, i: number) => (
                                                                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 group/comment transition-all hover:border-primary/20 hover:shadow-md hover:shadow-primary/5" style={{ animationDelay: `${i * 0.05}s` }}>
                                                                    <div className="flex justify-between items-start mb-3">
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
