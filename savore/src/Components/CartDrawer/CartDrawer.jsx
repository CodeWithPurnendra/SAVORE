import React from 'react';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onOpenAuth,
}) {
  if (!isOpen) return null;

  // Calculate pricing breakdown
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckoutClick = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If user isn't logged in, close cart and open auth modal
      onClose();
      if (onOpenAuth) onOpenAuth();
    } else {
      // User is logged in, open checkout modal
      onClose();
      if (onOpenCheckout) onOpenCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-serif font-bold">Your Order</h2>
              <span className="text-xs bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded-full">
                {cartItems.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-3">
                <FiShoppingBag className="w-12 h-12 stroke-1" />
                <p className="text-base font-medium">Your cart is currently empty.</p>
                <p className="text-xs text-neutral-600">Add items from the menu to start ordering.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id || item.name}
                  className="flex items-center justify-between bg-neutral-950 border border-neutral-800/80 p-4 rounded-xl"
                >
                  <div className="flex-1 pr-4">
                    <h4 className="font-semibold text-sm text-neutral-200">{item.name}</h4>
                    <p className="text-xs text-amber-500 font-medium mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-neutral-800 rounded-lg bg-neutral-900">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <FiMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-neutral-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="Remove Item"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Proceed Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950/50 space-y-4">
              <div className="space-y-2 text-sm">
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

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                Proceed to Checkout →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}