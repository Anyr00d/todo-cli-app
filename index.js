#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasksFile = path.join(__dirname, 'tasks.json');

if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify([]));
}

const loadTasks = () => JSON.parse(fs.readFileSync(tasksFile));
const saveTasks = (tasks) => fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));

const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
};


yargs(hideBin(process.argv))
.command('test', 'A test command', () => {
    console.log("Test command executed!");
})
    .command('add <description>', 'Add a new task', (yargs) => {
        yargs.positional('description', {
            type: 'string',
            describe: 'Task description',
        });
    }, (argv) => {
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
    })

    .command('list', 'List all tasks', (yargs) => {
        yargs.option('all', {
            alias: 'a',
            type: 'boolean',
            describe: 'Show all tasks, including completed ones',
        });
    }, (argv) => {
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
    })


    .command('complete <id>', 'Mark a task as complete', (yargs) => {
        yargs.positional('id', {
            type: 'number',
            describe: 'Task ID to complete',
        });
    }, (argv) => {
        const tasks = loadTasks();
        const task = tasks.find((t) => t.id === argv.id);
        if (task) {
            task.done = true;
            saveTasks(tasks);
            console.log(chalk.green('Task marked as complete!'));
        } else {
            console.log(chalk.red('Task not found.'));
        }
    })

    .command('delete <id>', 'Delete a task', (yargs) => {
        yargs.positional('id', {
            type: 'number',
            describe: 'Task ID to delete',
        });
    }, (argv) => {
        let tasks = loadTasks();
        tasks = tasks.filter((task) => task.id !== argv.id);
        saveTasks(tasks);
        console.log(chalk.yellow('Task deleted.'));
    })

    .demandCommand(1)
    .help()
    .strict() 
    .fail((msg, err) => {
        if (err) throw err;
        console.error(chalk.red(`Error: ${msg}`));
        console.log(chalk.yellow('Use --help to see available commands.'));
        process.exit(1);
    })
    .argv
