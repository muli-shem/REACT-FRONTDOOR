import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAnnouncements } from '@/redux/slices/orgSlice';
import { Megaphone, AlertCircle, Filter } from 'lucide-react';

const AnnouncementsPage = () => {
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector(state => state.org);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  // Filter by priority
  const filteredAnnouncements = announcements.filter(announcement => {
    if (priorityFilter === 'all') return true;
    return announcement.priority === priorityFilter;
  });

  // Sort by date (newest first)
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const priorityStyles = {
    high: 'border-l-4 border-red-500 bg-red-50',
    medium: 'border-l-4 border-yellow-500 bg-yellow-50',
    low: 'border-l-4 border-blue-500 bg-blue-50'
  };

  const priorityBadges = {
    high: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-blue-500 text-white'
  };

  const priorityLabels = {
    high: 'URGENT',
    medium: 'IMPORTANT',
    low: 'INFO'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading announcements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load announcements</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(fetchAnnouncements())}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with the latest G-NET news and information
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <Megaphone className="w-5 h-5 text-primary" />
          <span className="font-bold text-primary">{sortedAnnouncements.length}</span>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Filter by priority:</span>
          
          <div className="flex gap-2">
            <button
              onClick={() => setPriorityFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                priorityFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriorityFilter('high')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                priorityFilter === 'high'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Urgent
            </button>
            <button
              onClick={() => setPriorityFilter('medium')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                priorityFilter === 'medium'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Important
            </button>
            <button
              onClick={() => setPriorityFilter('low')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                priorityFilter === 'low'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Info
            </button>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      {sortedAnnouncements.length > 0 ? (
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition ${priorityStyles[announcement.priority]}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {announcement.priority === 'high' && (
                      <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                    {announcement.priority === 'medium' && (
                      <Megaphone className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                    )}
                    {announcement.priority === 'low' && (
                      <Megaphone className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    )}
                    <h2 className="text-xl font-bold text-gray-900">
                      {announcement.title}
                    </h2>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityBadges[announcement.priority]}`}>
                  {priorityLabels[announcement.priority]}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                {announcement.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-semibold">By {announcement.author}</span>
                  <span>•</span>
                  <span>
                    {new Date(announcement.created_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(announcement.created_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                {announcement.updated_at !== announcement.created_at && (
                  <span className="text-xs text-gray-500 italic">
                    Updated {new Date(announcement.updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No announcements found</h3>
          <p className="text-gray-600 mb-4">
            {priorityFilter === 'all'
              ? 'No announcements have been posted yet'
              : `No ${priorityFilter} priority announcements`}
          </p>
          {priorityFilter !== 'all' && (
            <button
              onClick={() => setPriorityFilter('all')}
              className="text-primary hover:text-primary-dark font-semibold"
            >
              Show all announcements
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;