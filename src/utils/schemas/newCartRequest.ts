import { Type, Static } from '@sinclair/typebox';
import { Status } from '../enums';

export const newCartRequestSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" }),
    created_at: Type.String({ format: "date-time" }),
    updated_at: Type.String({ format: "date-time" }),
    status: Type.Enum(Status)
})

export type NewCartRequest = Static<typeof newCartRequestSchema>;