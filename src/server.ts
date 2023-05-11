import fastify from 'fastify';
import cartRoutes from './models/cart.route';

function buildServer() {
    const server = fastify({ logger: true });

    server.get('/healthcheck', async function (req, res) {
        return { status: 'OK' }
    })

    server.register(cartRoutes);

    return server;
}

export default buildServer;