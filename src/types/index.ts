// User & Authentication Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: 'admin' | 'member' | 'guest';
  profile_picture?: string;
  county?: string;
  phone_number?: string;
  date_joined: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  message: string;
}

// Member Types
export interface Member {
  id: number;
  user: User;
  skills: string[];
  profession: string;
  county: string;
  bio?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  joined_date: string;
}

export interface MembersState {
  members: Member[];
  currentMember: Member | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

/// Finance Types
export interface TopUp {
  id: number;
  user: User;              // ✅ Backend returns full user object
  amount: number;          // ✅ Now number (after FloatField fix)
  month: string;           // ✅ DateField as string
  date: string;            // ✅ Backend returns "date", not "created_at"
  status: 'Pending' | 'Success' | 'Failed';  // ✅ Match backend STATUS_CHOICES
  transaction_id: string;
  notes: string;
}

export interface FinanceSummary {
  total_savings: number;
  monthly_contributions: number;
  total_members_contributed: number;
  pending_approvals: number;
  monthly_breakdown?: {
    month: string;
    total: number;
  }[];
}

export interface FinanceState {
  topups: TopUp[];
  summary: FinanceSummary | null;
  loading: boolean;
  error: string | null;
}

export interface CreateTopUpData {
  amount: number;
  month: string;
  transaction_id: string;
  notes?: string;
}

// Projects Types (Blessed Mind)
export interface Idea {
  id: number;
  member: number;
  member_name: string;
  title: string;
  description: string;
  category: string;
  status: 'submitted' | 'reviewing' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: number;
  idea: number;
  idea_title: string;
  member: number;
  member_name: string;
  file_url: string;
  description: string;
  status: 'submitted' | 'reviewing' | 'approved' | 'rejected';
  submitted_at: string;
}

export interface ProjectsState {
  ideas: Idea[];
  proposals: Proposal[];
  loading: boolean;
  error: string | null;
}

export interface CreateIdeaData {
  title: string;
  description: string;
  category: string;
}

// Organization Types
// Organization Types
export interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  venue: string;           // ✅ Changed from "location" to "venue"
  date: string;            // ✅ Changed from "event_date" to "date"
  image?: string | null;   // ✅ Added image field
  link?: string;           // ✅ Added link field
  created_at: string;
  // Remove these if they don't exist in API:
  // event_time: string;
  // created_by: string;
}

export interface OrgState {
  announcements: Announcement[];
  events: Event[];
  loading: boolean;
  nextEvent: Event | null;
  error: string | null;
}
// Join Application Types
export interface JoinApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  county: string;
  profession: string;
  skills?: string;
  motivation: string;
  portfolioUrl?: string;
}

// API Response Types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}