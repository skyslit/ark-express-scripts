// @ts-nocheck
import { ArkExpressPackage } from '@skyslit/ark-express'
import { AuthExpressModule as DefaultModule } from './module';

const server = new ArkExpressPackage();

server
.useModule('Default', new DefaultModule())
.useDatabase({
    name: 'default',
    connectionString: 'mongodb://localhost:27017/default_module'
});
server.usePort(3000);

server.start();