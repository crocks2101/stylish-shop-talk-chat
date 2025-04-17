
import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  text: string;
  isBot: boolean;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  
  const quickQuestions = [
    "What products do you recommend?",
    "How much is shipping?",
    "What is your return policy?"
  ];

  // Add welcome message when component mounts
  useEffect(() => {
    setMessages([
      { 
        text: "Welcome to MyStore chat support! How can I help you today?", 
        isBot: true 
      }
    ]);
    
    // Set up suggested questions with a delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "You can ask me about products, shipping, returns, or tap one of these common questions:",
          isBot: true
        }
      ]);
    }, 1000);
  }, []);

  const sendMessage = (text: string = inputText) => {
    if (text.trim() === "") return;
    
    const userMessage: ChatMessage = {
      text: text,
      isBot: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate response after a realistic delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { text: generateBotResponse(text), isBot: true }
      ]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const generateBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return "Hi there! How can I assist you today?";
    } else if (lowerMsg.includes("product")) {
      return "We have amazing products in our Store section! We offer premium quality items at competitive prices.";
    } else if (lowerMsg.includes("price")) {
      return "Our prices range from $15 to $50. Check the Store for more detailed pricing on each product!";
    } else if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
      return "We offer free shipping on all orders over $50, and standard shipping is just $5.99!";
    } else if (lowerMsg.includes("return") || lowerMsg.includes("refund")) {
      return "We have a 30-day return policy. If you're not satisfied, you can return any product within 30 days for a full refund.";
    } else if (lowerMsg.includes("thanks") || lowerMsg.includes("thank you")) {
      return "You're welcome! 😊 Is there anything else I can help you with?";
    } else {
      return "I'm not sure I understand. Can you please rephrase or ask about our products, shipping, or return policy?";
    }
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleQuickQuestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Customer Support</h2>
      
      <div 
        ref={chatBoxRef}
        className="h-96 border rounded-lg p-4 mb-4 overflow-y-auto bg-white shadow-inner"
      >
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-3 p-3 rounded-lg max-w-[80%] ${
              msg.isBot 
                ? "bg-gray-100 text-gray-800 mr-auto" 
                : "bg-primary text-white ml-auto"
            }`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
        
        {isTyping && (
          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%] mr-auto mb-3">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "200ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "400ms" }}></div>
            </div>
          </div>
        )}
        
        {messages.length === 2 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestionClick(question)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-full transition"
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-3 border rounded-lg"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={() => sendMessage()}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
