import { Schema, model } from 'mongoose';
import { ProductSchema } from '../valueObjects';
import { Status } from '../utils/enums';
import { ICart } from '../utils/interfaces';

export const CartSchema = new Schema({
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
        default: new Date()
    },
    updated_at: {
        type: Date,
        require: true,
        default: new Date()
    },
    date_checkout: Date,
    item_list: {
        type: Array,
        Schema: ProductSchema,
        default: []
    }
});

export default model<ICart>('Cart', CartSchema);