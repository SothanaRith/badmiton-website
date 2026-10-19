import React, { useState } from 'react';
import './App.css';
import { PRODUCTS } from './data/badmintonData';
import { INITIAL_ORDERS, INITIAL_STRINGING_JOBS, LOW_STOCK_ITEMS } from './data/adminData';
import { DEFAULT_DELIVERY_PROVIDERS, DEFAULT_FREE_DELIVERY_THRESHOLD } from './data/deliveryData';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ShopByCategory from './components/ShopByCategory';
import SpecsComparisonSection from './components/SpecsComparisonSection';
import ProductCarouselSection from './components/ProductCarouselSection';
import MiddlePromoBanner from './components/MiddlePromoBanner';
import LifestyleBanners from './components/LifestyleBanners';
import NewsletterBanner from './components/NewsletterBanner';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ComparisonModal from './components/ComparisonModal';
import QuickViewModal from './components/QuickViewModal';
import MobileBottomNav from './components/MobileBottomNav';
import AdminDashboard from './components/admin/AdminDashboard';
import CheckoutModal from './components/checkout/CheckoutModal';
import TrackOrderModal from './components/TrackOrderModal';
import { ShieldCheck, Wrench, Truck } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t, lang } = useLanguage();
  // Mode toggle: Storefront vs Admin Dashboard
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Dynamic Catalog State
  const [productsList, setProductsList] = useState(PRODUCTS);

  // Dynamic Admin Operational States
  const [ordersList, setOrdersList] = useState(INITIAL_ORDERS);
  const [stringingJobsList, setStringingJobsList] = useState(INITIAL_STRINGING_JOBS);
  const [lowStockList, setLowStockList] = useState(LOW_STOCK_ITEMS);

  // Cambodia Delivery Providers & KHQR Gateway Settings
  const [deliveryProviders, setDeliveryProviders] = useState(DEFAULT_DELIVERY_PROVIDERS);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(DEFAULT_FREE_DELIVERY_THRESHOLD);
  const [khqrMerchantName, setKhqrMerchantName] = useState('SMASHZONE PRO STORE');

  // E-commerce cart & wishlist state
  const [cart, setCart] = useState([
    {
      id: 'yonex-astrox-100zz',
      name: 'Yonex Astrox 100 ZZ Kurenai',
      brand: 'Yonex',
      price: 249.00,
      image: '/images/hero-racket.jpg',
      quantity: 1,
      selectedString: 'Yonex BG80 (0.68mm)',
      stringTension: 27
    },
    {
      id: 'yonex-aerosensa-50-tube',
      name: 'Yonex Aerosensa 50 Feather Shuttles (1 Dozen)',
      brand: 'Yonex',
      price: 45.00,
      image: '/images/shuttlecocks.jpg',
      quantity: 2
    }
  ]);

  const [wishlist, setWishlist] = useState(['victor-thruster-ryuga-2', 'yonex-aerus-z2-men']);
  const [compareItems, setCompareItems] = useState([
    productsList.find(p => p.id === 'yonex-astrox-100zz'),
    productsList.find(p => p.id === 'victor-thruster-ryuga-2')
  ].filter(Boolean));

  // UI Modals & Drawers State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [quickViewProductId, setQuickViewProductId] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);

  // Admin Operations
  const handleAddProduct = (newProduct) => {
    setProductsList(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
  };

  const handleUpdateStock = (productId, newStock) => {
    setProductsList(prev => prev.map(p => p.id === productId ? { ...p, stockCount: newStock } : p));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleUpdateJobStatus = (jobId, newStatus) => {
    setStringingJobsList(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
  };

  const handleAddJob = (newJob) => {
    setStringingJobsList(prev => [newJob, ...prev]);
  };

  const handleRestockItem = (itemId, amount) => {
    setLowStockList(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, currentStock: item.currentStock + amount } 
        : item
    ));
  };

  // Delivery settings updates
  const handleUpdateDeliveryProvider = (id, updates) => {
    setDeliveryProviders(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  // Checkout order placement handler
  const handleOrderCompleted = (newOrder) => {
    setOrdersList(prev => [newOrder, ...prev]);
    
    // Check if any racket in the order has custom stringing, and create job ticket in queue
    newOrder.items.forEach(item => {
      if (item.selectedString && item.stringTension) {
        const stringingTicket = {
          id: `STR-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: newOrder.customer,
          phone: newOrder.phone || '+855 12 888 999',
          racket: item.name,
          string: item.selectedString,
          tension: item.stringTension,
          technician: 'Master Stringer Kenji',
          status: 'received',
          machine: 'Yonex Precision 9.0 Pro',
          createdAt: 'Just now',
          notes: `Online Order #${newOrder.id} - ${newOrder.deliveryProvider} to ${newOrder.province}`
        };
        setStringingJobsList(prev => [stringingTicket, ...prev]);
      }
    });

    setCart([]);
  };

  // Cart operations
  const handleAddToCart = (productId, customOptions = {}) => {
    const product = productsList.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === productId && 
        item.selectedString === customOptions.selectedString && 
        item.stringTension === customOptions.stringTension
      );

      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += 1;
        return nextCart;
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          quantity: 1,
          selectedString: customOptions.selectedString || null,
          stringTension: customOptions.stringTension || null
        }];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Compare operations
  const handleToggleCompare = (product) => {
    setCompareItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 badminton rackets side-by-side.');
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  };

  // Scroll helper
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered products for search or category selection
  const searchedProducts = productsList.filter(p => {
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const dealsProducts = productsList.filter(p => p.originalPrice && p.originalPrice > p.price);
  const bestSellers = productsList.filter(p => p.rating >= 4.8);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // -------------------------------------------------------------------------
  // RENDER: If in Admin Mode, show full Admin Dashboard
  // -------------------------------------------------------------------------
  if (isAdminMode) {
    return (
      <AdminDashboard
        onReturnToStore={() => setIsAdminMode(false)}
        products={productsList}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateStock={handleUpdateStock}
        orders={ordersList}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        stringingJobs={stringingJobsList}
        onUpdateJobStatus={handleUpdateJobStatus}
        onAddJob={handleAddJob}
        lowStockItems={lowStockList}
        onRestockItem={handleRestockItem}
        deliveryProviders={deliveryProviders}
        onUpdateDeliveryProvider={handleUpdateDeliveryProvider}
        freeDeliveryThreshold={freeDeliveryThreshold}
        onUpdateFreeDeliveryThreshold={setFreeDeliveryThreshold}
        khqrMerchantName={khqrMerchantName}
        onUpdateKhqrMerchantName={setKhqrMerchantName}
      />
    );
  }

  // -------------------------------------------------------------------------
  // RENDER: Customer Storefront
  // -------------------------------------------------------------------------
  return (
    <div className="app-layout">
      {/* 1. Header / Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        compareItems={compareItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenAdmin={() => setIsAdminMode(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onScrollToSection={scrollToSection}
      />

      <main>
        {/* If user is performing an active search, display search results banner */}
        {searchQuery.trim() !== '' ? (
          <section className="search-results-section container" style={{ padding: '30px 0' }}>
            <h2 className="section-title">
              Search Results for "{searchQuery}" ({searchedProducts.length} items found)
            </h2>
            <div className="specs-grid" style={{ marginTop: '20px' }}>
              {searchedProducts.map(product => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProductId}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                    isCompared={compareItems.some(item => item.id === product.id)}
                    onToggleCompare={product.category === 'rackets' ? handleToggleCompare : null}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* 2. Hero Banner */}
            <div id="hero">
              <HeroBanner
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProductId}
                onExploreRackets={() => scrollToSection('specs-filter')}
                onOpenSpecsLab={() => scrollToSection('specs-filter')}
              />
            </div>

            {/* 3. Shop by Categories (4-Card Grid) */}
            <ShopByCategory
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                scrollToSection('specs-filter');
              }}
            />

            {/* 4. Racket Specs Lab & Interactive Comparison (Core selected feature) */}
            <SpecsComparisonSection
              compareItems={compareItems}
              onToggleCompare={handleToggleCompare}
              onOpenCompareModal={() => setIsCompareModalOpen(true)}
              onAddToCart={handleAddToCart}
              onQuickView={setQuickViewProductId}
            />

            {/* 5. Today's Deals Carousel */}
            <ProductCarouselSection
              id="deals"
              title={lang === 'km' ? 'ប្រូម៉ូសិនពិសេសប្រចាំថ្ងៃ' : "Today's Tournament Deals & Steals"}
              subtitle={lang === 'km' ? 'សម្ភារៈប្រកួតស្តុកមានកំណត់ បញ្ចុះតម្លៃរហូតដល់ ២៥% និងសេវាដាក់ខ្សែ' : 'Limited stock pro gear up to 25% off with instant stringing discounts'}
              badge={lang === 'km' ? 'ប្រូម៉ូសិនក្តៅៗ' : 'FLASH DEALS'}
              products={dealsProducts}
              onAddToCart={handleAddToCart}
              onQuickView={setQuickViewProductId}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              compareItems={compareItems}
              onToggleCompare={handleToggleCompare}
            />

            {/* 6. Middle Promotional Banner (Amazon / Cambodia Court Delivery) */}
            <MiddlePromoBanner
              onScrollToDeals={() => scrollToSection('deals')}
            />

            {/* 7. Best Sellers Carousel */}
            <ProductCarouselSection
              id="products"
              title={lang === 'km' ? 'សម្ភារៈពេញនិយមបំផុតក្នុងចំណោមកីឡាករប្រកួត' : 'Most Popular Equipment Among Tournament Players'}
              subtitle={lang === 'km' ? 'ទទួលបានការវាយតម្លៃ 4.8+ ផ្កាយពីក្លឹប និងកីឡាករជាតិ/អន្តរជាតិ' : 'Rated 4.8+ stars by certified club and international players'}
              products={bestSellers}
              onAddToCart={handleAddToCart}
              onQuickView={setQuickViewProductId}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              compareItems={compareItems}
              onToggleCompare={handleToggleCompare}
            />

            {/* 8. Lifestyle Dual Banners */}
            <LifestyleBanners
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                scrollToSection('specs-filter');
              }}
            />

            {/* 9. Newsletter Subscription */}
            <NewsletterBanner />
          </>
        )}
      </main>

      {/* Floating Quick Admin Toggle for easy access */}
      <button 
        className="floating-admin-btn"
        onClick={() => setIsAdminMode(true)}
        title={t('nav.adminPortal')}
      >
        <Wrench size={16} />
        <span>{t('nav.adminPortal')}</span>
      </button>

      {/* 10. Comprehensive Footer */}
      <Footer 
        onScrollToTop={scrollToTop} 
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
      />

      {/* 11. Side-by-Side Racket Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareItems={compareItems}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToCart={handleAddToCart}
      />

      {/* 12. Quick View Modal with Custom Stringing Tension */}
      <QuickViewModal
        productId={quickViewProductId}
        onClose={() => setQuickViewProductId(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 13. Shopping Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 14. Wishlist Slide-out Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* 15. Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        compareCount={compareItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* 16. Multi-Step Checkout Modal with Cambodia Delivery & Bakong KHQR */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderCompleted={handleOrderCompleted}
        deliveryProviders={deliveryProviders}
        freeDeliveryThreshold={freeDeliveryThreshold}
      />

      {/* 17. Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        orders={ordersList}
      />
    </div>
  );
}
