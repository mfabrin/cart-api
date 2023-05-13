import { describe, expect, test } from "@jest/globals";
import buildServer from "../server";


describe('healthcheck', () => {

    const server = buildServer();

    test('check if server is running', async () => {

        const res = await server.inject({
            method: 'GET',
            url: '/healthcheck'
        })

        expect(res.statusCode).toEqual(200);
        expect(JSON.parse(res.payload)).toEqual({ status: 'OK' });
    })
});