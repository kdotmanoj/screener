import React from 'react';
import ParentComponent from './components/ParentComponent';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="w-4/5 mx-auto px-4 sm:px-6 lg:px-6 py-6 bg-white rounded-2xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-sans text-gray-900">Query Results</h1>
          </div>
          <ParentComponent />
        </div>
      </div>
    </div>
  );
}
