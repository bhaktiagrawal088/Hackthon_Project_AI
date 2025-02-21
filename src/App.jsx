import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import { ThemeProvider } from './component/theme-provider';
import { Toaster } from 'sonner';
import './styles.css'; // Import external CSS for additional styling

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen relative text-white">
          {/* 🔹 Background Image */}
          <div className="absolute inset-0 z-[-1]">
            <img 
              src="https://source.unsplash.com/1600x900/?education,technology" 
              alt="Background" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* 🔹 Navigation Bar */}
          <nav className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <a href="/" className="text-3xl font-extrabold tracking-wide">
                Accessible Learning
              </a>
              <div className="flex gap-6 text-lg">
                <a href="/" className="hover:text-yellow-300 transition duration-300">Home</a>
                <a href="/features" className="hover:text-yellow-300 transition duration-300">Features</a>
                <a 
                  href="https://chat.openai.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  AI Tutor
                </a>
              </div>
            </div>
          </nav>

          {/* 🔹 Main Content */}
          <main className="px-6 py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/features/:feature" element={<Features />} />
            </Routes>
          </main>

          {/* 🔹 Footer */}
          <footer className="bg-gray-900 py-6 mt-12 text-center">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-gray-400 text-lg">
                © {new Date().getFullYear()} Accessible Learning Platform. <br />
                Making education accessible for everyone.
              </p>
              <p>
                <a 
                  href="https://chat.openai.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg"
                >
                  Chat with AI Tutor
                </a>
              </p>
            </div>
          </footer>
        </div>

        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
};

export default App;
