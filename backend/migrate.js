import fs from 'fs';
import path from 'path';
import pool from './db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  console.log('Running migrations...');

  for (const file of files) {
    if (file.endsWith('.sql')) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`Executing ${file}...`);
      try {
        await pool.query(sql);
        console.log(`Finished ${file}`);
      } catch (err) {
        console.error(`Error executing ${file}:`, err.message);
        process.exit(1);
      }
    }
  }

  console.log('All migrations completed successfully.');
  process.exit(0);
};

runMigrations();
