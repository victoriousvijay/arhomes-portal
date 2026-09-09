import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  Building2,
  Sparkles
} from 'lucide-react';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      // Authorized credentials
      if (cleanEmail === 'admin@arhomes.com' && cleanPass === 'arhomes') {
        if (rememberMe) {
          localStorage.setItem('arhomes_admin_authenticated', 'true');
        } else {
          sessionStorage.setItem('arhomes_admin_authenticated', 'true');
        }
        onLoginSuccess();
      } else {
        setErrorMessage('Invalid Admin ID or Password. Please check credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/20 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#013724]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-xl space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-1 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#aa8c2c] shadow-md shadow-[#D4AF37]/20 mb-1">
              <img
                src="/ar-homes-logo.jpg"
                alt="AR Homes Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-widest text-[#013724] font-bold">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Executive Security Desk</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              AR Homes Admin Portal
            </h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Please enter your administrator credentials to manage properties, leads, and website CMS.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-700 text-xs animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Admin ID / Email */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">
                Admin ID / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@arhomes.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724] transition-all"
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#013724] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
                <span className="text-[11px]">Remember login session</span>
              </label>

              <span className="text-[10px] text-slate-400 font-mono">
                AR Homes v2.0
              </span>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#013724] hover:bg-[#024d33] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{isLoading ? 'Verifying Access...' : 'Sign In to Admin Portal'}</span>
            </button>
          </form>

          {/* Footer Back to Site */}
          <div className="text-center pt-3 border-t border-slate-100">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
            >
              <span>Return to Public Website</span>
              <ArrowRight className="w-3 h-3 text-[#013724]" />
            </Link>
          </div>

        </div>

        {/* Security badge note */}
        <div className="text-center mt-4">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-[#013724]" />
            <span>Authorized access only • End-to-end encrypted session</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
