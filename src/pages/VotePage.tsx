import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CLASSES, TEACHERS_BY_CLASS } from '../data/schoolData';
import type { ClassName } from '../data/schoolData';
import { RatingService } from '../services/ratingService';
import { Star, Send, CheckCircle, UserCircle, Loader2 } from 'lucide-react';
import { CustomSelect } from '../components/CustomSelect';

import { useLanguage } from '../contexts/LanguageContext';

export const VotePage: React.FC = () => {
    const { t } = useLanguage();
    const { classCode } = useParams<{ classCode: string }>();
    const [selectedClass, setSelectedClass] = useState<ClassName | ''>((classCode as ClassName) || '');
    const [studentName, setStudentName] = useState('');
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [comments, setComments] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedClass && Object.keys(ratings).length > 0) {
            setSubmitting(true);
            try {
                // Submit all ratings in a single batch request for better performance
                const batchData = Object.entries(ratings)
                    .filter(([_, score]) => score > 0)
                    .map(([teacherId, score]) => ({
                        teacherId,
                        className: selectedClass,
                        score,
                        studentName,
                        comment: comments[teacherId]
                    }));

                if (batchData.length > 0) {
                    await RatingService.submitRatings(batchData);
                }

                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });

                setTimeout(() => {
                    setSubmitted(false);
                    setRatings({});
                    setComments({});
                    setStudentName('');
                    setSelectedClass('');
                }, 5000);
            } catch (error) {
                console.error('General submission error:', error);
                alert("Xatolik yuz berdi. Iltimos qaytadan urunib ko'ring.");
            } finally {
                console.log('Submission process ended');
                setSubmitting(false);
            }
        }
    };

    const handleRatingChange = (teacherId: string, score: number) => {
        setRatings(prev => ({ ...prev, [teacherId]: score }));
    };

    const handleCommentChange = (teacherId: string, comment: string) => {
        setComments(prev => ({ ...prev, [teacherId]: comment }));
    };

    const teachers = selectedClass ? TEACHERS_BY_CLASS[selectedClass] : [];
    const classOptions = CLASSES.map((cls: string) => ({ value: cls, label: cls }));

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-bg-dark">
                <div className="glass-panel p-10 max-w-md w-full animate-fade-up flex flex-col items-center">
                    <div className="bg-success/20 p-4 rounded-full mb-6">
                        <CheckCircle className="text-success w-16 h-16" />
                    </div>
                    <h2 className="text-3xl font-black mb-3 text-slate-900">{t('success_title')}</h2>
                    <p className="text-slate-500 text-lg">{t('success_message')}</p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-8 text-sm text-primary hover:underline font-medium"
                    >
                        {t('resubmit_button')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-slate-900 py-12 px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
                <header className="mb-12 text-center animate-fade-up">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        {t('system_name')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        {selectedClass ? selectedClass : t('select_class')}
                    </h1>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto">
                        {t('header_subtitle')}
                    </p>
                </header>

                <div className="space-y-8 animate-fade-up">
                    {/* STEP 1: CLASS SELECTION - Only show if not in URL */}
                    {!classCode && (
                        <div className="glass-panel p-6 md:p-8 relative z-10">
                            <CustomSelect
                                label={t('step_1_label')}
                                placeholder={t('step_1_placeholder')}
                                options={classOptions}
                                value={selectedClass}
                                onChange={(val) => {
                                    setSelectedClass(val as ClassName);
                                    setRatings({});
                                }}
                            />
                        </div>
                    )}

                    {selectedClass && (
                        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up">
                            {/* STEP 2: STUDENT NAME */}
                            <div className="glass-panel p-6 md:p-8 space-y-4">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                                    <UserCircle size={18} className="text-primary" />
                                    {t('step_2_label')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('step_2_placeholder')}
                                    className="w-full student-input rounded-xl outline-none text-slate-900 font-medium"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* STEP 3: TEACHER LIST */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold px-2 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">3</span>
                                    {t('step_3_label')}
                                </h2>

                                {teachers.map((teacher: any) => (
                                    <div key={teacher.id} className="teacher-card space-y-6 animate-fade-up">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">{teacher.name}</h3>
                                                <span className="text-sm text-primary font-bold uppercase tracking-wider">{t('subject')}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-sm text-slate-400 italic">{t('teacher_evaluation_subtitle')}</p>
                                            <div className="flex justify-between items-center max-w-sm mx-auto">
                                                {[1, 2, 3, 4, 5].map((star: number) => (
                                                    <div key={star} className="flex flex-col items-center gap-2">
                                                        <span className="text-[10px] font-bold text-slate-500">{star}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRatingChange(teacher.id, star)}
                                                            className={`p-2 transition-all duration-200 hover:scale-125 focus:outline-none 
                                ${ratings[teacher.id] >= star ? 'text-amber-400' : 'text-slate-200 hover:text-amber-200'}`}
                                                        >
                                                            <Star
                                                                fill={ratings[teacher.id] >= star ? "currentColor" : "none"}
                                                                size={32}
                                                                strokeWidth={1.5}
                                                            />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-sm text-slate-400 italic">{t('additional_comments')}</p>
                                            <textarea
                                                className="w-full student-input rounded-xl outline-none min-h-[100px] resize-none text-slate-900"
                                                placeholder={t('comment_placeholder')}
                                                value={comments[teacher.id] || ''}
                                                onChange={(e) => handleCommentChange(teacher.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={Object.keys(ratings).length < teachers.length * 0.5 || !studentName || submitting}
                                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl disabled:opacity-30 disabled:grayscale transition-all"
                                >
                                    {submitting ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                                    <span className="text-xl font-black uppercase tracking-widest">{submitting ? t('submitting_button') : t('submit_button')}</span>
                                </button>
                                <p className="text-center text-slate-500 text-sm mt-4">
                                    {t('submit_recommendation')}
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
