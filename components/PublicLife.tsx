
import React, { useState } from 'react';
import { Tv, HeartPulse, GraduationCap, Sparkles, Plus, Search, ChevronRight, MessageSquare, Video, Stethoscope, BookOpen } from 'lucide-react';
import { User } from '../types';
import { getPublicServiceAdvice } from '../services/geminiService';

const PublicLife: React.FC<{ user: User }> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'tv' | 'saude' | 'educacao'>('tv');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleAiConsult = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await getPublicServiceAdvice(activeSubTab, query);
      setAiResult(result || '');
    } catch (e) {
      console.error(e);
      setAiResult('Erro ao consultar o sistema. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const sections = {
    tv: {
      title: 'Império Media & TV',
      icon: <Tv className="text-blue-500" />,
      desc: 'Interage com os maiores canais de Moçambique. Participa de concursos e envia reportagens.',
      items: [
        { label: 'Missão: Reportagem Cidadã', reward: 'MT 150/vídeo', detail: 'TVM Notícias' },
        { label: 'Votação: Reality Show', reward: 'MT 5 (Bónus)', detail: 'STV Entretenimento' },
        { label: 'Casting: Novo Apresentador', reward: 'Oportunidade', detail: 'Miramar TV' },
      ]
    },
    saude: {
      title: 'Saúde Digital Moçambique',
      icon: <HeartPulse className="text-red-500" />,
      desc: 'Marca consultas, encontra farmácias e usa IA para entender os teus sintomas.',
      items: [
        { label: 'Consulta Geral (Online)', reward: 'MT 500', detail: 'Hospital Central' },
        { label: 'Farmácia de Plantão', reward: 'Grátis', detail: 'Maputo Centro' },
        { label: 'Seguro de Saúde Social', reward: 'MT 200/mês', detail: 'Império Care' },
      ]
    },
    educacao: {
      title: 'Academia do Império',
      icon: <GraduationCap className="text-emerald-500" />,
      desc: 'Cursos, tutoria e materiais de estudo. Estuda e ganha bónus de desempenho.',
      items: [
        { label: 'Tutoria: Matemática 12ª', reward: 'MT 300/hora', detail: 'Freelance' },
        { label: 'Resumo de História MZ', reward: 'MT 50', detail: 'Loja Digital' },
        { label: 'Bolsa de Estudo Ativa', reward: 'Inscrição', detail: 'UEM / ISCTEM' },
      ]
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Sector Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => { setActiveSubTab(key as any); setAiResult(''); setQuery(''); }}
            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center gap-3 ${
              activeSubTab === key ? 'bg-white border-[#BF953F] shadow-xl scale-[1.02]' : 'bg-white border-transparent hover:border-slate-100 shadow-sm'
            }`}
          >
            <div className="p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
              {React.cloneElement(section.icon as any, { size: 32 })}
            </div>
            <h3 className="font-bold text-slate-900">{section.title}</h3>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Selecionar Setor</p>
          </button>
        ))}
      </div>

      {/* Main Sector Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#BF953F]/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
            <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
              {sections[activeSubTab].icon} {sections[activeSubTab].title}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">{sections[activeSubTab].desc}</p>
            
            <div className="space-y-4">
              {sections[activeSubTab].items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#BF953F] font-bold uppercase tracking-widest mb-1">{item.detail}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-green-400">{item.reward}</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Helper Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Sparkles className="text-[#BF953F]" /> 
              {activeSubTab === 'tv' ? 'Ideias de Conteúdo IA' : activeSubTab === 'saude' ? 'Triagem Digital IA' : 'Tutor Inteligente IA'}
            </h3>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  activeSubTab === 'tv' ? "Ex: Programa sobre culinária local..." : 
                  activeSubTab === 'saude' ? "Descreva o que sente (ex: dor de cabeça)..." : 
                  "O que queres aprender hoje? (ex: Revolução Industrial)"
                }
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[#BF953F]/20"
              />
              <button 
                onClick={handleAiConsult}
                disabled={loading}
                className="px-8 py-3 gold-gradient text-slate-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? 'Processando...' : 'Consultar'}
              </button>
            </div>
            {aiResult && (
              <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-[#BF953F] animate-in slide-in-from-left-4">
                <p className="text-sm text-slate-700 whitespace-pre-wrap italic">
                  "{aiResult}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest text-center">Acesso Rápido</h4>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <Video size={24} className="text-blue-500" />
                <span className="text-[10px] font-bold text-slate-600">Lives TV</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <Stethoscope size={24} className="text-red-500" />
                <span className="text-[10px] font-bold text-slate-600">Telemedicina</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <BookOpen size={24} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-600">Biblioteca</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <MessageSquare size={24} className="text-[#BF953F]" />
                <span className="text-[10px] font-bold text-slate-600">Fórum</span>
              </button>
            </div>
          </div>

          <div className="bg-[#BF953F]/10 border border-[#BF953F]/20 p-8 rounded-[2rem] relative overflow-hidden">
             <h4 className="font-black text-[#AA771C] mb-2 uppercase text-sm tracking-tighter">Missão Especial do Dia 🏆</h4>
             <p className="text-[#AA771C] text-xs font-medium mb-6">Envia um vídeo da tua escola ou hospital local para o canal "Império Notícias" e ganha MT 250 extra!</p>
             <button className="w-full py-3 bg-[#AA771C] text-white font-bold rounded-xl shadow-lg hover:bg-slate-900 transition-all">
               Aceitar Missão
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLife;
