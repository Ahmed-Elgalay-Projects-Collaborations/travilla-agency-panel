import React from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';

export const ClientTable = ({ clients, searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select className="border rounded px-2 py-1">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Search:</span>
            <div className="relative">
              <input
                type="text"
                className="border rounded px-3 py-1 pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-6 py-4 whitespace-nowrap">{client.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={client.logo} alt={client.name} className="w-12 h-12 rounded-lg object-cover" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
              <td className="px-6 py-4">{client.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button className="p-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            Showing 1 to {clients.length} of {clients.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600 hover:bg-gray-100" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600 hover:bg-gray-100" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};