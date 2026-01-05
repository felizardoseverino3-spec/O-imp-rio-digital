
import React, { useState } from 'react';
import { Ship, Package, Globe, Search, ArrowRight, Anchor, ShieldCheck, Sparkles, MapPin, ExternalLink, Calculator } from 'lucide-react';
import { User } from '../types';
import { getImportExportAnalysis } from '../services/geminiService';

const ImportExport: React.FC<{ user: User }> = ({ user }) => {
  const [product, setProduct] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    if (!product) return;
    setLoading(true);
    try {
      const result = await getImportExportAnalysis(product);
      setAnalysis(result || '');
    } catch (e) {
      console.error(e);
      setAnalysis('Erro ao consultar o especialista. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const shipments = [
    { id: 'IMP-9021', status: 'Em Trânsito', origin: 'Xangai, China', destination: 'Porto de Maputo', progress: 65, eta: '12 Out' },
    { id: 'IMP-8842', status: 'Desalfandegamento', origin: 'Durban, África do Sul', destination: 'Armazém Matola', progress: 85, eta: 'Hoje' },
    { id: 'EXP-1022', status: 'Carregamento', origin: 'Beira, Moçambique', destination: 'Lisboa, Portugal', progress: 15, eta: '25 Out' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Global Supply Chain Visual */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Globe className="w-full h-full text-[#BF953F] scale-125" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-4">Gestão de Importações <span className="text-[#BF953F]">Premium</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              O ecossistema para empresas que movem o mundo. Conecte-se com portos internacionais e utilize IA para otimizar a sua cadeia de suprimentos em Moçambique.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Cargas Ativas</p>
                <p className="text-2xl font-bold">12 Ativos</p>
              </div>
              <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Países de Origem</p>
                <p className="text-2xl font-bold">08 Países</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-amber-400" size={20} /> Viabilidade de Importação (IA)
            </h3>
            <p className="text-sm text-slate-400 mb-6">Analise se vale a pena importar um produto agora.</p>
            <div className="space-y-4">
              <input 
                type="text" 
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Ex: Painéis Solares, Smartphones..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-[#BF953F] transition-all"
              />
              <button 
                onClick={handleAnalysis}
                disabled={loading}
                className="w-full py-4 gold-gradient text-slate-900 font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? 'Processando Dados...' : 'Analisar Mercado'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm animate-in slide-in-from-top-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 text-[#BF953F] rounded-2xl">
              <Calculator size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-lg mb-4">Relatório de Inteligência Império: {product}</h4>
              <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                {analysis}
              </div>
              <div className="mt-6 flex gap-3">
                <button className="text-xs font-bold text-[#BF953F] border border-[#BF953F]/20 px-4 py-2 rounded-lg hover:bg-[#BF953F]/5">Descarregar PDF</button>
                <button className="text-xs font-bold text-slate-400 px-4 py-2 hover:text-slate-600">Falar com Despachante</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipment Tracker */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Anchor size={20} className="text-[#BF953F]" /> Rastreamento de Manifestos
            </h3>
            <button className="text-sm font-bold text-[#BF953F]">Nova Carga</button>
          </div>
          <div className="space-y-4">
            {shipments.map((ship) => (
              <div key={ship.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl">
                      <Ship size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ship.id}</p>
                      <h4 className="font-bold text-slate-900">{ship.origin} ➔ {ship.destination}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                      ship.status === 'Em Trânsito' ? 'bg-blue-100 text-blue-600' :
                      ship.status === 'Desalfandegamento' ? 'bg-amber-100 text-amber-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {ship.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-2 font-medium">ETA: {ship.eta}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        ship.status === 'Desalfandegamento' ? 'bg-amber-500' : 'gold-gradient'
                      }`}
                      style={{ width: `${ship.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 text-right">{ship.progress}% Concluído</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Suppliers */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package size={20} className="text-[#BF953F]" /> Fornecedores Verificados
          </h3>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
              <ShieldCheck size={14} className="text-green-500" /> Proteção Império Digital
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Xing-Tech Global', origin: 'China', cat: 'Eletrónicos', rate: '4.9' },
                { name: 'Lusitana Gourmet', origin: 'Portugal', cat: 'Alimentar', rate: '4.7' },
                { name: 'Rand-Export Ltd', origin: 'África do Sul', cat: 'Materiais', rate: '4.8' },
                { name: 'São Paulo Cargo', origin: 'Brasil', cat: 'Maquinaria', rate: '4.6' },
              ].map((sup, i) => (
                <div key={i} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-slate-900 group-hover:text-[#BF953F]">{sup.name}</h5>
                    <ExternalLink size={14} className="text-slate-300" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={10} /> {sup.origin}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-400 uppercase">{sup.cat}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-sm font-bold text-[#BF953F] hover:bg-[#BF953F]/5 transition-colors border-t border-slate-100">
              Ver Diretório Completo
            </button>
          </div>

          <div className="bg-amber-600 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
            <h4 className="font-bold text-lg mb-2">Despacho Aduaneiro 📝</h4>
            <p className="text-amber-100 text-sm mb-6">Simplificamos os documentos de importação e exportação para a sua empresa.</p>
            <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
              Iniciar Processo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
