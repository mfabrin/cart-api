import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    product_sku: {
        type: String,
        require: true,
        default: ''
    },
    product_name: {
        type: String,
        require: true,
        default: ''
    },
    file_type: {
        type: String,
        require: true,
        default: ''
    },
    delivery_at: {
        type: Date,
        require: true,
        default: Date.now
    },
    quantity: {
        type: Number,
        require: true,
        default: 1
    }
}, { _id: false })

export default model("Product", ProductSchema);