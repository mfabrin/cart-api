
import { FileType } from "../utils/enums";
import { ICart, IProduct } from "../utils/interfaces"


// Method that calculate total price of cart
export const getTotalPrice = (cart: ICart) => {
    const response = cart.item_list
        .reduce((result, item) => result + getItemCalculatedPrice(item, cart.date_checkout), 0);

    return response;
}

// Method that calculate total price per item based on policies
export const getItemCalculatedPrice = (item: IProduct, checkoutDate?: Date) => {

    let basePrice = getBasePricePerQuantity(item.quantity);

    if (checkoutDate) {
        const increment = getIncrementPerHours(item.delivery_date, checkoutDate);
        basePrice = basePrice + (basePrice * increment / 100);
    }

    const fileTypeIncrement = {
        [FileType.PDF]: 15,  // For PDF type formats the price is 15% more than the standard one.
        [FileType.AI]: 25,   // For AI type formats (Adobe Illustrator) the price is 25% more than the standard one.
        [FileType.PSD]: 35   // For PSD type formats (Adobe Photoshop) the price is 35% more than the standard one.
    };

    basePrice = basePrice + (basePrice * fileTypeIncrement[item.file_type] / 100);

    return basePrice * item.quantity;
}

const getBasePricePerQuantity = (quantity: number) => {
    // Let's assume all our products on our catalog have a same standard base price of 1,00€ per item
    // no discount is applied for quantities until 100
    let basePrice = 1;

    // a 5% discount is applied for quantities above 100
    if (quantity > 100 && quantity <= 250)
        basePrice = basePrice - (basePrice * 5 / 100);

    // a 10% discount is applied for quantities above 250
    if (quantity > 250 && quantity <= 500)
        basePrice = basePrice - (basePrice * 10 / 100);

    // a 15% discount is applied for quantities above 500
    if (quantity > 500 && quantity <= 1000)
        basePrice = basePrice - (basePrice * 15 / 100);

    // a 20% discount is applied for quantities above 1000
    if (quantity > 1000)
        basePrice = basePrice - (basePrice * 20 / 100);

    return basePrice;
}

const getIncrementPerHours = (deliveryDate: Date, checkoutDate: Date) => {

    var diff = (deliveryDate.getTime() - checkoutDate.getTime()) / 1000;

    diff /= (60 * 60);

    const hours = Math.abs(Math.round(diff));
    
    if (hours <= 24) {
        // within 24h price increments 30 %
        return 30;
    }

    if (hours <= 48) {
        // within 48h price increments 20 %
        return 20;
    }

    if (hours <= 72) {
        // within 72h price increments 10 %
        return 10;
    }

    // within 1 week price have no increment
    return 0;
}