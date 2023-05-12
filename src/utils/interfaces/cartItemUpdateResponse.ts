import { Status } from "utils/enums"

interface ICartItem {
    product_sku: string
    product_name: string
    file_type: string
    quantity: number
    delivery_date: Date
    unit_price: number
    total_price: number
}

interface ICartItemUpdateResponse {
    ecommerce_id: string
    customer_id: string
    created_at: Date
    updated_at: Date
    status: Status
    total_price: number
    item_list: ICartItem[]
}

export default ICartItemUpdateResponse;