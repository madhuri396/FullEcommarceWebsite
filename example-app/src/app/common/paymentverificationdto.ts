export class Paymentverificationdto {
    constructor(
        public razorpay_order_id: string,
        public razorpay_payment_id: string,
        public razorpay_signature: string,
        public backendOrderId: number
    ) {}    
     

}
