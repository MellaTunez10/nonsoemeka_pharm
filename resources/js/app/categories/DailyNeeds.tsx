import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function DailyNeeds() {
  return (
    <CategoryLayout 
      title="Daily Needs" 
      description="Household health essentials for your everyday life. Stop by for your first aid, hygiene, and wellness basics."
      icon="🩹"
      colorClass="bg-amber-500"
    />
  );
}
