import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMemberById, clearCurrentMember } from '@/redux/slices/membersSlice';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone,
  Calendar,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';

const MemberProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentMember, loading, error } = useAppSelector(state => state.members);

  useEffect(() => {
    if (id) {
      dispatch(fetchMemberById(Number(id)));
    }

    // Cleanup: Clear current member when leaving page
    return () => {
      dispatch(clearCurrentMember());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !currentMember) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 mb-4">Member not found</p>
          <Link
            to="/members"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  const member = currentMember;

  // Get initials for avatar
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/members"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Members</span>
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover / Banner */}
        <div className="h-32 bg-gradient-to-r from-primary to-primary-dark"></div>

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-16 mb-4">
            {member.user.profile_picture ? (
              <img
                src={member.user.profile_picture}
                alt={member.user.full_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                {getInitials(member.user.full_name)}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {member.user.full_name}
          </h1>
          <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
            <Briefcase className="w-5 h-5" />
            <span>{member.profession}</span>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{member.county}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>{member.user.email}</span>
            </div>
            {member.user.phone_number && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>{member.user.phone_number}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Joined {new Date(member.joined_date).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Social Links */}
          {(member.linkedin_url || member.github_url || member.portfolio_url) && (
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {member.linkedin_url && (
                
                 <a href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              )}
              {member.github_url && (
                
                 <a href={member.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              )}
              {member.portfolio_url && (
                
                 <a href={member.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">Portfolio</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bio & Skills Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bio */}
        {member.bio && (
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
          {member.skills && member.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-2 bg-primary/10 text-primary font-medium rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfilePage;