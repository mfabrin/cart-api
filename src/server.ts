import fastify from 'fastify';
import { dbConnector, cartRoutes } from './plugins';


function buildServer() {
    const server = fastify({
        logger: {
            level: 'info',
            transport: {
                target: 'pino-pretty'
            }
        }
    });

    
    server.get('/healthcheck', async (req, res) => {
        return { status: 'OK' }
    })

    server.register(dbConnector);

    server.register(cartRoutes, { prefix: '/api/v1' });

    return server;
}

export default buildServer;