import mongoose from "mongoose";

interface IProduct extends mongoose.Document {
    product_sku: string
    product_name: string
    file_type: string
    delivery_date: Date
    quantity: number
}

export default IProduct