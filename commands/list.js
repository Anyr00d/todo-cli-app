import chalk from 'chalk';
import { loadTasks } from '../utils/fileHandler.js';
import { getTimeAgo } from '../utils/timeHelper.js';

export const listTasks = {
    command: 'list',
    describe: 'List all tasks',
    builder: (yargs) => {
        yargs.option('all', {
            alias: 'a',
            type: 'boolean',
            describe: 'Show all tasks, including completed ones',
        });
    },
    handler: (argv) => {
        const tasks = loadTasks();
        if (tasks.length === 0) {
            console.log(chalk.yellow('No tasks found! Use "tasks add <description>" to create one.'));
            return;
        }
        console.log(chalk.blue('Your Tasks:'));
        tasks.forEach((task) => {
            if (!argv.all && task.done) return;
            console.log(`${task.id}\t${task.description}\t${getTimeAgo(task.createdAt)}${argv.all ? `\t${task.done}` : ''}`);
        });
    },
};
