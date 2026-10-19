import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  ShoppingBag, 
  AlertTriangle, 
  ArrowLeft, 
  Store, 
  Bell, 
  Search,
  Plus,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import OverviewTab from './OverviewTab';
import ProductsManagerTab from './ProductsManagerTab';
import StringingQueueTab from './StringingQueueTab';
import OrdersTab from './OrdersTab';
import LowStockAlertsTab from './LowStockAlertsTab';
import AddProductModal from './AddProductModal';
import AdminDeliverySettingsTab from './AdminDeliverySettingsTab';
import { Truck } from 'lucide-react';
import { BadmintonIcon } from '../BadmintonIcon';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminDashboard({ 
  onReturnToStore, 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateStock,
  orders,
  onUpdateOrderStatus,
  stringingJobs,
  onUpdateJobStatus,
  onAddJob,
  lowStockItems,
  onRestockItem,
  deliveryProviders,
  onUpdateDeliveryProvider,
  freeDeliveryThreshold,
  onUpdateFreeDeliveryThreshold,
  khqrMerchantName,
  onUpdateKhqrMerchantName
}) {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const activeRestringCount = stringingJobs.filter(j => j.status === 'in_progress' || j.status === 'received').length;

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo-box">
            <span className="admin-logo-icon">
              <BadmintonIcon size={24} color="#ff9900" />
            </span>
            <div className="admin-logo-text">
              <span className="admin-brand">SMASH<span className="accent-orange">ZONE</span></span>
              <span className="admin-badge-sub">{lang === 'km' ? 'ផ្ទាំងគ្រប់គ្រងជាង' : 'ADMIN WORKSHOP'}</span>
            </div>
          </div>
          <button 
            className="mobile-sidebar-close" 
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="admin-nav-menu">
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
          >
            <LayoutDashboard size={18} />
            <span>{t('admin.tabOverview')}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => { setActiveTab('products'); setMobileSidebarOpen(false); }}
          >
            <Package size={18} />
            <span>{t('admin.tabCatalog')}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'stringing' ? 'active' : ''}`}
            onClick={() => { setActiveTab('stringing'); setMobileSidebarOpen(false); }}
          >
            <Wrench size={18} />
            <span>{t('admin.tabStringing')}</span>
            {activeRestringCount > 0 && (
              <span className="admin-sidebar-count orange">{activeRestringCount}</span>
            )}
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => { setActiveTab('orders'); setMobileSidebarOpen(false); }}
          >
            <ShoppingBag size={18} />
            <span>{t('admin.tabOrders')}</span>
            <span className="admin-sidebar-count blue">{orders.length}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'lowstock' ? 'active' : ''}`}
            onClick={() => { setActiveTab('lowstock'); setMobileSidebarOpen(false); }}
          >
            <AlertTriangle size={18} />
            <span>{t('admin.tabLowStock')}</span>
            {lowStockItems.length > 0 && (
              <span className="admin-sidebar-count red">{lowStockItems.length}</span>
            )}
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => { setActiveTab('delivery'); setMobileSidebarOpen(false); }}
          >
            <Truck size={18} />
            <span>{t('admin.tabSettings')}</span>
          </button>
        </nav>

        {/* Bottom Storefront Toggle */}
        <div className="admin-sidebar-footer">
          <button className="btn-return-store" onClick={onReturnToStore}>
            <Store size={18} />
            <span>{t('admin.exit')}</span>
          </button>

          <div className="admin-user-profile">
            <div className="admin-avatar">K</div>
            <div className="admin-user-meta">
              <span className="admin-user-name">Kenji (Master Stringer)</span>
              <span className="admin-user-role">Certified Yonex Tech</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="admin-main-area">
        {/* Admin Top Header */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button 
              className="admin-mobile-toggle"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="admin-location-pill">
              <ShieldCheck size={16} className="text-green" />
              <span>{lang === 'km' ? 'ស្ថានីយ៍ជាងតារាងទី ៤ ដំណើរការធម្មតា' : 'SmashZone Workshop • Court 4 Station Online'}</span>
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* Language Switcher in Admin topbar */}
            <LanguageSwitcher variant="compact" />

            <button 
              className="topbar-action-icon"
              onClick={() => setActiveTab('lowstock')}
              title={lang === 'km' ? 'ការជូនដំណឹងស្តុកទាប' : 'Low Stock Notifications'}
            >
              <Bell size={18} />
              {lowStockItems.length > 0 && <span className="topbar-dot-red"></span>}
            </button>

            <button 
              className="btn btn-outline btn-sm"
              onClick={onReturnToStore}
            >
              <Store size={15} />
              <span>{lang === 'km' ? 'មើលទំព័រហាង' : 'View Customer Store'}</span>
            </button>

            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={16} />
              <span>{t('admin.addNewProduct')}</span>
            </button>
          </div>
        </header>

        {/* Active Tab View */}
        <div className="admin-content-viewport">
          {activeTab === 'overview' && (
            <OverviewTab
              orders={orders}
              stringingJobs={stringingJobs}
              lowStockItems={lowStockItems}
              products={products}
              onSwitchTab={setActiveTab}
              onOpenAddProduct={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'products' && (
            <ProductsManagerTab
              products={products}
              onAddProduct={onAddProduct}
              onDeleteProduct={onDeleteProduct}
              onUpdateStock={onUpdateStock}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'stringing' && (
            <StringingQueueTab
              jobs={stringingJobs}
              onUpdateJobStatus={onUpdateJobStatus}
              onAddJob={onAddJob}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
            />
          )}

          {activeTab === 'lowstock' && (
            <LowStockAlertsTab
              items={lowStockItems}
              onRestockItem={onRestockItem}
            />
          )}

          {activeTab === 'delivery' && (
            <AdminDeliverySettingsTab
              providers={deliveryProviders}
              onUpdateProvider={onUpdateDeliveryProvider}
              freeThreshold={freeDeliveryThreshold}
              onUpdateThreshold={onUpdateFreeDeliveryThreshold}
              khqrMerchantName={khqrMerchantName}
              onUpdateKhqrMerchant={onUpdateKhqrMerchantName}
            />
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={onAddProduct}
      />
    </div>
  );
}
