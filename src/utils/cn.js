// src/utils/cn.js
// ============================================================
//  cn — className merge utility
//  Combines clsx (conditional classes) with tailwind-merge
//  (de-duplicates conflicting Tailwind classes).
//
//  Usage:
//    cn('px-4 py-2', isActive && 'bg-saffron', className)
// ============================================================

import { clsx }        from 'clsx';
import { twMerge }     from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default cn;