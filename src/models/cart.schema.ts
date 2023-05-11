interface Item {
    product_sku: string
    product_name: string
    file_type: string
    quantity: number
    delivery_date: Date
}


export interface ICartSaveRequest {
    items: Item[]
}

interface Item {
    product_sku: string
    product_name: string
    file_type: string
    quantity: number
    delivery_date: Date
}