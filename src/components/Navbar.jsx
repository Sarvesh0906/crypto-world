import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Divider, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CottageOutlined, MonetizationOnOutlined, CurrencyExchange, Newspaper } from "@mui/icons-material";

import logo from '../assets/images/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <CottageOutlined fontSize="medium" className="text-blue-600" />,
      activeColor: "text-blue-600 bg-gray-200",
      hover: "hover:text-blue-600"
    },
    {
      label: "Cryptocurrencies",
      path: "/cryptocurrencies",
      icon: <MonetizationOnOutlined fontSize="medium" className="text-green-600" />,
      activeColor: "text-green-600 bg-gray-200",
      hover: "hover:text-green-600"
    },
    {
      label: "Exchanges",
      path: "/exchanges",
      icon: <CurrencyExchange fontSize="medium" className="text-yellow-600" />,
      activeColor: "text-yellow-600 bg-gray-200",
      hover: "hover:text-yellow-600"
    },
    {
      label: "News",
      path: "/news",
      icon: <Newspaper fontSize="medium" className="text-red-600" />,
      activeColor: "text-red-600 bg-gray-200",
      hover: "hover:text-red-600"
    },
  ];

  // MUI Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full bg-gray-800 text-white border-r border-gray-200 p-4 flex-col">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="bg-blue-500">
            <img src={logo} alt="logo" />
          </Avatar>

          <Link to="/" className="text-3xl font-semibold no-underline">
            CryptoWorld
          </Link>
        </div>

        <Divider className="bg-gray-100" />

        {/* Navigation Items */}
        <div className="flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded transition font-semibold ${item.hover} hover:bg-gray-100 ${isActive ? item.activeColor : ""}`}
              >
                <span className="min-w-[36px]">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
 
      {/* Mobile Topbar */}
      <div className="lg:hidden sticky top-0 z-50 bg-gray-800 text-white flex flex-col">
        {/* Top bar with logo and menu */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="bg-blue-500">
              <img src={logo} alt="logo" />
            </Avatar>

            <Link to="/" className="text-2xl font-semibold no-underline">
              CryptoWorld
            </Link>
          </div>

          <IconButton
            aria-label="menu"
            aria-controls="nav-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            className="text-white"
            size="large"
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
        </div>

        {/* MUI Menu for navigation */}
        <div className="bg-slate-100 z-50">
          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ color: 'white' }}
          >
            {navItems.map((item) => {
              const isActive = activePath === item.path;
              return (
                <MenuItem
                  key={item.path}
                  onClick={() => {
                    handleMenuItemClick(item.path);
                    handleMenuClose(); // Close menu after selection
                  }}
                  selected={isActive}
                  className={`flex items-center gap-2 py-2 px-3 rounded ${item.hover} ${isActive ? item.activeColor : ""}`}
                >
                  <span>{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      </div>
    </>
  );
};


export default Navbar;
