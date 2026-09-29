import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/navigation/TopBar';
import { FloatingNav } from './components/navigation/FloatingNav';
import { HomeView } from './components/home/HomeView';
import { ProfileView } from './components/profile/ProfileView';
import { NetworkView } from './components/network/NetworkView';
import { JobsView } from './components/jobs/JobsView';
import { ProjectsView } from './components/projects/ProjectsView';
import { CodingHub } from './components/coding/CodingHub';
import { MessagingView } from './components/messaging/MessagingView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { CompanyView } from './components/companies/CompanyView';
import { RecruiterPortal } from './components/recruiter/RecruiterPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LandingPage } from './components/landing/LandingPage';
import { NewPostModal } from './components/posts/NewPostModal';
import { ArticleEditorModal } from './components/posts/ArticleEditorModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { AuthScreen } from './components/auth/AuthScreen';

const MainLayout: React.FC = () => {
  const { activeTab, toastMessage, isLoggedIn } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'home':
        return <HomeView />;
      case 'profile':
        return <ProfileView />;
      case 'network':
        return <NetworkView />;
      case 'jobs':
        return <JobsView />;
      case 'projects':
        return <ProjectsView />;
      case 'coding':
        return <CodingHub />;
      case 'messages':
        return <MessagingView />;
      case 'notifications':
        return <NotificationsView />;
      case 'companies':
        return <CompanyView />;
      case 'recruiter':
        return <RecruiterPortal />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar with ONLY Nexora name on the side, rest empty */}
      <TopBar />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full">
        {!isLoggedIn ? (
          /* Authentication Screen: First Login/Signup before Home appears */
          <AuthScreen />
        ) : (
          /* Authenticated User Views (Home, Profile, Coding, Network, etc.) */
          renderActiveTab()
        )}
      </main>

      {/* Floating Navigation Rail (Only shown when logged in) */}
      {isLoggedIn && <FloatingNav />}

      {/* Post Composer Modal (Image 1) */}
      {isLoggedIn && <NewPostModal />}

      {/* Article Publishing Studio (Image 2) */}
      {isLoggedIn && <ArticleEditorModal />}

      {/* Global Search Modal (Cmd+K) */}
      {isLoggedIn && <GlobalSearchModal />}

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-none">
          <div className="rounded-full border border-cyan-500/40 bg-slate-900/95 dark:bg-[#121824]/95 px-4 py-2 text-xs font-semibold text-cyan-300 shadow-2xl backdrop-blur-md flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-sm tracking-tight text-slate-800 dark:text-white">
              NEXORA
            </span>
            <span>· Build. Connect. Create. Grow.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Enterprise Systems Architecture</span>
            <span>·</span>
            <span>Zero-Trust Privacy</span>
            <span>·</span>
            <span>© 2026 Nexora Network</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
