import { FastifyInstance } from "fastify";
import { cartCreationHandler, cartUpdateHandler, getCartHandler, cartCheckoutHandler } from "../controllers/cart.controller";
import { newCartRequestSchema } from "../utils/schemas/newCartRequest";
import { cartUpdateRequestSchema } from "../utils/schemas/cartUpdateRequest";
import { cartCheckoutRequestSchema } from "../utils/schemas/cartCheckoutRequest";
import { cartRequestSchema } from "../utils/schemas/cartRequest";
import { cartResponseSchema } from "../utils/schemas/cartResponse";


const cartRoutes = async (server: FastifyInstance) => {
    server.post(
        "/cart", {
        schema: {
            tags: ["Cart"],
            body: newCartRequestSchema,
            response: {
                201: cartResponseSchema
            }
        }
    }, cartCreationHandler)

    server.put("/cart", {
        schema: {
            tags: ["Cart"],
            body: cartUpdateRequestSchema,
            response: {
                200: cartResponseSchema
            }
        }
    }, cartUpdateHandler)

    server.get("/cart/:ecommerce_id/:customer_id", {
        schema: {
            tags: ["Cart"],
            params: cartRequestSchema,
            response: {
                200: cartResponseSchema
            }
        }
    }, getCartHandler)

    server.put("/cart/checkout", {
        schema: {
            tags: ["Cart"],
            body: cartCheckoutRequestSchema,
            response: {
                200: cartResponseSchema
            }
        }
    }, cartCheckoutHandler)
}

export default cartRoutes;