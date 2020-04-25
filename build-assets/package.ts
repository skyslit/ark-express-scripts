// @ts-nocheck
import { ArkExpressPackage } from '@skyslit/ark-express'
import { AuthExpressModule as DefaultModule } from './module';
import chalk from 'chalk';

const server = new ArkExpressPackage();

server
.useModule('Default', new DefaultModule())
.useDatabase({
    name: 'default',
    connectionString: 'mongodb://localhost:27017/default_module'
});
server.usePort(3000);


const shouldStart = process.argv.indexOf('--start') > -1;

if (shouldStart === true) {
    server.start();
} else {
    console.log(chalk.yellow('Please start the server manually'));
}

export default server;