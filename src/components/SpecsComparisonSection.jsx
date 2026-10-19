import React, { useState } from 'react';
import { Scale, Zap, Check, Eye, ShoppingCart, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/badmintonData';
import { useLanguage } from '../context/LanguageContext';

export default function SpecsComparisonSection({ 
  compareItems, 
  onToggleCompare, 
  onOpenCompareModal, 
  onAddToCart, 
  onQuickView 
}) {
  const { t, lang } = useLanguage();
  const [balanceFilter, setBalanceFilter] = useState('all');
  const [flexFilter, setFlexFilter] = useState('all');
  const [weightFilter, setWeightFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');

  const racketProducts = PRODUCTS.filter(p => p.category === 'rackets');

  const filteredRackets = racketProducts.filter(racket => {
    if (balanceFilter !== 'all' && racket.specs?.balance !== balanceFilter) return false;
    if (flexFilter !== 'all' && racket.specs?.flex !== flexFilter) return false;
    if (weightFilter !== 'all' && racket.specs?.weightClass !== weightFilter) return false;
    if (brandFilter !== 'all' && racket.brand.toLowerCase() !== brandFilter.toLowerCase()) return false;
    return true;
  });

  const resetFilters = () => {
    setBalanceFilter('all');
    setFlexFilter('all');
    setWeightFilter('all');
    setBrandFilter('all');
  };

  return (
    <section className="specs-section" id="specs-filter">
      <div className="container">
        {/* Header */}
        <div className="specs-header">
          <div className="specs-header-info">
            <div className="specs-badge">
              <Scale size={15} />
              <span>{t('specs.badge')}</span>
            </div>
            <h2 className="section-title">{t('specs.title')}</h2>
            <p className="section-subtitle">
              {t('specs.subtitle')}
            </p>
          </div>

          {compareItems.length > 0 && (
            <div className="compare-floating-trigger animate-pulse-glow">
              <div className="compare-trigger-left">
                <span className="compare-counter-badge">{compareItems.length}/3</span>
                <span className="compare-trigger-text">
                  {lang === 'km' ? 'រ៉ាកែតបានត្រៀមសម្រាប់ប្រៀបធៀប' : 'Rackets queued for comparison'}
                </span>
              </div>
              <button 
                className="btn btn-primary btn-compare-launch"
                onClick={onOpenCompareModal}
              >
                <Scale size={16} />
                <span>{t('specs.compareBtn')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Interactive Filter Bar */}
        <div className="specs-filter-box">
          <div className="filter-group">
            <span className="filter-label">
              <SlidersHorizontal size={14} />
              <span>{t('specs.filterBalance')}:</span>
            </span>
            <div className="filter-chips">
              {[
                { id: 'all', label: t('specs.all') },
                { id: 'Head-Heavy', label: t('specs.headHeavy') },
                { id: 'Even-Balance', label: t('specs.evenBalance') },
                { id: 'Head-Light', label: t('specs.headLight') }
              ].map(f => (
                <button
                  key={f.id}
                  className={`filter-chip ${balanceFilter === f.id ? 'active' : ''}`}
                  onClick={() => setBalanceFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group-row">
            <div className="filter-subgroup">
              <span className="filter-label">{t('specs.filterFlex')}:</span>
              <div className="filter-chips">
                {[
                  { id: 'all', label: t('specs.all') },
                  { id: 'Extra Stiff', label: t('specs.extraStiff') },
                  { id: 'Stiff', label: t('specs.stiff') },
                  { id: 'Medium', label: t('specs.medium') }
                ].map(f => (
                  <button
                    key={f.id}
                    className={`filter-chip ${flexFilter === f.id ? 'active' : ''}`}
                    onClick={() => setFlexFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-subgroup">
              <span className="filter-label">{t('specs.filterWeight')}:</span>
              <div className="filter-chips">
                {['all', '3U', '4U'].map(w => (
                  <button
                    key={w}
                    className={`filter-chip ${weightFilter === w ? 'active' : ''}`}
                    onClick={() => setWeightFilter(w)}
                  >
                    {w === 'all' ? t('specs.all') : `${w} (${w === '3U' ? '88g+' : '83g'})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-subgroup">
              <span className="filter-label">{lang === 'km' ? 'ម៉ាក' : 'Brand'}:</span>
              <div className="filter-chips">
                {['all', 'Yonex', 'Victor', 'Li-Ning'].map(b => (
                  <button
                    key={b}
                    className={`filter-chip ${brandFilter === b ? 'active' : ''}`}
                    onClick={() => setBrandFilter(b)}
                  >
                    {b === 'all' ? (lang === 'km' ? 'ម៉ាកទាំងអស់' : 'All Brands') : b}
                  </button>
                ))}
              </div>
            </div>

            {(balanceFilter !== 'all' || flexFilter !== 'all' || weightFilter !== 'all' || brandFilter !== 'all') && (
              <button className="reset-filter-btn" onClick={resetFilters}>
                <RefreshCw size={13} />
                <span>{t('specs.resetFilters')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filtered Racket Cards Grid */}
        <div className="specs-grid">
          {filteredRackets.map(racket => {
            const isCompared = compareItems.some(item => item.id === racket.id);

            return (
              <div key={racket.id} className={`spec-racket-card ${isCompared ? 'is-selected-for-compare' : ''}`}>
                <div className="racket-card-top">
                  <span className="racket-brand-pill">{racket.brand}</span>
                  <button 
                    className={`btn-compare-toggle ${isCompared ? 'active' : ''}`}
                    onClick={() => onToggleCompare(racket)}
                    title={isCompared ? 'Remove from compare' : 'Add to compare'}
                  >
                    <Scale size={14} />
                    <span>{isCompared ? 'Compared' : '+ Compare'}</span>
                  </button>
                </div>

                <div className="racket-img-box" onClick={() => onQuickView(racket.id)}>
                  <img src={racket.image} alt={racket.name} className="racket-img" />
                </div>

                <div className="racket-card-body">
                  <h3 className="racket-title" onClick={() => onQuickView(racket.id)}>
                    {racket.name}
                  </h3>

                  {/* Spec pills */}
                  <div className="racket-spec-tags">
                    <span className="spec-tag balance-tag">
                      {racket.specs.balance}
                    </span>
                    <span className="spec-tag flex-tag">
                      {racket.specs.flex}
                    </span>
                    <span className="spec-tag weight-tag">
                      {racket.specs.weightGrip}
                    </span>
                  </div>

                  {/* Power & Speed Indicators */}
                  <div className="racket-performance-meters">
                    <div className="meter-row">
                      <div className="meter-label-wrap">
                        <span className="meter-name">{lang === 'km' ? 'កម្លាំង Smash' : 'Smash Power'}</span>
                        <span className="meter-val">{racket.specs.smashPower}%</span>
                      </div>
                      <div className="meter-track">
                        <div 
                          className="meter-fill meter-power" 
                          style={{ width: `${racket.specs.smashPower}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="meter-row">
                      <div className="meter-label-wrap">
                        <span className="meter-name">{lang === 'km' ? 'ការគ្រប់គ្រង & ល្បឿន' : 'Control & Speed'}</span>
                        <span className="meter-val">{racket.specs.controlSpeed}%</span>
                      </div>
                      <div className="meter-track">
                        <div 
                          className="meter-fill meter-control" 
                          style={{ width: `${racket.specs.controlSpeed}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="racket-card-footer">
                    <div className="racket-price-wrap">
                      <span className="racket-price">${racket.price.toFixed(2)}</span>
                      <span className="racket-old-price">${racket.originalPrice.toFixed(2)}</span>
                    </div>

                    <div className="racket-action-buttons">
                      <button 
                        className="btn-racket-quick"
                        onClick={() => onQuickView(racket.id)}
                        title={t('product.quickView')}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="btn-racket-cart"
                        onClick={() => onAddToCart(racket.id)}
                      >
                        <ShoppingCart size={15} />
                        <span>{t('product.addToCart')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
