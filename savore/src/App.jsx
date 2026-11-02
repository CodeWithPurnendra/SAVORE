import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import Hero from './Components/Hero/Hero';
import FeaturedDishes from './Components/FeaturedDishes/FeaturedDishes';
import Story from './Components/Story/Story';
import Contact from './Components/Contact/Contact';
import BookTable from './Components/BookTable/BookTable';
import AuthModal from './Components/AuthModal/AuthModal';
import  CartDrawer from './Components/CartDrawer/CartDrawer';
import CheckoutModel from './Components/CheckoutModal/CheckoutModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user and token session on page startup
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user session:', err);
      }
    }
  }, []);

  // Booking Modal Handlers
  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  // Cart Modal Handlers
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  // Add Item to Cart (Handles string or numeric price conversion)
  const handleAddToCart = (dish) => {
    const numericPrice = typeof dish.price === 'string'
      ? parseFloat(dish.price.replace(/[^0-9.]/g, ''))
      : dish.price;

    const formattedDish = { ...dish, price: numericPrice };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === formattedDish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === formattedDish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...formattedDish, quantity: 1 }];
    });
  };

  // Update Item Quantity
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove Item from Cart
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate cart subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Total Item Count for Navbar Badge
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Navigation Bar */}
      <NavBar
        onOpenBooking={handleOpenBooking}
        onOpenCart={handleOpenCart}
        onOpenAuth={() => setIsAuthOpen(true)}
        cartCount={totalCartCount}
        user={currentUser}
      />

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setIsAuthOpen(false);
          }}
        />
      )}

      {/* Hero Section */}
      <Hero onOpenBooking={handleOpenBooking} />

      {/* Menu / Featured Dishes Section */}
      <FeaturedDishes onAddToCart={handleAddToCart} />

      {/* Story Section */}
      <Story />

      {/* Contact Section */}
      <Contact />

      {/* Reservation Modal */}
      <BookTable
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          handleCloseCart();
          setIsCheckoutOpen(true);
        }}
        onOpenAuth={() => {
          handleCloseCart();
          setIsAuthOpen(true);
        }}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModel
          cartItems={cartItems}
          subtotal={calculateSubtotal()}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={() => {
            setCartItems([]); // Clear cart upon successful order
            setIsCheckoutOpen(false);
          }}
        />
      )}
    </div>
  );
}