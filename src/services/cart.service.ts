
interface ICartItem {
    sku: string
    quantity: number
    deliveryDate: Date
    fileType: string
}

interface ICart {
    checkout_at?: Date
    items: ICartItem[]
}

export const getTotalPrice = (cart: ICart) => {
    const response = cart.items
        .reduce((result, item) => result + getItemCalculatedPrice(item.quantity, item.deliveryDate, item.fileType, cart.checkout_at), 0);

    return response;
}

export const getItemCalculatedPrice = (quantity: number, deliveryDate: Date, fileType: string, checkoutDate?: Date) => {

    // Let's assume all our products on our catalog have a same standard base price of 1,00€ per item
    let basePrice = 1;


    // no discount is applied for quantities until 100
    let discount = 0;

    // a 5% discount is applied for quantities above 100
    if (quantity > 100 && quantity <= 250)
        discount = 5;

    // a 10% discount is applied for quantities above 250
    if (quantity > 250 && quantity <= 500)
        discount = 10;

    // a 15% discount is applied for quantities above 500
    if (quantity > 500 && quantity <= 1000)
        discount = 15;

    // a 20% discount is applied for quantities above 1000
    if (quantity > 1000)
        discount = 20;

    basePrice = basePrice - (basePrice * discount / 100);


    if (checkoutDate) {
        const hours = Math.abs(deliveryDate.getTime() - checkoutDate.getTime()) / 60 * 60 * 1000;

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

        basePrice = basePrice + (basePrice * increment / 100);
    }


    switch (fileType) {
        // For PDF type formats the price is 15% more than the standard one.
        case "PDF":
            basePrice = basePrice + (basePrice * 15 / 100);
            break;

        // For PSD type formats (Adobe Photoshop) the price is 35% more than the standard one.
        case "PSD":
            basePrice = basePrice + (basePrice * 35 / 100);
            break;

        // For AI type formats (Adobe Illustrator) the price is 25% more than the standard one.
        case "AI":
            basePrice = basePrice + (basePrice * 25 / 100);
            break;

        default:
            break;
    }

    return basePrice * quantity;
}