import React, { useState } from "react";
import { FadeIn } from "../../../animations/FadeIn";
import { Star } from "lucide-react";

const mockRatings = [
  {
    id: 1,
    type: "trip",
    tripName: "Paris Adventure",
    rating: 5,
    comment: "Amazing experience!",
    userName: "John Doe",
    date: "2024-03-15",
  },
  {
    id: 2,
    type: "hotel",
    hotelName: "Luxury Resort",
    rating: 4,
    comment: "Great stay, wonderful service",
    userName: "Jane Smith",
    date: "2024-03-10",
  },
];

export const RatingsPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterYear, setFilterYear] = useState("2024");

  const filteredRatings = mockRatings.filter((rating) => {
    const matchesType = filterType === "all" || rating.type === filterType;
    const matchesYear = rating.date.startsWith(filterYear);
    return matchesType && matchesYear;
  });

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customer Ratings</h2>
          <div className="flex space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Types</option>
              <option value="trip">Trips</option>
              <option value="hotel">Hotels</option>
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredRatings.map((rating) => (
            <div key={rating.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {rating.type === "trip"
                      ? rating.tripName
                      : rating.hotelName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    by {rating.userName} •{" "}
                    {new Date(rating.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-gray-600">{rating.comment}</p>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {rating.type === "trip" ? "Trip" : "Hotel"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};
