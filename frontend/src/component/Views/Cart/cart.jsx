import React from 'react';

export default function Cart({ showCart, setShowCart, cartItems, removeFromCart, totalPrice }) {
  return (
    <div className={`wrap-header-cart js-panel-cart ${showCart ? 'show-header-cart' : ''}`}>
      <div 
        className="s-full js-hide-cart" 
        onClick={() => setShowCart(false)}
      />
      <div className="header-cart flex-col-l p-l-65 p-r-25">
        <div className="header-cart-title flex-w flex-sb-m p-b-8">
          <span className="mtext-103 cl2">
            Your Cart
          </span>
          <div 
            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04" 
            onClick={() => setShowCart(false)}
          >
            <i className="zmdi zmdi-close" />
          </div>
        </div>
        <div className="header-cart-content flex-w js-pscroll">
          <ul className="header-cart-wrapitem w-full">
            {cartItems.length === 0 ? (
              <li className="header-cart-item flex-w flex-t m-b-12">
                <span className="stext-102 cl3">Your cart is empty</span>
              </li>
            ) : (
              cartItems.map((item, index) => (
                <li key={index} className="header-cart-item flex-w flex-t m-b-12">
                  <div className="header-cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="header-cart-item-txt p-t-8">
                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                      {item.name} ({item.size}, {item.color})
                    </a>
                    <span className="header-cart-item-info">
                      {item.quantity} x ${Number(item.price).toFixed(2) || '0.00'}
                    </span>
                    <button 
                      className="remove-item-btn stext-101 cl0 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-t-10"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className="w-full">
            <div className="header-cart-total w-full p-tb-40">
              Total: ${totalPrice}
            </div>
            <div className="header-cart-buttons flex-w w-full">
              <a href="shoping-cart.html" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                View Cart
              </a>
              <a 
                href="https://link.payway.com.kh/aba?id=DDCDBF42E545&code=062346&acc=007265828&dynamic=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
              >
                Check Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}