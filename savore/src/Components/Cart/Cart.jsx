import React, { useEffect } from 'react';
import { FiX, FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiArrowRight } from 'react-icons/fi';

export default function Cart({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) {
  // Close slide-over on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% estimated tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Slide-over Drawer */}
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-white shadow-2xl flex flex-col justify-between relative z-10">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                <FiShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold">Your Order</h2>
                <p className="text-xs text-neutral-400">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-amber-500 hover:border-amber-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-3">
                <FiShoppingBag className="w-12 h-12 stroke-[1.5] text-neutral-600" />
                <p className="text-sm font-medium text-neutral-400">Your cart is empty</p>
                <p className="text-xs max-w-xs text-neutral-500">
                  Explore our menu to add exquisite handcrafted dishes to your dining order.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex gap-4 items-center"
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-neutral-800 shrink-0"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                    <span className="text-xs text-amber-400 font-mono font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 cursor-pointer"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 cursor-pointer"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem && onRemoveItem(item.id)}
                    className="p-2 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950/50 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-neutral-200">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-800 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Total</span>
                  <span className="font-mono text-amber-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase text-xs tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20 active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}