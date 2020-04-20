const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = function (environment) {
    return {
        mode: 'production',
        entry: path.join(process.cwd(), './src/index.ts'),
        output: {
            path: path.resolve(process.cwd(), "build"),
            filename: 'bundle.js'
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
        }
    }
}