import React from 'react';

interface LogoProps {
  className?: string;
  textColor?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  textColor = 'text-[#16a34a]',
  iconOnly = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Ícone fiel ao Lovable: planilha com células e linhas verdes */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Fundo arredondado verde claro */}
        <rect width="34" height="34" rx="7" fill="#dcfce7" />
        {/* Corpo da planilha */}
        <rect x="5" y="5" width="24" height="24" rx="3" stroke="#16a34a" strokeWidth="1.8" fill="none" />
        {/* Linha do header */}
        <line x1="5" y1="12" x2="29" y2="12" stroke="#16a34a" strokeWidth="1.8" />
        {/* Linha vertical */}
        <line x1="16" y1="12" x2="16" y2="29" stroke="#16a34a" strokeWidth="1.8" />
        {/* Header preenchido */}
        <rect x="6" y="6" width="9" height="5.5" rx="1.5" fill="#16a34a" />
        {/* Dados esquerda */}
        <line x1="7" y1="17" x2="14" y2="17" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="21" x2="14" y2="21" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="25" x2="12" y2="25" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        {/* Dados direita */}
        <line x1="18" y1="17" x2="27" y2="17" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="21" x2="26" y2="21" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="25" x2="24" y2="25" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {!iconOnly && (
        <span
          className={`font-bold ${textColor}`}
          style={{ fontSize: '22px', letterSpacing: '-0.4px', lineHeight: 1 }}
        >
          Treinatech
        </span>
      )}
    </div>
  );
};
