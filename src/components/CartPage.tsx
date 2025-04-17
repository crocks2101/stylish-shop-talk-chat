
import { useEffect, useRef, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface CartPageProps {
  cartItems: Product[];
  onRemoveFromCart: (index: number) => void;
}

const CartPage = ({ cartItems, onRemoveFromCart }: CartPageProps) => {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    // We'd normally use a QR code library here, but for simplicity
    // we'll just show a placeholder message
    const canvas = qrCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.fillText(`Payment: $${total}`, 20, 64);
        
        // Draw a simple QR code pattern
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        // Outer square
        ctx.strokeRect(10, 10, 108, 108);
        // Inner patterns
        ctx.fillRect(20, 20, 20, 20);
        ctx.fillRect(88, 20, 20, 20);
        ctx.fillRect(20, 88, 20, 20);
        // Center pattern
        ctx.fillRect(48, 48, 32, 32);
      }
    }
  }, [total]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 2000);
  };

  if (checkoutComplete) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-500 my-4">Your cart is empty</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <ul className="divide-y">
              {cartItems.map((item, index) => (
                <li 
                  key={index} 
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveFromCart(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
              <span>Total</span>
              <span>${(total + 5.99).toFixed(2)}</span>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">Scan to pay:</p>
                <canvas ref={qrCanvasRef} width="128" height="128" className="bg-white border mx-auto md:mx-0" />
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full p-3 ${
                    isCheckingOut ? "bg-blue-400" : "bg-primary hover:bg-blue-700"
                  } text-white rounded-lg transition-colors flex justify-center items-center`}
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
