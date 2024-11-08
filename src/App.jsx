import React from 'react';
import ParentComponent from './components/ParentComponent';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Indian Stock Screener</h1>
            <p className="mt-2 text-sm text-gray-500">
              Filter Indian stocks based on multiple criteria
            </p>
          </div>
          <ParentComponent />
        </div>
      </div>
    </div>
  );
}