import buildServer from "../server";

const test = async () => {
    const server = buildServer();

    const response = await server.inject({
        method: 'GET',
        url: '/healthcheck'
    })

    console.log('status code', response.statusCode);
    console.log('body', response.body);
}

test();