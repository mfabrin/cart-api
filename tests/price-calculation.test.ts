import { Cart } from '../src/aggregateRoots';
import { getItemCalculatedPrice, getTotalPrice } from '../src/services/cart.services';
import { FileType } from '../src/utils/enums';
import Product from '../src/valueObjects/Product';


test('Calculated price PDF', () => {
    const res = getItemCalculatedPrice(new Product({
        product_sku: "123",
        product_name: "My product",
        file_type: FileType.PDF,
        delivery_date: new Date(2023, 5, 20),
        quantity: 150
    }), undefined);

    expect(res).toBe(163.875);
});

test('Calculated price PSD', () => {
    const res = getItemCalculatedPrice(new Product({
        product_sku: "123",
        product_name: "My product",
        file_type: FileType.PSD,
        delivery_date: new Date(2023, 5, 20),
        quantity: 150
    }), undefined);

    expect(res).toBe(163.875);
});

test('Get cart total price', () => {
    const cart = new Cart({
        ecommerce_id: "",
        customer_id: "",
        created_at: new Date(),
        updated_at: new Date(),
        checkout_date: new Date(),
        status: "building",
        item_list: [
            new Product({
                product_sku: "123",
                product_name: "My product",
                file_type: FileType.PDF,
                delivery_date: new Date(2023, 5, 20),
                quantity: 101
            }), 
            new Product({
                product_sku: "123",
                product_name: "My product",
                file_type: FileType.PDF,
                delivery_date: new Date(2023, 5, 15),
                quantity: 101
            })
        ]
    });

    const res = getTotalPrice(cart);

    expect(res).toBe(163.875);
});

test('Get cart total price', () => {
    const cart = new Cart({
        ecommerce_id: "",
        customer_id: "",
        created_at: new Date(),
        updated_at: new Date(),
        checkout_date: new Date(),
        status: "building",
        item_list: [
            new Product({
                product_sku: "123",
                product_name: "My product",
                file_type: FileType.PDF,
                delivery_date: new Date(2023, 5, 15),
                quantity: 202
            })
        ]
    });

    const res = getTotalPrice(cart);

    expect(res).toBe(163.875);
});