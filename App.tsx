
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Briefcase, 
  User as UserIcon, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  Bell,
  Menu,
  X,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Globe,
  Ship,
  HeartPulse
} from 'lucide-react';
import { User, UserRole, Transaction } from './types';
import Dashboard from './components/Dashboard';
import WalletView from './components/WalletView';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import SupportFAQ from './components/SupportFAQ';
import Investments from './components/Investments';
import GlobalExpansion from './components/GlobalExpansion';
import ImportExport from './components/ImportExport';
import PublicLife from './components/PublicLife';

interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: Date;
  read: boolean;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('império_user');
    const savedTransactions = localStorage.getItem('império_transactions');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  useEffect(() => {
    if (user && user.balance < 100) {
      addNotification(
        'Saldo Baixo!',
        `O seu saldo atual é de MT ${user.balance.toLocaleString('pt-MZ')}. Considere realizar tarefas para aumentar seus fundos.`,
        'warning'
      );
    }
  }, [user?.balance]);

  const addNotification = (title: string, message: string, type: 'info' | 'warning' | 'success') => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substring(7),
      title,
      message,
      type,
      date: new Date(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addTransaction = (amount: number, type: Transaction['type'], description: string, category?: string) => {
    const newTx: Transaction = {
      id: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      amount,
      type,
      description,
      date: new Date().toISOString(),
      status: 'success',
      category
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem('império_transactions', JSON.stringify(updated));
  };

  const handleUpdateUser = (u: User) => {
    setUser(u);
    localStorage.setItem('império_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    localStorage.removeItem('império_user');
    setUser(null);
    setActiveTab('dashboard');
    setNotifications([]);
  };

  if (!user) return <Auth onLogin={handleUpdateUser} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} transactions={transactions} />;
      case 'wallet': return <WalletView user={user} transactions={transactions} onUpdateUser={handleUpdateUser} addTransaction={addTransaction} />;
      case 'marketplace': return <Marketplace user={user} />;
      case 'investments': return <Investments user={user} onUpdateUser={handleUpdateUser} addTransaction={addTransaction} />;
      case 'imports': return <ImportExport user={user} />;
      case 'expansion': return <GlobalExpansion user={user} />;
      case 'life': return <PublicLife user={user} />;
      case 'profile': return <Profile user={user} onUpdateUser={handleUpdateUser} />;
      case 'admin': return <AdminPanel user={user} />;
      case 'support': return <SupportFAQ />;
      default: return <Dashboard user={user} transactions={transactions} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet', label: 'Carteira & Cartões', icon: Wallet },
    { id: 'marketplace', label: 'Oportunidades', icon: Briefcase },
    { id: 'life', label: 'Serviços & Vida', icon: HeartPulse },
    { id: 'investments', label: 'Investimentos', icon: BarChart3 },
    { id: 'imports', label: 'Importações', icon: Ship },
    { id: 'expansion', label: 'Expansão Global', icon: Globe },
    { id: 'profile', label: 'Perfil', icon: UserIcon },
    { id: 'support', label: 'Suporte & FAQ', icon: HelpCircle },
  ];

  if (user.role === UserRole.ADMIN) {
    navItems.splice(5, 0, { id: 'admin', label: 'Administração', icon: ShieldCheck });
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center font-bold text-slate-900">ID</div>
            <h1 className="font-bold tracking-tight text-sm">O IMPÉRIO DIGITAL</h1>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 md:relative md:flex md:flex-col bg-slate-900 text-slate-300 w-64 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center font-extrabold text-slate-900">ID</div>
          <div>
            <h2 className="font-bold text-white">IMPÉRIO</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Digital Core</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-slate-800 text-white border-l-4 border-[#BF953F]' : 'hover:bg-slate-800'}`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-[#BF953F]' : ''} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative h-screen overflow-hidden">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex items-center justify-between p-6 bg-white border-b border-slate-100 z-30">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
                {activeTab === 'dashboard' ? `Olá, ${user.name.split(' ')[0]}` : navItems.find(n => n.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-slate-400">Moçambique, {new Date().toLocaleDateString('pt-MZ')}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Saldo Carteira</span>
              <span className={`text-lg font-black ${user.balance < 100 ? 'text-red-500' : 'text-slate-900'}`}>MT {user.balance.toLocaleString('pt-MZ')}</span>
            </div>
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell size={20} className="text-slate-500" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
          </div>
        </header>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-6 top-20 z-[100] w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h4 className="font-bold text-sm">Notificações</h4>
              <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-[10px] text-[#BF953F] font-bold">Lidas</button>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">Sem notificações no momento.</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className={`p-4 ${!n.read ? 'bg-[#BF953F]/5' : ''}`}>
                    <p className="text-xs font-bold">{n.title}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8" onClick={() => setShowNotifications(false)}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
