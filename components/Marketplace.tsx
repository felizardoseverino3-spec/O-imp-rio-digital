
import React, { useState } from 'react';
// Added X to the lucide-react imports to fix the "Cannot find name 'X'" error
import { Search, Filter, MapPin, Clock, Zap, Plus, Wand2, X } from 'lucide-react';
import { User, UserRole } from '../types';
import { generateJobDescription } from '../services/geminiService';

const Marketplace: React.FC<{ user: User }> = ({ user }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSuggestDescription = async () => {
    if (!jobTitle) return alert('Insira um título primeiro!');
    setLoadingAI(true);
    try {
      const desc = await generateJobDescription(jobTitle, requirements);
      setJobDescription(desc || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Procurar micro-tarefas, vagas ou freelancers..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#BF953F]/20 focus:border-[#BF953F] shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
          <button 
            onClick={() => setIsPosting(true)}
            className="px-6 py-4 gold-gradient text-slate-900 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} /> Publicar Vaga
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, title: 'Tradutor Inglês-Português', price: 'MT 1.200', location: 'Remoto', time: '2 dias', type: 'Freelance', level: 'Profissional' },
          { id: 2, title: 'Promotor de Vendas', price: 'MT 500/dia', location: 'Matola', time: '1 semana', type: 'Vaga Rápida', level: 'Iniciante' },
          { id: 3, title: 'Desenvolvedor React Jr', price: 'MT 15.000', location: 'Remoto', time: '1 mês', type: 'Contrato', level: 'Técnico' },
          { id: 4, title: 'Limpeza de Escritório', price: 'MT 300/hora', location: 'Maputo', time: 'Hoje', type: 'Offline', level: 'Iniciante' },
          { id: 5, title: 'Social Media Manager', price: 'MT 5.000', location: 'Remoto', time: 'Recorrente', type: 'Serviço', level: 'Intermédio' },
          { id: 6, title: 'Motorista Privado', price: 'MT 2.000/viagem', location: 'Xai-Xai', time: 'Imediato', type: 'Offline', level: 'Profissional' },
        ].map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:border-[#BF953F]/40 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 text-[#BF953F] rounded-xl group-hover:bg-[#BF953F]/10 transition-colors">
                <Zap size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#BF953F] bg-[#BF953F]/10 px-3 py-1 rounded-full">
                {item.type}
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-slate-500 flex items-center gap-2"><MapPin size={14} /> {item.location}</p>
              <p className="text-sm text-slate-500 flex items-center gap-2"><Clock size={14} /> Duração: {item.time}</p>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Pagamento</p>
                <p className="text-xl font-extrabold text-green-600">{item.price}</p>
              </div>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                Candidatar
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPosting && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Nova Oportunidade</h3>
                <p className="text-sm text-slate-500">Preencha os detalhes da vaga ou tarefa</p>
              </div>
              <button onClick={() => setIsPosting(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Título da Vaga</label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Ex: Desenvolvedor Web, Motorista..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#BF953F]/20 focus:border-[#BF953F] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Requisitos Rápidos</label>
                <input 
                  type="text" 
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Ex: Experiência 2 anos, residente em Maputo..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#BF953F]/20 focus:border-[#BF953F] outline-none"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                   <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">Descrição Detalhada</label>
                   <button 
                    onClick={handleSuggestDescription}
                    disabled={loadingAI}
                    className="flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
                   >
                     <Wand2 size={14} /> {loadingAI ? 'A pensar...' : 'IA Sugerir Descrição'}
                   </button>
                </div>
                <textarea 
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Descreva o que o profissional irá fazer..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#BF953F]/20 focus:border-[#BF953F] outline-none"
                ></textarea>
              </div>
            </div>
            <div className="p-8 bg-slate-50 flex gap-4">
              <button onClick={() => setIsPosting(false)} className="flex-1 py-4 border border-slate-200 rounded-2xl font-bold hover:bg-white transition-colors">
                Cancelar
              </button>
              <button className="flex-1 py-4 gold-gradient text-slate-900 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
                Publicar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
