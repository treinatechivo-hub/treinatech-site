
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
    name: "David Ribeiro",
    role: "Auditoria Interna · Riscos · Compliance",
    image: "/testimonials/David_Ribeiro.png",
    content: "Com uma didática clara, domínio técnico e atenção às dúvidas dos alunos, o Ivo conseguiu transformar conceitos complexos em aprendizados acessíveis e práticos. O conteúdo foi bem estruturado, com exemplos aplicáveis ao dia a dia profissional. Recomendo fortemente para quem busca aprimorar seus conhecimentos em SQL.",
    rating: 5
  },
  {
    id: 2,
    name: "Tiago Augusto Schmidt",
    role: "Analista de Operações Sr · Cooperativa Agrária Agroindustrial",
    image: "/testimonials/Thiago-Schmidt.png",
    content: "Parabéns Ivo pelo excelente treinamento de Power BI. A organização, o conteúdo e a didática foram realmente produtivos. Além disso, o suporte e a atenção aos participantes fizeram toda a diferença. Parabéns pelo trabalho bem feito!",
    rating: 5
  },
  {
    id: 3,
    name: "Thomas Favoretto",
    role: "Analista de Derivativos · Mercado Financeiro · Agronegócio",
    image: "/testimonials/Thomas_Favoretto.png",
    content: "Recomendo fortemente o professor Ivo Amarante Jr. como professor de Power BI. Ele possui uma didática excepcional, tornando conceitos complexos fáceis de entender e aplicáveis ao dia a dia. Demonstra profundo conhecimento técnico, aliado a uma grande capacidade de adaptação às necessidades individuais de cada aluno.",
    rating: 5
  },
  {
    id: 4,
    name: "Henrique Xavier",
    role: "Coordenador · Sescoop/PR · Mestre em Gestão de Cooperativas",
    image: "/testimonials/Henrique-Xavier.png",
    content: "O Ivo é um especialista em Excel — percebe-se o quanto ele é apaixonado pela ferramenta e isso se reflete na forma que compartilha seu conhecimento. Seu método de ensino é super bacana, pois ensina na prática, fazendo com que a turma pense em como aplicar o conteúdo em sua rotina. Parabéns pela excelência.",
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
