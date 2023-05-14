import { Schema, model } from 'mongoose';
import { IProduct } from '../utils/interfaces';

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
    delivery_date: {
        type: Date,
        require: true,
        default: new Date()
    },
    quantity: {
        type: Number,
        require: true,
        default: 1
    }
}, { _id: false })

export default model<IProduct>("Product", ProductSchema);