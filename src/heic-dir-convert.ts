#! /usr/bin/env node

import { Command } from 'commander';

import { processDirectory } from './options/processDirectory';

const program = new Command();
program.version('1.0.1');

program.requiredOption('-d --directory <path>', 'source directory');
program.action((options) => processDirectory(options.directory));

program.parse(process.argv);
