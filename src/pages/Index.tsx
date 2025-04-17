
import { useState } from "react";
import Navbar from "@/components/Navbar";
import LoginPage from "@/components/LoginPage";
import StorePage from "@/components/StorePage";
import CartPage from "@/components/CartPage";
import ChatPage from "@/components/ChatPage";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";

// Product type
interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<string>("login");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Sample product data
  const products: Product[] = [
    { id: 1, name: "Stylish Headphones", price: 25, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=350&fit=crop" },
    { id: 2, name: "Smart Watch", price: 40, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=350&fit=crop" },
    { id: 3, name: "Vintage Camera", price: 15, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=350&fit=crop" },
    { id: 4, name: "Sunglasses", price: 35, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=350&fit=crop" },
    { id: 5, name: "Designer Backpack", price: 50, img: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&h=350&fit=crop" },
    { id: 6, name: "Wireless Earbuds", price: 20, img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=350&fit=crop" },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("store");
  };

  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
      setCartItems(prev => [...prev, productToAdd]);
      setCurrentPage("cart");
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleNavigate = (page: string) => {
    if (page === "login" && isLoggedIn) {
      // If already logged in, don't go back to login
      return;
    }
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-peach-light to-peach-dark">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      
      <div className="container mx-auto py-6 flex-grow">
        {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
        {currentPage === "store" && <StorePage products={products} onAddToCart={handleAddToCart} />}
        {currentPage === "cart" && <CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />}
        {currentPage === "chat" && <ChatPage />}
      </div>
      
      <Footer />
      
      {/* Chat bubble that appears on all pages except the chat page */}
      {currentPage !== "chat" && (
        <ChatBubble onOpenChat={() => handleNavigate("chat")} />
      )}
    </div>
  );
};

export default Index;
