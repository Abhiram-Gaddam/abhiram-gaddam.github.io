import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 Gaddam Abhiram. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/Abhiram-Gaddam" className="hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/abhiramgaddam/" className="hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="gaddamabhiram.53@gmail.com" className="hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;