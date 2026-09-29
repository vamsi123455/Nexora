import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Shield,
  Briefcase,
  User as UserIcon,
  Lock,
  Mail,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthMode, AuthTargetRole } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    authTargetRole,
    closeAuthModal,
    openAuthModal,
    loginWithCredentials,
    signupWithCredentials,
    users
  } = useApp();

  const [mode, setMode] = useState<AuthMode>(authModalMode || 'login');
  const [selectedRole, setSelectedRole] = useState<AuthTargetRole>(authTargetRole || 'STUDENT');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCollegeOrCompany, setSignupCollegeOrCompany] = useState('');

  // Sync mode and role when modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setSelectedRole(authTargetRole);
    if (authTargetRole === 'STUDENT') {
      setLoginEmail('student@nexora.edu');
      setLoginPassword('student123');
    } else if (authTargetRole === 'ADMIN') {
      setLoginEmail('admin@nexora.network');
      setLoginPassword('admin123');
    } else {
      setLoginEmail('udayphanindravamsikoyya@gmail.com');
      setLoginPassword('founder123');
    }
  }, [authModalMode, authTargetRole, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleRoleSelect = (role: AuthTargetRole) => {
    setSelectedRole(role);
    if (role === 'STUDENT') {
      setLoginEmail('student@nexora.edu');
      setLoginPassword('student123');
    } else if (role === 'ADMIN') {
      setLoginEmail('admin@nexora.network');
      setLoginPassword('admin123');
    } else {
      setLoginEmail('udayphanindravamsikoyya@gmail.com');
      setLoginPassword('founder123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithCredentials(loginEmail, loginPassword, selectedRole);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) return;
    signupWithCredentials(
      signupName,
      signupEmail,
      signupPassword,
      selectedRole,
      selectedRole === 'STUDENT' ? 'Student' : selectedRole === 'ADMIN' ? 'Professional' : 'Professional'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] shadow-2xl p-6 relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Brand Title */}
        <div className="text-center pb-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 text-white font-display font-extrabold text-lg shadow-md shadow-cyan-500/20 mb-2">
            N
          </div>
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back to NEXORA' : 'Create Your NEXORA Account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {mode === 'login'
              ? 'Sign in to access your Striver A2Z Sheet progress & network'
              : 'Join students, engineers, and administrators worldwide'}
          </p>
        </div>

        {/* Mode Switcher Tabs (Login vs Signup) */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selector Badges (Student vs Admin vs Engineer) */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
            Select Portal Account Type:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleRoleSelect('STUDENT')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                selectedRole === 'STUDENT'
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <GraduationCap className="h-4 w-4 mb-1" />
              <span className="text-[11px] leading-none">Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('ADMIN')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                selectedRole === 'ADMIN'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Shield className="h-4 w-4 mb-1" />
              <span className="text-[11px] leading-none">Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('PROFESSIONAL')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                selectedRole === 'PROFESSIONAL'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Briefcase className="h-4 w-4 mb-1" />
              <span className="text-[11px] leading-none">Engineer</span>
            </button>
          </div>
        </div>

        {/* 1-Click Demo Shortcut Info */}
        <div className="mb-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-600 dark:text-slate-300">
              {selectedRole === 'STUDENT'
                ? 'Demo Student: Rohan Sharma (IIT Delhi)'
                : selectedRole === 'ADMIN'
                ? 'Demo Admin: Aditi Rao (Platform Admin)'
                : 'Demo Engineer: Vamsi Koyya (Founder)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (selectedRole === 'STUDENT') {
                loginWithCredentials('student@nexora.edu', 'student123', 'STUDENT');
              } else if (selectedRole === 'ADMIN') {
                loginWithCredentials('admin@nexora.network', 'admin123', 'ADMIN');
              } else {
                loginWithCredentials('udayphanindravamsikoyya@gmail.com', 'founder123', 'FOUNDER');
              }
            }}
            className="text-[11px] font-semibold text-cyan-500 hover:underline flex items-center gap-0.5"
          >
            <span>1-Click Sign In</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Login Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address:
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="name@nexora.edu"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Password:
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/25 hover:bg-cyan-400 active:scale-95 transition-all mt-2"
            >
              Sign In as {selectedRole}
            </button>
          </form>
        ) : (
          /* Signup Form */
          <form onSubmit={handleSignupSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name:
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  placeholder="e.g. Rohan Sharma"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address:
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  placeholder="e.g. rohan@iitd.ac.in"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {selectedRole === 'STUDENT' ? 'University / College:' : 'Company / Organization:'}
              </label>
              <input
                type="text"
                value={signupCollegeOrCompany}
                onChange={e => setSignupCollegeOrCompany(e.target.value)}
                placeholder={selectedRole === 'STUDENT' ? 'e.g. IIT Delhi' : 'e.g. Nexora Labs'}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Password:
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/25 hover:bg-cyan-400 active:scale-95 transition-all mt-2"
            >
              Register & Start A2Z Sheet
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
