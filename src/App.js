import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Loading from './pages/Loading';
import { useState , useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Switch to the home page after 3 seconds
    }, 1500);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
      { isLoading? <Loading/> :<Navbar /> } 
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={ isLoading ?  <> </> : <Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/loading' element={<Loading/>} />
          </Routes>
          <Footer />
        </main>
       
      </div>
    </Router>
  );
}

export default App;