export class Orderrequestdto {
    constructor(
     public userId: number,
     public cartItems: { productId: number; quantity: number }[],
    public addressId: number,
    public paymentMethod: string,
  )
    {}

}
