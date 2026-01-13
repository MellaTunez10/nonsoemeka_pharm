import React from 'react';
import CategoryLayout, { PaginatedProducts } from '@/components/layout/CategoryLayout';

interface Props {
    products: PaginatedProducts;
}

export default function Skincare({ products }: Props) {
  return (
    <CategoryLayout 
      title="Skincare" 
      description="Professional-grade skincare products for every skin type. Achieve your glow with our dermatologist-approved collections."
      icon="✨"
      colorClass="bg-indigo-600"
      products={products}
    />
  );
}
