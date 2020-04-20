const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const { spawn } = require('child_process');
const createConfig = require('./../config/webpack.config');

const compiler = webpack(createConfig('development'));

console.clear();
console.log(chalk.blue('Starting development...'));

let dev_server = null;
const watch = compiler.watch({
    aggregateTimeout: 300,
    poll: undefined
}, function (err, stats) {
    if (err) {
        throw err;
    }

    console.clear();
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

    console.log('');
    if (dev_server) {
        dev_server.kill();
    }
    dev_server = spawn('node', [path.join(process.cwd(), './build/bundle.js')], {
        cwd: process.cwd(),
        stdio: "inherit"
    });
})

process.on('SIGTERM', () => {
    if (dev_server) {
        dev_server.kill();
        console.log('Dev server killed');
    }
})