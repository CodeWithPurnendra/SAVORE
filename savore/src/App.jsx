
import React, { useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
import Hero from './Components/Hero/Hero';
import FeaturedDishes from './Components/FeaturedDishes/FeaturedDishes';
import Story from './Components/Story/Story';
import Contact from './Components/Contact/Contact';
import BookTable from './Components/BookTable/BookTable';
import Cart from './Components/Cart/Cart';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Booking Modal Handlers
  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  // Cart Modal Handlers
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  // Add Item to Cart
  const handleAddToCart = (dish) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
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

  // Total Item Count for Navbar Badge
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Navigation Bar with Cart & Booking Handlers */}
      <NavBar
        onOpenBooking={handleOpenBooking}
        onOpenCart={handleOpenCart}
        cartCount={totalCartCount}
      />

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

      {/* Shopping Cart Drawer Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}