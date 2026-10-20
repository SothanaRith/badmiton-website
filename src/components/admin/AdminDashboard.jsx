import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  ShoppingBag, 
  AlertTriangle, 
  Store, 
  Bell, 
  Plus,
  ShieldCheck,
  Menu,
  X,
  Lock,
  LogOut,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';
import OverviewTab from './OverviewTab';
import ProductsManagerTab from './ProductsManagerTab';
import StringingQueueTab from './StringingQueueTab';
import OrdersTab from './OrdersTab';
import LowStockAlertsTab from './LowStockAlertsTab';
import AddProductModal from './AddProductModal';
import AdminDeliverySettingsTab from './AdminDeliverySettingsTab';
import RefundsManagerTab from './RefundsManagerTab';
import { Truck } from 'lucide-react';
import { BadmintonIcon } from '../BadmintonIcon';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

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
  onUpdateKhqrMerchantName,
  refunds = [],
  onUpdateRefundStatus
}) {
  const { t, lang } = useLanguage();
  const { currentUser, logout, isAdmin, isSuperAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Fallback protection: if non-admin somehow accesses admin mode
  if (!isAdmin) {
    return (
      <div className="admin-access-denied-screen">
        <div className="access-denied-card">
          <ShieldAlert size={48} className="text-red" />
          <h2>{lang === 'km' ? 'មិនមានសិទ្ធិចូលប្រើប្រាស់' : 'Access Denied'}</h2>
          <p>
            {lang === 'km' 
              ? 'ទំព័រនេះសម្រាប់តែអ្នកគ្រប់គ្រងហាង (Admin) ឬអ្នកគ្រប់គ្រងជាន់ខ្ពស់ (Super Admin) ប៉ុណ្ណោះ។' 
              : 'This portal requires Admin or Super Admin credentials to access.'}
          </p>
          <button className="btn btn-primary" onClick={onReturnToStore}>
            <Store size={16} />
            <span>{t('admin.exit')}</span>
          </button>
        </div>
      </div>
    );
  }

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
              <span className="admin-badge-sub">
                {isSuperAdmin 
                  ? (lang === 'km' ? 'SUPER ADMIN' : 'SUPER ADMIN') 
                  : (lang === 'km' ? 'ផ្ទាំងគ្រប់គ្រងជាង' : 'WORKSHOP ADMIN')}
              </span>
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
            className={`admin-nav-item ${activeTab === 'refunds' ? 'active' : ''}`}
            onClick={() => { setActiveTab('refunds'); setMobileSidebarOpen(false); }}
          >
            <RotateCcw size={18} />
            <span>{lang === 'km' ? 'សំណើសងប្រាក់' : 'Refunds & Returns'}</span>
            {refunds.filter(r => r.status === 'pending').length > 0 && (
              <span className="admin-sidebar-count orange">
                {refunds.filter(r => r.status === 'pending').length}
              </span>
            )}
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

          {/* Delivery & KHQR Settings: Restricted to Super Admin */}
          <button 
            className={`admin-nav-item ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => { setActiveTab('delivery'); setMobileSidebarOpen(false); }}
          >
            <Truck size={18} />
            <span>{t('admin.tabSettings')}</span>
            {!isSuperAdmin && (
              <span className="admin-sidebar-lock-badge" title="Super Admin Only">
                <Lock size={12} />
              </span>
            )}
          </button>
        </nav>

        {/* Bottom Storefront Toggle & Logged Admin Profile */}
        <div className="admin-sidebar-footer">
          <button className="btn-return-store" onClick={onReturnToStore}>
            <Store size={18} />
            <span>{t('admin.exit')}</span>
          </button>

          <div className="admin-user-profile">
            <div className={`admin-avatar ${isSuperAdmin ? 'avatar-super' : 'avatar-admin'}`}>
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="admin-user-meta">
              <span className="admin-user-name">{currentUser?.name || 'Administrator'}</span>
              <span className="admin-user-role">
                {isSuperAdmin 
                  ? t('auth.roleSuperAdmin')
                  : t('auth.roleAdmin')}
              </span>
            </div>
            <button 
              className="admin-logout-icon" 
              onClick={() => {
                logout();
                onReturnToStore();
              }}
              title={t('auth.logout')}
            >
              <LogOut size={16} />
            </button>
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
              <ShieldCheck size={16} className={isSuperAdmin ? 'text-purple' : 'text-green'} />
              <span>
                {isSuperAdmin 
                  ? (lang === 'km' ? 'សិទ្ធិអ្នកគ្រប់គ្រងជាន់ខ្ពស់ Super Admin (ពេញលេញ)' : 'Super Admin Access • Unrestricted Workshop Controls')
                  : (lang === 'km' ? 'ស្ថានីយ៍ជាងតារាងទី ៤ (Workshop Admin)' : 'SmashZone Workshop • Station Operator')}
              </span>
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
              className="btn btn-primary btn-sm topbar-add-btn"
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

          {activeTab === 'refunds' && (
            <RefundsManagerTab
              refunds={refunds}
              onUpdateRefundStatus={onUpdateRefundStatus}
            />
          )}

          {activeTab === 'lowstock' && (
            <LowStockAlertsTab
              items={lowStockItems}
              onRestockItem={onRestockItem}
            />
          )}

          {activeTab === 'delivery' && (
            <>
              {!isSuperAdmin ? (
                <div className="superadmin-lock-card animate-fade-in">
                  <div className="lock-icon-wrap">
                    <Lock size={36} className="text-orange" />
                  </div>
                  <h3>{t('auth.superAdminOnly')}</h3>
                  <p className="lock-desc">
                    {t('auth.superAdminLockDesc')}
                  </p>
                  <div className="current-user-banner">
                    <span>
                      {lang === 'km' ? 'គណនីបច្ចុប្បន្ន:' : 'Currently signed in as:'}{' '}
                      <strong>{currentUser?.name}</strong> ({t('auth.roleAdmin')})
                    </span>
                  </div>
                  <p className="lock-hint">
                    {lang === 'km' 
                      ? 'ដើម្បីកែប្រែកម្រៃសេវា ឬ KHQR សូមចាកចេញ ហើយចូលដោយប្រើគណនី Super Admin (superadmin@smashzone.com)' 
                      : 'To configure delivery fees or KHQR keys, please sign in with Super Admin credentials.'}
                  </p>
                </div>
              ) : (
                <AdminDeliverySettingsTab
                  providers={deliveryProviders}
                  onUpdateProvider={onUpdateDeliveryProvider}
                  freeThreshold={freeDeliveryThreshold}
                  onUpdateThreshold={onUpdateFreeDeliveryThreshold}
                  khqrMerchantName={khqrMerchantName}
                  onUpdateKhqrMerchant={onUpdateKhqrMerchantName}
                />
              )}
            </>
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
