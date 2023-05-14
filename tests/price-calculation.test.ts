import { Cart } from '../src/aggregateRoots';
import { getItemCalculatedPrice, getTotalPrice } from '../src/services/cart.services';
import { FileType } from '../src/utils/enums';
import Product from '../src/valueObjects/Product';


const today = new Date();
const twoDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
const threeDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)


describe('Item Price Calculation', () => {

    test('File PDF, no checkout date', () => {
        const res = getItemCalculatedPrice(new Product({
            product_sku: "123",
            product_name: "My product",
            file_type: FileType.PDF,
            delivery_date: twoDaysLater,
            quantity: 150
        }), undefined);

        expect(res).toBe(163.875);
    });

    test('File PSD, with checkout date', () => {
        const res = getItemCalculatedPrice(new Product({
            product_sku: "123",
            product_name: "My product",
            file_type: FileType.PSD,
            delivery_date: twoDaysLater,
            quantity: 251
        }), today);

        expect(res).toBe(365.958);
    });
})


describe('Cart total price calculation', () => {
    test('Total price for same products quantity, without checkout date', () => {
        const cart = new Cart({
            ecommerce_id: "",
            customer_id: "",
            created_at: today,
            updated_at: today,
            status: "building",
            item_list: [
                new Product({
                    product_sku: "123",
                    product_name: "My product",
                    file_type: FileType.PDF,
                    delivery_date: twoDaysLater,
                    quantity: 101
                }),
                new Product({
                    product_sku: "123",
                    product_name: "My product",
                    file_type: FileType.PSD,
                    delivery_date: twoDaysLater,
                    quantity: 101
                })
            ]
        });

        const res = getTotalPrice(cart);

        expect(res).toBe(239.875);
    });

    test('Cart total price with different products quantity, different delivery_dates, with checkout date', () => {
        const cart = new Cart({
            ecommerce_id: "",
            customer_id: "",
            created_at: today,
            updated_at: today,
            date_checkout: today,
            status: "checkout",
            item_list: [
                new Product({
                    product_sku: "123",
                    product_name: "My product",
                    file_type: FileType.PDF,
                    delivery_date: twoDaysLater,
                    quantity: 500
                }),
                new Product({
                    product_sku: "123",
                    product_name: "My product",
                    file_type: FileType.PSD,
                    delivery_date: threeDaysLater,
                    quantity: 1500
                })
            ]
        });

        const res = getTotalPrice(cart);

        expect(res).toBe(2403);
    });
})