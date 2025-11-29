import { type Idea } from '@/types';
import { Lightbulb, User, Calendar } from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
  onSelect?: (idea: Idea) => void;
}

const IdeaCard = ({ idea, onSelect }: IdeaCardProps) => {
  const statusStyles = {
    submitted: 'bg-blue-100 text-blue-800 border-blue-200',
    reviewing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusLabels = {
    submitted: 'Submitted',
    reviewing: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected'
  };

  return (
    <div
      onClick={() => onSelect?.(idea)}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition ${
        onSelect ? 'cursor-pointer' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-secondary" />
          </div>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {idea.category}
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[idea.status]}`}>
          {statusLabels[idea.status]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
        {idea.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {idea.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User className="w-4 h-4" />
          <span>{idea.member_name}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date(idea.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;