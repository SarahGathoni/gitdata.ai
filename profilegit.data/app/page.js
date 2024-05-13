'use client'
import { useState } from 'react';

const Chatbot = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: inputValue }),
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const responseData = await response.json();
      console.log(responseData)
      
      const generatedText = responseData.message;
      
      // Update the chat history with the new message
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        { sender: 'user', message: inputValue },
        { sender: 'bot', message: generatedText },
      ]);
      
      setInputValue('');
      setResponse(generatedText); // Set the response text
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="w-96 mx-auto mt-20 rounded-lg bg-opacity-25 backdrop-filter backdrop-blur-md bg-white p-4 shadow-lg">
      {response || chatHistory.length > 0 ? (
        <div className="overflow-y-auto h-64">
          {chatHistory.map((chatItem, index) => (
            <div
              key={index}
              className={`py-1 text-black ${
                chatItem.sender === 'user' ? 'text-left' : 'text-right'
                
              }`}
            >
              <span className="inline-block rounded-lg  py-1 px-3 text-black max-w-xs shadow-lg">
              {chatItem.message}
      </span>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-4xl font-semibold mb-10 top-20 left-0 right-0 font-sans">Welcome to Gitty</h2>
      )}
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 bg-black text-white rounded-full p-2 px-4 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
