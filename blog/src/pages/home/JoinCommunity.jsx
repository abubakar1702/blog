import React from 'react';

const JoinCommunity = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-red-500 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-96">
          {/* Image Section */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
              alt="Person writing in notebook"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Join Our Community of Innovators
            </h2>
            
            <p className="text-lg mb-8 text-red-100 leading-relaxed">
              Share your insights and expertise on various topics with our global audience.
            </p>
            
            <button className="bg-white text-red-500 px-8 py-4 rounded font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 w-fit">
              Contribute Your Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;