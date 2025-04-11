import React from 'react';
import { Plane, Hotel, Car, Compass, Camera, Coffee } from 'lucide-react';
import { FadeIn } from "../../../animations/FadeIn";

const ServiceCard= ({ title, description, icon: Icon}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const ServicesPage = () => {
  const services = [
    {
      title: 'Flight Booking',
      description: 'Find and book the best flights with top airlines worldwide.',
      icon: Plane
    },
    {
      title: 'Hotel Reservations',
      description: 'Book accommodations from luxury hotels to cozy apartments.',
      icon: Hotel
    },
    {
      title: 'Car Rentals',
      description: 'Rent vehicles for convenient travel at your destination.',
      icon: Car
    },
    {
      title: 'Tour Packages',
      description: 'Comprehensive travel packages for unforgettable experiences.',
      icon: Compass
    },
    {
      title: 'Photography Tours',
      description: 'Specialized tours for photography enthusiasts.',
      icon: Camera
    },
    {
      title: 'Local Experiences',
      description: 'Authentic local experiences and cultural activities.',
      icon: Coffee
    }
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <ServiceCard {...service} />
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};