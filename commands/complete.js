import chalk from 'chalk';
import { loadTasks, saveTasks } from '../utils/fileHandler.js';

export const completeTask = {
    command: 'complete <id>',
    describe: 'Mark a task as complete',
    builder: (yargs) => {
        yargs.positional('id', {
            type: 'number',
            describe: 'Task ID to complete',
        });
    },
    handler: (argv) => {
        const tasks = loadTasks();
        const task = tasks.find((t) => t.id === argv.id);
        if (task) {
            task.done = true;
            saveTasks(tasks);
            console.log(chalk.green('Task marked as complete!'));
        } else {
            console.log(chalk.red('Task not found.'));
        }
    },
};
