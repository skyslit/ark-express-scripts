const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const { spawn, spawnSync } = require('child_process');
const createConfig = require('./../config/webpack.config');

const compiler = webpack(createConfig('production'));

console.clear();
console.log(chalk.blue('Compiling...'));

spawnSync('rm', ['-Rf', path.join(process.cwd(), './build')]);

compiler.run(function (err, stats) {
    if (err) {
        throw err;
    }

    if (stats.hasErrors() === true) {
        console.log(chalk.red('Compiled with error(s)'));
        stats.compilation.errors.forEach(function (errorText) {
            console.log(chalk.red(errorText.message));
        })
    } else if (stats.hasWarnings() === true) {
        console.log(chalk.yellow('Compiled with warnings'));
        stats.compilation.warnings.forEach(function (warning) {
            console.log(chalk.yellow(warning));
        })
    } else {
        console.log(chalk.green('Compiled Successfully'));
    }
})