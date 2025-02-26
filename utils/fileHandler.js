import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasksFile = path.join(__dirname, '../tasks.json');

if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify([]));
}

export const loadTasks = () => {
    try {
        const data = fs.readFileSync(tasksFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading tasks:', error.message);
        return [];
    }
};

export const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};
