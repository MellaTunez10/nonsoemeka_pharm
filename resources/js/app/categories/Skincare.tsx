import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Skincare() {
  return (
    <CategoryLayout 
      title="Skincare" 
      description="Professional-grade skincare products for every skin type. Achieve your glow with our dermatologist-approved collections."
      icon="✨"
      colorClass="bg-indigo-600"
    />
  );
}
