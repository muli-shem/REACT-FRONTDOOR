import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './redux/hooks';
import { fetchCurrentUser } from './redux/slices/authSlice';
import api from '@/services/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import SetPasswordPage from './pages/SetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import MembersPage from './pages/MembersPage';
import FinancePage from './pages/FinancePage';
import BlessedMindPage from './pages/BlessedMindPage';
import MemberProfilePage from './pages/MembersProfilePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import EventsPage from './pages/EventsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // ========================================================================
    // Initialize app on first load - PROPER ASYNC SEQUENCE
    // ========================================================================
    
    const initializeAuth = async () => {
      try {
        // STEP 1: Get CSRF token FIRST
        // This sets the 'csrftoken' cookie that we need for all authenticated requests
        await api.get('/auth/csrf/');
        console.log('CSRF token initialized');
        
        // STEP 2: THEN check if user is already logged in
        // Now the CSRF cookie is set, so this request will include it
        // If 'sessionid' cookie exists and is valid, this will restore the user
        dispatch(fetchCurrentUser());
        
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Even if CSRF fails, try to fetch user (might work if already has cookie)
        dispatch(fetchCurrentUser());
      }
    };
    
    initializeAuth();
    
    // ========================================================================
    // How session persistence works:
    // ========================================================================
    // 1. User logs in → Django creates sessionid cookie (lasts 14 days)
    // 2. User closes browser → Cookie persists (SESSION_EXPIRE_AT_BROWSER_CLOSE = False)
    // 3. User returns → fetchCurrentUser() checks if session is still valid
    // 4. If valid → User is automatically logged in (no login page needed!)
    // 5. If expired → User is redirected to login page
    
  }, [dispatch]);

  return (
    <Routes>
      {/* ======================================================================
          PUBLIC ROUTES - No authentication required
          ====================================================================== */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/set-password" element={<SetPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPasswordPage />} />

      {/* ======================================================================
          PROTECTED ROUTES - Require authentication (valid session cookie)
          ====================================================================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/blessed-mind" element={<BlessedMindPage />} />
          <Route path="/members/:id" element={<MemberProfilePage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;