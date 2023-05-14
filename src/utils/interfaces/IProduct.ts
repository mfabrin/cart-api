import mongoose from "mongoose";
import { FileType } from "../enums";

interface IProduct extends mongoose.Document {
    product_sku: string
    product_name: string
    file_type: FileType
    delivery_date: Date
    quantity: number
}

export default IProduct