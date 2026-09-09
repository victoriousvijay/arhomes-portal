import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { AdminLogin } from './AdminLogin';
import { 
  Users, 
  Building2, 
  Layers, 
  Settings, 
  DollarSign, 
  BarChart3, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X,
  Phone,
  Mail,
  Home,
  LogOut
} from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { leads, properties, deals } = useSiteData();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeTab = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('arhomes_admin_authenticated') === 'true' ||
           sessionStorage.getItem('arhomes_admin_authenticated') === 'true';
  });

  const handleLogout = () => {
    localStorage.removeItem('arhomes_admin_authenticated');
    sessionStorage.removeItem('arhomes_admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const NAV_ITEMS = [
    {
      label: 'CRM Leads & Enquiries',
      path: '/admin',
      icon: Users,
      badge: leads.length
    },
    {
      label: 'CRM Analytics',
      path: '/admin/analytics',
      icon: BarChart3
    },
    {
      label: 'Deals & Revenue',
      path: '/admin/revenue',
      icon: DollarSign,
      badge: deals.length
    },
    {
      label: 'CMS Properties & Land',
      path: '/admin/properties',
      icon: Building2,
      badge: properties.length
    },
    {
      label: 'CMS Page Content',
      path: '/admin/pages',
      icon: Layers
    },
    {
      label: 'Global Settings & Contact',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/ar-homes-logo.jpg"
              alt="AR Homes Logo"
              className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]/80 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-wider text-slate-900 text-sm">AR HOMES</span>
                <span className="px-1.5 py-0.5 rounded bg-[#013724] text-white text-[9px] font-bold uppercase tracking-widest">
                  CMS • CRM
                </span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">Executive Admin Portal</span>
            </div>
          </Link>
        </div>

        {/* Center/Right Status & Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-slate-700">
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isSupabaseConfigured ? 'Supabase Live (ap-south-1)' : 'Local Storage Mode'}</span>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-all"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#013724]" />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-all cursor-pointer"
            title="Log Out of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200 p-5 space-y-1 bg-white select-none">
          <div className="px-3 pb-3 text-[10px] uppercase tracking-widest text-[#013724] font-bold">
            Portal Control Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#013724] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 border-t border-slate-200 mt-6 space-y-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#013724]" />
                <span>Unified Database Sync</span>
              </div>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                Changes saved in CMS & CRM update instantly across your production website without code rebuilds.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 z-40 bg-white border-b border-slate-200 p-4 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold ${
                    isSelected ? 'bg-[#013724] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                handleLogout();
                setMobileNavOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Log Out</span>
              </div>
            </button>
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto bg-[#F8FAFC] min-h-[calc(100vh-60px)]">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
