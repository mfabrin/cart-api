interface ICartItem {
    product_sku: string
    product_name: string
    file_type: string
    quantity: number
    delivery_date: Date
    unit_price: number
    total_price: number
}

interface ICartItemUpdateRequest {
    ecommerce_id: string
    customer_id: string
    item_list: ICartItem[]
}

export default ICartItemUpdateRequest;