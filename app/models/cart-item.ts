export class CartItem {
    constructor(
        public _id?: string,
        public product?: string,
        public quantity?: number,
        public generalPrice?: number,
        public shoppingCart?: string
    ) { }
}