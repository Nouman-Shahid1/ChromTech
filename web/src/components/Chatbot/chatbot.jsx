"use client";
import { useState } from "react";
import { FaTimes, FaRegCommentDots } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm the Chrom Tech Virtual Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    const responses = [
      {
        pattern: /(hello|hi|hey|hy)/,
        reply: "Hello! How can I assist you today?",
      },
      {
        pattern: /(order|place an order|buy|purchase)/,
        reply:
          "To place an order, please visit our orders page or contact our sales team.",
      },
      {
        pattern: /(help|assist|support)/,
        reply:
          "I'm here to assist you! Please describe what you need help with.",
      },
      {
        pattern: /(contact|reach|phone|email)/,
        reply:
          "You can reach us at support@chromtech.com or call us at (123) 456-7890.",
      },
      {
        pattern: /(hours|open|close|timing)/,
        reply: "We operate from 8 AM to 4:30 PM CST, Monday to Friday.",
      },
      {
        pattern: /(pricing|cost|quote|price)/,
        reply:
          "For pricing information, please visit our pricing page or contact our sales team.",
      },
      {
        pattern: /(refund|return)/,
        reply:
          "Refund requests can be made by contacting our support team. Please provide your order number for assistance.",
      },
      {
        pattern: /(shipping|delivery|track)/,
        reply:
          "We offer standard and expedited shipping options. You can track your order on our website.",
      },
      {
        pattern: /(issue|problem|error|bug)/,
        reply:
          "Our support team is here to help! Please describe the issue you're facing.",
      },
      {
        pattern: /(location|address|where)/,
        reply: "Our main office is located at 123 Main St, Anytown, USA.",
      },
      {
        pattern: /(services|products|what do you offer)/,
        reply:
          "We offer software development, IT consulting, cloud solutions, and more. Visit our services page for details.",
      },
      {
        pattern: /(job|career|vacancy|hiring)/,
        reply:
          "We are always looking for talented individuals. Please visit our careers page for job openings.",
      },
      {
        pattern: /(thank you|thanks|appreciate)/,
        reply:
          "You're welcome! If you have any more questions, feel free to ask.",
      },
      { pattern: /(bye|goodbye|exit)/, reply: "Goodbye! Have a great day!" },
      {
        pattern: /(.*)/,
        reply:
          "I'm not sure how to respond to that. Could you please rephrase or provide more details?",
      },
    ];

    for (let response of responses) {
      if (response.pattern.test(message)) {
        return response.reply;
      }
    }

    return "I'm not sure how to respond to that. Could you please rephrase?";
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");
      setLoading(true);

      const botReply = getResponse(newMessage);
      const botMessage = { text: botReply, sender: "bot" };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
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
          className="rounded-lg shadow-xl border border-gray-300"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "340px",
            maxHeight: "500px",
            overflowY: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className="bg-red-600 text-white p-3 rounded-t-lg flex justify-center">
            <span className="font-semibold">Chrom Tech Assistant</span>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow ${
                    message.sender === "bot"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-500 text-white"
                  }`}
                  style={{
                    maxWidth: "70%",
                    wordBreak: "break-word",
                    margin: "5px 0",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="my-4 flex items-center border-t border-gray-200 pt-3 px-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              className="ml-2 p-2 text-red-600 hover:text-red-700"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
