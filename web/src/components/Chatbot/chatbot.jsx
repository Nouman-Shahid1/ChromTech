"use client";
import { useState } from "react";
import { FaTimes, FaRegCommentDots, FaChevronLeft } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false); 
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm the Chrom Tech Virtual Assistant and I will direct you to the correct person.",
      sender: "bot",
    },
    { text: "What can I help you with today?", sender: "bot" },
  ]);
  const [newMessage, setNewMessage] = useState(""); 
  const handleOptionClick = (option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: option, sender: "user" },
      {
        text: "Thank you for reaching out, but we are currently unavailable (we operate from 8AM - 4:30 PM CST, although we may have stopped answering queries for the day).",
        sender: "bot",
      },
    ]);
  };

  const toggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: "user" },
        {
          text: "Thank you for reaching out, but we are currently unavailable (we operate from 8AM - 4:30 PM CST, although we may have stopped answering queries for the day).",
          sender: "bot",
        },
      ]);
      setNewMessage(""); 
    }
  };

  return (
    <div className="fixed bottom-10 right-10 w-80 font-sans">
      <button
        className="p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRegCommentDots size={24} />}
      </button>

      {isOpen && (
        <div
          className="rounded-lg shadow-lg border border-gray-200"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "450px",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          
          {isChatListOpen ? (
            <div className="bg-white p-4">
              <div className="flex items-center justify-between bg-red-600 text-white p-3 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <FaChevronLeft size={20} onClick={toggleChatList} className="cursor-pointer" />
                  <span className="font-semibold">Your Chats</span>
                </div>
              </div>
              <div className="p-4 space-y-4">
                
                <div className="bg-gray-200 p-3 rounded-md">
                  <p>Chrom Tech Virtual Assistant: Thank you for reaching out, but we are currently unavailable...</p>
                  <span className="text-gray-500 text-sm">52 min ago</span>
                </div>
                <div className="bg-gray-200 p-3 rounded-md">
                  <p>Agent: Thank you for reaching out, but we are currently unavailable...</p>
                  <span className="text-gray-500 text-sm">7 hr ago</span>
                </div>
                <div className="bg-gray-200 p-3 rounded-md">
                  <p>Agent: Thank you for reaching out, but we are currently unavailable...</p>
                  <span className="text-gray-500 text-sm">8 hr ago</span>
                </div>
                <div className="bg-gray-200 p-3 rounded-md">
                  <p>Agent: Thank you for reaching out, but we are currently unavailable...</p>
                  <span className="text-gray-500 text-sm">9 hr ago</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-4">
              <div className="flex items-center justify-between bg-red-600 text-white p-3 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <FaChevronLeft size={20} onClick={toggleChatList} className="cursor-pointer" />
                  <img
                    src="/path/to/your-icon.png"
                    alt="Assistant Icon"
                    className="w-8 h-8 rounded-full bg-white p-1"
                  />
                  <span className="font-semibold">Chrom Tech Virtual Assistant</span>
                </div>
              </div>
              <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md ${
                      message.sender === "bot" ? "bg-gray-200 text-gray-800 text-left" : "bg-red-600 text-white text-right"
                    }`}
                    style={{
                      maxWidth: message.sender === "user" ? "50%" : "80%",
                      wordWrap: "break-word",
                      marginLeft: message.sender === "user" ? "auto" : "0",
                      borderRadius: "10px",
                      padding: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  className="border border-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-200 hover:text-gray-800"
                  onClick={() => handleOptionClick("Place an Order")}
                >
                  Place an Order
                </button>
                <button
                  className="border border-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-200 hover:text-gray-800"
                  onClick={() => handleOptionClick("Check On An Order")}
                >
                  Check On An Order
                </button>
                <button
                  className="border border-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-200 hover:text-gray-800"
                  onClick={() => handleOptionClick("More Information")}
                >
                  More Information
                </button>
                <button
                  className="border border-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-200 hover:text-gray-800"
                  onClick={() => handleOptionClick("Something Else")}
                >
                  Something Else
                </button>
              </div>
              <div className="mt-8 flex items-center border-t border-gray-100 pt-4">
                <input
                  type="text"
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  placeholder="Write a message"
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  className="ml-2 p-2 text-red-600 hover:text-red-700"
                  onClick={handleSendMessage} 
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
