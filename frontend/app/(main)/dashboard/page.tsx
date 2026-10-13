import React, { Suspense } from 'react';
import DashboardContent from './DashboardContent';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
