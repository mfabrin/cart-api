import mongoose from "mongoose";
import { Status } from "../enums";
import IProduct from "./IProduct";

interface ICart extends mongoose.Document {
    ecommerce_id: string,
    customer_id: string,
    status: Status,
    created_at: Date
    updated_at: Date
    date_checkout?: Date
    item_list: IProduct[]
}

export default ICart;