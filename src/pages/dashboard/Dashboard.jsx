import React from "react";
import {
  Users,
  Plane,
  Calendar,
  CreditCard,
  TrendingUp,
  Map,
} from "lucide-react";
import { FadeIn } from "../../animations/FadeIn";

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="bg-blue-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <TrendingUp
        className={`w-4 h-4 ${trend >= 0 ? "text-green-500" : "text-red-500"}`}
      />
      <span
        className={`ml-1 ${trend >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {Math.abs(trend)}%
      </span>
      <span className="text-gray-500 text-sm ml-2">vs last month</span>
    </div>
  </div>
);

export const DashboardPage = () => {
  const stats = [
    { title: "Total Clients", value: "1,284", icon: Users, trend: 12 },
    { title: "Active Tours", value: "42", icon: Plane, trend: 8 },
    { title: "Upcoming Bookings", value: "156", icon: Calendar, trend: -3 },
    { title: "Monthly Revenue", value: "$52,147", icon: CreditCard, trend: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <FadeIn key={stat.title} delay={index * 0.1}>
            <StatCard {...stat} />
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn delay={0.4}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <div className="space-y-4">
              {[
                "Paris, France",
                "Tokyo, Japan",
                "New York, USA",
                "Rome, Italy",
              ].map((destination) => (
                <div
                  key={destination}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Map className="w-5 h-5 text-gray-400 mr-3" />
                    <span>{destination}</span>
                  </div>
                  <span className="text-blue-600 font-medium">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                "New booking: Paris Tour Package",
                "Client feedback received",
                "Tour guide assigned: Tokyo Adventure",
                "Payment processed: Rome Vacation",
              ].map((activity) => (
                <div key={activity} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
