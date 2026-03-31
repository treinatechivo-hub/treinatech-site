
import React from 'react';
import { Logo } from './Logo';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Logo textColor="text-white" className="h-12 mb-8" />
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Especialistas em transformar dados em conhecimento. Oferecemos treinamentos de alta qualidade para empresas e profissionais que buscam excelência.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              <li><a href="#inicio" className="text-slate-400 hover:text-green-500 transition-colors">Início</a></li>
              <li><a href="#cursos" className="text-slate-400 hover:text-green-500 transition-colors">Cursos</a></li>
              <li><a href="#sobre" className="text-slate-400 hover:text-green-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#contato" className="text-slate-400 hover:text-green-500 transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Treinamentos</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">Excel Avançado</a></li>
              <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">Power BI Specialist</a></li>
              <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">SQL Expert</a></li>
              <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">Dashboards Corporativos</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-900 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Treinatech Soluções em Tecnologia Ltda. Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
