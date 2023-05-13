import fastifyMongo from '@fastify/mongodb';
import { FastifyInstance } from 'fastify';

async function dbConnector(fastify: FastifyInstance) {
    fastify.register(fastifyMongo, {
        url: "mongodb://localhost:27017/PixartChallenge",
    });

    fastify.log.info("Connected to database");
}

export default dbConnector;