import { Type, Static } from '@sinclair/typebox';

export const cartDeleteRequestSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" }),
})

export type CartDeleteRequest = Static<typeof cartDeleteRequestSchema>;