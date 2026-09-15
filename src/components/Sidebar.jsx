import React from 'react';
import { LayoutDashboard, Users, GraduationCap, X } from 'lucide-react';

// Sidebar component providing responsive slide-out navigation for mobile and persistent rail for desktop
function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
  ];

  return (
    <>
      {/* Mobile backdrop overlay with smooth fade */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 sm:h-16 flex items-center justify-between px-5 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs shadow-blue-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">Student Hub</h1>
              <p className="text-[11px] text-slate-400">Management System</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-5 space-y-1.5">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 sm:py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom session label */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-xs font-medium text-slate-700">Academic Portal</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Session 2025–26</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
