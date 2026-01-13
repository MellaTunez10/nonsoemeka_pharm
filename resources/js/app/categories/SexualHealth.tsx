import React from 'react';
import CategoryLayout, { PaginatedProducts } from '@/components/layout/CategoryLayout';

interface Props {
    products: PaginatedProducts;
}

export default function SexualHealth({ products }: Props) {
  return (
    <CategoryLayout 
      title="Sexual Health" 
      description="Discreet, professional, and comprehensive sexual wellness products. Your health and privacy are our top priorities."
      icon="❤️"
      colorClass="bg-rose-500"
      products={products}
    />
  );
}
