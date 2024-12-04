"use client"; // This line should be the first line in the file
import React, { useState } from "react";

const Messages = () => {
  // Sample data for messages and conversations
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Jane Doe",
      subject: "Regarding the Web Development project",
      preview: "Hi, I’m interested in your web development project. Can we discuss...",
      timestamp: "2024-11-20 10:30 AM",
    },
    {
      id: 2,
      sender: "Mark Smith",
      subject: "Questions about your job posting",
      preview: "Hello, I have a few questions regarding the budget and timeline...",
      timestamp: "2024-11-19 02:15 PM",
    },
    {
      id: 3,
      sender: "Emily Johnson",
      subject: "Project Proposal for Content Writing",
      preview: "Hi! I’ve attached my proposal for your content writing project...",
      timestamp: "2024-11-18 08:45 AM",
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  // Handle selecting a message
  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <div className="flex">
        {/* Left Side: Message List */}
        <div className="w-1/3 bg-gray-800 p-4 rounded-lg mr-4">
          <h3 className="font-semibold text-lg mb-4">Recent Conversations</h3>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleMessageSelect(message)}
                className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg"
              >
                <div className="font-semibold">{message.sender}</div>
                <div className="text-sm text-gray-400">{message.subject}</div>
                <div className="text-xs text-gray-500">{message.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Message Details */}
        <div className="w-2/3 bg-gray-800 p-4 rounded-lg">
          {selectedMessage ? (
            <>
              <h3 className="font-semibold text-lg mb-4">{selectedMessage.subject}</h3>
              <div className="text-sm text-gray-400 mb-2">
                <strong>From: </strong> {selectedMessage.sender}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                <strong>Sent: </strong> {selectedMessage.timestamp}
              </div>
              <div className="text-white">
                <p>{selectedMessage.preview}</p>
                {/* You can add more details here, such as the full conversation */}
                <div className="mt-4">
                  <textarea
                    className="w-full h-24 p-3 bg-gray-700 text-white rounded-md"
                    placeholder="Reply to this message..."
                  ></textarea>
                  <button className="mt-2 w-full py-2 px-4 bg-green-600 text-white rounded-md">
                    Send Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400">
              <p>Select a message to view the conversation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
