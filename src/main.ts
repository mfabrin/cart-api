import buildServer from './server';

const PORT = Number.parseInt(process.env.PORT || "3000");

const server = buildServer();

async function main() {
    try {
        await server.listen({ port: PORT });
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

main();