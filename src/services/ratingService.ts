import { supabase } from '../lib/supabase';
import type { Rating } from '../data/schoolData';


export const RatingService = {
    getAllRatings: async (): Promise<Rating[]> => {
        // Automatic Pruning logic: Only fetch ratings from the last 30 days
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

        const { data, error } = await supabase
            .from('ratings')
            .select('*')
            .gte('created_at', oneMonthAgo.toISOString());

        if (error) {
            console.error('Error fetching ratings:', error);
            return [];
        }

        // Map snake_case from DB to camelCase for the App
        return data.map(r => ({
            id: r.id,
            teacherId: r.teacher_id,
            studentName: r.student_name,
            className: r.class_name,
            score: r.score,
            comment: r.comment,
            timestamp: new Date(r.created_at).getTime()
        }));
    },

    submitRating: async (teacherId: string, className: any, score: number, studentName?: string, comment?: string) => {
        const { error } = await supabase
            .from('ratings')
            .insert([
                {
                    teacher_id: teacherId,
                    class_name: className,
                    score: score,
                    student_name: studentName,
                    comment: comment
                }
            ]);

        if (error) {
            console.error('Error submitting rating:', error);
            throw error;
        }
    },

    submitRatings: async (ratings: { teacherId: string; className: any; score: number; studentName?: string; comment?: string }[]) => {
        const { error } = await supabase
            .from('ratings')
            .insert(ratings.map(r => ({
                teacher_id: r.teacherId,
                class_name: r.className,
                score: r.score,
                student_name: r.studentName,
                comment: r.comment
            })));

        if (error) {
            console.error('Error submitting batch ratings:', error);
            throw error;
        }
    },

    getTeacherAverage: async (teacherId: string): Promise<number> => {
        const ratings = await RatingService.getAllRatings();
        const teacherRatings = ratings.filter(r => r.teacherId === teacherId);
        if (teacherRatings.length === 0) return 0;
        const sum = teacherRatings.reduce((acc, r) => acc + r.score, 0);
        return sum / teacherRatings.length;
    },

    getTeacherRatings: async (teacherId: string): Promise<Rating[]> => {
        const ratings = await RatingService.getAllRatings();
        return ratings.filter(r => r.teacherId === teacherId);
    },

    getTeacherRatingCount: async (teacherId: string): Promise<number> => {
        const ratings = await RatingService.getAllRatings();
        return ratings.filter(r => r.teacherId === teacherId).length;
    },

    getUniqueTeachers: (teachersByClass: Record<string, any[]>): string[] => {
        const names = new Set<string>();
        Object.values(teachersByClass).forEach(teachers => {
            teachers.forEach(t => names.add(t.name));
        });
        return Array.from(names).sort();
    },

    getMonthlyTeacherStats: async (teachersByClass: Record<string, any[]>, year: number) => {
        const ratings = await RatingService.getAllRatings();

        // Map all teacher IDs to their names for grouping
        const idToName: Record<string, string> = {};
        Object.values(teachersByClass).forEach(teachers => {
            teachers.forEach(t => {
                idToName[t.id] = t.name;
            });
        });

        const stats: Record<string, Record<number, { sum: number; count: number }>> = {};
        const uniqueNames = RatingService.getUniqueTeachers(teachersByClass);

        uniqueNames.forEach(name => {
            stats[name] = {};
            for (let i = 0; i < 12; i++) {
                stats[name][i] = { sum: 0, count: 0 };
            }
        });

        ratings.forEach(r => {
            const date = new Date(r.timestamp);
            if (date.getFullYear() === year) {
                const name = idToName[r.teacherId];
                if (name && stats[name]) {
                    const month = date.getMonth();
                    stats[name][month].sum += r.score;
                    stats[name][month].count += 1;
                }
            }
        });

        return stats;
    }
};
