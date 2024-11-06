// components/Chatbot.js
import { useState } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the Chrom Tech Virtual Assistant and I will direct you to the correct person.", sender: 'bot' },
        { text: 'What can I help you with today?', sender: 'bot' },
    ]);

    const handleOptionClick = (option) => {
        setMessages([...messages, { text: option, sender: 'user' }]);
    };

    return (
        <div className="fixed bottom-5 right-5 w-72 rounded-lg shadow-lg font-sans">
            <div
                className="flex items-center justify-between bg-red-600 text-white p-3 cursor-pointer rounded-t-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold">Chrom Tech Virtual Assistant</span>
                <button
                    className="text-white"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>
            </div>
            {isOpen && (
                <div className="bg-white p-4 rounded-b-lg">
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-md ${
                                    message.sender === 'bot'
                                        ? 'bg-gray-100 text-gray-800 text-left'
                                        : 'bg-red-600 text-white text-right'
                                }`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <button
                            className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                            onClick={() => handleOptionClick('Place an Order')}
                        >
                            Place an Order
                        </button>
                        <button
                            className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                            onClick={() => handleOptionClick('Check On An Order')}
                        >
                            Check On An Order
                        </button>
                        <button
                            className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                            onClick={() => handleOptionClick('More Information')}
                        >
                            More Information
                        </button>
                        <button
                            className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                            onClick={() => handleOptionClick('Something Else')}
                        >
                            Something Else
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
