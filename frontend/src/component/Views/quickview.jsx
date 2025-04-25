import React, { useRef } from 'react';

export default function Quickview({ product, onClose, addToCart }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
  };

  const sizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
  const colors = product.color ? product.color.split(',').map(c => c.trim()) : [];
  const sizeRef = useRef(null);
  const colorRef = useRef(null);
  const quantityRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    const selectedSize = sizeRef.current.value;
    const selectedColor = colorRef.current.value;
    const quantity = parseInt(quantityRef.current.value, 10);

    if (selectedSize === 'Choose an option' || selectedColor === 'Choose an option') {
      alert('Please select a size and color.');
      return;
    }

    if (quantity < 1) {
      alert('Please select a valid quantity.');
      return;
    }

    addToCart({
      id: product.id || Date.now(),
      name: product.name,
      price: product.price,
      image: product.images,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    alert('Item added to cart!'); // Optional: Feedback to the user
  };

  return (
    <div
      className="modal-wrapper"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#fff',
          maxWidth: '90%',
          width: '800px',
          borderRadius: '10px',
          position: 'relative',
          padding: '30px',
          margin: '20px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          <img src="images/icons/icon-close.png" alt="CLOSE" style={{ width: '24px', height: '24px' }} />
        </button>
        <div className="row">
          <div className="col-md-6 col-lg-7 p-b-30">
            <div className="p-l-25 p-r-30 p-lr-0-lg">
              <div className="wrap-slick3 flex-sb flex-w">
                <div className="wrap-slick3-dots" />
                <div className="wrap-slick3-arrows flex-sb-m flex-w" />
                <div className="slick3 gallery-lb">
                  <div className="item-slick3" data-thumb={product.images}>
                    <div className="wrap-pic-w pos-relative">
                      <img
                        src={product.images}
                        alt={product.name}
                        onError={handleImageError}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      />
                      <a
                        className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                        href={product.images}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-expand" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-5 p-b-30">
            <div className="p-r-50 p-t-5 p-lr-0-lg">
              <h4 className="mtext-105 cl2 js-name-detail p-b-14">{product.name}</h4>
              <span className="mtext-106 cl2">${product.price}</span>
              {product.description && product.description.length > 3 && (
                <p className="stext-102 cl3 p-t-23">{product.description}</p>
              )}
              {product.quantity && (
                <p className="stext-102 cl3 p-t-10">
                  <strong>Quantity Available:</strong> {product.quantity}
                </p>
              )}
              <div className="p-t-33">
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-203 flex-c-m respon6">Size</div>
                  <div className="size-204 respon6-next">
                    <div className="rs1-select2 bor8 bg0">
                      <select className="js-select2" name="size" ref={sizeRef}>
                        <option>Choose an option</option>
                        {sizes.map((size, index) => (
                          <option key={index} value={size}>{size}</option>
                        ))}
                      </select>
                      <div className="dropDownSelect2" />
                    </div>
                  </div>
                </div>
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-203 flex-c-m respon6">Color</div>
                  <div className="size-204 respon6-next">
                    <div className="rs1-select2 bor8 bg0">
                      <select className="js-select2" name="color" ref={colorRef}>
                        <option>Choose an option</option>
                        {colors.map((color, index) => (
                          <option key={index} value={color}>{color}</option>
                        ))}
                      </select>
                      <div className="dropDownSelect2" />
                    </div>
                  </div>
                </div>
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-204 flex-w flex-m respon6-next">
                    <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                      <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                        <i className="fs-16 zmdi zmdi-minus" />
                      </div>
                      <input
                        className="mtext-104 cl3 txt-center num-product"
                        type="number"
                        name="num-product"
                        defaultValue={1}
                        ref={quantityRef}
                      />
                      <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                        <i className="fs-16 zmdi zmdi-plus" />
                      </div>
                    </div>
                    <button
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                <div className="flex-m bor9 p-r-10 m-r-11">
                  <a
                    href="#"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                    data-tooltip="Add to Wishlist"
                  >
                    <i className="zmdi zmdi-favorite" />
                  </a>
                </div>
                <a
                  href="#"
                  className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                  data-tooltip="Facebook"
                >
                  <i className="fa fa-facebook" />
                </a>
                <a
                  href="#"
                  className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                  data-tooltip="Twitter"
                >
                  <i className="fa fa-twitter" />
                </a>
                <a
                  href="#"
                  className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                  data-tooltip="Google Plus"
                >
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}