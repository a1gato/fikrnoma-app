import { supabase } from '../lib/supabase';

export interface Teacher {
    id: string;
    name: string;
    subject: string;
}

export const SchoolService = {
    getClasses: async (): Promise<string[]> => {
        const { data, error } = await supabase
            .from('classes')
            .select('name')
            .order('name');

        if (error) {
            console.error('Error fetching classes:', error);
            return [];
        }

        const classes = data.map(c => c.name);

        return classes.sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, '') || '0', 10);
            const numB = parseInt(b.replace(/\D/g, '') || '0', 10);

            if (numA !== numB) {
                return numA - numB;
            }

            return a.localeCompare(b);
        });
    },

    getTeachersByClass: async (className: string): Promise<Teacher[]> => {
        const { data, error } = await supabase
            .from('class_teachers')
            .select(`
        teacher_id,
        teachers (
          id,
          name,
          subject
        )
      `)
            .eq('class_name', className);

        if (error) {
            console.error('Error fetching teachers for class:', error);
            return [];
        }

        // @ts-ignore
        return data.map(item => item.teachers).filter(t => t !== null) as Teacher[];
    },

    getAllTeachers: async (): Promise<Teacher[]> => {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .order('name');
        if (error) {
            console.error('Error fetching teachers:', error);
            return [];
        }
        return data as Teacher[];
    }
};
