
import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setIsLoading(true);
      // Simulate login process
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to MyStore</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>
        
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full p-3 ${
            isLoading ? "bg-blue-400" : "bg-primary hover:bg-blue-700"
          } text-white rounded-lg transition-colors flex justify-center items-center`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
