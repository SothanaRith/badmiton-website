import React, { useState } from 'react';
import { X, Package, Sparkles } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Yonex');
  const [category, setCategory] = useState('rackets');
  const [price, setPrice] = useState('239.00');
  const [originalPrice, setOriginalPrice] = useState('279.00');
  const [stockCount, setStockCount] = useState(15);
  const [badge] = useState('NEW ARRIVAL');
  const [image, setImage] = useState('/images/hero-racket.jpg');

  // Racket specs
  const [balance, setBalance] = useState('Head-Heavy');
  const [flex, setFlex] = useState('Stiff');
  const [weightClass, setWeightClass] = useState('4U');
  const [tensionMax, setTensionMax] = useState('29 lbs');
  const [smashPower, setSmashPower] = useState(94);
  const [controlSpeed, setControlSpeed] = useState(92);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProduct = {
      id: `equip-${Date.now()}`,
      name,
      brand,
      category,
      price: parseFloat(price) || 99.00,
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      rating: 5.0,
      reviewsCount: 1,
      image,
      badge,
      inStock: true,
      stockCount: Number(stockCount),
      description: `Premium tournament-grade ${brand} ${name} designed for competitive badminton athletes.`,
      specs: category === 'rackets' ? {
        balance,
        flex,
        weightClass,
        weightGrip: `${weightClass} (83g) / G5`,
        tensionMax,
        frameMaterial: 'High Modulus Carbon Graphite',
        playStyle: balance === 'Head-Heavy' ? 'Aggressive Smash Dominance' : 'All-Around Counter Attack',
        smashPower: Number(smashPower),
        controlSpeed: Number(controlSpeed)
      } : {
        type: 'Tournament Grade'
      }
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container add-product-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Package size={20} />
            </div>
            <div>
              <h2 className="modal-title">Add New Badminton Equipment</h2>
              <p className="modal-sub">Add pro rackets, shuttles, shoes, or strings into live catalog</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-body">
          <div className="form-row">
            <div className="form-group flex-2">
              <label>Equipment Name:</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Yonex Arcsaber 11 Pro"
              />
            </div>
            <div className="form-group">
              <label>Brand:</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="Yonex">Yonex</option>
                <option value="Victor">Victor</option>
                <option value="Li-Ning">Li-Ning</option>
                <option value="Mizuno">Mizuno</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category:</label>
              <select 
                value={category} 
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === 'shoes') setImage('/images/court-shoes.jpg');
                  else if (e.target.value === 'shuttles') setImage('/images/shuttlecocks.jpg');
                  else if (e.target.value === 'bags') setImage('/images/tour-bag.jpg');
                  else setImage('/images/hero-racket.jpg');
                }}
              >
                <option value="rackets">Pro Rackets</option>
                <option value="shoes">Court Shoes</option>
                <option value="shuttles">Feather Shuttles</option>
                <option value="bags">Tournament Bags</option>
                <option value="accessories">Strings &amp; Grips</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price ($ USD):</label>
              <input 
                type="number" 
                step="0.01" 
                required 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>List Price ($):</label>
              <input 
                type="number" 
                step="0.01" 
                value={originalPrice} 
                onChange={(e) => setOriginalPrice(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Initial Stock:</label>
              <input 
                type="number" 
                min="1" 
                value={stockCount} 
                onChange={(e) => setStockCount(e.target.value)} 
              />
            </div>
          </div>

          {/* Racket Specific Specs */}
          {category === 'rackets' && (
            <div className="racket-specs-fieldset">
              <div className="fieldset-title">
                <Sparkles size={14} className="text-orange" />
                <span>Badminton Performance Specifications</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Balance Point:</label>
                  <select value={balance} onChange={(e) => setBalance(e.target.value)}>
                    <option value="Head-Heavy">Head-Heavy (Smash Power)</option>
                    <option value="Even-Balance">Even-Balance (Control)</option>
                    <option value="Head-Light">Head-Light (Speed &amp; Drives)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Shaft Flex:</label>
                  <select value={flex} onChange={(e) => setFlex(e.target.value)}>
                    <option value="Extra Stiff">Extra Stiff</option>
                    <option value="Stiff">Stiff</option>
                    <option value="Medium">Medium</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Weight Class:</label>
                  <select value={weightClass} onChange={(e) => setWeightClass(e.target.value)}>
                    <option value="3U">3U (88g+)</option>
                    <option value="4U">4U (83g)</option>
                    <option value="5U">5U (78g)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Max Tension:</label>
                  <input 
                    type="text" 
                    value={tensionMax} 
                    onChange={(e) => setTensionMax(e.target.value)} 
                    placeholder="28 lbs"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Smash Power Score (0-100): {smashPower}</label>
                  <input 
                    type="range" 
                    min="70" 
                    max="100" 
                    value={smashPower} 
                    onChange={(e) => setSmashPower(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Handling Speed Score (0-100): {controlSpeed}</label>
                  <input 
                    type="range" 
                    min="70" 
                    max="100" 
                    value={controlSpeed} 
                    onChange={(e) => setControlSpeed(e.target.value)} 
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Publish to Store Catalog</button>
          </div>
        </form>
      </div>
    </div>
  );
}
