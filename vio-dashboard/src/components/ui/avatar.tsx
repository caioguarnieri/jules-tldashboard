import React from 'react';
import { cn } from './card';

export function Avatar({ fallback, className }: { fallback: string, className?: string }) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 items-center justify-center font-medium text-gray-600", className)}>
      {fallback}
    </div>
  );
}
