
import ProductCard from "./ProductCard";
import { useState } from "react";
import { Search } from "lucide-react";
import HeroSection from "./HeroSection";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface StorePageProps {
  products: Product[];
  onAddToCart: (id: number) => void;
}

const StorePage = ({ products, onAddToCart }: StorePageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <HeroSection onStartShopping={() => {
        setSearchQuery("");
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }} />
      
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Our Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of high-quality products designed for your lifestyle.
          </p>
        </div>
        
        <div className="relative max-w-md mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No products found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default StorePage;
