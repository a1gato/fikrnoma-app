export type ClassName =
    | '5A' | '6A' | '6B' | '7A' | '7B' | '7V' | '7G'
    | '8A' | '8B' | '8G' | '8V' | '9A' | '9B' | '9V' | '9G' | '9D'
    | '10A' | '10B' | '10V' | '10G' | '10D' | '11A' | '11B'
    | string; // Allow dynamic strings as fallback

export interface Teacher {
    id: string;
    name: string;
    subject: string;
}

export interface Rating {
    id: string;
    teacherId: string;
    studentName?: string;
    className: string;
    score: number; // 1-5
    comment?: string;
    timestamp: number;
}
