import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faGlobe, faDollarSign, faTools, faRecycle, faComments } from '@fortawesome/free-solid-svg-icons';

const Objectives = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Our Goals and Objectives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Expand Rental Offerings */}
        <div className="text-center">
          <FontAwesomeIcon icon={faMotorcycle} className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Expand Rental Offerings</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Increase the variety of rental categories to include bikes, scooters, cars, homes, flats, rooms, and other options.
          </p>
        </div>

      

        {/* Strengthen Partnerships with Local Vendors */}
        <div className="text-center">
          <FontAwesomeIcon icon={faGlobe} className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Strengthen Partnerships</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Collaborate with local vendors to provide high-quality rental options for customers.
          </p>
        </div>

        {/* Ensure Affordable and Flexible Pricing */}
        <div className="text-center">
          <FontAwesomeIcon icon={faDollarSign} className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Affordable Pricing</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Offer competitive pricing with flexible rental plans to cater to different customer needs.
          </p>
        </div>

        {/* Prioritize Safety and Quality Standards */}
        <div className="text-center">
          <FontAwesomeIcon icon={faTools} className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Prioritize Safety</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Maintain strict quality checks and ensure all vehicles and properties are safe and well-maintained.
          </p>
        </div>

        {/* Promote Sustainable and Eco-Friendly Rentals */}
        <div className="text-center">
          <FontAwesomeIcon icon={faRecycle} className="h-12 w-12 text-teal-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Promote Sustainability</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Encourage eco-friendly practices, such as electric vehicles and sustainable accommodation options.
          </p>
        </div>

        {/* Support Local Communities */}
        <div className="text-center">
          <FontAwesomeIcon icon={faComments} className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Support Local Communities</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Contribute to local economies by offering affordable rental solutions and supporting community projects.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Objectives;
