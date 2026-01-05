
import React, { useState } from 'react';
// Added X to the lucide-react imports to fix the "Cannot find name 'X'" error
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  History, 
  CreditCard as CreditCardIcon, 
  ShieldCheck, 
  Info, 
  Tag, 
  Lock, 
  Eye, 
  EyeOff,
  ChevronRight,
  ShieldAlert,
  Fingerprint,
  Plus,
  Truck,
  CreditCard,
  X
} from 'lucide-react';
import { User, BankCard } from '../types';

const WalletView: React.FC<{ user: User }> = ({ user }) => {
  const [activeSubView, setActiveSubView] = useState<'balance' | 'cards'>('balance');
  const [showBalance, setShowBalance] = useState(true);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isOrderingPhysical, setIsOrderingPhysical] = useState(false);
  
  const withdrawalFee = 0.05; // 5% de taxa no levantamento
  const physicalCardFee = 1500; // 1500 MT para emissão de cartão físico

  const mockCards: BankCard[] = [
    { id: '1', type: 'virtual', number: '4532 •••• •••• 9012', expiry: '12/28', cvv: '412', status: 'active', brand: 'VISA', color: 'black' },
    { id: '2', type: 'physical', number: '4532 •••• •••• 3345', expiry: '05/27', cvv: '109', status: 'ordered', brand: 'VISA', color: 'gold' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-700 pb-20">
      
      {/* Sub-Navigation Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit mx-auto md:mx-0">
        <button 
          onClick={() => setActiveSubView('balance')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeSubView === 'balance' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Wallet size={18} /> Saldo & Extrato
        </button>
        <button 
          onClick={() => setActiveSubView('cards')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeSubView === 'cards' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <CreditCardIcon size={18} /> Meus Cartões VISA
        </button>
      </div>

      {activeSubView === 'balance' ? (
        <>
          {/* Balance View (Original Wallet UI) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  ID Verificado <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Conta Real</span>
                </h4>
                <p className="text-xs text-slate-500 italic">Proteção por Encriptação de Ponta Felizardo Severino</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-slate-400">
              <Lock size={12} /> Servidores Seguros em Nuvem
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:shadow-[#BF953F]/20">
              <div className="absolute inset-0 gold-gradient"></div>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 h-full p-10 flex flex-col justify-between text-slate-900">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-70">Saldo Disponível para Gestão</p>
                    <div className="flex items-center gap-4">
                      <h2 className="text-5xl font-black tracking-tighter">
                        {showBalance ? `MT ${user.balance.toLocaleString('pt-MZ')}` : '••••••'}
                      </h2>
                      <button onClick={() => setShowBalance(!showBalance)} className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors">
                        {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-14 h-10 bg-slate-900/10 rounded-lg backdrop-blur-md border border-white/20 flex items-center justify-center font-black">VISA</div>
                    <span className="text-[8px] font-black mt-2 tracking-widest uppercase opacity-50">Império Digital Pay</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2">
                    <Tag size={12} className="text-[#BF953F]" /> TAREFAS: TAXA 0%
                  </div>
                  <div className="bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-slate-900 border border-white/20">
                    LEVANTAMENTO: 5% ADMIN
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-center gap-4">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#BF953F] hover:text-slate-900 transition-all shadow-xl group">
                <ArrowDownLeft size={20} className="group-hover:translate-y-0.5 transition-transform" /> LEVANTAR (SAQUE)
              </button>
              <button className="w-full py-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all">
                <ArrowUpRight size={20} /> DEPOSITAR FUNDOS
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Card Management View */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Cartões VISA Império</h3>
              <p className="text-sm text-slate-500">Faça compras em qualquer parte do mundo.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                <Plus size={20} /> Criar Cartão Virtual
              </button>
              <button 
                onClick={() => setIsOrderingPhysical(true)}
                className="gold-gradient text-slate-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
              >
                <Truck size={20} /> Pedir Cartão Físico
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCards.map((card) => (
              <div key={card.id} className="relative group perspective">
                <div className={`aspect-[1.58/1] rounded-[1.5rem] p-6 text-white shadow-2xl relative overflow-hidden transition-all duration-500 transform-gpu group-hover:rotate-1 group-hover:-translate-y-1 ${card.color === 'gold' ? 'gold-gradient text-slate-900' : 'bg-slate-900'}`}>
                   {/* Card Chip & Brand */}
                   <div className="flex justify-between items-start mb-8">
                     <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-md opacity-80"></div>
                     <div className="flex flex-col items-end">
                        <span className="font-black italic text-xl">VISA</span>
                        {card.type === 'virtual' && <span className="text-[8px] font-black uppercase opacity-60 tracking-widest">Digital Card</span>}
                        {card.status === 'ordered' && <span className="text-[8px] font-black uppercase bg-white/20 px-2 py-0.5 rounded mt-1">A Caminho</span>}
                     </div>
                   </div>

                   {/* Card Number */}
                   <div className="mb-6">
                     <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest mb-1">Card Number</p>
                     <p className="text-lg font-bold tracking-[0.2em]">{card.number}</p>
                   </div>

                   {/* Expiry & CVV */}
                   <div className="flex gap-8">
                     <div>
                       <p className="text-[8px] font-bold uppercase opacity-50 mb-1">Expiry</p>
                       <p className="text-xs font-bold">{card.expiry}</p>
                     </div>
                     <div>
                       <p className="text-[8px] font-bold uppercase opacity-50 mb-1">CVV</p>
                       <p className="text-xs font-bold">{showCardDetails ? card.cvv : '•••'}</p>
                     </div>
                     <button onClick={() => setShowCardDetails(!showCardDetails)} className="ml-auto opacity-50 hover:opacity-100 transition-opacity">
                       {showCardDetails ? <EyeOff size={16} /> : <Eye size={16} />}
                     </button>
                   </div>

                   <p className="absolute bottom-6 left-6 text-xs font-medium uppercase tracking-widest opacity-80">{user.name}</p>
                </div>
              </div>
            ))}

            {/* Empty State Card */}
            <div className="aspect-[1.58/1] rounded-[1.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-4 group cursor-pointer hover:border-[#BF953F] hover:bg-white transition-all">
              <div className="p-4 bg-slate-50 rounded-full group-hover:bg-[#BF953F]/10 group-hover:text-[#BF953F] transition-colors">
                <Plus size={32} />
              </div>
              <p className="font-bold text-sm">Adicionar Novo Cartão</p>
            </div>
          </div>

          <div className="bg-blue-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
             <div className="p-5 bg-white/10 rounded-3xl border border-white/20">
               <Fingerprint size={48} />
             </div>
             <div className="flex-1">
               <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Segurança Global VISA</h4>
               <p className="text-blue-100 text-sm leading-relaxed">
                 Os cartões Império Digital utilizam a rede VISA para garantir aceitação mundial e proteção 3D Secure em todas as compras online. O seu cartão físico é entregue em mão por agentes certificados ID.
               </p>
             </div>
             <div className="flex flex-col gap-2">
               <button className="px-6 py-3 bg-white text-blue-900 rounded-xl font-bold text-xs uppercase hover:bg-blue-50 transition-all">Ver Limites</button>
               <button className="px-6 py-3 border border-white/20 rounded-xl font-bold text-xs uppercase hover:bg-white/10 transition-all">Bloquear Tudo</button>
             </div>
          </div>
        </div>
      )}

      {/* Shared Section: Activity */}
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Atividade Recente</h3>
            <p className="text-sm text-slate-500">Movimentações do saldo e cartões.</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { id: '1', type: 'Card', desc: 'Compra: Netflix Moçambique', amount: -650.00, date: 'Hoje, 10:45', fee: 0, status: 'Concluído' },
            { id: '2', type: 'Out', desc: 'Levantamento M-Pesa', amount: -500.00, date: 'Ontem, 16:20', fee: 25.00, status: 'Concluído' },
            { id: '3', type: 'In', desc: 'Crédito: Tarefa #203 Concluída', amount: 3500.00, date: '15 Out, 09:00', fee: 0, status: 'Concluído' },
          ].map((tx) => (
            <div key={tx.id} className="group p-6 rounded-3xl border border-slate-50 hover:bg-slate-50/50 hover:border-slate-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${tx.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                  {tx.type === 'Card' ? <CreditCardIcon size={24} /> : tx.amount > 0 ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900">{tx.desc}</p>
                    <span className="text-[8px] font-black px-2 py-0.5 rounded bg-slate-200 text-slate-500 uppercase tracking-widest">{tx.status}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{tx.date} • {tx.type === 'Card' ? 'VIA VISA VIRTUAL' : 'CARTEIRA DIGITAL'}</p>
                </div>
              </div>
              <p className={`text-xl font-black ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('pt-MZ')} MT
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Order Physical Card */}
      {isOrderingPhysical && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                 <Truck className="text-[#BF953F]" /> PEDIR CARTÃO FÍSICO
               </h3>
               <button onClick={() => setIsOrderingPhysical(false)} className="p-2.5 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                 <X size={24} />
               </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-amber-900 text-sm italic leading-relaxed">
                "Receba o seu cartão VISA físico em mãos num prazo de 3 a 7 dias úteis. Disponível para Maputo, Matola, Beira e Nampula."
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Morada de Entrega</label>
                  <input type="text" placeholder="Ex: Av. Eduardo Mondlane, Maputo" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#BF953F] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Ponto de Referência</label>
                  <input type="text" placeholder="Ex: Próximo à Padaria X" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#BF953F] outline-none transition-all" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase">Taxa de Emissão</p>
                   <p className="text-2xl font-black text-slate-900">MT 1.500</p>
                 </div>
                 <button className="gold-gradient text-slate-900 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest">
                   Confirmar e Pagar
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletView;
