import * as http from 'http';
import * as serverHandlers from './serverHandlers';
import server from './server';
import Logger from '@/utils/Logger';
import seeder from '@/components/seeder';

const Server: http.Server = http.createServer(server);

Server.listen(server.get('port'), () => Logger.info(`[Server] started at port ${server.get('port')}`));

seeder();

Server.on('error', (error: Error) => serverHandlers.onError(error, server.get('port')));
Server.on('listening', serverHandlers.onListening.bind(Server));
