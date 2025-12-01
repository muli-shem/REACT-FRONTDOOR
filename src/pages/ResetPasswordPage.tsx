import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/services/api';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams<{ uid: string; token: string }>();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  useEffect(() => {
    if (!uid || !token) {
      setInvalidLink(true);
      toast.error('Invalid or expired reset link');
    }
  }, [uid, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setLoading(true);

    try {
      const response = await api.post('/members/password-reset/confirm/', {
        uid,
        token,
        password: formData.password
      });

      if (response.status === 200) {
        toast.success('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setInvalidLink(true);
        toast.error('Invalid or expired reset link');
      } else {
        toast.error(error.response?.data?.detail || 'Failed to reset password');
      }
    } finally {
      setLoading(false);
    }
  };

  if (invalidLink) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Invalid Reset Link</h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <div className="space-y-3">
              <Link
                to="/forgot-password"
                className="block w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition text-center"
              >
                Request New Link
              </Link>
              <Link
                to="/login"
                className="block w-full px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your new password below.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                New Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</h4>
              <ul className="space-y-1">
                <li className={`text-xs flex items-center gap-2 ${
                  formData.password.length >= 8 ? 'text-green-700' : 'text-blue-800'
                }`}>
                  {formData.password.length >= 8 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="w-4 h-4 border-2 border-current rounded-full"></span>
                  )}
                  At least 8 characters
                </li>
                <li className={`text-xs flex items-center gap-2 ${
                  formData.password === formData.confirmPassword && formData.password ? 'text-green-700' : 'text-blue-800'
                }`}>
                  {formData.password === formData.confirmPassword && formData.password ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="w-4 h-4 border-2 border-current rounded-full"></span>
                  )}
                  Passwords match
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;