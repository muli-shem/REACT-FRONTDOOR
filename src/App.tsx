import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './redux/hooks';
import { fetchCurrentUser } from './redux/slices/authSlice';
import ProtectedRoute from '@/components/ProtectectRoute';

// Pages
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import Dashboard from './pages/Dashboard';
import MembersPage from './pages/MembersPage';
import FinancePage from './pages/FinancePage';
import BlessedMindPage from './pages/BlessedMindPage';

function App() {
  const dispatch = useAppDispatch();

  // Check if user is already logged in (on app load)
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<JoinPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/blessed-mind" element={<BlessedMindPage />} />
      </Route>
    </Routes>
  );
}

export default App;