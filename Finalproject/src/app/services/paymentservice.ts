import { Injectable } from '@angular/core';
import { Orderservice } from './orderservice';
import { Paymentverificationdto } from '../common/paymentverificationdto';
import { Cartstateservice } from './cartstateservice';
//import { environment } from '../environments/environment'; // Adjust path as needed

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class Paymentservice {
  private isProcessing = false;

  constructor(private orderService: Orderservice, private cartstateserv:Cartstateservice) {}
//test card 2305 3242 5784 8228
  initiateRazorpay(razorpayOrderId: string, amount: number, backendOrderId: number, onSuccess?: () => void): void {
    if (this.isProcessing) {
      console.warn('⏳ Payment already in progress.');
      return;
    }

    this.isProcessing = true;

    console.log("🧾 Razorpay Order ID:", razorpayOrderId);
    console.log("💰 Amount (₹):", amount);

    const options = {
      key: 'rzp_test_BPlNLy2HqsckP6', // Use environment variable
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Your Store',
      description: 'Order Payment',
      order_id: razorpayOrderId,
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999'
      },
      handler: (response: any) => {
        console.log('✅ Razorpay response:', JSON.stringify(response));

        if (!response.razorpay_signature || !response.razorpay_order_id) {
          alert('⚠️ Payment incomplete or signature missing.');
          this.isProcessing = false;
          return;
        }

        const payload = new Paymentverificationdto(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature,
          backendOrderId
        );

        // this.orderService.verifyPayment(payload).subscribe({
        //   next: (res) => {
        //     this.isProcessing = false;
        //     if (res.success) {
        //       alert('✅ Payment verified and order confirmed.');
        //       this.cartstateserv.clearCart(); // Clear cart after successful payment
        //       this.cartstateserv.triggerRefresh(); // Trigger cart refresh
        //     } else {
        //       alert('⚠️ Verification failed: ' + res.message);
        //     }
        //   },
        this.orderService.verifyPayment(payload).subscribe({
    next: (res) => {
      console.log('✅ Payment verified:', res);
      this.isProcessing = false;
      if (res.payment.status==='SUCCESS') {
        console.log('✅ Payment verified:', res);
        alert('✅ Payment verified and order confirmed.');
        this.cartstateserv.clearCart();
        this.cartstateserv.triggerRefresh();
        if (onSuccess) onSuccess(); // Navigate to confirmation
      } else {
        alert('⚠️ Verification failed: ' + res.message);
      }
    },

          error: (err) => {
            this.isProcessing = false;
            console.error('❌ Backend error:', err);
            alert(err.error?.message || 'Server error during payment verification.');
          }
        });
      },
      modal: {
        ondismiss: () => {
          this.isProcessing = false;
          alert('❌ Payment cancelled by user.');
        }
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);

    // Optional: Handle Razorpay failure events
    rzp.on('payment.failed', (response: any) => {
      this.isProcessing = false;
      console.error('❌ Razorpay payment failed:', response.error);
      alert('Payment failed: ' + response.error.description);
    });

    rzp.open();
  }
}
