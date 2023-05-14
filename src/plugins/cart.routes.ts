import { FastifyInstance } from "fastify";
import { cartCreationHandler, cartUpdateHandler, getCartHandler, cartCheckoutHandler } from "../controllers/cart.controller";
import { cartCreationRequestSchema, cartRequestSchema, cartResponseSchema, cartUpdateRequestSchema, cartCheckoutRequestSchema } from "../utils/schemas/cart";
import { errorResponseSchema } from "../utils/schemas/errorResponse";


const cartRoutes = async (server: FastifyInstance) => {
    server.post(
        "/cart", {
        schema: {
            tags: ["Cart"],
            body: cartCreationRequestSchema,
            response: {
                201: cartResponseSchema,
                404: errorResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, cartCreationHandler)

    server.put("/cart", {
        schema: {
            tags: ["Cart"],
            body: cartUpdateRequestSchema,
            response: {
                200: cartResponseSchema,
                404: errorResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, cartUpdateHandler)

    server.get("/cart/:ecommerce_id/:customer_id", {
        schema: {
            tags: ["Cart"],
            params: cartRequestSchema,
            response: {
                200: cartResponseSchema,
                404: errorResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, getCartHandler)

    server.put("/cart/checkout", {
        schema: {
            tags: ["Cart"],
            body: cartCheckoutRequestSchema,
            response: {
                200: cartResponseSchema,
                404: errorResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, cartCheckoutHandler)
}

export default cartRoutes;