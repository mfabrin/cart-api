import { Type, Static } from '@sinclair/typebox';
import { Status } from '../../enums';

export const cartCreationRequestSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" }),
    created_at: Type.String({ format: "date-time" }),
    updated_at: Type.String({ format: "date-time" }),
    status: Type.Enum(Status)
})

export type CartCreationRequest = Static<typeof cartCreationRequestSchema>;