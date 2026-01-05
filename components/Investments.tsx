
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  Droplets, 
  Heart, 
  BookOpen, 
  Calculator,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Lock
} from 'lucide-react';
import { User, Transaction } from '../types';

interface InvestmentsProps {
  user: User;
  onUpdateUser: (user: User) => void;
  addTransaction: (amount: number, type: Transaction['type'], description: string, category?: string) => void;
}

const Investments: React.FC<InvestmentsProps> = ({ user, onUpdateUser, addTransaction }) => {
  const [simulationValues, setSimulationValues] = useState<Record<string, number>>({});
  const [investmentStatus, setInvestmentStatus] = useState<{ id: string, type: 'success' | 'error', message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [confirmingInvestment, setConfirmingInvestment] = useState<{ id: string, name: string, amount: number } | null>(null);
  
  const withdrawalFee = 0.05;

  const handleSimulate = (id: string, val: string) => {
    const num = parseFloat(val) || 0;
    setSimulationValues(prev => ({ ...prev, [id]: num }));
  };

  const openConfirmation = (projectId: string, projectName: string) => {
    const amount = simulationValues[projectId] || 0;
    
    if (amount <= 0) {
      setInvestmentStatus({ id: projectId, type: 'error', message: 'Valor inválido.' });
      return;
    }

    if (user.balance < amount) {
      setInvestmentStatus({ id: projectId, type: 'error', message: 'Saldo insuficiente na carteira.' });
      return;
    }

    setConfirmingInvestment({ id: projectId, name: projectName, amount });
  };

  const executeInvestment = async () => {
    if (!confirmingInvestment) return;
    
    const { id, name, amount } = confirmingInvestment;
    setIsProcessing(id);
    setConfirmingInvestment(null);

    // Simulação de sincronização com o Ledger do Império
    await new Promise(resolve => setTimeout(resolve, 2000));

    onUpdateUser({ ...user, balance: user.balance - amount });
    addTransaction(amount, 'investment', `Investimento em Cotas: ${name}`, 'Infraestrutura');
    
    setInvestmentStatus({ id, type: 'success', message: `Sucesso! MT ${amount} investidos em ${name}.` });
    setSimulationValues(prev => ({ ...prev, [id]: 0 }));
    setIsProcessing(null);
    
    setTimeout(() => setInvestmentStatus(null), 5000);
  };

  const infraProjects = [
    { id: 'INFRA-01', name: 'Energia Solar Rural', icon: <Zap />, roi: 0.15, impact: 'Alto', funded: 75, min: 500, color: 'bg-amber-500' },
    { id: 'INFRA-02', name: 'Água Comunitária', icon: <Droplets />, roi: 0.12, impact: 'Vital', funded: 40, min: 100, color: 'bg-blue-500' },
    { id: 'INFRA-03', name: 'Saúde Digital', icon: <Heart />, roi: 0.10, impact: 'Social', funded: 92, min: 1000, color: 'bg-red-500' },
    { id: 'INFRA-04', name: 'Educação Técnica', icon: <BookOpen />, roi: 0.18, impact: 'Futuro', funded: 15, min: 250, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Portfolio Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#BF953F]/10 rounded-full blur-3xl"></div>
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">Seu Patrimônio no Império</p>
          <h2 className="text-4xl font-black">MT 4.250,00</h2>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {['Energia: 25%', 'Água: 15%', 'Saúde: 30%', 'Educação: 30%'].map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold whitespace-nowrap">{tag}</span>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Sparkles size={24} /></div>
             <h3 className="font-bold">Consultor IA</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed italic">"Diversificar o seu saldo entre infraestruturas vitais garante um rendimento passivo seguro."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {infraProjects.map((proj) => {
          const simulatedVal = simulationValues[proj.id] || 0;
          const profit = simulatedVal * proj.roi;
          const loadingThis = isProcessing === proj.id;

          return (
            <div key={proj.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-all">
              <div className={`w-full md:w-40 ${proj.color} p-6 flex flex-col items-center justify-center text-white text-center gap-2`}>
                <div className="p-4 bg-white/20 rounded-2xl">{proj.icon}</div>
                <p className="text-xl font-black">{proj.roi * 100}% aa</p>
              </div>
              <div className="flex-1 p-6 space-y-4">
                <h4 className="font-bold text-lg">{proj.name}</h4>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Simular Cotas (MT)</span>
                    <span className="text-[10px] font-bold text-slate-900">Mín: {proj.min} MT</span>
                  </div>
                  <input 
                    type="number" 
                    value={simulatedVal || ''}
                    onChange={(e) => handleSimulate(proj.id, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold outline-none"
                    placeholder="0"
                  />
                  {simulatedVal > 0 && (
                    <div className="mt-3 flex justify-between text-[10px] font-black text-green-600">
                      <span>LUCRO ESTIMADO:</span>
                      <span>+ MT {profit.toLocaleString('pt-MZ')}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => openConfirmation(proj.id, proj.name)}
                  disabled={loadingThis}
                  className="w-full py-4 gold-gradient text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loadingThis ? <Loader2 className="animate-spin" size={16} /> : 'INVESTIR AGORA'}
                </button>

                {investmentStatus?.id === proj.id && (
                  <div className={`text-[10px] font-bold p-2 rounded-lg text-center ${investmentStatus.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {investmentStatus.message}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {confirmingInvestment && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Lock size={20} className="text-[#BF953F]" /> CONFIRMAR
            </h3>
            <div className="bg-slate-50 p-6 rounded-3xl text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Valor a Debitar</p>
              <p className="text-3xl font-black">MT {confirmingInvestment.amount}</p>
              <p className="text-xs text-slate-500 mt-2">Destino: {confirmingInvestment.name}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setConfirmingInvestment(null)} className="flex-1 py-4 border border-slate-100 rounded-2xl font-bold text-slate-400 text-xs">SAIR</button>
              <button onClick={executeInvestment} className="flex-1 py-4 gold-gradient text-slate-900 rounded-2xl font-black text-xs shadow-xl">CONFIRMAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investments;
