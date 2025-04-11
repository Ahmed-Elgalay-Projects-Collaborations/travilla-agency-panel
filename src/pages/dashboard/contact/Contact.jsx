import React, { useState } from 'react';
import { FadeIn } from '../../../animations/FadeIn';
import { Phone, Mail, MessageSquare, PlusCircle, Pencil, Trash2 } from 'lucide-react';

const mockContacts = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Customer Support',
    phone: '+1234567890',
    whatsapp: '+1234567890',
    email: 'john@example.com'
  }
];

export const ContactPage = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState({
    name: '',
    role: '',
    phone: '',
    whatsapp: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setContacts(prev => prev.map(contact => 
        contact.id === currentContact.id ? currentContact : contact
      ));
    } else {
      setContacts(prev => [...prev, { ...currentContact, id: Date.now() }]);
    }
    setCurrentContact({
      name: '',
      role: '',
      phone: '',
      whatsapp: '',
      email: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Contact</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Contact' : 'Add New Contact'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={currentContact.name}
                  onChange={(e) => setCurrentContact(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={currentContact.role}
                  onChange={(e) => setCurrentContact(prev => ({ ...prev, role: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={currentContact.phone}
                  onChange={(e) => setCurrentContact(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                <input
                  type="tel"
                  value={currentContact.whatsapp}
                  onChange={(e) => setCurrentContact(prev => ({ ...prev, whatsapp: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={currentContact.email}
                  onChange={(e) => setCurrentContact(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? 'Update Contact' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Contact List</h3>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {contact.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {contact.whatsapp}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {contact.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};