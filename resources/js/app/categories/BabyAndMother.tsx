import React from 'react';
import CategoryLayout, { PaginatedProducts } from '@/components/layout/CategoryLayout';

interface Props {
    products: PaginatedProducts;
}

export default function BabyAndMother({ products }: Props) {
  return (
    <CategoryLayout 
      title="Baby & Mother" 
      description="Comprehensive care for both mother and child. From prenatal support to infant essentials, we're with you every step."
      icon="👶"
      colorClass="bg-pink-500"
      products={products}
    />
  );
}
