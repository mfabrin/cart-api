import { Status } from "../enums";

interface INewCartResponse {
    ecommerce_id: string
    customer_id: string
    created_at: Date
    updated_at: Date
    status: Status
}

export default INewCartResponse;