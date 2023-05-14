import { Type, Static } from '@sinclair/typebox';


const itemSchema = Type.Object({
    product_sku: Type.String(),
    product_name: Type.String(),
    file_type: Type.String(),
    quantity: Type.Number(),
    delivery_date: Type.Date({ format: "date-time" }),
    calculated_price: Type.Number({ default: 0 })
})

export const cartResponseSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" }),
    created_at: Type.Date({ format: "date-time" }),
    updated_at: Type.Date({ format: "date-time" }),
    status: Type.String(),
    total_price: Type.Number({ default: 0 }),
    item_list: Type.Array(itemSchema)
})

export type CartResponse = Static<typeof cartResponseSchema>;