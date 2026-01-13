import React from 'react';
import CategoryLayout, { PaginatedProducts } from '@/components/layout/CategoryLayout';

interface Props {
    products: PaginatedProducts;
}

export default function Vitamins({ products }: Props) {
  return (
    <CategoryLayout 
      title="Vitamins & Supplements" 
      description="Boost your wellness with our curated selection of high-quality vitamins and targeted supplements for every health goal."
      icon="🍎"
      colorClass="bg-emerald-600"
      products={products}
    />
  );
}
