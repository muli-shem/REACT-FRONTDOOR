import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTopUps, fetchFinanceSummary } from '@/redux/slices/financesSlice';
import StatCard from '@/components/common/statCard';
import TopUpForm from '@/components/features/TopUpForm';
import TransactionHistory from '@/components/features/TransactionHistory';
import { DollarSign, TrendingUp, Users, AlertCircle } from 'lucide-react';

const FinancePage = () => {
  const dispatch = useAppDispatch();
  const { topups, summary, loading } = useAppSelector(state => state.finance);

  useEffect(() => {
    dispatch(fetchTopUps());
    dispatch(fetchFinanceSummary());
  }, [dispatch]);

  if (loading && !summary) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">MMF Finance</h1>
        <p className="text-gray-600 mt-1">
          Manage your Money Market Fund contributions and track financial growth
        </p>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total MMF Savings"
            value={`KES ${summary.total_savings.toLocaleString()}`}
            icon={DollarSign}
            iconColor="text-secondary"
            iconBgColor="bg-secondary/10"
          />
          <StatCard
            title="Monthly Contributions"
            value={`KES ${summary.monthly_contributions.toLocaleString()}`}
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Members Contributed"
            value={summary.total_members_contributed}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending Approvals"
            value={summary.pending_approvals}
            icon={AlertCircle}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
          />
        </div>
      )}

      {/* Top-Up Form & Monthly Breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top-Up Form */}
        <div className="lg:col-span-1">
          <TopUpForm />
        </div>

        {/* Monthly Breakdown Chart */}
        {summary?.monthly_breakdown && summary.monthly_breakdown.length > 0 && (
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Contributions</h2>
            
            <div className="flex items-end justify-between gap-2 h-64">
              {summary.monthly_breakdown.map((month, idx) => {
                const maxTotal = Math.max(...summary.monthly_breakdown.map(m => m.total));
                const heightPercent = (month.total / maxTotal) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center justify-end" style={{ height: '200px' }}>
                      <div className="text-xs font-bold text-primary mb-1">
                        {(month.total / 1000).toFixed(0)}K
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg transition-all hover:from-secondary hover:to-secondary-light cursor-pointer"
                        style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                        title={`KES ${month.total.toLocaleString()}`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {new Date(month.month + '-01').toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <TransactionHistory topups={topups} />

      {/* MMF Information */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
        <h3 className="text-xl font-bold text-primary mb-4">About G-NET MMF</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">How It Works</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Joint account managed collectively</li>
              <li>• Monthly top-ups with flexible amounts</li>
              <li>• Quarterly audits for full transparency</li>
              <li>• Same-day contributions maximize returns</li>
              <li>• Multiple signatories for withdrawals</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Build wealth through disciplined saving</li>
              <li>• Compound interest on contributions</li>
              <li>• Community accountability</li>
              <li>• Access to investment opportunities</li>
              <li>• Financial literacy development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;