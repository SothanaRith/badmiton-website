import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCarouselSection({ 
  id,
  title, 
  subtitle, 
  badge,
  products, 
  onAddToCart, 
  onQuickView, 
  onToggleWishlist, 
  wishlist,
  compareItems,
  onToggleCompare
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="product-carousel-section" id={id}>
      <div className="container">
        <div className="carousel-header">
          <div className="carousel-title-box">
            {badge && (
              <span className="carousel-badge">
                <Flame size={14} />
                <span>{badge}</span>
              </span>
            )}
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>

          <div className="carousel-nav-arrows">
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="carousel-track" ref={scrollRef}>
          {products.map(product => (
            <div key={product.id} className="carousel-item">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                isCompared={compareItems.some(item => item.id === product.id)}
                onToggleCompare={onToggleCompare}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
