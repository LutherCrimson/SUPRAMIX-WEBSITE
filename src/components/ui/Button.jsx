import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 group";
  const variants = {
    primary: "bg-brand-accent text-white hover:bg-brand-accent-hover shadow-md hover:shadow-lg",
    secondary: "bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-accent/5",
    ghost: "bg-transparent text-brand-navy hover:text-brand-accent"
  };
  
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
