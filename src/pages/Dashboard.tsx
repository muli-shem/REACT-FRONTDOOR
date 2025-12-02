import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMemberCount } from '@/redux/slices/membersSlice';
import { fetchFinanceSummary } from '@/redux/slices/financesSlice';
import { fetchRecentAnnouncements } from '@/redux/slices/orgSlice';
import { fetchNextEvent } from '@/redux/slices/orgSlice';
import StatCard from '@/components/common/statCard';
import AnnouncementCard from '@/components/common/AnnouncementCard';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Lightbulb,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { totalCount: memberCount } = useAppSelector(state => state.members);
  const { summary: financeSummary } = useAppSelector(state => state.finance);
  const { announcements, events } = useAppSelector(state => state.org);

  // Fetch dashboard data on mount
  useEffect(() => {
    dispatch(fetchMemberCount());
    dispatch(fetchFinanceSummary());
    dispatch(fetchRecentAnnouncements());
    dispatch(fetchNextEvent());
  }, [dispatch]);

  const nextEvent = events[0]; // First event is the next one

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.first_name || 'Member'}! 👋
        </h1>
        <p className="text-gray-200">
          Here's what's happening with G-NET today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={memberCount || 0}
          icon={Users}
          iconColor="text-primary"
          iconBgColor="bg-primary/10"
        />
        <StatCard
          title="Total MMF Savings"
          value={financeSummary ? `KES ${financeSummary.total_savings.toLocaleString()}` : 'KES 0'}
          icon={DollarSign}
          iconColor="text-secondary"
          iconBgColor="bg-secondary/10"
        />
        <StatCard
          title="Monthly Contributions"
          value={financeSummary ? `KES ${financeSummary.monthly_contributions.toLocaleString()}` : 'KES 0'}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="Pending Approvals"
          value={financeSummary?.pending_approvals || 0}
          icon={AlertCircle}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Announcements */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Announcements</h2>
            <Link 
              to="/announcements" 
              className="text-primary hover:text-primary-dark font-semibold text-sm flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {announcements.length > 0 ? (
              announcements.slice(0, 3).map(announcement => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No announcements yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Event Card */}
        <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-xl shadow-lg p-6 text-primary">
          <h2 className="text-xl font-bold mb-4">Next Event</h2>
          
          {nextEvent ? (
            <div>
              <h3 className="text-2xl font-bold mb-3">{nextEvent.title}</h3>
              <p className="mb-6 opacity-90">{nextEvent.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">
                    {new Date(nextEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{nextEvent.event_time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">{nextEvent.location}</span>
                </div>
              </div>

              <Link
                to="/events"
                className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg font-bold transition"
              >
                View All Events
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="opacity-75">No upcoming events</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
          <Link
            to="/finance"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-primary/5 rounded-lg border border-gray-200 hover:border-primary transition group"
          >
            <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center mb-3 transition">
              <DollarSign className="w-6 h-6 text-primary group-hover:text-white transition" />
            </div>
            <span className="font-semibold text-gray-900 text-center">Submit Top-Up</span>
          </Link>

          <Link
            to="/blessed-mind"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-secondary/5 rounded-lg border border-gray-200 hover:border-secondary transition group"
          >
            <div className="w-12 h-12 bg-secondary/10 group-hover:bg-secondary rounded-lg flex items-center justify-center mb-3 transition">
              <Lightbulb className="w-6 h-6 text-secondary group-hover:text-white transition" />
            </div>
            <span className="font-semibold text-gray-900 text-center">Submit Idea</span>
          </Link>

          <Link
            to="/members"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-primary/5 rounded-lg border border-gray-200 hover:border-primary transition group"
          >
            <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center mb-3 transition">
              <Users className="w-6 h-6 text-primary group-hover:text-white transition" />
            </div>
            <span className="font-semibold text-gray-900 text-center">View Members</span>
          </Link>

          <Link
            to="/announcements"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-primary/5 rounded-lg border border-gray-200 hover:border-primary transition group"
          >
            <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center mb-3 transition">
              <FileText className="w-6 h-6 text-primary group-hover:text-white transition" />
            </div>
            <span className="font-semibold text-gray-900 text-center">Announcements</span>
          </Link>
        </div>
      </div>

      {/* Monthly Breakdown (if available) */}
      {financeSummary?.monthly_breakdown && financeSummary.monthly_breakdown.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Contributions</h2>
          
          <div className="grid md:grid-cols-6 gap-4">
            {financeSummary.monthly_breakdown.map((month, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs text-gray-600 mb-2">{month.month}</p>
                <div 
                  className="bg-primary/10 rounded-lg p-3"
                  style={{
                    height: `${Math.min((month.total / 50000) * 100, 100)}px`
                  }}
                >
                  <p className="text-sm font-bold text-primary">
                    {(month.total / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;