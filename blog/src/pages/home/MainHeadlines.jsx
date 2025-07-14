import React from "react";
import pic1 from "../../assets/demo-1.jpg";
import pic2 from "../../assets/demo-2.jpg";
import pic3 from "../../assets/demo-3.jpg";

const MainHeadlines = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Row - now outside the grid */}
      <div className="flex justify-between items-center border-b pb-2 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-red-600 pl-3">
          Top Stories
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-red-600 hover:underline flex items-center space-x-1"
        >
          <span>View All</span>
          <span>→</span>
        </a>
      </div>
      
      {/* Grid for content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Main Story */}
        <div className="relative col-span-2">
          <img
            src={pic1}
            alt="Main"
            className="w-full h-[380px] object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent w-full rounded-b-lg">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              HEALTH
            </span>
            <h2 className="mt-2 text-2xl font-bold leading-snug">
              Exploring the Connection Between Gut Health and Mental Well-being
            </h2>
            <p className="text-sm text-gray-300 mt-1">February 24, 2025</p>
          </div>
        </div>

        {/* Right - Two Smaller Stories */}
        <div className="flex flex-col gap-6">
          {/* Story 1 */}
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={pic2}
              alt="Swimmer"
              className="w-full md:w-[200px] h-[180px] object-cover rounded-lg"
            />
            <div>
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                SPORTS
              </span>
              <h3 className="mt-2 font-bold text-lg">
                Olympics 2025: The Athletes to Watch
              </h3>
              <p className="text-sm text-gray-600">February 24, 2025</p>
            </div>
          </div>

          {/* Story 2 */}
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={pic3}
              alt="Protest"
              className="w-full md:w-[200px] h-[180px] object-cover rounded-lg"
            />
            <div>
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                POLITICS
              </span>
              <h3 className="mt-2 font-bold text-lg">
                Election 2025: Key Issues Shaping the Campaign Trail
              </h3>
              <p className="text-sm text-gray-600">February 24, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeadlines;