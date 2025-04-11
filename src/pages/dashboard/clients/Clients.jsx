import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ClientTable } from "../../../components/ClientTable";

const initialClients = [
  {
    id: 1,
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop",
    name: "Company 101",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar tempus odio et elementum. Proin...",
  },
  {
    id: 2,
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop",
    name: "Company 102",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar tempus odio et elementum. Proin...",
  },
];

export const ClientsPage = () => {
  const [clients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <PlusCircle className="w-5 h-5" />
          <span>Add New</span>
        </button>
      </div>

      <ClientTable
        clients={clients}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};
