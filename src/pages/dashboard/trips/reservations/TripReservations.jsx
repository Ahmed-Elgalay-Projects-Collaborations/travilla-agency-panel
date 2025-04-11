import React, { useState } from "react";
import { FadeIn } from "../../../../animations/FadeIn";
import { Search, Filter } from "lucide-react";

const mockReservations = [
  {
    id: 1,
    tripName: "Paris Adventure",
    customerName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    seats: 2,
    totalPrice: 2598,
    status: "confirmed",
    bookingDate: "2024-03-15",
  },
  {
    id: 2,
    tripName: "Tokyo Explorer",
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    seats: 1,
    totalPrice: 1499,
    status: "pending",
    bookingDate: "2024-03-14",
  },
];

export const TripReservationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReservations = mockReservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.tripName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trip Reservations</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trip Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation.tripName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: #{reservation.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {reservation.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Seats: {reservation.seats}
                    </div>
                    <div className="text-sm text-gray-900">
                      Total: ${reservation.totalPrice}
                    </div>
                    <div className="text-sm text-gray-500">
                      Booked:{" "}
                      {new Date(reservation.bookingDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        reservation.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        reservation.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      }
                      ${
                        reservation.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                    `}
                    >
                      {reservation.status.charAt(0).toUpperCase() +
                        reservation.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
};
