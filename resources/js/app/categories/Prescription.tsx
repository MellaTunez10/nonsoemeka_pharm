import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Prescription() {
  return (
    <CategoryLayout 
      title="Prescription" 
      description="Access and manage your prescription medications with ease. Our licensed pharmacists ensure accuracy and safety for every order."
      icon="💊"
      colorClass="bg-blue-600"
    />
  );
}
