
import React from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  Globe, 
  ShieldCheck, 
  Lock,
  CheckCircle2,
  Activity,
  Zap,
  Cpu
} from 'lucide-react';
import { User, Transaction } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions }) => {
  const chartData = [
    { name: 'Seg', v: 400 }, { name: 'Ter', v: 800 }, { name: 'Qua', v: 600 },
    { name: 'Qui', v: 1200 }, { name: 'Sex', v: 1500 }, { name: 'Sáb', v: 2100 }, { name: 'Dom', v: 1800 }
  ];

  const recentTxs = transactions.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero Core */}
      <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop')] bg-cover"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#BF953F] mb-6">
              <ShieldCheck size={14} /> Sistema Criptográfico Ativo
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Império Digital <br/>
              <span className="gold-text-gradient italic">Operacional.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Sua central de comando para economia moçambicana. Gestão de ativos, tarefas e investimentos em tempo real com segurança bancária.
            </p>
            <div className="flex gap-4">
               <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                 <p className="text-[10px] text-slate-500 font-bold uppercase">Status Local</p>
                 <p className="text-sm font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Online</p>
               </div>
               <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                 <p className="text-[10px] text-slate-500 font-bold uppercase">Latência</p>
                 <p className="text-sm font-bold">12ms (Maputo)</p>
               </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 w-full md:w-80 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-black uppercase text-slate-400">Integridade</p>
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-xs font-bold">
                 <span>Certificado SSL/TLS</span>
                 <span className="text-emerald-400">Verificado</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full">
                 <div className="h-full gold-gradient rounded-full" style={{ width: '100%' }}></div>
               </div>
               <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Lock size={18} /></div>
                 <div>
                   <p className="text-[10px] font-bold opacity-50 uppercase">Legalidade</p>
                   <p className="text-xs font-bold">Auditado Dez/2024</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Saldo Atual', value: `MT ${user.balance.toLocaleString('pt-MZ')}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Transações 24h', value: transactions.length.toString(), icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Tarefas Ativas', value: '08', icon: Briefcase, color: 'text-[#BF953F]', bg: 'bg-amber-50' },
          { label: 'Nível Usuário', value: user.isPremium ? 'Premium' : 'Básico', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col gap-4">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl w-fit`}><stat.icon size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-8">Movimentação Patrimonial (MT)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs><linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#BF953F" stopOpacity={0.2}/><stop offset="95%" stopColor="#BF953F" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="v" stroke="#BF953F" strokeWidth={3} fill="url(#colorV)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Transactions Log */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
          <h3 className="text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2">
            <Cpu size={16} className="text-[#BF953F]" /> Últimas Operações
          </h3>
          <div className="space-y-4">
            {recentTxs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8 italic">Nenhuma transação registrada no sistema.</p>
            ) : (
              recentTxs.map((tx) => (
                <div key={tx.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold">{tx.description}</p>
                    <p className="text-[10px] text-slate-500">{new Date(tx.date).toLocaleTimeString('pt-MZ')}</p>
                  </div>
                  <span className={`text-xs font-black ${tx.type === 'investment' ? 'text-red-400' : 'text-green-400'}`}>
                    {tx.type === 'investment' ? '-' : '+'} MT {tx.amount}
                  </span>
                </div>
              ))
            )}
          </div>
          <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
            Ver Log Completo
          </button>
        </div>
      </div>

      {/* Security Footer Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="p-6 bg-white rounded-3xl shadow-sm"><ShieldCheck size={40} className="text-[#BF953F]" /></div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-black uppercase tracking-tight">Protocolo de Confiança Império</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Todas as operações neste dashboard são validadas por um sistema de consenso distribuído. Seus dados estão protegidos por encriptação AES-256 e monitoramento constante contra acessos não autorizados. O Império Digital segue as normas de transparência da República de Moçambique.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-[8px] font-bold text-slate-400">ID ASSINATURA DIGITAL:</p>
          <p className="text-[10px] font-mono bg-slate-200 px-3 py-1 rounded text-slate-600">ID-SEC-{user.id.toUpperCase()}-BETA</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
