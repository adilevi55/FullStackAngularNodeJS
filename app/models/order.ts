export class Order {
    constructor(
        public costomer?: string,
        public shoppingCart?: string,
        public finalPrice?: number,
        public cityToShip?: string,
        public streetToShip?: string,
        public dateToShip?: Date,
        public creditCardNumber?: number,
    ) { }
}