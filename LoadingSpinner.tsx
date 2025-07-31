
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-emerald-700 text-lg">Generating your sustainable meal plan...</p>
      <p className="text-gray-500 text-center">This may take a moment. Good things are worth the wait!</p>
    </div>
  );
};

export default LoadingSpinner;
