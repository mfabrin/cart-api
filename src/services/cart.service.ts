
import { ICart, IProduct } from "../utils/interfaces"

export const getTotalPrice = (cart: ICart) => {
    const response = cart.item_list
        .reduce((result, item) => result + getItemCalculatedPrice(item, cart.date_checkout), 0);

    return response;
}

export const getItemCalculatedPrice = (item: IProduct, checkoutDate?: Date) => {

    // Let's assume all our products on our catalog have a same standard base price of 1,00€ per item
    let basePrice = 1;

    let response = 0;
    let quantity = item.quantity;

    // a 20% discount is applied for quantities above 1000
    if (quantity > 1000) {
        basePrice = basePrice - (basePrice * 20 / 100);

        const calcQuantity = quantity - 1000;

        response = response + (basePrice * calcQuantity);
        quantity = quantity - calcQuantity;
    }

    // a 15% discount is applied for quantities above 500
    if (quantity > 500) {
        basePrice = basePrice - (basePrice * 15 / 100);

        const calcQuantity = quantity - 500;

        response = response + (basePrice * calcQuantity);
        quantity = quantity - calcQuantity;
    }

    // a 10% discount is applied for quantities above 250
    if (quantity > 250) {
        basePrice = basePrice - (basePrice * 10 / 100);

        const calcQuantity = quantity - 250;

        response = response + (basePrice * calcQuantity);
        quantity = quantity - calcQuantity;
    }

    // a 5% discount is applied for quantities above 100
    if (quantity > 100) {
        basePrice = basePrice - (basePrice * 5 / 100);

        const calcQuantity = quantity - 100;

        response = response + (basePrice * calcQuantity);
        quantity = quantity - calcQuantity;
    }

    // no discount is applied for quantities until 100
    response = response + (basePrice * quantity);


    if (checkoutDate) {
        const hours = Math.abs(item.delivery_date.getTime() - checkoutDate.getTime()) / 60 * 60 * 1000;

        // within 1 week price have no increment
        let increment = 0;

        // within 24h price increments 30 %
        if (hours <= 24)
            increment = 30;

        // within 48h price increments 20 %
        if (hours <= 48)
            increment = 20;

        // within 72h price increments 10 %
        if (hours <= 72)
            increment = 10;

        response = response + (response * increment / 100);
    }


    switch (item.file_type) {
        // For PDF type formats the price is 15% more than the standard one.
        case "PDF":
            response = response + (response * 15 / 100);
            break;

        // For PSD type formats (Adobe Photoshop) the price is 35% more than the standard one.
        case "PSD":
            response = response + (response * 35 / 100);
            break;

        // For AI type formats (Adobe Illustrator) the price is 25% more than the standard one.
        case "AI":
            response = response + (response * 25 / 100);
            break;

        default:
            break;
    }

    return response;
}