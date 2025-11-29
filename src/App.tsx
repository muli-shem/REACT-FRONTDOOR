import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './redux/hooks';
import { fetchCurrentUser } from './redux/slices/authSlice';
import ProtectedRoute from '@/components/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';  // NEW
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
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
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />  {/* CHANGED */}
      <Route path="/join" element={<JoinPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes with Layout */}
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