import { FastifyInstance } from "fastify";
import { cartCreationHandler, cartUpdateHandler, getCartHandler, cartCheckoutHandler, cartDeleteHandler } from "../controllers/cart.controller";
import { cartCreationRequestSchema, cartRequestSchema, cartResponseSchema, cartUpdateRequestSchema, cartCheckoutRequestSchema, cartDeleteRequestSchema, cartCreationResponseSchema } from "../utils/schemas/cart";
import { errorResponseSchema } from "../utils/schemas/errorResponse";
import { emptyResponseSchema } from "../utils/schemas";


const cartRoutes = async (server: FastifyInstance) => {
    server.post(
        "/cart/create", {
        schema: {
            tags: ['Cart'],
            body: cartCreationRequestSchema,
            response: {
                201: cartCreationResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, cartCreationHandler)

    server.put("/cart/update", {
        schema: {
            tags: ['Cart'],
            body: cartUpdateRequestSchema,
            response: {
                200: cartResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, cartUpdateHandler)

    server.get("/cart/:ecommerce_id/:customer_id", {
        schema: {
            tags: ['Cart'],
            params: cartRequestSchema,
            response: {
                200: cartResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, getCartHandler)

    server.put("/cart/checkout", {
        schema: {
            tags: ['Cart'],
            body: cartCheckoutRequestSchema,
            response: {
                200: cartResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, cartCheckoutHandler)

    server.delete("/cart/delete/:ecommerce_id/:customer_id", {
        schema: {
            tags: ['Cart'],
            params: cartDeleteRequestSchema,
            response: {
                204: emptyResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, cartDeleteHandler)
}

export default cartRoutes;