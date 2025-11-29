import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createIdea } from '@/redux/slices/projectsSlice';
import toast from 'react-hot-toast';
import { Lightbulb, Sparkles } from 'lucide-react';

const IdeaForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.projects);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const categories = [
    'Technology',
    'Agriculture',
    'Education',
    'Healthcare',
    'Finance',
    'Entertainment',
    'Real Estate',
    'E-commerce',
    'Social Impact',
    'Environment',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.description.length < 50) {
      toast.error('Description must be at least 50 characters');
      return;
    }

    const result = await dispatch(createIdea(formData));

    if (createIdea.fulfilled.match(result)) {
      toast.success('Idea submitted successfully! Our team will review it.');
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: ''
      });
    } else {
      toast.error('Failed to submit idea. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Submit Your Idea</h2>
          <p className="text-sm text-gray-600">Share your innovative business concept</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Idea Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="e.g., Solar-Powered Water Purification System"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.title.length}/100 characters
          </p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            minLength={50}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
            placeholder="Describe your idea in detail. What problem does it solve? Who is your target audience? What makes it unique?"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length} characters (minimum 50)
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg p-4 border border-secondary/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Tips for a Great Idea</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Be specific about the problem you're solving</li>
                <li>• Identify your target market clearly</li>
                <li>• Explain what makes your solution unique</li>
                <li>• Consider the resources needed</li>
                <li>• Think about scalability and impact</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary hover:bg-secondary-dark text-primary font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Submitting Idea...
            </span>
          ) : (
            'Submit Idea'
          )}
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;