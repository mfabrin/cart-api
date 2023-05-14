import { Type, Static } from '@sinclair/typebox';


const itemSchema = Type.Object({
    product_sku: Type.String(),
    product_name: Type.String(),
    file_type: Type.String(),
    quantity: Type.Number(),
    delivery_date: Type.String({ format: "date-time" })
})

export const cartUpdateRequestSchema = Type.Object({
    ecommerce_id: Type.String({ format: "uuid" }),
    customer_id: Type.String({ format: "uuid" }),
    item_list: Type.Array(itemSchema)
})

export type CartUpdateRequest = Static<typeof cartUpdateRequestSchema>;