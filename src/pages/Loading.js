import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative">
        {/* Rotating Circle */}
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent border-r-red-500 border-l-green-500 border-b-blue-500  rounded-full animate-spin"></div>
        
        {/* Pulsing Dots */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
