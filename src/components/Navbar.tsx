
import { useState } from "react";
import { Menu } from "lucide-react";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-navy text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">MyStore</h1>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4">
          <button 
            onClick={() => onNavigate('login')}
            className={`hover:underline ${currentPage === 'login' ? 'font-bold' : ''}`}
          >
            Login
          </button>
          <button 
            onClick={() => onNavigate('store')}
            className={`hover:underline ${currentPage === 'store' ? 'font-bold' : ''}`}
          >
            Store
          </button>
          <button 
            onClick={() => onNavigate('cart')}
            className={`hover:underline ${currentPage === 'cart' ? 'font-bold' : ''}`}
          >
            Cart
          </button>
          <button 
            onClick={() => onNavigate('chat')}
            className={`hover:underline ${currentPage === 'chat' ? 'font-bold' : ''}`}
          >
            Chat
          </button>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          <button 
            onClick={() => {
              onNavigate('login');
              setMobileMenuOpen(false);
            }}
            className={`py-2 hover:bg-blue-800 rounded ${currentPage === 'login' ? 'font-bold' : ''}`}
          >
            Login
          </button>
          <button 
            onClick={() => {
              onNavigate('store');
              setMobileMenuOpen(false);
            }}
            className={`py-2 hover:bg-blue-800 rounded ${currentPage === 'store' ? 'font-bold' : ''}`}
          >
            Store
          </button>
          <button 
            onClick={() => {
              onNavigate('cart');
              setMobileMenuOpen(false);
            }}
            className={`py-2 hover:bg-blue-800 rounded ${currentPage === 'cart' ? 'font-bold' : ''}`}
          >
            Cart
          </button>
          <button 
            onClick={() => {
              onNavigate('chat');
              setMobileMenuOpen(false);
            }}
            className={`py-2 hover:bg-blue-800 rounded ${currentPage === 'chat' ? 'font-bold' : ''}`}
          >
            Chat
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
