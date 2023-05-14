import { Type, Static } from '@sinclair/typebox';

export const cartRequestSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" }),
})

export type CartRequest = Static<typeof cartRequestSchema>;