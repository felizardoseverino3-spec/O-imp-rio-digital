
import React from 'react';
import { Mail, Phone, MessageCircle, FileText, ChevronDown, HelpCircle as LucideHelpCircle, CreditCard } from 'lucide-react';

const SupportFAQ: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Central de Apoio ao Império</h2>
        <p className="text-slate-500">Dúvidas, suporte ou questões de segurança? Estamos aqui para você.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group">
          <div className="p-4 bg-slate-50 text-[#BF953F] rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Mail />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">E-mail Suporte</h4>
          <p className="text-sm text-slate-500">felizardoseverino3@gmail.com</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group">
          <div className="p-4 bg-slate-50 text-[#BF953F] rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Phone />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Telefone</h4>
          <p className="text-sm text-slate-500">+258 87 525 6733</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group">
          <div className="p-4 bg-slate-50 text-[#BF953F] rounded-full mb-4 group-hover:scale-110 transition-transform">
            <MessageCircle />
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Live Chat</h4>
          <p className="text-sm text-slate-500">Disponível 08:00 - 18:00</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <LucideHelpCircle size={24} className="text-[#BF953F]" /> Perguntas Frequentes (FAQ)
        </h3>
        <div className="space-y-4">
          {[
            { q: 'Como faço para levantar o meu saldo?', a: 'Pode levantar via M-Pesa, e-Mola ou transferência bancária nacional. O tempo de processamento é de 2 a 24 horas úteis.' },
            { q: 'O cartão virtual VISA funciona na Netflix ou Amazon?', a: 'Sim! Os nossos cartões VISA virtuais são aceites globalmente em serviços de subscrição, e-commerce e pagamentos digitais.' },
            { q: 'Como recebo o meu cartão físico?', a: 'Após o pedido na aba "Meus Cartões", a nossa equipa de logística processa a emissão. Um agente ID entrará em contacto para agendar a entrega no local de sua preferência.' },
            { q: 'O site é seguro para trabalhar?', a: 'Sim, usamos o sistema "Pagamento em Garantia". O dinheiro da empresa fica retido no Império até que você entregue a tarefa e ela seja aprovada.' },
            { q: 'Quanto o sistema cobra de comissão nas tarefas?', a: 'No Império Digital, o seu trabalho vale 100%. Cobramos 0% de comissão sobre as tarefas realizadas. Você recebe o valor integral anunciado.' },
            { q: 'Existem taxas de serviço?', a: 'Sim. Para manter a infraestrutura e segurança, aplicamos uma taxa administrativa competitiva exclusivamente no momento do levantamento (saque) do seu saldo ou emissão de cartões físicos.' },
          ].map((faq, i) => (
            <details key={i} className="group border border-slate-100 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-4 font-bold text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                {faq.q}
                <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 text-slate-600 text-sm bg-slate-50 border-t border-slate-100 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <FileText size={24} className="text-slate-400" /> Políticas e Privacidade
        </h3>
        <div className="prose prose-sm max-w-none text-slate-600 space-y-4">
          <p><strong>1. Coleta de Dados:</strong> Coletamos apenas os dados necessários para garantir a sua segurança e processamento de pagamentos: Nome, E-mail, Telemóvel e Localização.</p>
          <p><strong>2. Segurança Financeira:</strong> O Império Digital utiliza encriptação de ponta e auditoria constante para prevenir fraudes. Nenhuma senha é guardada em texto limpo.</p>
          <p><strong>3. Gestão de Cartões:</strong> Os dados dos cartões são processados através de parceiros certificados PCI-DSS. O Império não armazena o número completo do cartão em servidores abertos.</p>
          <p><strong>Responsável pelo Projeto:</strong> Felizardo Severino (Fundador & Desenvolvedor Principal).</p>
        </div>
      </div>
    </div>
  );
};

export default SupportFAQ;
