import { useState } from 'react';
import { type TopUp } from '@/types';
import { FileText, Calendar } from 'lucide-react';

interface TransactionHistoryProps {
  topups: TopUp[];
}

const TransactionHistory = ({ topups }: TransactionHistoryProps) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter top-ups by status
  const filteredTopUps = topups.filter(topup => {
    if (statusFilter === 'all') return true;
    return topup.status === statusFilter;
  });

  // Status badge styling - ✅ Updated to match backend status values
  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Success: 'bg-green-100 text-green-800 border-green-200',
      Failed: 'bg-red-100 text-red-800 border-red-200'
    };

    const labels = {
      Pending: 'Pending',
      Success: 'Approved',
      Failed: 'Rejected'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
            <p className="text-sm text-gray-600">{filteredTopUps.length} transactions</p>
          </div>
        </div>

        {/* Status Filter - ✅ Updated to match backend values */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Success">Approved</option>
          <option value="Failed">Rejected</option>
        </select>
      </div>

      {/* Table */}
      {filteredTopUps.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Month</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTopUps.map((topup) => (
                <tr key={topup.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {/* ✅ FIXED: Changed from topup.created_at to topup.date */}
                        {new Date(topup.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700 font-medium">
                      {new Date(topup.month + '-01').toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      KES {topup.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {getStatusBadge(topup.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No transactions found</p>
          {statusFilter !== 'all' && (
            <button
              onClick={() => setStatusFilter('all')}
              className="mt-3 text-primary hover:text-primary-dark font-semibold text-sm"
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;