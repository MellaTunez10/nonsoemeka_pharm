import React from 'react';
import CategoryLayout, { PaginatedProducts } from '@/components/layout/CategoryLayout';

interface Props {
    products: PaginatedProducts;
}

export default function Prescription({ products }: Props) {
  return (
    <CategoryLayout 
      title="Prescription Medications" 
      description="Authentic prescription drugs verified by our licensed pharmacists. Quick processing and local delivery."
      icon="💊"
      colorClass="bg-emerald-600"
      products={products}
    />
  );
}
