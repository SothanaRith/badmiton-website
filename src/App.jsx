import React, { useState } from 'react';
import './App.css';
import { PRODUCTS } from './data/badmintonData';
import { INITIAL_ORDERS, INITIAL_STRINGING_JOBS, LOW_STOCK_ITEMS, INITIAL_REFUNDS } from './data/adminData';
import { DEFAULT_DELIVERY_PROVIDERS, DEFAULT_FREE_DELIVERY_THRESHOLD } from './data/deliveryData';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ShopByCategory from './components/ShopByCategory';
import SpecsComparisonSection from './components/SpecsComparisonSection';
import ProductCarouselSection from './components/ProductCarouselSection';
import MiddlePromoBanner from './components/MiddlePromoBanner';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ComparisonModal from './components/ComparisonModal';
import QuickViewModal from './components/QuickViewModal';
import MobileBottomNav from './components/MobileBottomNav';
import AdminDashboard from './components/admin/AdminDashboard';
import CheckoutModal from './components/checkout/CheckoutModal';
import TrackOrderModal from './components/TrackOrderModal';
import AuthModal from './components/auth/AuthModal';
import LegalModal from './components/legal/LegalModal';
import ProductCard from './components/ProductCard';
import { Wrench } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { t, lang } = useLanguage();
  const { currentUser, isAdmin, isSuperAdmin } = useAuth();

  // Mode toggle: Storefront vs Admin Dashboard
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [authNotice, setAuthNotice] = useState(null);
  const [pendingCheckout, setPendingCheckout] = useState(false);

  // Dynamic Catalog State
  const [productsList, setProductsList] = useState(PRODUCTS);

  // Dynamic Admin Operational States
  const [ordersList, setOrdersList] = useState(INITIAL_ORDERS);
  const [stringingJobsList, setStringingJobsList] = useState(INITIAL_STRINGING_JOBS);
  const [lowStockList, setLowStockList] = useState(LOW_STOCK_ITEMS);
  const [refundsList, setRefundsList] = useState(INITIAL_REFUNDS);

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
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState('conditions');

  // Admin Operations
  const handleAddProduct = (newProduct) => {
    setProductsList(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
  };

  const handleUpdateStock = (productId, newStock) => {
    setProductsList(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, stockCount: Math.max(0, newStock), inStock: newStock > 0 } 
        : p
    ));
    setLowStockList(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, currentStock: Math.max(0, newStock) } 
        : item
    ));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prevOrders => {
      const existingOrder = prevOrders.find(o => o.id === orderId);
      if (existingOrder && existingOrder.status !== newStatus) {
        const wasActive = existingOrder.status !== 'Cancelled' && existingOrder.status !== 'Refunded';
        const isNowInactive = newStatus === 'Cancelled' || newStatus === 'Refunded';

        // When order is cancelled or refunded, restore stock back into catalog and alert list
        if (wasActive && isNowInactive) {
          setProductsList(prevProducts => 
            prevProducts.map(p => {
              const matchedItem = existingOrder.items.find(it => it.id === p.id || it.name === p.name);
              if (matchedItem) {
                const restored = (p.stockCount ?? 0) + matchedItem.qty;
                return { ...p, stockCount: restored, inStock: true };
              }
              return p;
            })
          );
          setLowStockList(prevLow => 
            prevLow.map(item => {
              const matchedItem = existingOrder.items.find(it => it.id === item.id || it.name === item.name);
              return matchedItem ? { ...item, currentStock: item.currentStock + matchedItem.qty } : item;
            })
          );
        }
      }
      return prevOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    });
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
    setProductsList(prev => prev.map(p => 
      p.id === itemId 
        ? { ...p, stockCount: (p.stockCount ?? 0) + amount, inStock: true } 
        : p
    ));
  };

  // Delivery settings updates
  const handleUpdateDeliveryProvider = (id, updates) => {
    setDeliveryProviders(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  // Returns & Refunds Operations
  const handleCreateRefund = (newTicket) => {
    setRefundsList(prev => [newTicket, ...prev]);
  };

  const handleUpdateRefundStatus = (refundId, newStatus) => {
    setRefundsList(prev => prev.map(r => r.id === refundId ? { ...r, status: newStatus } : r));
  };

  const handleOpenLegal = (tab = 'conditions') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Checkout order placement handler: deducts stock, triggers low stock alerts, and sets up restringing
  const handleOrderCompleted = (newOrder) => {
    setOrdersList(prev => [newOrder, ...prev]);
    
    // 1. Deduct stock from productsList and update inStock flag
    setProductsList(prevProducts => 
      prevProducts.map(p => {
        const orderedItem = newOrder.items.find(it => it.id === p.id || it.name === p.name);
        if (orderedItem) {
          const remainingStock = Math.max(0, (p.stockCount ?? 15) - orderedItem.qty);
          return {
            ...p,
            stockCount: remainingStock,
            inStock: remainingStock > 0
          };
        }
        return p;
      })
    );

    // 2. Sync / trigger low-stock alerts
    setLowStockList(prevLow => {
      let updated = [...prevLow];
      newOrder.items.forEach(it => {
        const prod = productsList.find(p => p.id === it.id || p.name === it.name);
        if (prod) {
          const remaining = Math.max(0, (prod.stockCount ?? 15) - it.qty);
          const existingIdx = updated.findIndex(alert => alert.id === prod.id);
          if (existingIdx > -1) {
            updated[existingIdx] = {
              ...updated[existingIdx],
              currentStock: remaining
            };
          } else if (remaining <= 5) {
            updated.push({
              id: prod.id,
              name: prod.name,
              category: prod.category.toUpperCase(),
              currentStock: remaining,
              reorderLevel: 10,
              unit: prod.category === 'shuttles' ? 'Tubes' : (prod.category === 'accessories' ? 'Spools' : 'Units'),
              burnRate: 'High'
            });
          }
        }
      });
      return updated;
    });

    // 3. Check if any racket in the order has custom stringing, and create job ticket in queue
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

  // Cart operations with stock validation
  const handleAddToCart = (productId, customOptions = {}) => {
    const product = productsList.find(p => p.id === productId);
    if (!product) return;

    const availableStock = product.stockCount ?? 15;
    if (availableStock <= 0 || !product.inStock) {
      alert(lang === 'km' 
        ? 'សូមអភ័យទោស ទំនិញនេះដាច់ស្តុកហើយ!' 
        : 'Sorry, this equipment is currently out of stock!');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === productId && 
        item.selectedString === customOptions.selectedString && 
        item.stringTension === customOptions.stringTension
      );

      if (existingIndex > -1) {
        if (prev[existingIndex].quantity >= availableStock) {
          alert(lang === 'km' 
            ? `អ្នកបានជ្រើសរើសចំនួនអតិបរមានៃស្តុកដែលមានហើយ (${availableStock} គ្រឿង)!` 
            : `You have reached the maximum available stock (${availableStock} units)!`);
          return prev;
        }
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
      return;
    }

    const product = productsList.find(p => p.id === id);
    const availableStock = product ? (product.stockCount ?? 99) : 99;

    if (newQty > availableStock) {
      alert(lang === 'km' 
        ? `ចំនួនស្តុកមានកំណត់ត្រឹមតែ ${availableStock} គ្រឿងប៉ុណ្ណោះ!` 
        : `Only ${availableStock} units available in stock!`);
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: availableStock } : item));
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

  // Open checkout gate: require login or register
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    if (!currentUser) {
      setAuthNotice(t('auth.loginRequiredForCheckout'));
      setPendingCheckout(true);
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const handleAuthSuccess = (_user) => {
    if (pendingCheckout) {
      setPendingCheckout(false);
      setAuthNotice(null);
      setIsCheckoutOpen(true);
    }
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
        refunds={refundsList}
        onUpdateRefundStatus={handleUpdateRefundStatus}
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
        onOpenAdmin={() => {
          if (isAdmin) setIsAdminMode(true);
        }}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenAuth={(mode = 'login') => {
          setAuthModalMode(mode);
          setAuthNotice(null);
          setIsAuthModalOpen(true);
        }}
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

            {/* 5. Best Sellers / Pro Gear Showcase */}
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

            {/* 6. Cambodia Court Delivery & KHQR Showcase */}
            <MiddlePromoBanner
              onScrollToDeals={() => scrollToSection('products')}
            />
          </>
        )}
      </main>

      {/* Floating Quick Admin Toggle: STRICTLY VISIBLE ONLY FOR ADMIN OR SUPERADMIN */}
      {isAdmin && (
        <button 
          className="floating-admin-btn"
          onClick={() => setIsAdminMode(true)}
          title={t('nav.adminPortal')}
        >
          <Wrench size={16} />
          <span>{isSuperAdmin ? 'SUPER ADMIN' : t('nav.adminPortal')}</span>
        </button>
      )}

      {/* 7. Streamlined Footer */}
      <Footer 
        onScrollToTop={scrollToTop} 
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenAdmin={() => {
          if (isAdmin) setIsAdminMode(true);
        }}
        onOpenLegal={handleOpenLegal}
      />

      {/* 8. Side-by-Side Racket Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareItems={compareItems}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToCart={handleAddToCart}
      />

      {/* 9. Quick View Modal with Custom Stringing Tension */}
      <QuickViewModal
        productId={quickViewProductId}
        products={productsList}
        onClose={() => setQuickViewProductId(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 10. Shopping Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={productsList}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedToCheckout}
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

      {/* 13. Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        orders={ordersList}
      />

      {/* 14. Authentication Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingCheckout(false);
          setAuthNotice(null);
        }}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
        notice={authNotice}
      />

      {/* 15. Legal Policies & Refund Request Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
        onSubmitRefund={handleCreateRefund}
        orders={ordersList}
      />
    </div>
  );
}
