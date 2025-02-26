#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { addTask } from './commands/add.js';
import { listTasks } from './commands/list.js';
import { completeTask } from './commands/complete.js';
import { deleteTask } from './commands/delete.js';

yargs(hideBin(process.argv))
    .command(addTask)
    .command(listTasks)
    .command(completeTask)
    .command(deleteTask)
    .demandCommand(1)
    .strict()
    .help()
    .argv;
