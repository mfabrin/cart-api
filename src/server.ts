import fastify from 'fastify';
import cartRoutes from './models/cart.route';

function buildServer() {
    const server = fastify({
        logger: {
            level: 'info',
            transport: {
                target: 'pino-pretty'
            }
        }
    });

    server.get('/healthcheck', async function (req, res) {
        return { status: 'OK' }
    })

    server.register(cartRoutes, { prefix: '/api/v1' });

    return server;
}

export default buildServer;