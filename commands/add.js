import chalk from 'chalk';
import { loadTasks, saveTasks } from '../utils/fileHandler.js';

export const addTask = {
    command: 'add <description>',
    describe: 'Add a new task',
    builder: (yargs) => {
        yargs.positional('description', {
            type: 'string',
            describe: 'Task description',
        });
    },
    handler: (argv) => {
        const tasks = loadTasks();
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            description: argv.description,
            createdAt: new Date(),
            done: false,
        };
        tasks.push(newTask);
        saveTasks(tasks);
        console.log(chalk.green('Task added!'));
    },
};
