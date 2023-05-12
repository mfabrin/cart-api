import { FastifyReply, FastifyRequest } from "fastify";
import {
    ICartCheckoutRequest,
    ICartItemUpdateRequest,
    ICartItemUpdateResponse,
    ICartRequest,
    ICartResponse,
    IErrorResponse,
    INewCartRequest,
    INewCartResponse
} from "../utils/interfaces";
import { Status } from "../utils/enums";


export const cartCreationHandler = async (request: FastifyRequest<{ Body: INewCartRequest }>, reply: FastifyReply) => {

    if (!request.body.customer_id || request.body.customer_id === '')
        return reply.status(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!request.body.ecommerce_id || request.body.ecommerce_id === '')
        return reply.status(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);

    try {
        const response: INewCartResponse = {
            created_at: new Date(),
            customer_id: request.body.customer_id,
            ecommerce_id: request.body.ecommerce_id,
            status: Status.Created,
            updated_at: new Date()
        };

        return reply.status(201).send(response);
    } catch (err) {
        return reply.status(500).send({ message: err } as IErrorResponse);
    }
}

export const cartItemsUpdateHandler = async (request: FastifyRequest<{ Body: ICartItemUpdateRequest }>, reply: FastifyReply) => {
    const { customer_id, ecommerce_id, item_list } = request.body;

    if (!customer_id || customer_id === '')
        return reply.status(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!ecommerce_id || ecommerce_id === '')
        return reply.status(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);

    if (!item_list)
        return reply.status(400).send({ message: 'Items not provided' } as IErrorResponse);



    try {
        const response: ICartItemUpdateResponse = {
            total_price: 100,
            item_list: item_list,
            created_at: new Date(),
            customer_id: request.body.customer_id,
            ecommerce_id: request.body.ecommerce_id,
            status: Status.Building,
            updated_at: new Date()
        };

        return reply.status(201).send(response);
    } catch (err) {
        return reply.status(500).send({ message: err } as IErrorResponse);
    }
}

export const getCartHandler = async (request: FastifyRequest<{ Params: ICartRequest }>, reply: FastifyReply) => {
    const { ecommerce_id, customer_id } = request.params;

    if (!customer_id || customer_id === '')
        return reply.status(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!ecommerce_id || ecommerce_id === '')
        return reply.status(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);


    try {
        const response: ICartResponse = {
            ecommerce_id: ecommerce_id,
            customer_id: customer_id,
            updated_at: new Date(),
            created_at: new Date(),
            status: Status.Building,
            total_price: 110,
            item_list: [{
                product_sku: "test",
                product_name: "My product",
                file_type: "PDF",
                quantity: 110,
                delivery_date: new Date(),
                unit_price: 1,
                total_price: 110
            }]
        }

        return reply.code(200).send(response);
    } catch (err) {
        return reply.code(500).send(err);
    }
}

export const cartCheckoutHandler = async (request: FastifyRequest<{ Body: ICartCheckoutRequest }>, reply: FastifyReply) => {
    const { ecommerce_id, customer_id } = request.body;

    if (!customer_id || customer_id === '')
        return reply.status(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!ecommerce_id || ecommerce_id === '')
        return reply.status(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);


    try {
        return reply.status(204).send("Success");
    } catch (err) {
        return reply.code(500).send(err);
    }
}