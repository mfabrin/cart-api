import { Schema, model } from 'mongoose';
import { ProductSchema } from '../valueObjects';
import { Status } from '../utils/enums';

const CartSchema = new Schema({
    ecommerce_id: {
        type: String,
        require: true,
        default: ''
    },
    customer_id: {
        type: String,
        require: true,
        default: ''
    },
    status: {
        type: String,
        enum: Status,
        require: true,
        default: ''
    },
    created_at: {
        type: Date,
        require: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        require: true,
        default: Date.now
    },
    checkout_at: Date,
    items: {
        type: Array,
        Schema: ProductSchema,
        default: []
    }
});

export default model('Cart', CartSchema);