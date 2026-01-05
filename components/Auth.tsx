
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Mail, Lock, User as UserIcon, Shield, ChevronRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate and hit API
    const mockUser: User = {
      id: '1',
      name: 'Felizardo Severino',
      email: email || 'felizardoseverino3@gmail.com',
      username: 'felizardo_admin',
      role: UserRole.ADMIN,
      profilePhoto: 'https://picsum.photos/seed/felizardo/200',
      balance: 15420.50,
      location: 'Maputo, Moçambique',
      phone: '875256733',
      isPremium: true
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BF953F] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 gold-gradient rounded-3xl mx-auto flex items-center justify-center shadow-2xl mb-6">
            <span className="text-4xl font-black text-slate-900">ID</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 uppercase">O IMPÉRIO DIGITAL</h1>
          <p className="text-slate-400 font-medium">Ecossistema Profissional "Tudo em Um"</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex gap-6 mb-8 border-b border-white/10 pb-4">
            <button 
              onClick={() => setIsLogin(true)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${isLogin ? 'text-[#BF953F]' : 'text-slate-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${!isLogin ? 'text-[#BF953F]' : 'text-slate-500'}`}
            >
              Criar Conta Real
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
               <div className="space-y-2">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nome Completo</label>
               <div className="relative">
                 <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                 <input 
                   type="text" 
                   required
                   placeholder="Felizardo Severino"
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-[#BF953F]/40 focus:bg-white/10 outline-none transition-all"
                 />
               </div>
             </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemplo@dominio.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-[#BF953F]/40 focus:bg-white/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-[#BF953F]/40 focus:bg-white/10 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full gold-gradient py-4 rounded-2xl font-bold text-slate-900 shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Entrar no Sistema' : 'Finalizar Cadastro'}
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <Shield size={14} />
            Sua conexão é encriptada e segura (AES-256)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
