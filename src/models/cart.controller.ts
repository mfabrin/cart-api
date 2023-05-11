import { FastifyReply, FastifyRequest } from "fastify";
import { ICartSaveRequest } from './cart.schema';

interface IQuery {
    ecommerceId: number
    customerId: number
}

export const getCartHandler = async (request: FastifyRequest<{ Querystring: IQuery }>, reply: FastifyReply) => {
    const { ecommerceId, customerId } = request.query;

    try {
        const response = {
            cart: {
                ecommerce_id: ecommerceId,
                customer_id: customerId,
                created_at: "2023-05-11",
                status: "building",
                total_price: 110,
                item_list: [{
                    product_sku: "test",
                    product_name: "My product",
                    file_type: "pdf",
                    quantity: 110,
                    delivery_date: "date",
                    unit_price: 1,
                    total_price: 110
                }]
            }
        }

        return reply.code(200).send(response);
    } catch (err) {
        return reply.code(500).send(err);
    }
}

export const putCartItemsHandler = async (request: FastifyRequest<{ Querystring: IQuery, Body: ICartSaveRequest }>, reply: FastifyReply) => {
    const { ecommerceId, customerId } = request.query;

    try {
        const isNew = false;

        if (isNew) {
            return reply.status(201).send("Created");
        } else {
            return reply.status(204).send("Cart updated");
        }

    } catch (err) {
        return reply.code(500).send(err);
    }
}

export const putCartCheckoutHandler = async (request: FastifyRequest<{ Querystring: IQuery }>, reply: FastifyReply) => {
    const { ecommerceId, customerId } = request.query;

    try {
        const response = reply.code(200).send({
            cart: {
                ecommerce_id: ecommerceId,
                customer_id: customerId,
                created_at: "2023-05-11",
                status: "building",
                total_price: 110,
                item_list: [{
                    product_sku: "test",
                    product_name: "My product",
                    file_type: "pdf",
                    quantity: 110,
                    delivery_date: "date",
                    unit_price: 1,
                    total_price: 110
                }]
            }
        })

        return response;
    } catch (err) {
        return reply.code(500).send(err);
    }
}