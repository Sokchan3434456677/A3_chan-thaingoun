import React, { useState, useEffect } from 'react';
import Quickview from './Views/quickview.jsx';

export default function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = "1|IQyfO8oP6SNzyulaHmv5cwJb82GCUyOqxsfO1Sw626fca726";
        const response = await fetch('http://127.0.0.1:8000/api/lists', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.data); // Extract the 'data' array from the response
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
  };

  const openQuickView = (product) => {
    console.log('Quick View clicked for product:', product);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeQuickView = () => {
    console.log('Closing Quick View');
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return <div className="text-center p-5">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-danger">Error: {error}</div>;
  }

  return (
    <section className="bg0 p-t-23 p-b-140">
      <div className="container">
        <div className="row isotope-grid">
          {products.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" key={product.id}>
              <div className="block2">
                <div className="block2-pic hov-img0">
                  <img
                    src={product.images}
                    alt={product.name}
                    onError={handleImageError}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                  <button
                    onClick={() => openQuickView(product)}
                    className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  >
                    Quick View
                  </button>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                  <div className="block2-txt-child1 flex-col-l">
                    <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                      {product.name}
                    </a>
                    <span className="stext-105 cl3">${product.price}</span>
                    {product.size && (
                      <p className="stext-105 cl3">
                        <strong>Size:</strong> {product.size}
                      </p>
                    )}
                    {product.color && (
                      <p className="stext-105 cl3">
                        <strong>Color:</strong> {product.color}
                      </p>
                    )}
                    {product.quantity && (
                      <p className="stext-105 cl3">
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                    )}
                    {product.description && product.description.length > 3 && (
                      <p className="stext-105 cl3">
                        <strong>Description:</strong> {product.description}
                      </p>
                    )}
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                      <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                      <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showModal && selectedProduct && (
          <Quickview 
            product={selectedProduct} 
            onClose={closeQuickView} 
            addToCart={addToCart}
          />
        )}
        <div className="flex-c-m flex-w w-full p-t-45">
          {/*   */}
        </div>
      </div>
    </section>
  );
}