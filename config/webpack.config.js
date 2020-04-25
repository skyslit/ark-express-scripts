const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const nodeExternals = require('webpack-node-externals');

module.exports = function (environment) {

    const indexFilePath = path.join(process.cwd(), './src/index.ts');
    const moduleFilePath = path.join(process.cwd(), './src/module.ts');

    var virtualModules = null;
    if (fs.existsSync(indexFilePath) === false && fs.existsSync(moduleFilePath) === true) {
        console.log(chalk.greenBright('Module dev setup detected!'));
        virtualModules = new VirtualModulesPlugin({
            'src/index.ts': fs.readFileSync(path.join(__dirname, './../build-assets/package.ts'), 'utf-8')
        });
    }

    return {
        mode: environment,
        entry: path.join(process.cwd(), './src/index.ts'),
        output: {
            path: path.resolve(process.cwd(), "build"),
            filename: 'bundle.js',
            library: '',
            libraryTarget: 'commonjs'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        target: 'node',
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
        },
        externals: [nodeExternals()], // Need this to avoid error when working with Express
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: require.resolve('ts-loader'),
                    exclude: /node_modules/,
                },
            ]
        },
        plugins: [
            virtualModules
        ].filter(p => p)
    }
}