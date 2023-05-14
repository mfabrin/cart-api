import { Type, Static } from '@sinclair/typebox';

export const cartCreationResponseSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" })
})

export type CartCreationResponse = Static<typeof cartCreationResponseSchema>;