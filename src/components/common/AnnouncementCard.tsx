import {type  Announcement } from '@/types';
import { AlertCircle, Megaphone } from 'lucide-react';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const priorityStyles = {
    high: 'border-l-4 border-red-500 bg-red-50',
    medium: 'border-l-4 border-yellow-500 bg-yellow-50',
    low: 'border-l-4 border-blue-500 bg-blue-50'
  };

  const priorityIcons = {
    high: <AlertCircle className="w-5 h-5 text-red-500" />,
    medium: <Megaphone className="w-5 h-5 text-yellow-500" />,
    low: <Megaphone className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className={`bg-white rounded-lg p-4 ${priorityStyles[announcement.priority]} hover:shadow-md transition`}>
      <div className="flex items-start gap-3">
        {priorityIcons[announcement.priority]}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
            {announcement.priority === 'high' && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                URGENT
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">
            {announcement.content}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>By {announcement.author}</span>
            <span>•</span>
            <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;