import { FastifyInstance } from "fastify";
import {
    cartCreationHandler,
    cartItemsUpdateHandler,
    getCartHandler,
    cartCheckoutHandler
} from "./cart.controller";

const cartRoutes = async (server: FastifyInstance) => {
    server.post("/cart", cartCreationHandler)
    server.put("/cart", cartItemsUpdateHandler)
    server.get("/cart/:ecommerce_id/:customer_id", getCartHandler)
    server.put("/cart/checkout", cartCheckoutHandler)
}

export default cartRoutes;