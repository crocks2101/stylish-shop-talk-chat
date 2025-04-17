
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

interface ChatBubbleProps {
  onOpenChat: () => void;
}

const ChatBubble = ({ onOpenChat }: ChatBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);

  // Simulate receiving a message after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNewMessage(true);
    }, 15000);

    return () => clearTimeout(timer);
  });

  const toggleChat = () => {
    if (!isOpen) {
      onOpenChat();
      setHasNewMessage(false);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChat}
        className="bg-primary hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center relative transition-all hover:scale-105"
      >
        {hasNewMessage && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatBubble;
