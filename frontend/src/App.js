import React, { useState, useEffect } from 'react';
import './App.css';
import Index from './component/index.jsx';
import Cart from './component/Views/Cart/cart.jsx';
import Banner from './component/banner.jsx';
import Product from './component/product.jsx';
import Footer from './component/footer.jsx';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, item];
    });
    setShowCart(true);
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          item.id !== itemToRemove.id ||
          item.size !== itemToRemove.size ||
          item.color !== itemToRemove.color
      )
    );
  };

  const totalPrice = cartItems
    .reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <Index />
      <Cart 
        showCart={showCart} 
        setShowCart={setShowCart} 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        totalPrice={totalPrice} 
      />
      <Banner />
      <Product addToCart={addToCart} />
      <Footer />
    </div>
  );
}

export default App;
