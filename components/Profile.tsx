
import React, { useState, useRef, useEffect } from 'react';
import { User, UserRole } from '../types';
import { Camera, Save, MapPin, Phone, Mail, User as UserIcon, Check, X, RefreshCw, AlertTriangle } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [editingUser, setEditingUser] = useState<User>({ ...user });
  const [isSaved, setIsSaved] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleSave = () => {
    onUpdateUser(editingUser);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1024 }, height: { ideal: 1024 } } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      setCameraError("Não foi possível acessar a sua câmera. Verifique as permissões do navegador.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        const originalSize = Math.min(video.videoWidth, video.videoHeight);
        const targetSize = Math.min(originalSize, 512);
        
        canvas.width = targetSize;
        canvas.height = targetSize;
        
        const sx = (video.videoWidth - originalSize) / 2;
        const sy = (video.videoHeight - originalSize) / 2;
        
        context.drawImage(
          video, 
          sx, sy, originalSize, originalSize,
          0, 0, targetSize, targetSize
        );
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setEditingUser({ ...editingUser, profilePhoto: dataUrl });
        stopCamera();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-40 gold-gradient relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative -mt-20 mb-10 inline-block group">
            <div className="relative">
              <img 
                src={editingUser.profilePhoto} 
                alt="Profile" 
                className="w-40 h-40 rounded-[2.5rem] border-[6px] border-white shadow-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {/* Botão Flutuante Discreto para Câmera */}
              <button 
                onClick={startCamera}
                className="absolute -bottom-2 -right-2 p-3.5 gold-gradient text-slate-900 rounded-full shadow-xl border-4 border-white hover:scale-110 active:scale-95 transition-all z-20 flex items-center justify-center group/btn"
                title="Tirar nova foto"
              >
                <Camera size={20} className="group-hover/btn:rotate-12 transition-transform" />
                <span className="absolute right-full mr-3 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest shadow-lg">
                  Atualizar Foto
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Nome de Exibição</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#BF953F]/10 focus:border-[#BF953F] outline-none transition-all font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Nome de Usuário</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                  <input 
                    type="text" 
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#BF953F]/10 focus:border-[#BF953F] outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Telemóvel</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#BF953F]/10 focus:border-[#BF953F] outline-none transition-all font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={editingUser.location}
                    onChange={(e) => setEditingUser({...editingUser, location: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#BF953F]/10 focus:border-[#BF953F] outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">E-mail (Privado)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={editingUser.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-400 cursor-not-allowed outline-none font-medium"
                />
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={handleSave}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black transition-all shadow-xl hover:shadow-2xl ${
                  isSaved ? 'bg-green-600 text-white' : 'gold-gradient text-slate-900 hover:scale-[1.01]'
                }`}
              >
                {isSaved ? <Check size={22} /> : <Save size={22} />}
                {isSaved ? 'PERFIL ATUALIZADO' : 'GUARDAR ALTERAÇÕES NO IMPÉRIO'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#BF953F]/10 rounded-full blur-[80px]"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h4 className="text-2xl font-black mb-2 flex items-center gap-3">
              Império Premium 👑
            </h4>
            <p className="text-slate-400 font-medium max-w-md">Ganhe selo de verificação, acesso prioritário a tarefas de importação e taxas reduzidas em todo o ecossistema.</p>
          </div>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black rounded-2xl hover:bg-[#BF953F] hover:text-slate-900 transition-all uppercase tracking-tighter shadow-lg">
            Ativar Agora
          </button>
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">CAPTURA REAL</h3>
              <button onClick={stopCamera} className="p-2.5 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8">
              {cameraError ? (
                <div className="bg-red-50 text-red-600 p-8 rounded-[2rem] text-center flex flex-col items-center gap-4 border border-red-100">
                  <AlertTriangle size={48} />
                  <p className="font-bold text-sm leading-relaxed">{cameraError}</p>
                  <button 
                    onClick={startCamera}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg"
                  >
                    <RefreshCw size={18} /> Tentar Novamente
                  </button>
                </div>
              ) : (
                <div className="relative aspect-square bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 shadow-2xl group">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-[2.5rem]"></div>
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-white/30 border-dashed rounded-full animate-[spin_10s_linear_infinite]"></div>
                  </div>
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <span className="bg-slate-900/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Ajuste seu rosto no centro</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 pt-0 flex gap-4">
              <button 
                onClick={stopCamera} 
                className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors uppercase text-xs"
              >
                Sair
              </button>
              <button 
                onClick={capturePhoto}
                disabled={!!cameraError}
                className="flex-[2] py-4 gold-gradient text-slate-900 rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm"
              >
                Capturar Agora
              </button>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
