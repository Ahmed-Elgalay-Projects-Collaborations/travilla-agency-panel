import React, { useState, useRef, useEffect } from 'react';
import { FadeIn } from '../../../animations/FadeIn';
import { Send, Search } from 'lucide-react';

const mockChats = [
  {
    id: 1,
    customerName: 'John Doe',
    lastMessage: 'Thank you for your help!',
    timestamp: '2024-03-15T10:30:00',
    unread: 2,
    messages: [
      {
        id: 1,
        sender: 'customer',
        content: 'Hi, I have a question about my booking',
        timestamp: '2024-03-15T10:25:00'
      },
      {
        id: 2,
        sender: 'employee',
        content: 'Hello! How can I help you today?',
        timestamp: '2024-03-15T10:27:00'
      },
      {
        id: 3,
        sender: 'customer',
        content: 'Thank you for your help!',
        timestamp: '2024-03-15T10:30:00'
      }
    ]
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    lastMessage: 'When is the check-in time?',
    timestamp: '2024-03-15T09:45:00',
    unread: 1,
    messages: [
      {
        id: 1,
        sender: 'customer',
        content: 'When is the check-in time?',
        timestamp: '2024-03-15T09:45:00'
      }
    ]
  }
];

export const ChatsPage = () => {
  const [chats, setChats] = useState(mockChats);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const filteredChats = chats.filter(chat =>
    chat.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'employee',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: newMessage
        };
      }
      return chat;
    }));

    setNewMessage('');
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6">Customer Support Chat</h2>
        
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <div className="col-span-4 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{chat.customerName}</h3>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">
                        {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {chat.unread > 0 && (
                        <span className="mt-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-8 bg-white rounded-lg shadow-md overflow-hidden">
            {selectedChat ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h3 className="font-medium">{selectedChat.customerName}</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'employee' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'employee'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'employee' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};