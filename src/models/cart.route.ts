import { FastifyInstance } from "fastify";
import { getCartHandler, putCartItemsHandler, putCartCheckoutHandler } from "./cart.controller";

const cartRoutes = async (server: FastifyInstance) => {
    server.get("/cart/:ecommerceId/:customerId", getCartHandler)
    server.put("/cart/:ecommerceId/:customerId/items", putCartItemsHandler)
    server.put("/cart/:ecommerceId/:customerId/checkout", putCartCheckoutHandler)
}

export default cartRoutes;