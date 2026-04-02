import React from 'react';
import { X } from 'lucide-react';

type LegalModalProps = {
  type: 'termos' | 'privacidade' | null;
  onClose: () => void;
};

const TERMOS_CONTENT = `
1. ACEITAÇÃO DOS TERMOS
Ao acessar e utilizar os serviços da Treinatech Soluções em Tecnologia Ltda., você concorda com estes Termos de Uso.

2. DESCRIÇÃO DOS SERVIÇOS
A Treinatech oferece treinamentos online e presenciais nas áreas de Excel, Power BI, SQL e outras ferramentas de análise de dados.

3. ACESSO AOS CURSOS
O acesso ao conteúdo dos cursos é individual e intransferível. A duração do acesso é definida no momento da compra (6 meses para cursos individuais e 12 meses para a Trilha Completa).

4. PROPRIEDADE INTELECTUAL
Todo o conteúdo disponibilizado (vídeos, materiais, apostilas) é de propriedade exclusiva da Treinatech. É proibida a reprodução, distribuição ou compartilhamento sem autorização expressa.

5. POLÍTICA DE REEMBOLSO
Solicitações de reembolso podem ser feitas em até 7 dias corridos após a compra, conforme o Código de Defesa do Consumidor.

6. RESPONSABILIDADES
A Treinatech não se responsabiliza por resultados específicos decorrentes do uso dos conhecimentos adquiridos nos treinamentos.

7. ALTERAÇÕES NOS TERMOS
Estes termos podem ser atualizados a qualquer momento. O uso continuado dos serviços implica na aceitação das alterações.

8. CONTATO
Para dúvidas: contato@treinatech.com.br | (41) 99183-2100
`;

const PRIVACIDADE_CONTENT = `
1. COLETA DE DADOS
Coletamos apenas os dados necessários para a prestação dos nossos serviços: nome, e-mail, telefone e dados de pagamento (processados por gateways certificados).

2. USO DOS DADOS
Seus dados são utilizados exclusivamente para:
- Gerenciar seu acesso aos cursos
- Enviar comunicações sobre seus treinamentos
- Emitir certificados e notas fiscais

3. COMPARTILHAMENTO
Não vendemos nem compartilhamos seus dados com terceiros, exceto quando exigido por lei ou para processamento de pagamentos.

4. COOKIES
Utilizamos cookies para melhorar a experiência de navegação. Você pode desativá-los nas configurações do seu navegador.

5. SEGURANÇA
Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, seguindo as diretrizes da LGPD (Lei nº 13.709/2018).

6. SEUS DIREITOS (LGPD)
Você tem direito a: acessar, corrigir, excluir seus dados e revogar o consentimento a qualquer momento.

7. RETENÇÃO DE DADOS
Mantemos seus dados pelo período necessário para cumprir obrigações legais e contratuais.

8. CONTATO DO DPO
Para exercer seus direitos ou tirar dúvidas sobre privacidade: contato@treinatech.com.br
`;

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isTermos = type === 'termos';
  const title = isTermos ? 'Termos de Uso' : 'Política de Privacidade';
  const content = isTermos ? TERMOS_CONTENT : PRIVACIDADE_CONTENT;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto p-6 text-slate-400 text-sm leading-relaxed whitespace-pre-line">
          {content}
        </div>
        <div className="p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
