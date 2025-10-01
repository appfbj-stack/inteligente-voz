import Database from 'better-sqlite3';
import path from 'path';

// Inicializa o banco de dados
const db = new Database(path.join(process.cwd(), 'diario.db'));

// Habilita foreign keys
db.pragma('foreign_keys = ON');

// Função para executar as migrações
export function runMigrations() {
    const migrations = [
        {
            id: 1,
            up: path.join(process.cwd(), 'migrations/1.sql'),
            down: path.join(process.cwd(), 'migrations/1/down.sql')
        }
    ];

    // Cria tabela de migrações se não existir
    db.exec(`
        CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY,
            applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Executa cada migração que ainda não foi aplicada
    for (const migration of migrations) {
        const applied = db.prepare('SELECT id FROM migrations WHERE id = ?').get(migration.id);
        
        if (!applied) {
            const sql = require('fs').readFileSync(migration.up, 'utf8');
            db.exec(sql);
            db.prepare('INSERT INTO migrations (id) VALUES (?)').run(migration.id);
            console.log(`Applied migration ${migration.id}`);
        }
    }
}

// Executa as migrações ao inicializar
runMigrations();

export default db;