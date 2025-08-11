export class Cart {


    constructor(
        public itemId: number,
        public productId: number,
        public productName: string,
        public productPrice: number,
        public quantity: number,
        public imageUrl: string,
        public totalprice: number) {
    }
}



