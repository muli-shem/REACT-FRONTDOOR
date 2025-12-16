import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createTopUp } from '@/redux/slices/financesSlice';
import toast from 'react-hot-toast';
import { DollarSign, Calendar } from 'lucide-react';

const TopUpForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.finance);

  const [formData, setFormData] = useState({
    amount: '',
    month: '',
    transaction_id: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const amount = Number(formData.amount);
    if (amount <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }

    if (!formData.month) {
      toast.error('Please select a date');
      return;
    }

    if (!formData.transaction_id.trim()) {
      toast.error('Please enter a transaction ID');
      return;
    }

    const result = await dispatch(createTopUp({
      amount,
      month: formData.month, // Already in YYYY-MM-DD format from date input
      transaction_id: formData.transaction_id,
      notes: formData.notes || undefined
    }));

    if (createTopUp.fulfilled.match(result)) {
      toast.success('Top-up submitted successfully! Pending approval.');
      // Reset form
      setFormData({
        amount: '',
        month: '',
        transaction_id: '',
        notes: ''
      });
    } else {
      toast.error('Failed to submit top-up. Please try again.');
    }
  };

  // Get today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 6 months ago for min attribute
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const minDate = sixMonthsAgo.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Submit Top-Up</h2>
          <p className="text-sm text-gray-600">Make your monthly MMF contribution</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
            Amount (KES) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
              KES
            </span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              min="1"
              step="0.01"
              className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="0.00"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Minimum amount: KES 100
          </p>
        </div>

        {/* Date Picker */}
        <div>
          <label htmlFor="month" className="block text-sm font-semibold text-gray-700 mb-2">
            Contribution Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="date"
              id="month"
              name="month"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              required
              min={minDate}
              max={today}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Select the date for this contribution (within last 6 months)
          </p>
        </div>

        {/* Transaction ID */}
        <div>
          <label htmlFor="transaction_id" className="block text-sm font-semibold text-gray-700 mb-2">
            Transaction ID *
          </label>
          <input
            type="text"
            id="transaction_id"
            name="transaction_id"
            value={formData.transaction_id}
            onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="e.g., THMSBHDJ233SHEM"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the M-Pesa or bank transaction reference number
          </p>
        </div>

        {/* Notes (Optional) */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
            placeholder="Add any additional information about this transaction..."
          />
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Important Information:</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Top-ups require approval from administrators</li>
            <li>• Contributions are processed within 24-48 hours</li>
            <li>• Same-day contributions maximize compound interest</li>
            <li>• Receipt will be sent to your email upon approval</li>
          </ul>
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
              Submitting...
            </span>
          ) : (
            'Submit Top-Up'
          )}
        </button>
      </form>
    </div>
  );
};

export default TopUpForm;