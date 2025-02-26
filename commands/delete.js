import chalk from 'chalk';
import { loadTasks, saveTasks } from '../utils/fileHandler.js';

export const deleteTask = {
    command: 'delete <id>',
    describe: 'Delete a task',
    builder: (yargs) => {
        yargs.positional('id', {
            type: 'number',
            describe: 'Task ID to delete',
        });
    },
    handler: (argv) => {
        let tasks = loadTasks();
        tasks = tasks.filter((task) => task.id !== argv.id);
        saveTasks(tasks);
        console.log(chalk.yellow('Task deleted.'));
    },
};
