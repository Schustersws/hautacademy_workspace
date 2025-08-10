import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product, ProductCategory, StoreOrder } from '../../types';
import { getUserProducts, getProductCategories, getProductDetails, createReservation } from '../../services/api';
import { Home, User as UserIcon, Calendar, Wrench, GraduationCap, Settings, LogOut, Award, Clapperboard, Store, Search, Gift } from 'lucide-react';
import ProductCardUser from './ProductCardUser';
import ProductDetailsModal from './ProductDetailsModal';

const menuItems = [
    { icon: <Home size={20} />, label: 'Início', path: '/dashboard' },
    { icon: <UserIcon size={20} />, label: 'Meu Perfil', path: '/profile' },
    { icon: <Calendar size={20} />, label: 'Eventos', path: '/events' },
    { icon: <Award size={20} />, label: 'Meus Títulos', path: '/titles' },
    { icon: <Wrench size={20} />, label: 'Ferramentas', path: '/tools' },
    { icon: <GraduationCap size={20} />, label: 'Academia', path: '/academy' },
    { icon: <Clapperboard size={20} />, label: 'Live Academy', path: '/live' },
    { icon: <Store size={20} />, label: 'Loja Parceiros', path: '/store' },
    { icon: <Gift size={20} />, label: 'Benefícios', path: '/benefits' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/settings' }
];

const UserSidebar: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => { localStorage.clear(); navigate('/login'); };
    return (
        <aside className="w-64 bg-haut-surface border-r border-haut-border flex-col hidden lg:flex">
            <div className="p-6"><h2 className="text-xl font-bold text-haut-accent">Haut Academy</h2><p className="text-haut-muted text-sm">Workspace</p></div>
            <nav className="flex-1 px-4 overflow-y-auto">{menuItems.map((item) => (<Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors ${window.location.hash.includes(item.path) ? 'bg-haut-accent/10 text-haut-accent' : 'text-haut-muted hover:bg-haut-border hover:text-white'}`}>{item.icon}<span>{item.label}</span></Link>))}</nav>
            <div className="p-4 border-t border-haut-border"><button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-haut-muted hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"><LogOut size={20} /><span>Sair</span></button></div>
        </aside>
    );
};


const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: 'all', sortBy: 'featured' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchStoreData = useCallback(async () => {
    setLoading(true);
    const [productsData, categoriesData] = await Promise.all([getUserProducts(), getProductCategories()]);
    setProducts(productsData);
    setCategories(categoriesData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStoreData();
  }, [fetchStoreData]);

  const handleSelectProduct = async (product: Product) => {
    const details = await getProductDetails(product.id);
    setSelectedProduct(details);
  }

  const filteredAndSortedProducts = products
    .filter(p => 
        (p.name.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.category === 'all' || p.category_id === filters.category)
    )
    .sort((a, b) => {
        switch (filters.sortBy) {
            case 'price_low': return (a.user_final_price_cents || a.price_cents) - (b.user_final_price_cents || b.price_cents);
            case 'price_high': return (b.user_final_price_cents || b.price_cents) - (a.user_final_price_cents || a.price_cents);
            case 'recent': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default: return 0; // featured is default
        }
    });

  return (
    <div className="min-h-screen bg-haut-dark text-white flex">
      <UserSidebar />
      <main className="flex-1">
        <header className="bg-haut-surface border-b border-haut-border px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Loja de Parceiros</h1>
          <p className="text-haut-muted">Produtos e benefícios exclusivos para parceiros Haut.</p>
        </header>
        <div className="p-6">
          <div className="bg-haut-surface rounded-lg p-4 mb-6 border border-haut-border flex flex-wrap items-center gap-4">
            <div className="relative flex-grow"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20}/><input type="text" placeholder="Buscar..." value={filters.search} onChange={e=>setFilters({...filters, search: e.target.value})} className="w-full pl-10 pr-4 py-2 bg-haut-dark border border-haut-border rounded-lg"/></div>
            <select value={filters.category} onChange={e=>setFilters({...filters, category: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg appearance-none"><option value="all">Todas Categorias</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <select value={filters.sortBy} onChange={e=>setFilters({...filters, sortBy: e.target.value})} className="px-4 py-2 bg-haut-dark border border-haut-border rounded-lg appearance-none"><option value="featured">Destaques</option><option value="recent">Recentes</option><option value="price_low">Menor Preço</option><option value="price_high">Maior Preço</option></select>
          </div>
          {loading ? <p>Carregando...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map(product => <ProductCardUser key={product.id} product={product} onSelect={handleSelectProduct} />)}
            </div>
          )}
        </div>
        {selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </main>
    </div>
  );
};

export default StorePage;