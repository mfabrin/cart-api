import { Type, Static } from '@sinclair/typebox';

export const cartCheckoutRequestSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" }),
})

export type CartCheckoutRequest = Static<typeof cartCheckoutRequestSchema>;