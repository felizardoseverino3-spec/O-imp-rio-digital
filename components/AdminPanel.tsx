
import React from 'react';
import { User, UserRole } from '../types';
import { Shield, Users, Activity, AlertTriangle, CheckCircle, Search, DollarSign, ArrowDownWideNarrow } from 'lucide-react';

const AdminPanel: React.FC<{ user: User }> = ({ user }) => {
  if (user.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center text-red-500 font-bold">Acesso Negado</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Painel de Administração</h2>
          <p className="text-sm text-slate-500">Monitoramento global do Império Digital</p>
        </div>
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm">
          <Shield size={16} className="text-[#BF953F]" /> Sistema Ativo
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Total Usuários</p>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">12,482</span>
                <Users className="text-blue-500" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Receita Taxas (Saque)</p>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-green-600">84.5k</span>
                <ArrowDownWideNarrow className="text-green-500" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Volume Tarefas 24h</p>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">1.2M MT</span>
                <Activity className="text-[#BF953F]" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Denúncias</p>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-red-500">3</span>
                <AlertTriangle className="text-red-500" />
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold">Solicitações de Levantamento Pendentes</h3>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase">Taxa Admin: 5%</span>
              <button className="text-sm font-bold text-[#BF953F]">Ver Todos</button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Usuário</th>
                        <th className="px-6 py-4">Método</th>
                        <th className="px-6 py-4">Montante Bruto</th>
                        <th className="px-6 py-4">Taxa (5%)</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Ação</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                    {[
                        { name: 'Artur Bila', method: 'M-Pesa', amount: '4.500 MT', fee: '225 MT', date: '2h atrás' },
                        { name: 'Sónia Mucavele', method: 'Conta Bancária', amount: '12.000 MT', fee: '600 MT', date: '4h atrás' },
                        { name: 'João Mandlate', method: 'e-Mola', amount: '800 MT', fee: '40 MT', date: '5h atrás' },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold">{row.name}</td>
                            <td className="px-6 py-4 text-slate-500">{row.method}</td>
                            <td className="px-6 py-4 font-bold text-slate-900">{row.amount}</td>
                            <td className="px-6 py-4 text-red-500 font-bold">{row.fee}</td>
                            <td className="px-6 py-4">
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Pendente</span>
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="Aprovar e Cobrar Taxa"><CheckCircle size={16} /></button>
                                <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Recusar"><X size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

const X: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default AdminPanel;
