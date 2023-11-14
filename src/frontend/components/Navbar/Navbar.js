import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { authToken } = useSelector((state) => state.auth);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <NavLink to="/" className="text-xl font-bold">
            Elysium OS
          </NavLink>
        </div>
        <div className="flex items-center">
          <NavLink to="/arena" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            The Arena
          </NavLink>
          <NavLink to="/marketplace" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Marketplace
          </NavLink>
          <NavLink to="/automation-station" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Automation Station
          </NavLink>
          {authToken ? (
            <NavLink to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </NavLink>
          ) : (
            <NavLink to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;