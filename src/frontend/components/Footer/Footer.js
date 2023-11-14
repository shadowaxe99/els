import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold">
            Elysium OS
          </Link>
          <p className="text-gray-400 text-sm mt-1">
            Enhancing daily life with AI integration.
          </p>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gray-300">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="text-center text-gray-400 text-xs mt-4">
        &copy; {new Date().getFullYear()} Elysium OS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;