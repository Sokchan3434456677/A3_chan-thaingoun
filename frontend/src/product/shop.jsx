import React from 'react'

export default function Shop() {
  return (
    <header className="header-v4">
  {/* Header desktop */}
  <div className="container-menu-desktop">
    {/* Topbar */}
    <div className="top-bar">
      <div className="content-topbar flex-sb-m h-full container">
        <div className="left-top-bar">
          Free shipping for standard order over $100
        </div>
        <div className="right-top-bar flex-w h-full">
          <a href="#" className="flex-c-m trans-04 p-lr-25">
            Help &amp; FAQs
          </a>
          <a href="#" className="flex-c-m trans-04 p-lr-25">
            My Account
          </a>
          <a href="#" className="flex-c-m trans-04 p-lr-25">
            EN
          </a>
          <a href="#" className="flex-c-m trans-04 p-lr-25">
            USD
          </a>
        </div>
      </div>
    </div>
    <div className="wrap-menu-desktop how-shadow1">
      <nav className="limiter-menu-desktop container">
        {/* Logo desktop */}		
        <a href="#" className="logo">
          <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
        </a>
        {/* Menu desktop */}
        <div className="menu-desktop">
          <ul className="main-menu">
            <li>
              <a href="index.html">Home</a>
              <ul className="sub-menu">
                <li><a href="index.html">Homepage 1</a></li>
                <li><a href="home-02.html">Homepage 2</a></li>
                <li><a href="home-03.html">Homepage 3</a></li>
              </ul>
            </li>
            <li>
              <a href="product.html">Shop</a>
            </li>
            <li className="label1" data-label1="hot">
              <a href="shoping-cart.html">Features</a>
            </li>
            <li>
              <a href="blog.html">Blog</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>	
        {/* Icon header */}
        <div className="wrap-icon-header flex-w flex-r-m">
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
            <i className="zmdi zmdi-search" />
          </div>
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify={2}>
            <i className="zmdi zmdi-shopping-cart" />
          </div>
          <a href="#" className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify={0}>
            <i className="zmdi zmdi-favorite-outline" />
          </a>
        </div>
      </nav>
    </div>	
  </div>
  {/* Header Mobile */}
  <div className="wrap-header-mobile">
    {/* Logo moblie */}		
    <div className="logo-mobile">
      <a href="index.html"><img src="images/icons/logo-01.png" alt="IMG-LOGO" /></a>
    </div>
    {/* Icon header */}
    <div className="wrap-icon-header flex-w flex-r-m m-r-15">
      <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
        <i className="zmdi zmdi-search" />
      </div>
      <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify={2}>
        <i className="zmdi zmdi-shopping-cart" />
      </div>
      <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify={0}>
        <i className="zmdi zmdi-favorite-outline" />
      </a>
    </div>
    {/* Button show menu */}
    <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </div>
  </div>
  {/* Menu Mobile */}
  <div className="menu-mobile">
    <ul className="topbar-mobile">
      <li>
        <div className="left-top-bar">
          Free shipping for standard order over $100
        </div>
      </li>
      <li>
        <div className="right-top-bar flex-w h-full">
          <a href="#" className="flex-c-m p-lr-10 trans-04">
            Help &amp; FAQs
          </a>
          <a href="#" className="flex-c-m p-lr-10 trans-04">
            My Account
          </a>
          <a href="#" className="flex-c-m p-lr-10 trans-04">
            EN
          </a>
          <a href="#" className="flex-c-m p-lr-10 trans-04">
            USD
          </a>
        </div>
      </li>
    </ul>
    <ul className="main-menu-m">
      <li>
        <a href="index.html">Home</a>
        <ul className="sub-menu-m">
          <li><a href="index.html">Homepage 1</a></li>
          <li><a href="home-02.html">Homepage 2</a></li>
          <li><a href="home-03.html">Homepage 3</a></li>
        </ul>
        <span className="arrow-main-menu-m">
          <i className="fa fa-angle-right" aria-hidden="true" />
        </span>
      </li>
      <li>
        <a href="product.html">Shop</a>
      </li>
      <li>
        <a href="shoping-cart.html" className="label1 rs1" data-label1="hot">Features</a>
      </li>
      <li>
        <a href="blog.html">Blog</a>
      </li>
      <li>
        <a href="about.html">About</a>
      </li>
      <li>
        <a href="contact.html">Contact</a>
      </li>
    </ul>
  </div>
  {/* Modal Search */}
  <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
    <div className="container-search-header">
      <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
        <img src="images/icons/icon-close2.png" alt="CLOSE" />
      </button>
      <form className="wrap-search-header flex-w p-l-15">
        <button className="flex-c-m trans-04">
          <i className="zmdi zmdi-search" />
        </button>
        <input className="plh3" type="text" name="search" placeholder="Search..." />
      </form>
    </div>
  </div>
</header>


  )
}
