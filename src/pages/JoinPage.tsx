import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { submitJoinApplication } from '@/redux/slices/membersSlice';
import toast from 'react-hot-toast';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

const JoinPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.members);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    county: '',
    profession: '',
    skills: '',
    motivation: '',
    portfolioUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.county || !formData.profession || !formData.motivation) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate phone number if provided
    if (formData.phone && !formData.phone.match(/^[+]?[\d\s()-]+$/)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const result = await dispatch(submitJoinApplication(formData));

    if (submitJoinApplication.fulfilled.match(result)) {
      toast.success('Application submitted successfully! Check your email for next steps.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        county: '',
        profession: '',
        skills: '',
        motivation: '',
        portfolioUrl: ''
      });

      // Redirect to landing page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error(error || 'Failed to submit application. Please try again.');
    }
  };

  const kenyanCounties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
    'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
    'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos',
    'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a',
    'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
    'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia',
    'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-primary">G-NET</h1>
            <p className="text-xs text-gray-600">Youth Network</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold text-primary">Join the Movement</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Become a G-NET Member
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering Minds, Empowering Generations
          </p>
        </div>

        {/* Benefits Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            'Financial Literacy Training',
            'Leadership Mentorship',
            'Access to Funded Projects'
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
              <span className="text-gray-700 font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Application Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="+254 700 000 000"
              />
            </div>

            {/* County */}
            <div>
              <label htmlFor="county" className="block text-sm font-semibold text-gray-700 mb-2">
                County *
              </label>
              <select
                id="county"
                name="county"
                value={formData.county}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
              >
                <option value="">Select your county</option>
                {kenyanCounties.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
            </div>

            {/* Profession */}
            <div>
              <label htmlFor="profession" className="block text-sm font-semibold text-gray-700 mb-2">
                Profession *
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="e.g., Software Developer, Entrepreneur, Student"
              />
            </div>

            {/* Skills */}
            <div>
              <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
                Skills (Optional)
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="e.g., Leadership, Coding, Marketing (comma-separated)"
              />
              <p className="text-sm text-gray-500 mt-2">
                List your key skills separated by commas
              </p>
            </div>

            {/* Portfolio URL */}
            <div>
              <label htmlFor="portfolioUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                Portfolio URL (Optional)
              </label>
              <input
                type="url"
                id="portfolioUrl"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="https://yourportfolio.com"
              />
            </div>

            {/* Motivation */}
            <div>
              <label htmlFor="motivation" className="block text-sm font-semibold text-gray-700 mb-2">
                Why do you want to join G-NET? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us about your goals, interests, and what you hope to contribute to the community..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Be specific about your entrepreneurial goals and vision.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  !
                </div>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-secondary-dark text-primary font-bold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Submitting Application...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Already a member?{' '}
              <Link to="/login" className="text-primary font-semibold hover:text-primary-dark">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Expectations */}
        <div className="mt-12 bg-primary/5 rounded-xl p-8">
          <h3 className="text-xl font-bold text-primary mb-4">What to Expect After Applying</h3>
          <div className="space-y-3">
            {[
              'Your account will be created and you\'ll receive a welcome email',
              'Check your email for instructions to set your password',
              'Once your password is set, you can log in and access all member benefits',
              'Welcome to the G-NET community of young entrepreneurs!'
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;