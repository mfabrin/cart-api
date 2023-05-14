import buildServer from "../src/server";


describe('Cart creation', () => {
    const server = buildServer();

    test('POST: create a cart', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/v1/cart/create',
            payload: {
                ecommerce_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                customer_id: '6fa85f64-5717-4562-b3fc-3c963f66afa6',
                created_at: '2023-05-14T11:10:34.989Z',
                updated_at: '2023-05-14T11:10:34.989Z',
                status: 'created'
            }
        })

        expect(res.statusCode).toEqual(201);
    })

    test('POST: create a cart without some parameters', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/v1/cart/create',
            payload: {
                ecommerce_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                customer_id: '6fa85f64-5717-4562-b3fc-3c963f66afa6',
            }
        })

        expect(res.statusCode).toEqual(400);
    })

    test('POST: create a cart that already exist', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/v1/cart/create',
            payload: {
                ecommerce_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                customer_id: '6fa85f64-5717-4562-b3fc-3c963f66afa6',
                created_at: '2023-05-14T11:10:34.989Z',
                updated_at: '2023-05-14T11:10:34.989Z',
                status: 'created'
            }
        })

        expect(res.statusCode).toEqual(400);
    })
});

describe('Cart update', () => {
    const server = buildServer();

    test('PUT: update NON existing cart', async () => {
        const res = await server.inject({
            method: 'PUT',
            url: '/api/v1/cart/update',
            payload: {
                ecommerce_id: '3fa85f64-5717-4562-b3fc-3c963f66afa6',
                customer_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                item_list: [{
                    "product_sku": "123",
                    "product_name": "My product",
                    "file_type": "PDF",
                    "delivery_date": new Date("2023-05-15T11:11:02.474+0000"),
                    "quantity": 150
                }]
            }
        })

        expect(res.statusCode).toEqual(404);
    })

    test('PUT: update with less parameters', async () => {
        const res = await server.inject({
            method: 'PUT',
            url: '/api/v1/cart/update',
            payload: {
                ecommerce_id: '3fa85f64-5717-4562-b3fc-3c963f66afa6',
                item_list: [{
                    "product_sku": "123",
                    "product_name": "My product",
                    "file_type": "PDF",
                    "delivery_date": new Date("2023-05-15T11:11:02.474+0000"),
                    "quantity": 150
                }]
            }
        })

        expect(res.statusCode).toEqual(400);
    })

    test('PUT: update existing cart', async () => {
        const res = await server.inject({
            method: 'PUT',
            url: '/api/v1/cart/update',
            payload: {
                ecommerce_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                customer_id: '6fa85f64-5717-4562-b3fc-3c963f66afa6',
                item_list: [{
                    "product_sku": "123",
                    "product_name": "My product",
                    "file_type": "PDF",
                    "delivery_date": new Date("2023-05-15T11:11:02.474+0000"),
                    "quantity": 150
                }]
            }
        })

        expect(res.statusCode).toEqual(200);
    })
});

describe('Get a cart', () => {
    const server = buildServer();

    test('GET: get a cart without some parameters', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/cart/3fa85f64-5717-4562-b3fc-2c963f66afa6'
        })

        expect(res.statusCode).toEqual(404);
    })

    test('GET: get a non existing cart', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/cart/3fa85f64-5717-4562-b3fc-3c963f66afa6/3fa85f64-5717-4562-b3fc-2c963f66afa6'
        })

        expect(res.statusCode).toEqual(404);
    })

    test('GET: get an existing cart', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/cart/3fa85f64-5717-4562-b3fc-2c963f66afa6/6fa85f64-5717-4562-b3fc-3c963f66afa6'
        })

        expect(res.statusCode).toEqual(200);
    })
});

describe('Cart checkout', () => {
    const server = buildServer();

    test('PUT: checkout a cart without some parameters', async () => {
        const res = await server.inject({
            method: 'PUT',
            url: '/api/v1/cart/checkout',
            payload: {
                customer_id: ""
            }
        })

        expect(res.statusCode).toEqual(400);
    })

    test('PUT: checkout a non existing cart', async () => {
        const res = await server.inject({
            method: 'PUT',
            url: '/api/v1/cart/checkout',
            payload: {
                ecommerce_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                customer_id: "3fa85f64-5717-4562-b3fc-3c963f66afa6"
            }
        })

        expect(res.statusCode).toEqual(404);
    })

    test('PUT: checkout a cart', async () => {
        const res = await server.inject({
            method: 'PUT',
            url: '/api/v1/cart/checkout',
            payload: {
                ecommerce_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                customer_id: "6fa85f64-5717-4562-b3fc-3c963f66afa6"
            }
        })

        expect(res.statusCode).toEqual(200);
    })
});

describe('Delete a cart', () => {
    const server = buildServer();

    test('DELETE: delete a cart without parameters', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/api/v1/cart/delete/3fa85f64-5717-4562-b3fc-2c963f66afa6'
        })

        expect(res.statusCode).toEqual(404);
    })

    test('DELETE: delete a non existing cart', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/api/v1/cart/delete/3fa85f64-5717-4562-b3fc-2c963f66afa6/f6a85f64-5717-4562-b3fc-3c963f66afa6'
        })

        expect(res.statusCode).toEqual(404);
    })

    test('DELETE: delete a cart', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/api/v1/cart/delete/3fa85f64-5717-4562-b3fc-2c963f66afa6/6fa85f64-5717-4562-b3fc-3c963f66afa6'
        })

        expect(res.statusCode).toEqual(204);
    })
})