'use client';

import { X } from '@phosphor-icons/react';

const Button = ({ label, onClick, disabled, outline, small, Icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
      ${outline ? 'bg-color-primary' : 'bg-color-pallete1'}
      ${outline ? 'border-color-dark' : 'border-color-dark'}
      ${outline ? 'text-color-accent' : 'text-color-primary'}
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'text-sm' : 'text-mg'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'border-[1px]' : 'border-2'} `}
    >
      {label}
      {Icon && <X size={24} className="absolute left-4 top-3" />}
    </button>
  );
};

export default Button;
