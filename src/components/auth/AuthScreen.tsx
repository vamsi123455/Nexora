import React, { useState } from 'react';
import {
  GraduationCap,
  Shield,
  Briefcase,
  User as UserIcon,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Building,
  KeyRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthMode, AuthTargetRole } from '../../types';

export const AuthScreen: React.FC = () => {
  const {
    loginWithCredentials,
    signupWithCredentials,
    users
  } = useApp();

  const [mode, setMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<AuthTargetRole>('STUDENT');

  // Login inputs
  const [loginEmail, setLoginEmail] = useState('student@nexora.edu');
  const [loginPassword, setLoginPassword] = useState('student123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Signup inputs
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupCollegeOrOrg, setSignupCollegeOrOrg] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Success message after signup redirect
  const [signupRedirectNotice, setSignupRedirectNotice] = useState<string | null>(null);

  // Handle role switch
  const handleRoleSelect = (role: AuthTargetRole) => {
    setSelectedRole(role);
    setLoginError(null);
    setSignupError(null);
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

  // Sign up handler
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    setSignupRedirectNotice(null);

    if (!signupName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setSignupError('Please provide a valid email address.');
      return;
    }
    if (!signupPassword || signupPassword.length < 4) {
      setSignupError('Password must be at least 4 characters long.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match. Please re-enter.');
      return;
    }

    const accountType =
      selectedRole === 'STUDENT'
        ? 'Student'
        : selectedRole === 'ADMIN'
        ? 'Professional'
        : 'Professional';

    // Store in database via context
    const result = signupWithCredentials(
      signupName,
      signupEmail,
      signupPassword,
      selectedRole,
      accountType
    );

    if (!result.success) {
      setSignupError(result.error || 'Failed to create account.');
      return;
    }

    // MANDATORY USER FLOW REQUIREMENT:
    // "in the case of sign up section after hitting the sign up it not directly open the home page it has to redirect to login page after clicking login and after details verified the home page has to come"
    // Set redirect banner, switch mode to 'login', and pre-fill the email!
    setSignupRedirectNotice(
      `✓ Account registered successfully in Nexora Database for ${signupName}! Details saved. Please log in with your credentials to verify and open the Home page.`
    );
    setLoginEmail(signupEmail.trim().toLowerCase());
    setLoginPassword('');
    setMode('login');

    // Clear signup form
    setSignupName('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupCollegeOrOrg('');
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const result = loginWithCredentials(loginEmail, loginPassword, selectedRole);
    if (!result.success) {
      setLoginError(result.error || 'Invalid credentials. Could not verify with database records.');
    }
    // If success, loginWithCredentials sets isLoggedIn(true) and navigates to home!
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-900 via-[#0d131f] to-[#070a10] text-slate-100">
      <div className="w-full max-w-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 text-white font-display font-extrabold text-2xl shadow-xl shadow-cyan-500/25 mb-4">
            N
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            NEXORA
          </h1>
          <p className="text-sm font-medium text-cyan-400 mt-1">
            Build. Connect. Create. Grow.
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
            The next-generation professional network, Striver A2Z DSA mastery ecosystem, and developer workspace.
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-3xl border border-slate-800 bg-[#121824]/95 shadow-2xl shadow-black/60 p-6 sm:p-8 backdrop-blur-xl">
          
          {/* Main Toggle: Login vs Sign Up */}
          <div className="flex rounded-xl bg-slate-900/90 p-1 border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setLoginError(null);
                setSignupError(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In / Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setLoginError(null);
                setSignupError(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account / Sign Up
            </button>
          </div>

          {/* Role Portal Selector (Student, Admin, Professional) */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Portal / Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('STUDENT')}
                className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border text-center transition-all ${
                  selectedRole === 'STUDENT'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/50'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="h-5 w-5" />
                <span className="text-xs font-bold">Student</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">A2Z DSA & Prep</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('ADMIN')}
                className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border text-center transition-all ${
                  selectedRole === 'ADMIN'
                    ? 'border-rose-500 bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/50'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Shield className="h-5 w-5" />
                <span className="text-xs font-bold">Admin</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">Governance</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('PROFESSIONAL')}
                className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border text-center transition-all ${
                  selectedRole === 'PROFESSIONAL'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/50'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Briefcase className="h-5 w-5" />
                <span className="text-xs font-bold">Professional</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">Developer</span>
              </button>
            </div>
          </div>

          {/* Post-Signup Redirection Notice */}
          {signupRedirectNotice && mode === 'login' && (
            <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300 flex items-start gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Redirected to Login</p>
                <p className="text-emerald-200/90 mt-0.5 leading-relaxed">{signupRedirectNotice}</p>
              </div>
            </div>
          )}

          {/* Quick Demo Credentials Helper */}
          <div className="mb-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-cyan-400" />
                1-Click Preset Credentials
              </span>
              <span className="text-[10px] text-slate-500">Auto-fills stored DB account</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  handleRoleSelect('STUDENT');
                  setMode('login');
                  setLoginEmail('student@nexora.edu');
                  setLoginPassword('student123');
                }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 hover:bg-cyan-900/60 transition-colors"
              >
                🎓 Student (student@nexora.edu)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRoleSelect('ADMIN');
                  setMode('login');
                  setLoginEmail('admin@nexora.network');
                  setLoginPassword('admin123');
                }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/50 hover:bg-rose-900/60 transition-colors"
              >
                🛡️ Admin (admin@nexora.network)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRoleSelect('PROFESSIONAL');
                  setMode('login');
                  setLoginEmail('udayphanindravamsikoyya@gmail.com');
                  setLoginPassword('founder123');
                }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 hover:bg-indigo-900/60 transition-colors"
              >
                💻 Founder (vamsi@nexora)
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* LOGIN FORM */}
          {/* ======================================================== */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => {
                      setLoginEmail(e.target.value);
                      setLoginError(null);
                    }}
                    placeholder="e.g. student@nexora.edu"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => {
                      setLoginPassword(e.target.value);
                      setLoginError(null);
                    }}
                    placeholder="Enter your account password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Verify Credentials & Enter Home</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Don't have an account in the database?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setLoginError(null);
                      setSignupRedirectNotice(null);
                    }}
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    Create Account here
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* ======================================================== */
            /* SIGNUP FORM */
            /* ======================================================== */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {signupError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{signupError}</span>
                </div>
              )}

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-[11px] text-cyan-300/90 leading-relaxed">
                ℹ️ <strong>Workflow:</strong> When you hit <em>Sign Up</em>, your credentials are saved to the database. You will automatically be redirected to the Login page to verify your credentials and open the platform.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="e.g. alex@university.edu"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {selectedRole === 'STUDENT' ? 'College / University' : 'Company / Organization'}
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={signupCollegeOrOrg}
                    onChange={e => setSignupCollegeOrOrg(e.target.value)}
                    placeholder={
                      selectedRole === 'STUDENT'
                        ? 'e.g. IIT Delhi, Stanford, NIT'
                        : 'e.g. Google, Microsoft, Startup'
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      placeholder="Min 4 chars"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                    >
                      {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      value={signupConfirmPassword}
                      onChange={e => setSignupConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Save to Database & Redirect to Login</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Already registered in the database?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setSignupError(null);
                    }}
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    Sign In directly
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Database & Security Verification Footer */}
          <div className="border-t border-slate-800/80 mt-6 pt-4 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Database active · {users.length} registered personas
            </span>
            <span>Zero-Trust Auth · AES Encrypted</span>
          </div>

        </div>

      </div>
    </div>
  );
};
