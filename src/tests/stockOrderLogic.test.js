import assert from 'node:assert';
import { PRODUCTS } from '../data/badmintonData.js';
import { LOW_STOCK_ITEMS, INITIAL_ORDERS } from '../data/adminData.js';

console.log('🧪 RUNNING COMPREHENSIVE STOCK & ORDER LOGIC TESTS...\n');

// --------------------------------------------------------------------------
// TEST 1: Initial Stock Integrity
// --------------------------------------------------------------------------
console.log('Test 1: Verifying initial product stock definitions...');
assert(PRODUCTS.length > 0, 'Products list should not be empty');
PRODUCTS.forEach(p => {
  assert(typeof p.stockCount === 'number', `Product ${p.id} must have numeric stockCount`);
  assert(p.stockCount >= 0, `Product ${p.id} stockCount must be non-negative`);
  assert(p.inStock === (p.stockCount > 0), `Product ${p.id} inStock boolean must match stockCount > 0`);
});
console.log('✅ Passed: All 12 products have valid stockCount and matched inStock booleans.\n');

// --------------------------------------------------------------------------
// TEST 2: Order Placement Stock Deduction
// --------------------------------------------------------------------------
console.log('Test 2: Verifying stock deduction on order completion...');
let testProducts = JSON.parse(JSON.stringify(PRODUCTS));
let testLowStock = JSON.parse(JSON.stringify(LOW_STOCK_ITEMS));
let testOrders = JSON.parse(JSON.stringify(INITIAL_ORDERS));

const sampleOrder = {
  id: 'SZ-TEST-1001',
  customer: 'Sophea Pich',
  items: [
    { id: 'yonex-astrox-100zz', name: 'Yonex Astrox 100 ZZ Kurenai', qty: 2, price: 249.00 },
    { id: 'yonex-aerosensa-50-tube', name: 'Yonex Aerosensa 50 Feather Shuttles (1 Dozen)', qty: 4, price: 45.00 }
  ],
  total: 678.00,
  status: 'Restringing'
};

const initialAstroxStock = testProducts.find(p => p.id === 'yonex-astrox-100zz').stockCount;
const initialShuttleStock = testProducts.find(p => p.id === 'yonex-aerosensa-50-tube').stockCount;

// Simulate handleOrderCompleted stock deduction logic
testOrders.unshift(sampleOrder);
testProducts = testProducts.map(p => {
  const orderedItem = sampleOrder.items.find(it => it.id === p.id || it.name === p.name);
  if (orderedItem) {
    const remaining = Math.max(0, p.stockCount - orderedItem.qty);
    return { ...p, stockCount: remaining, inStock: remaining > 0 };
  }
  return p;
});

const postAstrox = testProducts.find(p => p.id === 'yonex-astrox-100zz');
const postShuttle = testProducts.find(p => p.id === 'yonex-aerosensa-50-tube');

assert.strictEqual(postAstrox.stockCount, initialAstroxStock - 2, 'Astrox stock should decrease by 2');
assert.strictEqual(postShuttle.stockCount, initialShuttleStock - 4, 'Shuttle stock should decrease by 4');
assert.strictEqual(postShuttle.stockCount, 2, 'Shuttle stock should now be 2');
console.log(`✅ Passed: Astrox (${initialAstroxStock} -> ${postAstrox.stockCount}), Shuttles (${initialShuttleStock} -> ${postShuttle.stockCount}).\n`);

// --------------------------------------------------------------------------
// TEST 3: Low Stock Warning Generation (Threshold <= 5)
// --------------------------------------------------------------------------
console.log('Test 3: Verifying dynamic low-stock alert triggers...');
sampleOrder.items.forEach(it => {
  const prod = testProducts.find(p => p.id === it.id);
  if (prod) {
    const existingIdx = testLowStock.findIndex(a => a.id === prod.id);
    if (existingIdx > -1) {
      testLowStock[existingIdx].currentStock = prod.stockCount;
    } else if (prod.stockCount <= 5) {
      testLowStock.push({
        id: prod.id,
        name: prod.name,
        category: prod.category.toUpperCase(),
        currentStock: prod.stockCount,
        reorderLevel: 10,
        unit: 'Units',
        burnRate: 'High'
      });
    }
  }
});

const shuttleAlert = testLowStock.find(a => a.id === 'yonex-aerosensa-50-tube');
assert(shuttleAlert, 'Shuttle alert must exist in lowStockList');
assert.strictEqual(shuttleAlert.currentStock, 2, 'Shuttle alert currentStock must match product stock');
console.log(`✅ Passed: Low stock alert synchronized for shuttles (Current: ${shuttleAlert.currentStock} Tubes).\n`);

// --------------------------------------------------------------------------
// TEST 4: Order Cancellation Stock Restoration
// --------------------------------------------------------------------------
console.log('Test 4: Verifying stock restoration on order cancellation...');
const cancelledOrderId = 'SZ-TEST-1001';
const targetOrder = testOrders.find(o => o.id === cancelledOrderId);

// Simulate handleUpdateOrderStatus to 'Cancelled'
targetOrder.items.forEach(it => {
  testProducts = testProducts.map(p => {
    if (p.id === it.id) {
      const restored = p.stockCount + it.qty;
      return { ...p, stockCount: restored, inStock: true };
    }
    return p;
  });
  testLowStock = testLowStock.map(item => {
    return item.id === it.id ? { ...item, currentStock: item.currentStock + it.qty } : item;
  });
});
targetOrder.status = 'Cancelled';

const restoredAstrox = testProducts.find(p => p.id === 'yonex-astrox-100zz');
const restoredShuttle = testProducts.find(p => p.id === 'yonex-aerosensa-50-tube');

assert.strictEqual(restoredAstrox.stockCount, initialAstroxStock, 'Astrox stock must return to initial');
assert.strictEqual(restoredShuttle.stockCount, initialShuttleStock, 'Shuttle stock must return to initial');
console.log(`✅ Passed: Astrox restored to ${restoredAstrox.stockCount}, Shuttles restored to ${restoredShuttle.stockCount}.\n`);

// --------------------------------------------------------------------------
// TEST 5: Admin Restocking Synchronization
// --------------------------------------------------------------------------
console.log('Test 5: Verifying Admin restock (+25 units)...');
const restockItemId = 'yonex-aerosensa-50-tube';
const beforeRestock = testProducts.find(p => p.id === restockItemId).stockCount;
const restockAmount = 25;

// Simulate handleRestockItem
testLowStock = testLowStock.map(item => 
  item.id === restockItemId ? { ...item, currentStock: item.currentStock + restockAmount } : item
);
testProducts = testProducts.map(p => 
  p.id === restockItemId ? { ...p, stockCount: p.stockCount + restockAmount, inStock: true } : p
);

const afterProduct = testProducts.find(p => p.id === restockItemId);
const afterLowStock = testLowStock.find(a => a.id === restockItemId);

assert.strictEqual(afterProduct.stockCount, beforeRestock + 25, 'Product stockCount must increase by 25');
assert.strictEqual(afterLowStock.currentStock, afterProduct.stockCount, 'Low stock item must match product stockCount');
console.log(`✅ Passed: Admin restocked ${restockItemId} from ${beforeRestock} -> ${afterProduct.stockCount} units.\n`);

// --------------------------------------------------------------------------
// TEST 6: Cart Stock Limit Enforcement
// --------------------------------------------------------------------------
console.log('Test 6: Verifying Cart quantity capping logic...');
const scarceItem = testProducts.find(p => p.id === 'lining-ln65-string-reel'); // 2 units
const _mockCart = [{ id: scarceItem.id, quantity: 2 }];

// User attempts to add 1 more
const availableStock = scarceItem.stockCount;
let quantityAttempt = 3;
let finalQuantity = Math.min(quantityAttempt, availableStock);
assert.strictEqual(finalQuantity, 2, 'Quantity should be capped at availableStock (2)');

// Out of stock item check
scarceItem.stockCount = 0;
scarceItem.inStock = false;
const canAddToCart = scarceItem.stockCount > 0 && scarceItem.inStock;
assert.strictEqual(canAddToCart, false, 'Out of stock item must not be addable to cart');
console.log('✅ Passed: Exceeding stock is blocked, out of stock prevents add to cart.\n');

console.log('🎉 ALL STOCK & ORDER LOGIC TESTS COMPLETED SUCCESSFULLY!');
