import React from 'react';
import { cn } from './card';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === 'default',
          "border border-gray-300 bg-transparent hover:bg-gray-100": variant === 'outline',
          "hover:bg-gray-100": variant === 'ghost',
          "bg-red-600 text-white hover:bg-red-700": variant === 'destructive',
          "h-9 px-4 py-2": size === 'default',
          "h-8 rounded-md px-3 text-xs": size === 'sm',
          "h-10 rounded-md px-8": size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
