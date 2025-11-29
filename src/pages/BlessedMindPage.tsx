import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchIdeas, fetchProposals } from '@/redux/slices/projectsSlice';
import IdeaForm from '@/components/features/ideaForm';
import IdeaCard from '@/components/common/IdeaCard';
import ProposalUploadModal from '@/components/features/ProposalUploadModal';
import { Lightbulb, FileText, Filter } from 'lucide-react';
import { type Idea } from '@/types';

const BlessedMindPage = () => {
  const dispatch = useAppDispatch();
  const { ideas, proposals, loading } = useAppSelector(state => state.projects);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  useEffect(() => {
    dispatch(fetchIdeas());
    dispatch(fetchProposals());
  }, [dispatch]);

  // Filter ideas
  const filteredIdeas = ideas.filter(idea => {
    if (statusFilter === 'all') return true;
    return idea.status === statusFilter;
  });

  const handleIdeaClick = (idea: Idea) => {
    setSelectedIdea(idea);
    setShowProposalModal(true);
  };

  if (loading && ideas.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ideas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl p-6 border border-secondary/30">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-8 h-8 text-secondary" />
          <h1 className="text-3xl font-bold text-primary">Blessed Mind</h1>
        </div>
        <p className="text-gray-700 max-w-3xl">
          Our innovation lab where creativity meets action. Share your ideas, develop proposals, 
          and collaborate with mentors to transform concepts into reality.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-gray-600">Total Ideas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{ideas.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold text-gray-600">Proposals</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{proposals.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 flex items-center justify-center bg-green-100 rounded text-green-600 text-xs font-bold">
              ✓
            </span>
            <span className="text-sm font-semibold text-gray-600">Approved</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {ideas.filter(i => i.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 flex items-center justify-center bg-yellow-100 rounded text-yellow-600 text-xs font-bold">
              •••
            </span>
            <span className="text-sm font-semibold text-gray-600">Under Review</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {ideas.filter(i => i.status === 'reviewing').length}
          </p>
        </div>
      </div>

      {/* Idea Form */}
      <IdeaForm />

      {/* Ideas List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">All Ideas</h2>
          
          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="reviewing">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {filteredIdeas.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map(idea => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onSelect={handleIdeaClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No ideas found</h3>
            <p className="text-gray-600 mb-4">
              {statusFilter === 'all' 
                ? 'Be the first to submit an innovative idea!' 
                : 'No ideas match this filter'}
            </p>
            {statusFilter !== 'all' && (
              <button
                onClick={() => setStatusFilter('all')}
                className="text-primary hover:text-primary-dark font-semibold"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Proposal Upload Modal */}
      {showProposalModal && selectedIdea && (
        <ProposalUploadModal
          ideaId={selectedIdea.id}
          ideaTitle={selectedIdea.title}
          onClose={() => {
            setShowProposalModal(false);
            setSelectedIdea(null);
          }}
        />
      )}
    </div>
  );
};

export default BlessedMindPage;