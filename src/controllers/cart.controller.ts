import { FastifyReply, FastifyRequest } from "fastify";
import { IErrorResponse } from "../utils/interfaces";
import { Status } from "../utils/enums";
import Cart from "../aggregateRoots/Cart";
import { ProductSchema } from "../valueObjects";
import { getTotalPrice, getItemCalculatedPrice } from "../services/cart.service";
import { NewCartRequest } from "../utils/schemas/newCartRequest";
import { CartUpdateRequest } from "../utils/schemas/cartUpdateRequest";
import { CartCheckoutRequest } from "../utils/schemas/cartCheckoutRequest";
import { CartRequest } from "../utils/schemas/cartRequest";
import { CartResponse } from "../utils/schemas/cartResponse";


export const cartCreationHandler = async (request: FastifyRequest<{ Body: NewCartRequest }>, reply: FastifyReply) => {
    const { body } = request;

    try {
        const foundCart = await Cart.findOne({ ecommerce_id: body.ecommerce_id, customer_id: body.customer_id });

        if (foundCart)
            return reply.code(400).send("Cart already exist");


        const cart = new Cart({
            ecommerce_id: body.ecommerce_id,
            customer_id: body.customer_id,
            status: body.status,
            created_at: body.created_at,
            updated_at: body.updated_at
        });

        const result = await cart.save();

        const response: CartResponse = {
            ecommerce_id: result.ecommerce_id,
            customer_id: result.customer_id,
            created_at: result.created_at,
            status: result.status,
            total_price: getTotalPrice(result),
            item_list: result.item_list.map(item => ({
                product_sku: item.product_sku,
                product_name: item.product_name,
                file_type: item.file_type,
                delivery_date: item.delivery_date,
                quantity: item.quantity,
                calculated_price: getItemCalculatedPrice(item, result.date_checkout)
            })),
        };

        return reply.code(201).send(response);
    } catch (err) {
        return reply.code(500).send({ message: err } as IErrorResponse);
    }
}

export const cartUpdateHandler = async (request: FastifyRequest<{ Body: CartUpdateRequest }>, reply: FastifyReply) => {
    const { customer_id, ecommerce_id, item_list } = request.body;

    try {
        const cart = await Cart.findOne({ ecommerce_id: ecommerce_id, customer_id: customer_id });

        if (!cart)
            return reply.code(404).send({ message: 'Cart not found' } as IErrorResponse);


        cart.status = Status.Building;
        cart.date_checkout = undefined;
        cart.updated_at = new Date();

        cart.item_list = item_list
            .map(item => new ProductSchema({
                product_sku: item.product_sku,
                product_name: item.product_name,
                delivery_date: item.delivery_date,
                file_type: item.file_type,
                quantity: item.quantity
            }));

        await cart.save();


        const response: CartResponse = {
            ecommerce_id: cart.ecommerce_id,
            customer_id: cart.customer_id,
            created_at: cart.created_at,
            status: cart.status,
            total_price: getTotalPrice(cart),
            item_list: cart.item_list.map(item => ({
                product_sku: item.product_sku,
                product_name: item.product_name,
                file_type: item.file_type,
                delivery_date: item.delivery_date,
                quantity: item.quantity,
                calculated_price: getItemCalculatedPrice(item, cart.date_checkout)
            })),
        };

        return reply.code(200).send(response);
    } catch (err) {
        return reply.code(500).send({ message: err } as IErrorResponse);
    }
}

export const getCartHandler = async (request: FastifyRequest<{ Params: CartRequest }>, reply: FastifyReply) => {
    const { ecommerce_id, customer_id } = request.params;

    try {
        const cart = await Cart.findOne({ ecommerce_id: ecommerce_id, customer_id: customer_id });

        if (!cart)
            return reply.code(404).send({ message: 'Cart not found' } as IErrorResponse);


        const response: CartResponse = {
            ecommerce_id: cart.ecommerce_id,
            customer_id: cart.customer_id,
            created_at: cart.created_at,
            status: cart.status,
            total_price: getTotalPrice(cart),
            item_list: cart.item_list.map(item => ({
                product_sku: item.product_sku,
                product_name: item.product_name,
                file_type: item.file_type,
                delivery_date: item.delivery_date,
                quantity: item.quantity,
                calculated_price: getItemCalculatedPrice(item, cart.date_checkout)
            }))
        }

        return reply.code(200).send(response);
    } catch (err) {
        return reply.code(500).send(err);
    }
}

export const cartCheckoutHandler = async (request: FastifyRequest<{ Body: CartCheckoutRequest }>, reply: FastifyReply) => {
    const { ecommerce_id, customer_id } = request.body;

    try {
        const cart = await Cart.findOne({ ecommerce_id: ecommerce_id, customer_id: customer_id });

        if (!cart)
            return reply.code(404).send({ message: 'Cart not found' } as IErrorResponse);

        cart.status = Status.Checkout;
        cart.date_checkout = new Date();

        await cart.save();

        const response: CartResponse = {
            ecommerce_id: cart.ecommerce_id,
            customer_id: cart.customer_id,
            created_at: cart.created_at,
            status: cart.status,
            total_price: getTotalPrice(cart),
            item_list: cart.item_list.map(item => ({
                product_sku: item.product_sku,
                product_name: item.product_name,
                file_type: item.file_type,
                delivery_date: item.delivery_date,
                quantity: item.quantity,
                calculated_price: getItemCalculatedPrice(item, cart.date_checkout)
            }))
        }

        return reply.code(200).send(response);
    } catch (err) {
        return reply.code(500).send(err);
    }
}