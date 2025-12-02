import axios, { type AxiosError } from 'axios';

// ============================================================================
// AXIOS INSTANCE - Session-Based Authentication with CSRF Protection
// ============================================================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://genetbackdoor.onrender.com/api',
  
  // ✅ CRITICAL: Send cookies with every request (sessionid + csrftoken)
  withCredentials: true,
  
  headers: {
    'Content-Type': 'application/json',
  },
  
  // ✅ Axios built-in CSRF handling
  // Automatically reads 'csrftoken' cookie and sends as 'X-CSRFToken' header
  xsrfCookieName: 'csrftoken',   // Django's CSRF cookie name
  xsrfHeaderName: 'X-CSRFToken', // Django's expected CSRF header name
});

// ============================================================================
// Response Interceptor - Handle Errors Globally
// ============================================================================

api.interceptors.response.use(
  // Success response - pass through
  (response) => response,
  
  // Error response - handle globally
  async (error: AxiosError) => {
    const status = error.response?.status;
    
    if (status === 401) {
      // 401 Unauthorized = Session expired or not authenticated
      console.log('Session expired or not authenticated');
      
      // Clean up any old tokens from previous JWT implementation
      localStorage.removeItem('token');
      
      // Optional: Redirect to login
      // window.location.href = '/login';
    }
    
    if (status === 403) {
      // 403 Forbidden = CSRF token invalid/missing OR permission denied
      console.error('Access forbidden - Check CSRF token or permissions');
      
      // Debug: Log the error details
      console.error('Error details:', error.response?.data);
    }
    
    if (status === 500) {
      console.error('Server error occurred');
    }
    
    // Always reject so the calling code can handle it
    return Promise.reject(error);
  }
);

// ============================================================================
// How This Works - Session Authentication Flow
// ============================================================================

/*
1. App starts → Call GET /auth/csrf/ → Django sets 'csrftoken' cookie

2. User logs in → Call POST /auth/login/ with credentials
   - Axios reads 'csrftoken' cookie
   - Axios adds it to 'X-CSRFToken' header automatically
   - Django authenticates user
   - Django creates session and sets 'sessionid' cookie (HTTP-only)

3. All future requests:
   - Browser automatically sends 'sessionid' cookie (authentication)
   - Axios automatically reads 'csrftoken' cookie and adds to header (CSRF protection)
   - Django validates both → Request succeeds ✅

4. User logs out → Call POST /auth/logout/
   - Django destroys session
   - Browser removes 'sessionid' cookie
   - User must log in again

No tokens in localStorage! No manual header management! 
Everything is handled automatically by cookies and Axios.
*/

export default api;