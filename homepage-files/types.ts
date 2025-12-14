import { ReactNode } from 'react';

export interface Tool {
  id: number;
  title: string;
  description?: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  gridClass: string; // For desktop layout positioning (col-span, row-span)
  href: string;
}