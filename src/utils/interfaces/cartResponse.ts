interface ICartItem {
    product_sku: string
    product_name: string
    file_type: string
    quantity: number
    delivery_date: Date
    calculated_price: number
}

interface ICartResponse {
    ecommerce_id: string
    customer_id: string
    created_at: Date
    status: string
    total_price: number
    item_list: ICartItem[]
}

export default ICartResponse;