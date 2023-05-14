import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';

async function dbConnector(fastify: FastifyInstance) {

    if (!process.env.CONNECTION_STRING) {
        fastify.log.error("Connection string is not defined");
        throw new Error("Connection string undefined");
    }

    await mongoose.connect(process.env.CONNECTION_STRING, { dbName: process.env.DATABASE_NAME })

    fastify.log.info("Connected to database");
}

export default dbConnector;