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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Commercial Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Deals & Revenue Tracker
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Track high-ticket luxury real estate transactions, payment milestones, and brokerage yield.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#aa8c2c] text-[#013724] font-bold text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Deal</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Gross Value */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0a2016] to-[#040e09] border border-emerald-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Deal Value</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-white">{formatINR(totalValue)}</div>
          <div className="mt-2 text-[11px] text-gray-400">Across {deals.length} portfolio transactions</div>
        </div>

        {/* Active Pipeline */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1b1c0a] to-[#0b0c03] border border-amber-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Pipeline</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-amber-300">{formatINR(activePipelineValue)}</div>
          <div className="mt-2 text-[11px] text-gray-400">{activeDeals.length} active deals in execution</div>
        </div>

        {/* Completed Realized */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0a2016] to-[#021008] border border-[#013724] shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Realized Closures</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-emerald-400">{formatINR(completedValue)}</div>
          <div className="mt-2 text-[11px] text-gray-400">{completedDeals.length} deals 100% completed</div>
        </div>

        {/* Advisory / Commission */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#211b06] to-[#0d0a02] border border-[#D4AF37]/30 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Commission</span>
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-[#D4AF37]">{formatINR(totalCommission)}</div>
          <div className="mt-2 text-[11px] text-gray-400">Total brokerage / fee margin</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by client name, property title, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Stages</option>
            {STAGE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Payment Statuses</option>
            {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-white/10 bg-[#091a13]/80 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-gray-400 uppercase tracking-wider text-[10px]">
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
            <tbody className="divide-y divide-white/5">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 text-xs">
                    No deals match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => {
                  return (
                    <tr key={deal.id} className="hover:bg-white/[0.03] transition-colors">
                      {/* Client */}
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{deal.client_name}</span>
                        </div>
                        {deal.notes && (
                          <div className="text-[10px] text-gray-400 mt-0.5 max-w-xs truncate">{deal.notes}</div>
                        )}
                      </td>

                      {/* Property */}
                      <td className="py-3.5 px-4 text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="truncate max-w-[200px]">{deal.property_title}</span>
                        </div>
                      </td>

                      {/* Value */}
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {formatINR(deal.deal_value)}
                      </td>

                      {/* Commission */}
                      <td className="py-3.5 px-4 font-mono text-[#D4AF37] font-semibold">
                        {formatINR(deal.commission_earned)}
                      </td>

                      {/* Payment Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          deal.payment_status === 'Registration Completed' || deal.payment_status === 'Disbursed'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : deal.payment_status === 'Agreement Signed'
                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                            : deal.payment_status === 'Token Received'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}>
                          {deal.payment_status}
                        </span>
                      </td>

                      {/* Stage */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          deal.stage === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : deal.stage === 'In Progress'
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {deal.stage}
                        </span>
                      </td>

                      {/* Close Date */}
                      <td className="py-3.5 px-4 text-gray-400 font-mono text-[11px]">
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
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
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
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 transition-colors cursor-pointer"
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

      {/* Modal: Add/Edit Deal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#081810] border border-white/20 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                <span>{editingDealId ? 'Update Transaction Details' : 'Record Luxury Property Transaction'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Client / Purchaser Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajiv Bansal"
                    value={dealForm.client_name}
                    onChange={(e) => setDealForm({ ...dealForm, client_name: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Imperial Mansions Villa #04"
                    value={dealForm.property_title}
                    onChange={(e) => setDealForm({ ...dealForm, property_title: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Deal Value (₹ Amount) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 67500000 (₹6.75 Cr)"
                    value={dealForm.deal_value}
                    onChange={(e) => setDealForm({ ...dealForm, deal_value: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Commission Earned (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1350000 (2% brokerage)"
                    value={dealForm.commission_earned}
                    onChange={(e) => setDealForm({ ...dealForm, commission_earned: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Payment Status</label>
                  <select
                    value={dealForm.payment_status}
                    onChange={(e) => setDealForm({ ...dealForm, payment_status: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Stage</label>
                  <select
                    value={dealForm.stage}
                    onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {STAGE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Target / Close Date</label>
                  <input
                    type="date"
                    value={dealForm.close_date}
                    onChange={(e) => setDealForm({ ...dealForm, close_date: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Internal Transaction Notes</label>
                <textarea
                  rows={3}
                  placeholder="Special escrow conditions, registry milestones, token receipt details..."
                  value={dealForm.notes}
                  onChange={(e) => setDealForm({ ...dealForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#aa8c2c] text-[#013724] font-bold shadow-lg"
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
