import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  History, 
  Settings, 
  LogOut,
  ChevronRight,
  CheckCircle2,
  X,
  Package,
  LayoutGrid,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, Sale, Category } from './types';
import { INITIAL_PRODUCTS } from './data/mockData';
import { cn, formatCurrency } from './lib/utils';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const categories: Category[] = ['All', 'Beverages', 'Food', 'Snacks', 'Merchandise'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = (method: 'cash' | 'card') => {
    const newSale: Sale = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total: cartTotal,
      timestamp: Date.now(),
      paymentMethod: method
    };
    
    setSales(prev => [newSale, ...prev]);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCheckoutOpen(false);
      setCart([]);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 bg-white border-r border-neutral-200 flex flex-col items-center py-8 gap-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <LayoutGrid size={24} />
        </div>
        
        <nav className="flex-1 flex flex-col gap-4">
          <button 
            onClick={() => setIsHistoryOpen(false)}
            className={cn(
              "p-3 rounded-xl transition-colors",
              !isHistoryOpen ? "bg-indigo-50 text-indigo-600" : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600"
            )}
          >
            <Package size={24} />
          </button>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className={cn(
              "p-3 rounded-xl transition-colors",
              isHistoryOpen ? "bg-indigo-50 text-indigo-600" : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600"
            )}
          >
            <History size={24} />
          </button>
          <button className="p-3 rounded-xl text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600 transition-colors">
            <Settings size={24} />
          </button>
        </nav>

        <button className="p-3 rounded-xl text-neutral-400 hover:bg-neutral-50 hover:text-red-600 transition-colors">
          <LogOut size={24} />
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-neutral-200 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">SwiftPOS</h1>
            <p className="text-sm text-neutral-500">Register #01 • Terminal A</p>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Alex Cashier</p>
              <p className="text-xs text-neutral-500">Manager</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              AC
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {isHistoryOpen ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Transaction History</h2>
                <div className="flex items-center gap-2 text-neutral-500">
                  <Clock size={18} />
                  <span className="text-sm">Last 24 hours</span>
                </div>
              </div>

              <div className="space-y-4">
                {sales.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-300">
                    <History size={48} className="mx-auto text-neutral-300 mb-4" />
                    <p className="text-neutral-500">No transactions recorded yet.</p>
                  </div>
                ) : (
                  sales.map(sale => (
                    <div key={sale.id} className="pos-card p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          sale.paymentMethod === 'card' ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                        )}>
                          {sale.paymentMethod === 'card' ? <CreditCard size={24} /> : <Banknote size={24} />}
                        </div>
                        <div>
                          <p className="font-bold text-lg">Order #{sale.id}</p>
                          <p className="text-sm text-neutral-500">
                            {new Date(sale.timestamp).toLocaleTimeString()} • {sale.items.length} items
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-indigo-600">{formatCurrency(sale.total)}</p>
                        <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400">{sale.paymentMethod}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Categories */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all",
                      activeCategory === category 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                        : "bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="pos-card group text-left overflow-hidden hover:ring-2 hover:ring-indigo-500"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute top-3 right-3">
                          <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold text-white uppercase", product.color)}>
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-neutral-900 mb-1">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-indigo-600 font-bold">{formatCurrency(product.price)}</p>
                          <p className="text-xs text-neutral-400">{product.stock} in stock</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Cart Sidebar */}
      <aside className="w-96 bg-white border-l border-neutral-200 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-indigo-600" size={24} />
            <h2 className="text-xl font-bold">Current Order</h2>
          </div>
          <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-neutral-400 text-center"
              >
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart size={32} />
                </div>
                <p className="font-medium">Your cart is empty</p>
                <p className="text-sm">Start adding products to the order</p>
              </motion.div>
            ) : (
              cart.map(item => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{item.name}</h4>
                    <p className="text-indigo-600 font-bold text-sm">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors ml-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-neutral-500">
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Tax (8%)</span>
              <span>{formatCurrency(cartTotal * 0.08)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t border-neutral-200">
              <span>Total</span>
              <span className="text-indigo-600">{formatCurrency(cartTotal * 1.08)}</span>
            </div>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
          >
            Checkout <ChevronRight size={20} />
          </button>
        </div>
      </aside>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !checkoutSuccess && setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl"
            >
              {checkoutSuccess ? (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
                  <p className="text-neutral-500 mb-8">Transaction completed successfully.</p>
                  <div className="bg-neutral-50 p-4 rounded-2xl inline-block">
                    <p className="text-sm text-neutral-400 uppercase font-bold tracking-widest mb-1">Total Paid</p>
                    <p className="text-3xl font-bold text-indigo-600">{formatCurrency(cartTotal * 1.08)}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Select Payment Method</h2>
                    <button 
                      onClick={() => setIsCheckoutOpen(false)}
                      className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleCheckout('card')}
                        className="flex flex-col items-center gap-4 p-8 rounded-3xl border-2 border-neutral-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
                      >
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CreditCard size={32} />
                        </div>
                        <span className="font-bold text-lg">Credit Card</span>
                      </button>
                      
                      <button 
                        onClick={() => handleCheckout('cash')}
                        className="flex flex-col items-center gap-4 p-8 rounded-3xl border-2 border-neutral-100 hover:border-green-600 hover:bg-green-50 transition-all group"
                      >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Banknote size={32} />
                        </div>
                        <span className="font-bold text-lg">Cash Payment</span>
                      </button>
                    </div>

                    <div className="bg-neutral-50 p-6 rounded-3xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Order Summary</span>
                        <span className="font-bold">{cart.length} items</span>
                      </div>
                      <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Total Amount</span>
                        <span className="text-indigo-600">{formatCurrency(cartTotal * 1.08)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
