import fastify from 'fastify';
import { dbConnector, cartRoutes } from './plugins';
import { cartCheckoutRequestSchema, cartCreationRequestSchema, cartDeleteRequestSchema, cartRequestSchema, cartResponseSchema, cartUpdateRequestSchema } from './utils/schemas/cart';
import fastifySwagger from '@fastify/swagger';

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

    server.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Cart API Challenge',
                version: '1.0.0'
            },
            tags: [
                { name: 'Cart', description: 'Cart endpoints' },
            ],
            definitions: {
                CartCreationRequest: cartCreationRequestSchema,
                CartUpdateRequest: cartUpdateRequestSchema,
                CartRequest: cartRequestSchema,
                CartResponse: cartResponseSchema as any,
                CartCheckoutRequest: cartCheckoutRequestSchema,
                CartDeleteRequest: cartDeleteRequestSchema
            }
        }
    });
    server.register(require('@fastify/swagger-ui'), {
        routePrefix: "/docs"
    })

    server.register(dbConnector);

    server.register(cartRoutes, { prefix: '/api/v1' });

    return server;
}

export default buildServer;