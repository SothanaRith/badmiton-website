import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2
} from 'lucide-react';

export default function ProductsManagerTab({ 
  products, 
  onDeleteProduct, 
  onUpdateStock,
  onOpenAddModal 
}) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-products-view">
      {/* Header */}
      <div className="admin-view-header">
        <div>
          <h2 className="admin-page-title">Badminton Inventory &amp; Catalog Manager</h2>
          <p className="admin-page-sub">
            Manage rackets, tournament shuttles, court shoes, and stringing supply levels.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={onOpenAddModal}
        >
          <Plus size={18} />
          <span>Add New Equipment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-search-wrap">
          <Search size={16} className="admin-search-icon" />
          <input 
            type="text" 
            placeholder="Search equipment by name, brand, or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="admin-cat-pills">
          {[
            { id: 'all', label: 'All Catalog' },
            { id: 'rackets', label: 'Pro Rackets' },
            { id: 'shoes', label: 'Court Shoes' },
            { id: 'shuttles', label: 'Feather Shuttles' },
            { id: 'bags', label: 'Tournament Bags' },
            { id: 'accessories', label: 'Strings & Grips' }
          ].map(c => (
            <button
              key={c.id}
              className={`cat-pill ${selectedCat === c.id ? 'active' : ''}`}
              onClick={() => setSelectedCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-table-card">
        <div className="admin-table-wrap">
          <table className="admin-clean-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Badminton Specs</th>
                <th>Price</th>
                <th>Stock Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => {
                const stock = product.stockCount ?? 18;
                const isLow = stock <= 8;

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="product-table-cell">
                        <img src={product.image} alt={product.name} className="product-table-thumb" />
                        <div>
                          <strong>{product.name}</strong>
                          {product.badge && <span className="product-mini-badge">{product.badge}</span>}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="cat-badge-plain">{product.category}</span>
                    </td>

                    <td>
                      <strong>{product.brand}</strong>
                    </td>

                    <td>
                      {product.specs ? (
                        <div className="specs-cell-pills">
                          {product.specs.balance && (
                            <span className="spec-table-tag balance">{product.specs.balance}</span>
                          )}
                          {product.specs.flex && (
                            <span className="spec-table-tag flex">{product.specs.flex}</span>
                          )}
                          {product.specs.weightGrip && (
                            <span className="spec-table-tag">{product.specs.weightGrip}</span>
                          )}
                          {product.specs.feather && (
                            <span className="spec-table-tag feather">{product.specs.feather}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>

                    <td>
                      <span className="table-price-text">${product.price.toFixed(2)}</span>
                    </td>

                    <td>
                      <div className="table-stock-control">
                        <span className={`stock-status-pill ${isLow ? 'low' : 'good'}`}>
                          {stock} in stock
                        </span>
                        <div className="stock-stepper-mini">
                          <button 
                            className="btn-stock-adj"
                            onClick={() => onUpdateStock(product.id, Math.max(0, stock - 1))}
                            title="Decrease stock"
                          >
                            -
                          </button>
                          <button 
                            className="btn-stock-adj"
                            onClick={() => onUpdateStock(product.id, stock + 5)}
                            title="Add 5 to stock"
                          >
                            +5
                          </button>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="table-action-btns">
                        <button 
                          className="btn-icon-del"
                          onClick={() => onDeleteProduct(product.id)}
                          title="Delete equipment"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
