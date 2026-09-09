import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Building, 
  User, 
  Calendar,
  X,
  CreditCard,
  Briefcase
} from 'lucide-react';

const PAYMENT_STATUSES = [
  'Token Received',
  'Agreement Signed',
  'Registration Completed',
  'Disbursed',
  'Cancelled'
];

const STAGE_OPTIONS = [
  'In Progress',
  'Completed',
  'On Hold',
  'Lost'
];

export const CRMRevenue = () => {
  const { deals, properties, saveDeal, deleteDeal } = useSiteData();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDealId, setEditingDealId] = useState(null);
  const [dealForm, setDealForm] = useState({
    client_name: '',
    property_title: '',
    deal_value: '',
    commission_earned: '',
    payment_status: 'Token Received',
    stage: 'In Progress',
    close_date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Open modal for new deal
  const openNewModal = () => {
    setEditingDealId(null);
    setDealForm({
      client_name: '',
      property_title: properties.length > 0 ? properties[0].title : '',
      deal_value: '',
      commission_earned: '',
      payment_status: 'Token Received',
      stage: 'In Progress',
      close_date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (deal) => {
    setEditingDealId(deal.id);
    setDealForm({
      client_name: deal.client_name || '',
      property_title: deal.property_title || '',
      deal_value: deal.deal_value || '',
      commission_earned: deal.commission_earned || '',
      payment_status: deal.payment_status || 'Token Received',
      stage: deal.stage || 'In Progress',
      close_date: deal.close_date ? deal.close_date.split('T')[0] : '',
      notes: deal.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!dealForm.client_name.trim() || !dealForm.deal_value) {
      alert('Please provide client name and transaction value.');
      return;
    }

    const payload = {
      ...dealForm,
      deal_value: Number(dealForm.deal_value) || 0,
      commission_earned: Number(dealForm.commission_earned) || 0,
      id: editingDealId || `deal-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    saveDeal(payload);
    setIsModalOpen(false);
  };

  // KPI Calculations
  const totalValue = deals.reduce((acc, d) => acc + (Number(d.deal_value) || 0), 0);
  const totalCommission = deals.reduce((acc, d) => acc + (Number(d.commission_earned) || 0), 0);
  const completedDeals = deals.filter(d => d.stage === 'Completed');
  const completedValue = completedDeals.reduce((acc, d) => acc + (Number(d.deal_value) || 0), 0);
  const activeDeals = deals.filter(d => d.stage === 'In Progress');
  const activePipelineValue = activeDeals.reduce((acc, d) => acc + (Number(d.deal_value) || 0), 0);

  // Format INR Currency
  const formatINR = (val) => {
    const num = Number(val) || 0;
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Filter Deals
  const filteredDeals = deals.filter(d => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (d.client_name || '').toLowerCase().includes(q) ||
      (d.property_title || '').toLowerCase().includes(q) ||
      (d.notes || '').toLowerCase().includes(q);
    
    const matchesStage = filterStage === 'All' || d.stage === filterStage;
    const matchesStatus = filterStatus === 'All' || d.payment_status === filterStatus;

    return matchesSearch && matchesStage && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#013724] font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Commercial Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Deals & Revenue Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track high-ticket luxury real estate transactions, payment milestones, and brokerage yield.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>Record New Deal</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Gross Value */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Deal Value</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-[#013724] border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">{formatINR(totalValue)}</div>
          <div className="mt-2 text-[11px] text-slate-500">Across {deals.length} portfolio transactions</div>
        </div>

        {/* Active Pipeline */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Pipeline</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-amber-700">{formatINR(activePipelineValue)}</div>
          <div className="mt-2 text-[11px] text-slate-500">{activeDeals.length} active deals in execution</div>
        </div>

        {/* Completed Realized */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Realized Closures</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-emerald-700">{formatINR(completedValue)}</div>
          <div className="mt-2 text-[11px] text-slate-500">{completedDeals.length} deals 100% completed</div>
        </div>

        {/* Advisory / Commission */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Commission</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 border border-amber-200/60">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">{formatINR(totalCommission)}</div>
          <div className="mt-2 text-[11px] text-slate-500">Total brokerage / fee margin</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-white border border-slate-200 shadow-sm rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, property title, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#013724]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-[#013724]"
          >
            <option value="All">All Stages</option>
            {STAGE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-[#013724]"
          >
            <option value="All">All Payment Statuses</option>
            {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 font-bold">Client / Purchaser</th>
                <th className="py-3.5 px-4 font-bold">Property Involved</th>
                <th className="py-3.5 px-4 font-bold">Transaction Value</th>
                <th className="py-3.5 px-4 font-bold">Commission</th>
                <th className="py-3.5 px-4 font-bold">Payment Milestone</th>
                <th className="py-3.5 px-4 font-bold">Stage</th>
                <th className="py-3.5 px-4 font-bold">Target Date</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                    No deals match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => {
                  return (
                    <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Client */}
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#013724]" />
                          <span>{deal.client_name}</span>
                        </div>
                        {deal.notes && (
                          <div className="text-[10px] text-slate-500 mt-0.5 max-w-xs truncate">{deal.notes}</div>
                        )}
                      </td>

                      {/* Property */}
                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="truncate max-w-[200px]">{deal.property_title}</span>
                        </div>
                      </td>

                      {/* Value */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {formatINR(deal.deal_value)}
                      </td>

                      {/* Commission */}
                      <td className="py-3.5 px-4 font-mono text-[#013724] font-semibold">
                        {formatINR(deal.commission_earned)}
                      </td>

                      {/* Payment Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          deal.payment_status === 'Registration Completed' || deal.payment_status === 'Disbursed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : deal.payment_status === 'Agreement Signed'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : deal.payment_status === 'Token Received'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {deal.payment_status}
                        </span>
                      </td>

                      {/* Stage */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          deal.stage === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : deal.stage === 'In Progress'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {deal.stage}
                        </span>
                      </td>

                      {/* Close Date */}
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{deal.close_date ? deal.close_date.split('T')[0] : 'N/A'}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(deal)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Edit deal"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete deal for "${deal.client_name}"?`)) {
                                deleteDeal(deal.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Delete deal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add/Edit Deal with Internal Scroll */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl animate-in fade-in zoom-in-95 max-h-[88vh] flex flex-col">
            {/* Pinned Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#013724]" />
                <span>{editingDealId ? 'Update Transaction Details' : 'Record Luxury Property Transaction'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Internal Scroll Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col">
              <div className="p-6 space-y-4 text-xs flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Client / Purchaser Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajiv Bansal"
                      value={dealForm.client_name}
                      onChange={(e) => setDealForm({ ...dealForm, client_name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Property Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Imperial Mansions Villa #04"
                      value={dealForm.property_title}
                      onChange={(e) => setDealForm({ ...dealForm, property_title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Deal Value (₹ Amount) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 67500000 (₹6.75 Cr)"
                      value={dealForm.deal_value}
                      onChange={(e) => setDealForm({ ...dealForm, deal_value: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Commission Earned (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1350000 (2% brokerage)"
                      value={dealForm.commission_earned}
                      onChange={(e) => setDealForm({ ...dealForm, commission_earned: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Payment Status</label>
                    <select
                      value={dealForm.payment_status}
                      onChange={(e) => setDealForm({ ...dealForm, payment_status: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    >
                      {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Stage</label>
                    <select
                      value={dealForm.stage}
                      onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    >
                      {STAGE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Target / Close Date</label>
                    <input
                      type="date"
                      value={dealForm.close_date}
                      onChange={(e) => setDealForm({ ...dealForm, close_date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Internal Transaction Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Special escrow conditions, registry milestones, token receipt details..."
                    value={dealForm.notes}
                    onChange={(e) => setDealForm({ ...dealForm, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724] resize-none"
                  />
                </div>
              </div>

              {/* Pinned Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold shadow-md transition-colors cursor-pointer"
                >
                  {editingDealId ? 'Save Updates' : 'Confirm Deal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMRevenue;
