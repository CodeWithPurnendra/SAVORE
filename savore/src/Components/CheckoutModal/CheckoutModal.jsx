import React, { useState } from 'react';
import { FiX, FiMapPin, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

export default function CheckoutModal({ cartItems, subtotal, onClose, onOrderSuccess }) {
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to complete your order.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: total.toFixed(2),
          deliveryAddress: address,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      setOrderComplete(true);
      if (onOrderSuccess) onOrderSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-white">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          <FiX className="w-6 h-6" />
        </button>

        {orderComplete ? (
          <div className="text-center py-8 space-y-4">
            <FiCheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h2 className="text-2xl font-serif font-bold text-white">Order Confirmed!</h2>
            <p className="text-neutral-400 text-sm">
              Your delicious meal is being prepared and will be delivered shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-amber-500 text-neutral-950 font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-serif font-bold text-amber-500 mb-1">Checkout</h2>
            <p className="text-xs text-neutral-400 mb-6">Review your order details and delivery address.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 mb-4 space-y-2 max-h-36 overflow-y-auto">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-neutral-300">{item.name} × {item.quantity}</span>
                  <span className="text-amber-500 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-neutral-800 pt-3 mb-6 space-y-1.5 text-sm">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                <span>Total</span>
                <span className="text-amber-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FiMapPin className="text-amber-500" /> Delivery Address
                </label>
                <textarea
                  required
                  rows="2"
                  placeholder="Enter complete house address & landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FiCreditCard className="text-amber-500" /> Payment Option
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Razorpay / UPI">Razorpay / Online Payment</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm tracking-wider uppercase rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Processing Order...' : `Confirm Order ($${total.toFixed(2)})`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}