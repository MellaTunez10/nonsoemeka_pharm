import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md ${className}`}
    />
  );
};

export const ProductSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl p-4 space-y-4">
    <Skeleton className="aspect-square w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <div className="flex items-center justify-between pt-2">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
  </div>
);
