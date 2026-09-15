import React from 'react';
import { Menu, ShieldCheck } from 'lucide-react';

// Header component with compact mobile layout and dynamic title display
function Header({ currentPage, onToggleSidebar }) {
  const pageTitle = currentPage === 'dashboard' ? 'Dashboard' : 'Students';
  const pageSubtitle = currentPage === 'dashboard' 
    ? 'Academic overview & statistics' 
    : 'Manage student records & details';

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 -ml-1 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-none">{pageTitle}</h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1 hidden xs:block">{pageSubtitle}</p>
        </div>
      </div>

      {/* Right Administrator Pill */}
      <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
          <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
        </div>
        <span className="text-[11px] sm:text-xs font-medium text-slate-700">Admin</span>
      </div>
    </header>
  );
}

export default Header;
