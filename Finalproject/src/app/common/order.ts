
export class Order {
  constructor(
    public id: number,
    public userId: number,
    public orderDate: Date,
    public deliveryAddress: string,
    public totalAmount: number,
    public status: string,
    public payment: {
      method: string;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
    },
    public items: {
      productId: number;
      imageUrl: string;
      productName: string;
      unitPrice: number;
      quantity: number;
    }[]
  ) {}
}
