import { supabase } from '../lib/supabase';
import type { Rating } from '../data/schoolData';


export const RatingService = {
    getAllRatings: async (): Promise<Rating[]> => {
        const { data, error } = await supabase
            .from('ratings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching ratings:', error);
            return [];
        }

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

    getRatingsByClass: async (className: string): Promise<Rating[]> => {
        const { data, error } = await supabase
            .from('ratings')
            .select('*')
            .eq('class_name', className)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(`Error fetching ratings for class ${className}:`, error);
            return [];
        }

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

    getRatingsByTeacher: async (teacherId: string): Promise<Rating[]> => {
        const { data, error } = await supabase
            .from('ratings')
            .select('*')
            .eq('teacher_id', teacherId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(`Error fetching ratings for teacher ${teacherId}:`, error);
            return [];
        }

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
        await supabase
            .from('ratings')
            .insert(ratings.map(r => ({
                teacher_id: r.teacherId,
                class_name: r.className,
                score: r.score,
                student_name: r.studentName,
                comment: r.comment
            })));
    },

    getTeacherAverage: async (teacherId: string): Promise<number> => {
        const ratings = await RatingService.getRatingsByTeacher(teacherId);
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, r) => acc + r.score, 0);
        return sum / ratings.length;
    },

    getTeacherRatings: async (teacherId: string): Promise<Rating[]> => {
        return RatingService.getRatingsByTeacher(teacherId);
    },

    getTeacherRatingCount: async (teacherId: string): Promise<number> => {
        const ratings = await RatingService.getRatingsByTeacher(teacherId);
        return ratings.length;
    },

    getUniqueTeachers: (teachersByClass: Record<string, any[]>): string[] => {
        const names = new Set<string>();
        Object.values(teachersByClass).forEach(teachers => {
            teachers.forEach(t => names.add(t.name));
        });
        return Array.from(names).sort();
    },

    getMonthlyTeacherStats: async (teachersByClass: Record<string, any[]>, year: number) => {
        // Fetch only required columns for the specific year
        const startDate = `${year}-01-01T00:00:00Z`;
        const endDate = `${year}-12-31T23:59:59Z`;

        const { data: ratings, error } = await supabase
            .from('ratings')
            .select('teacher_id, score, created_at')
            .gte('created_at', startDate)
            .lte('created_at', endDate);

        if (error) {
            console.error('Error fetching yearly stats:', error);
            return {};
        }

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

        ratings?.forEach(r => {
            const date = new Date(r.created_at);
            const name = idToName[r.teacher_id];
            if (name && stats[name]) {
                const month = date.getMonth();
                stats[name][month].sum += r.score;
                stats[name][month].count += 1;
            }
        });

        return stats;
    }
};
