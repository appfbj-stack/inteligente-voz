import db from './database';

export interface User {
    id: string;
    email: string;
    plan: 'free' | 'pro' | 'enterprise';
    audio_minutes_used: number;
    audio_minutes_limit: number;
    created_at: string;
    updated_at: string;
}

export interface WorkDiary {
    id: number;
    user_id: string;
    title: string;
    work_site: string;
    responsible_engineer: string;
    weather_conditions?: string;
    activities: string;
    team_present?: string;
    observations?: string;
    diary_date: string;
    created_at: string;
    updated_at: string;
}

// Funções para Users
export const userQueries = {
    create: db.prepare(`
        INSERT INTO users (id, email, plan)
        VALUES (?, ?, ?)
    `),
    
    get: db.prepare(`
        SELECT * FROM users WHERE id = ?
    `),
    
    update: db.prepare(`
        UPDATE users
        SET plan = ?, audio_minutes_used = ?, audio_minutes_limit = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `)
};

// Funções para Work Diaries
export const workDiaryQueries = {
    create: db.prepare(`
        INSERT INTO work_diaries (
            user_id, title, work_site, responsible_engineer,
            weather_conditions, activities, team_present,
            observations, diary_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `),
    
    getAll: db.prepare(`
        SELECT * FROM work_diaries
        WHERE user_id = ?
        ORDER BY diary_date DESC
    `),
    
    get: db.prepare(`
        SELECT * FROM work_diaries
        WHERE id = ? AND user_id = ?
    `),
    
    update: db.prepare(`
        UPDATE work_diaries
        SET title = ?,
            work_site = ?,
            responsible_engineer = ?,
            weather_conditions = ?,
            activities = ?,
            team_present = ?,
            observations = ?,
            diary_date = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
    `),
    
    delete: db.prepare(`
        DELETE FROM work_diaries
        WHERE id = ? AND user_id = ?
    `)
};