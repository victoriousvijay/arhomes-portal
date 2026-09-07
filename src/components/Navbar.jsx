import React from 'react';

export const Navbar = ({ onStartChat }) => {
  return (
    <header className="relative z-20 w-full px-6 md:px-12 lg:px-16 pt-6">
      <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
        {/* Left: AR Homes Brand Logo */}
        <a href="#" className="flex items-center gap-3 select-none group">
          <img
            src="/ar-homes-logo.jpg"
            alt="AR Homes Logo"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-wider text-white leading-tight">
              AR HOMES
            </span>
            <span className="text-[10px] tracking-widest text-gray-300 uppercase font-light hidden sm:inline-block">
              Ghar Bethe, Ghar Dekho
            </span>
          </div>
        </a>

        {/* Center (hidden on mobile, visible md+): Links "Story", "Investing", "Building", "Advisory" */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white">
          <a href="#story" className="hover:text-gray-300 transition-colors">
            Story
          </a>
          <a href="#investing" className="hover:text-gray-300 transition-colors">
            Investing
          </a>
          <a href="#building" className="hover:text-gray-300 transition-colors">
            Building
          </a>
          <a href="#advisory" className="hover:text-gray-300 transition-colors">
            Advisory
          </a>
        </div>

        {/* Right: "Start a Chat" button */}
        <button
          type="button"
          onClick={onStartChat}
          className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Start a Chat
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
