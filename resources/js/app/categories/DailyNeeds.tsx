import React from 'react';
import CategoryLayout, { PaginatedProducts } from '@/components/layout/CategoryLayout';

interface Props {
    products: PaginatedProducts;
}

export default function DailyNeeds({ products }: Props) {
  return (
    <CategoryLayout 
      title="Daily Needs" 
      description="Household health essentials for your everyday life. Stop by for your first aid, hygiene, and wellness basics."
      icon="🩹"
      colorClass="bg-amber-500"
      products={products}
    />
  );
}
