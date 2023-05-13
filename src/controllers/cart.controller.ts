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
import Cart from "../aggregateRoots/Cart";
import { ProductSchema } from "../valueObjects";
import { getTotalPrice, getItemCalculatedPrice } from "../services/cart.service";


export const cartCreationHandler = async (request: FastifyRequest<{ Body: INewCartRequest }>, reply: FastifyReply) => {
    const { body } = request;

    if (!body)
        return reply.code(400).send({ message: 'Payload not provided' } as IErrorResponse);

    if (!body.customer_id || body.customer_id === '')
        return reply.code(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!body.ecommerce_id || body.ecommerce_id === '')
        return reply.code(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);

    try {
        const cart = new Cart({
            ecommerce_id: body.ecommerce_id,
            customer_id: body.customer_id,
            status: body.status,
            created_at: body.created_at,
            updated_at: body.updated_at
        });

        const result = await cart.save();

        return reply.code(201).send(result);
    } catch (err) {
        return reply.code(500).send({ message: err } as IErrorResponse);
    }
}

export const cartItemsUpdateHandler = async (request: FastifyRequest<{ Body: ICartItemUpdateRequest }>, reply: FastifyReply) => {
    const { customer_id, ecommerce_id, item_list } = request.body;

    if (!customer_id || customer_id === '')
        return reply.code(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!ecommerce_id || ecommerce_id === '')
        return reply.code(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);

    if (!item_list)
        return reply.code(400).send({ message: 'Items not provided' } as IErrorResponse);



    try {
        const cart = await Cart.findOne({ ecommerce_id: ecommerce_id, customer_id: customer_id });

        if (!cart)
            return reply.code(404).send({ message: 'Cart not found' } as IErrorResponse);


        cart.status = Status.Building;

        cart.items = item_list
            .map(item => new ProductSchema({
                product_sku: item.product_sku,
                product_name: item.product_name,
                delivery_at: item.delivery_date,
                file_type: item.file_type,
                quantity: item.quantity
            }));

        await cart.save();


        const totalPrice = getTotalPrice({
            checkout_at: cart.checkout_at,
            items: cart.items.map(item => ({
                deliveryDate: item.delivery_at,
                fileType: item.file_type,
                quantity: item.quantity,
                sku: item.product_sku
            }))
        })

        const response: ICartItemUpdateResponse = {
            ecommerce_id: cart.ecommerce_id,
            customer_id: cart.customer_id,
            updated_at: cart.updated_at,
            status: cart.status,
            total_price: totalPrice,
            item_list: item_list.map(item => ({
                product_sku: item.product_sku,
                product_name: item.product_name,
                file_type: item.file_type,
                delivery_date: item.delivery_date,
                quantity: item.quantity,
                calculated_price: getItemCalculatedPrice(item.quantity, item.delivery_date, item.file_type)
            })),
        };

        return reply.code(200).send(response);
    } catch (err) {
        return reply.code(500).send({ message: err } as IErrorResponse);
    }
}

export const getCartHandler = async (request: FastifyRequest<{ Params: ICartRequest }>, reply: FastifyReply) => {
    const { ecommerce_id, customer_id } = request.params;

    if (!customer_id || customer_id === '')
        return reply.code(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!ecommerce_id || ecommerce_id === '')
        return reply.code(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);


    try {
        const cart = await Cart.findOne({ ecommerce_id: ecommerce_id, customer_id: customer_id });

        if (!cart)
            return reply.code(404).send({ message: 'Cart not found' } as IErrorResponse);


        const totalPrice = getTotalPrice({
            checkout_at: cart.checkout_at,
            items: cart.items.map(item => ({
                deliveryDate: item.delivery_at,
                fileType: item.file_type,
                quantity: item.quantity,
                sku: item.product_sku
            }))
        })

        const response: ICartResponse = {
            ecommerce_id: cart.ecommerce_id,
            customer_id: cart.customer_id,
            created_at: cart.created_at,
            status: cart.status,
            total_price: totalPrice,
            item_list: cart.items.map(item => ({
                product_sku: item.product_sku,
                product_name: item.product_name,
                file_type: item.file_type,
                delivery_date: item.delivery_date,
                quantity: item.quantity,
                calculated_price: getItemCalculatedPrice(item.quantity, item.delivery_date, item.file_type)
            }))
        }

        return reply.code(200).send(response);
    } catch (err) {
        return reply.code(500).send(err);
    }
}

export const cartCheckoutHandler = async (request: FastifyRequest<{ Body: ICartCheckoutRequest }>, reply: FastifyReply) => {
    const { ecommerce_id, customer_id } = request.body;

    if (!customer_id || customer_id === '')
        return reply.code(400).send({ message: 'Customer id not provided' } as IErrorResponse);

    if (!ecommerce_id || ecommerce_id === '')
        return reply.code(400).send({ message: 'Ecommerce id not provided' } as IErrorResponse);


    try {
        const cart = await Cart.findOne({ ecommerce_id: ecommerce_id, customer_id: customer_id });

        if (!cart)
            return reply.code(404).send({ message: 'Cart not found' } as IErrorResponse);

        cart.status = Status.Checkout;
        cart.checkout_at = new Date();

        await cart.save();

        return reply.code(200).send("Success");
    } catch (err) {
        return reply.code(500).send(err);
    }
}