import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMembers } from '@/redux/slices/membersSlice';
import MemberCard from '@/components/common/MemberCard';
import { Search, Users, Filter } from 'lucide-react';

const MembersPage = () => {
  const dispatch = useAppDispatch();
  const { members, loading, error } = useAppSelector(state => state.members);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');

  // Fetch members on mount
  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  // Filter members based on search and filters
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCounty = selectedCounty === '' || member.county === selectedCounty;
    const matchesProfession = selectedProfession === '' || member.profession === selectedProfession;

    return matchesSearch && matchesCounty && matchesProfession;
  });

  // Get unique counties and professions for filters
  const counties = Array.from(new Set(members.map(m => m.county))).sort();
  const professions = Array.from(new Set(members.map(m => m.profession))).sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load members</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(fetchMembers())}
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
          <h1 className="text-3xl font-bold text-gray-900">Members Directory</h1>
          <p className="text-gray-600 mt-1">
            Connect with {members.length} G-NET members
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-bold text-primary">{filteredMembers.length}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, profession, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* County Filter */}
          <div>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            >
              <option value="">All Counties</option>
              {counties.map(county => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          {/* Profession Filter */}
          <div>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            >
              <option value="">All Professions</option>
              {professions.map(profession => (
                <option key={profession} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCounty || selectedProfession) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedCounty && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {selectedCounty}
              </span>
            )}
            {selectedProfession && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {selectedProfession}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCounty('');
                setSelectedProfession('');
              }}
              className="text-sm text-gray-500 hover:text-primary ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCounty('');
              setSelectedProfession('');
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MembersPage;