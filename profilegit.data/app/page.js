'use client'
import { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    setChat([...chat, { sender: 'user', message }]);
    setMessage('');
    // Here you can add logic to send the message to a backend or process it further
  };

  return (
    <div className="w-96 mx-auto mt-20 rounded-lg bg-opacity-25 backdrop-filter backdrop-blur-md bg-white p-4 shadow-lg">
      <div className="overflow-y-auto h-64">
        {chat.map((item, index) => (
          <div
            key={index}
            className={`py-1 ${
              item.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span className="inline-block rounded-lg bg-blue-400 py-1 px-3 text-white max-w-xs shadow-lg">
              {item.message}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleMessageChange}
          className="flex-1 rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-black text-white rounded-full p-2 px-4 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
