import { Briefcase, MapPin, TrendingUp } from 'lucide-react';
import React from 'react';


const Body = () => {
  return (
    <div>
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose JOB PORTAL X?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Briefcase className="mx-auto mb-4 text-black " size={48} />
              <h3 className="text-xl font-semibold mb-2">Diverse Opportunities</h3>
              <p className="text-gray-600">
                Explore a wide range of job openings across various industries and roles.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg  hadow-md text-center">
              <MapPin className="mx-auto mb-4 text-black" size={48} />
              <h3 className="text-xl font-semibold mb-2">Location Flexibility</h3>
              <p className="text-gray-600">
                Find jobs that match your preferred location, including remote opportunities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <TrendingUp className="mx-auto mb-4 text-black" size={48} />
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Access resources and tools to help you advance in your professional journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
