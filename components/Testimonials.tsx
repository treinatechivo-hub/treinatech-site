
import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Analista de Planejamento na TechCorp",
    image: "https://i.pravatar.cc/150?u=mariana",
    content: "O treinamento de Excel Avançado mudou minha produtividade. O que eu levava horas para fazer agora resolvo em minutos com automações simples que aprendi.",
    rating: 5
  },
  {
    id: 2,
    name: "Ricardo Mendes",
    role: "Gerente Comercial",
    image: "https://i.pravatar.cc/150?u=ricardo",
    content: "O curso de Power BI da Treinatech é excepcional. A metodologia hands-on me permitiu criar dashboards de vendas que hoje são usados por toda a diretoria.",
    rating: 5
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Cientista de Dados Junior",
    image: "https://i.pravatar.cc/150?u=juliana",
    content: "SQL sempre foi um bicho de sete cabeças para mim. Com a Treinatech, a lógica ficou clara e hoje manipulo bancos de dados complexos com total confiança.",
    rating: 5
  },
  {
    id: 4,
    name: "André Oliveira",
    role: "Consultor de BI Independente",
    image: "https://i.pravatar.cc/150?u=andre",
    content: "Melhor custo-benefício que já encontrei. O suporte pós-curso é o grande diferencial, eles realmente se importam com o seu aprendizado.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative quotes background */}
      <div className="absolute top-10 left-10 text-slate-600 opacity-20 pointer-events-none">
        <Quote size={200} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">O que nossos alunos dizem</h2>
          <p className="text-lg text-slate-300">
            Histórias reais de profissionais que transformaram suas carreiras através da análise de dados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-600 italic mb-8 flex-1 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="relative">
                    <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-green-100"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-700 text-white rounded-full p-1 border-2 border-white">
                        <Quote size={8} />
                    </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
