import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { dbConnector, cartRoutes } from './plugins';

function buildServer() {
    const server = fastify({
        logger: {
            level: 'info',
            transport: {
                target: 'pino-pretty'
            }
        },
        ajv: {
            customOptions: {
                strict: 'log',
                keywords: ['kind', 'modifier'],
            },
        },
    });

    server.register(swagger);
    server.register(swaggerUI, {
        routePrefix: "/docs"
    });

    server.get('/healthcheck', async (req, res) => {
        return { status: 'OK' }
    })

    server.register(dbConnector);

    server.register(cartRoutes, { prefix: '/api/v1' });

    return server;
}

export default buildServer;