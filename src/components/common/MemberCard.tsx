import { Link } from 'react-router-dom';
import { type Member } from '@/types';
import { MapPin, Briefcase} from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  // Get initials for avatar
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Link
      to={`/members/${member.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-primary transition group"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center mb-4">
        {member.user.profile_picture ? (
          <img
            src={member.user.profile_picture}
            alt={member.user.full_name}
            className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 group-hover:border-primary transition"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xl font-bold border-4 border-gray-100 group-hover:border-secondary transition">
            {getInitials(member.user.full_name)}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 text-center mb-1 group-hover:text-primary transition">
        {member.user.full_name}
      </h3>

      {/* Profession */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
        <Briefcase className="w-4 h-4" />
        <span>{member.profession}</span>
      </div>

      {/* County */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
        <MapPin className="w-4 h-4" />
        <span>{member.county}</span>
      </div>

      {/* Skills Tags */}
      {member.skills && member.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {member.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{member.skills.length - 3} more
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default MemberCard;