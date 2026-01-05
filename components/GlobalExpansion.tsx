
import React, { useState } from 'react';
import { Globe, Map, BarChart, ExternalLink, Sparkles, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import { User } from '../types';
import { getGlobalExpansionAnalysis } from '../services/geminiService';

const GlobalExpansion: React.FC<{ user: User }> = ({ user }) => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [sector, setSector] = useState('Agrotech');

  const handleAnalysis = async () => {
    setLoading(true);
    try {
      const result = await getGlobalExpansionAnalysis(sector);
      setAnalysis(result || '');
    } catch (e) {
      console.error(e);
      setAnalysis('Erro ao gerar análise. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Visual */}
      <div className="relative bg-slate-900 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <Globe className="w-full h-full text-[#BF953F] animate-pulse" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#BF953F]/10 text-[#BF953F] rounded-full text-xs font-bold mb-6 border border-[#BF953F]/20">
            <Sparkles size={14} /> Expansão Global Iniciada
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Conectando Moçambique ao Mundo 🌍</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Estamos expandindo o negócio para atrair investigadores nacionais e internacionais. Use o nosso ecossistema para recolher dados reais e investir em mercados emergentes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Research Portal */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen className="text-[#BF953F]" /> Portal de Pesquisa para Investigadores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Inquérito Agrícola SADC', client: 'FAO / Research Unit', reward: 'MT 2.500', participants: 150 },
                { title: 'Estudo de Consumo Digital', client: 'Univ. Coimbra', reward: 'MT 1.800', participants: 300 },
                { title: 'Logística de Corredor', client: 'International Port Authority', reward: 'MT 5.000', participants: 50 },
                { title: 'Acesso à Saúde Rural', client: 'Global Health Org', reward: 'MT 1.200', participants: 500 },
              ].map((proj, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 cursor-pointer group">
                  <div className="flex justify-between mb-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{proj.client}</div>
                    <ArrowUpRight size={18} className="text-slate-300 group-hover:text-[#BF953F]" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{proj.title}</h4>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-green-600 font-bold">{proj.reward}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Users size={12} /> {proj.participants} vagas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <BarChart className="text-[#BF953F]" /> Consultoria de Mercado IA
            </h3>
            <div className="flex gap-4 mb-6">
              <select 
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[#BF953F]/20"
              >
                <option>Agrotech</option>
                <option>Fintech</option>
                <option>Energias Renováveis</option>
                <option>E-commerce</option>
                <option>Educação Digital</option>
              </select>
              <button 
                onClick={handleAnalysis}
                disabled={loading}
                className="px-6 py-3 gold-gradient text-slate-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? 'Analisando...' : 'Gerar Relatório'}
              </button>
            </div>
            {analysis && (
              <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed border-l-4 border-[#BF953F] animate-in slide-in-from-left-4">
                {analysis}
              </div>
            )}
          </div>
        </div>

        {/* Global Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest text-center">Países Interessados</h4>
            <div className="space-y-4">
              {[
                { country: 'Portugal', interest: 85, flag: '🇵🇹' },
                { country: 'Brasil', interest: 72, flag: '🇧🇷' },
                { country: 'África do Sul', interest: 94, flag: '🇿🇦' },
                { country: 'China', interest: 61, flag: '🇨🇳' },
                { country: 'Angola', interest: 88, flag: '🇦🇴' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-2xl">{c.flag}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>{c.country}</span>
                      <span>{c.interest}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full gold-gradient rounded-full" style={{ width: `${c.interest}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             <h4 className="font-bold text-lg mb-2">Expansion Pack 📦</h4>
             <p className="text-blue-100 text-sm mb-6">Investigadores Internacionais têm acesso a APIs exclusivas do Império Digital.</p>
             <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
               Ver Docs API <ExternalLink size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalExpansion;
