import React, { useState } from 'react';
import { Building2, Users,  FileText, MessageCircle, Repeat, Club as Hub, HeadsetIcon, DollarSign, Scale, Users2, Timer, GraduationCap, Unlock, FileImage, Trophy, Loader2 } from 'lucide-react';
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

type FormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  havePortfolio:string
  urlParams: Record<string, string>;
};

const WEBHOOK_URL = 'https://hook.us2.make.com/k9uxf7n5fbhmjvfm5xpjglu4bb32naw1';

function App() {
   const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  });

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    havePortfolio:'',
    urlParams: urlParams,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'whatsapp') {
      const formattedNumber = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedNumber }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const isValidEmail = validateEmail(formData.email);
  const isValidPhone = formData.whatsapp.replace(/\D/g, '').length === 11;
  const isValidHavePortfolio= formData.havePortfolio === "Sim" || formData.havePortfolio === "Não" ;

  const canProceed = formData.fullName.length > 0 && isValidEmail && isValidPhone && isValidHavePortfolio
   

  const handleNext = async () => {
      setIsSubmitting(true)
      try {
        const dataToSend = {
          ...formData,
          urlParams: {
            ...formData.urlParams,
            currentUrl: window.location.href,
            fullPath: window.location.pathname + window.location.search,
            referrer: document.referrer || ''
          }
        };

        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

          Swal.fire({
        background: "rgba(18, 18, 18, 0.95)",
        backdrop: `
      rgba(15, 15, 15, 0.8)
      left top
      no-repeat
    `,
        customClass: {
          popup: "rounded-2xl border border-[#1a1a1a] shadow-2xl",
          title: "text-white",
          htmlContainer: "text-gray-300",
        },
        title: `<span style="color: #ffcf02;">Parabéns! Sua solicitação</span><br><span style="color: #ffcf02;">foi recebida com sucesso.</span>`,
        html: `
      📩 Seu pedido está agora na fila prioritária para análise.<br><br>
      Um de nossos especialistas já começou a trabalhar na melhor proposta para você e entrará em contato em breve.<br><br>
      <strong style="color: #ffcf02;">Fique atento ao seu WhatsApp e e-mail.</strong><br>
      Em alguns instantes te enviaremos uma mensagem para agendarmos uma reunião para conversarmos sobre sua solicitação, ok?
    `,
        icon: "success",
        confirmButtonText: "Fechar",
        confirmButtonColor: "#ffcf02",
        iconColor: "#ffcf02",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData({ fullName: "", email: "", whatsapp: "", "havePortfolio": "",urlParams:urlParams });
        }
      });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      finally{
              setIsSubmitting(false)
      }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="text-center lg:text-left">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#ffcf02] mb-4 md:mb-8 leading-tight">
              As melhores e mais ágeis soluções<br />
              para sua carteira de clientes estão<br />
              aqui na AÉGIS Capital.
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 mb-3 md:mb-6 leading-relaxed px-4 lg:px-0">
              As melhores condições do mercado para Bancários Autônomos,
              você tem com mais de 180 produtos financeiros e comissões rápidas,
              o poder de crescer com quem entende e valoriza o seu sucesso.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#ffcf02] font-semibold mb-3 md:mb-6 px-4 lg:px-0">
              Queremos você como parceiro, agende sua reunião com nosso sócio abaixo:
            </p>
            
            {/* Form Section */}
            <div className="bg-[#1a1a1a] rounded-2xl p-8">    
              {/* Step 1: Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Informações pessoais</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Digite seu nome completo"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-lg bg-[#222222] border border-transparent focus:border-[#ffcf02] outline-none text-gray-300"
                    />
                    <div className="space-y-1">
                      <input
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 rounded-lg bg-[#222222] border border-transparent focus:border-[#ffcf02] outline-none text-gray-300"
                      />
                      {formData.email && !isValidEmail && (
                        <p className="text-red-500 text-sm pl-1">Por favor, insira um email válido</p>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="whatsapp"
                      placeholder="(00) 00000-0000"
                      value={formData.whatsapp}
                      maxLength={15}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-lg bg-[#222222] border border-transparent focus:border-[#ffcf02] outline-none text-gray-300"
                    />
                  </div>
              <div className="space-y-4">
  <label className="block text-sm font-medium text-gray-300">
    Possui carteira de clientes? <span className="text-red-500 ml-1">*</span>
  </label>
  <div className="grid gap-3">
    {["Sim", "Não"].map((option) => (
      <label
        key={option}
        className={`relative flex items-center p-4 cursor-pointer bg-[#222222] border rounded-lg transition-colors
        ${formData["havePortfolio"] === option ? "border-[#ffcf02]" : "border-[#1a1a1a] hover:border-[#ffcf02]"}`}
      >
        <input
          type="radio"
          name="havePortfolio"
          value={option}
          checked={formData["havePortfolio"] === option}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, havePortfolio: e.target.value }))
          }
          className="absolute opacity-0"
        />
        <div className="flex items-center gap-3 w-full">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
            ${formData["havePortfolio"] === option ? "border-[#ffcf02]" : "border-[#1a1a1a]"}`}
          >
            {formData["havePortfolio"] === option && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffcf02]" />
            )}
          </div>
          <span className="text-sm text-white">{option}</span>
        </div>
      </label>
    ))}
  </div>
</div>
                </div>
                
  


              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
          
                    <button   onClick={handleNext}
                    disabled={!canProceed}className="disabled:opacity-50 px-6 py-3 text-sm ml-auto mt-3 text-gray-950 font-semibold bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-gray-700">
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enviando...</span>
            </div>
          ) : (
            "Enviar"
          )}
        </button>
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Repeat, title: 'Carteira Recorrente', description: 'Construção de uma carteira com recebimentos recorrentes' },
              { icon: Hub, title: 'Hub Completo', description: 'Acesso a todas as operações do mercado financeiro em um só lugar' },
              { icon: HeadsetIcon, title: 'Suporte VIP', description: 'Suporte individualizado, incluindo participação em reuniões com seus clientes' },
              { icon: DollarSign, title: 'Alta Remuneração', description: '45% de success fee sem limite - quanto maior a transação, maior sua remuneração' },
              { icon: Scale, title: 'Segurança Jurídica', description: 'Operações respaldadas por sólida estrutura legal' },
              { icon: Users2, title: 'Grande Alcance', description: 'Plataforma com mais de 70.000 investidores' },
              { icon: Timer, title: 'Análise Rápida', description: 'Análise prévia de suas oportunidades em até 1h útil' },
              { icon: GraduationCap, title: 'Plataforma Educacional', description: 'Mais de 5h de conteúdo sobre IB' },
              { icon: Unlock, title: 'Sem Exclusividade', description: 'Na Aégis você é livre para atuar com outros parceiros' },
              { icon: FileImage, title: 'Kit Comercial', description: 'Material completo para impulsionar suas vendas' },
              { icon: Trophy, title: 'Programa de Benefícios', description: 'Ranking, viagens, eventos e muito mais' }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#222222] transition-colors duration-300"
              >
                <feature.icon className="w-8 h-8 text-[#ffcf02] mb-3" />
                <h3 className="font-semibold text-[#ffcf02] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Multibank Hub Section */}
      <div className="container mx-auto px-4 py-12 md:py-24 border-t border-gray-800">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-[#ffcf02]">
              Primeiro Hub Multibancos<br />Internacional do Mundo.
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 px-4 lg:px-0">
              A AÉGIS Capital conecta você a uma rede global com mais de 100 instituições financeiras. 
              Encaminhe propostas para diversos bancos simultaneamente, com recomendações personalizadas 
              que aumentam suas chances de aprovação.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-2 lg:px-0">
              {[
                {
                  title: 'Acesso Global',
                  description: 'Conexão com instituições financeiras no Brasil e no mundo',
                  icon: Building2
                },
                {
                  title: 'Propostas Personalizadas',
                  description: 'Tecnologia que recomenda os melhores parceiros para cada perfil',
                  icon: Users
                },
                {
                  title: 'Processos Simples',
                  description: 'Menos burocracia, mais eficiência',
                  icon: FileText
                },
                {
                  title: 'Comissionamento Rápido',
                  description: 'Ganhe mais, sem complicações',
                  icon: DollarSign
                }
              ].map((feature, index) => (
                <div key={index} className="bg-[#1a1a1a] p-4 md:p-6 rounded-xl text-center lg:text-left">
                  <feature.icon className="w-8 h-8 text-[#ffcf02] mb-4" />
                  <h3 className="text-lg font-semibold text-[#ffcf02] mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-square max-w-[300px] md:max-w-[500px] mx-auto mt-8 lg:mt-0">
              {/* Central Globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 md:w-32 h-24 md:h-32 rounded-full bg-[#1a1a1a] border-2 border-[#ffcf02] flex items-center justify-center animate-pulse">
                  <Building2 size={48} className="text-[#ffcf02]" />
                </div>
              </div>
              
              {/* SVG for dotted lines and orbiting icons */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {/* Dotted circle */}
                <g className="dotted-line">
                  <circle
                    cx="200"
                    cy="200"
                    r="160"
                    fill="none"
                    stroke="#ffcf02"
                    strokeWidth="1"
                  />
                
                  {/* Connecting lines */}
                  <line x1="200" y1="40" x2="200" y2="120" stroke="#ffcf02" strokeWidth="1" />
                  <line x1="360" y1="200" x2="280" y2="200" stroke="#ffcf02" strokeWidth="1" />
                  <line x1="200" y1="360" x2="200" y2="280" stroke="#ffcf02" strokeWidth="1" />
                  <line x1="40" y1="200" x2="120" y2="200" stroke="#ffcf02" strokeWidth="1" />
                </g>
              </svg>
              
              {/* Orbiting Icons */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#ffcf02] flex items-center justify-center animate-pulse">
                  <Trophy size={24} className="text-[#ffcf02]" />
                </div>
              </div>
              <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#ffcf02] flex items-center justify-center animate-pulse">
                  <MessageCircle size={24} className="text-[#ffcf02]" />
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#ffcf02] flex items-center justify-center animate-pulse">
                  <DollarSign size={24} className="text-[#ffcf02]" />
                </div>
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#ffcf02] flex items-center justify-center animate-pulse">
                  <Users size={24} className="text-[#ffcf02]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
