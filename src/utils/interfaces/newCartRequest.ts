import { Status } from "../enums"

interface ICartCreateRequest {
    ecommerce_id: string
    customer_id: string
    created_at: Date
    updated_at: Date
    status: Status
}

export default ICartCreateRequest;