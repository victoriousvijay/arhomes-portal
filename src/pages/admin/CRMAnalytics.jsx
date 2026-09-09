import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Flame, 
  Calendar, 
  Target, 
  DollarSign, 
  Award, 
  Layers, 
  PhoneCall,
  Activity,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export const CRMAnalytics = () => {
  const { leads, deals } = useSiteData();
  const [timeRange, setTimeRange] = useState('all'); // 'all', 'month', 'week', 'today'

  // Filter leads based on selected timeframe
  const now = new Date();
  const filteredLeads = leads.filter(lead => {
    if (timeRange === 'all') return true;
    const createdAt = new Date(lead.created_at || Date.now());
    const diffMs = now - createdAt;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (timeRange === 'today') return diffDays <= 1;
    if (timeRange === 'week') return diffDays <= 7;
    if (timeRange === 'month') return diffDays <= 30;
    return true;
  });

  // Calculate metrics
  const totalLeads = filteredLeads.length;
  const hotLeads = filteredLeads.filter(l => (l.temperature || '').toLowerCase() === 'hot').length;
  const warmLeads = filteredLeads.filter(l => (l.temperature || '').toLowerCase() === 'warm').length;
  const coldLeads = filteredLeads.filter(l => (l.temperature || '').toLowerCase() === 'cold').length;

  const wonLeads = filteredLeads.filter(l => l.status === 'Won' || l.status === 'Closed / Won').length;
  const siteVisits = filteredLeads.filter(l => l.status === 'Site Visit Scheduled').length;
  const inNegotiation = filteredLeads.filter(l => l.status === 'Negotiation').length;

  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';
  const siteVisitRate = totalLeads > 0 ? ((siteVisits / totalLeads) * 100).toFixed(1) : '0.0';

  // Pipeline stage counts
  const stages = [
    { name: 'New Lead', count: filteredLeads.filter(l => l.status === 'New Lead').length, color: 'bg-emerald-500' },
    { name: 'Contacted', count: filteredLeads.filter(l => l.status === 'Contacted').length, color: 'bg-teal-500' },
    { name: 'Site Visit Scheduled', count: siteVisits, color: 'bg-[#D4AF37]' },
    { name: 'Negotiation', count: inNegotiation, color: 'bg-amber-500' },
    { name: 'Won', count: wonLeads, color: 'bg-emerald-400' },
    { name: 'Lost', count: filteredLeads.filter(l => l.status === 'Lost').length, color: 'bg-rose-500' }
  ];

  // Lead sources breakdown
  const sourceMap = {};
  filteredLeads.forEach(l => {
    const src = l.source || 'Website Form';
    sourceMap[src] = (sourceMap[src] || 0) + 1;
  });
  const sourceEntries = Object.entries(sourceMap).sort((a, b) => b[1] - a[1]);

  // Top property interest
  const propMap = {};
  filteredLeads.forEach(l => {
    const prop = l.property_interest || 'General Inquiry';
    propMap[prop] = (propMap[prop] || 0) + 1;
  });
  const propEntries = Object.entries(propMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            <BarChart3 className="w-4 h-4" />
            <span>Executive Performance Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            CRM & Lead Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time insights across visitor inquiries, temperature velocity, and sales pipeline conversion.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl self-start md:self-auto">
          {[
            { id: 'today', label: 'Today' },
            { id: 'week', label: 'Last 7 Days' },
            { id: 'month', label: 'Last 30 Days' },
            { id: 'all', label: 'All Time' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                timeRange === tab.id
                  ? 'bg-[#013724] text-[#D4AF37] border border-[#D4AF37]/40 shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Inquiries */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0a2016] to-[#040e09] border border-emerald-500/20 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Enquiries</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-white">{totalLeads}</div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active in selected timeframe</span>
          </div>
        </div>

        {/* Hot Leads */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#240e08] to-[#0e0503] border border-red-500/20 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">High-Intent (Hot 🔥)</span>
            <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-red-400">{hotLeads}</div>
          <div className="mt-2 text-[11px] text-gray-400">
            {totalLeads > 0 ? `${((hotLeads / totalLeads) * 100).toFixed(0)}% of total volume` : '0% of volume'}
          </div>
        </div>

        {/* Site Visits Scheduled */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1e1a06] to-[#0d0b02] border border-[#D4AF37]/20 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Site Visits</span>
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-[#D4AF37]">{siteVisits}</div>
          <div className="mt-2 text-[11px] text-gray-400">
            {siteVisitRate}% inspection booking rate
          </div>
        </div>

        {/* Won Conversion */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0a2016] to-[#031109] border border-[#013724] shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Win Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-white">{conversionRate}%</div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium">
            {wonLeads} deals successfully closed
          </div>
        </div>
      </div>

      {/* Temperature & Pipeline Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Temperature Distribution */}
        <div className="p-6 rounded-2xl bg-[#091a13]/80 border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span>Lead Temperature Breakdown</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Purchasing readiness and engagement velocity</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              {totalLeads} Total
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Hot */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-red-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  Hot Leads (Immediate Buyer / Funds Ready)
                </span>
                <span className="text-white font-mono">{hotLeads} ({totalLeads > 0 ? ((hotLeads / totalLeads) * 100).toFixed(0) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-500" 
                  style={{ width: `${totalLeads > 0 ? (hotLeads / totalLeads) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Warm */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  Warm Leads (Evaluating Options & Loans)
                </span>
                <span className="text-white font-mono">{warmLeads} ({totalLeads > 0 ? ((warmLeads / totalLeads) * 100).toFixed(0) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500" 
                  style={{ width: `${totalLeads > 0 ? (warmLeads / totalLeads) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Cold */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-blue-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  Cold Leads (General Inquiries / Early Browsing)
                </span>
                <span className="text-white font-mono">{coldLeads} ({totalLeads > 0 ? ((coldLeads / totalLeads) * 100).toFixed(0) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-500" 
                  style={{ width: `${totalLeads > 0 ? (coldLeads / totalLeads) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-gray-400 uppercase">Avg Response Time</span>
              <div className="text-sm font-bold text-[#D4AF37] mt-0.5">&lt; 15 Mins</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-gray-400 uppercase">Negotiations</span>
              <div className="text-sm font-bold text-white mt-0.5">{inNegotiation}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-gray-400 uppercase">Site Visits</span>
              <div className="text-sm font-bold text-white mt-0.5">{siteVisits}</div>
            </div>
          </div>
        </div>

        {/* Pipeline Stage Funnel */}
        <div className="p-6 rounded-2xl bg-[#091a13]/80 border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <span>Sales Pipeline Funnel</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Distribution across client transaction milestones</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {stages.map((stage) => {
              const pct = totalLeads > 0 ? Math.round((stage.count / totalLeads) * 100) : 0;
              return (
                <div key={stage.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-300">{stage.name}</span>
                    <span className="font-mono text-gray-400">{stage.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-[#013724]/40 border border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-[#D4AF37]" />
              <div className="text-xs">
                <span className="font-bold text-white">Pipeline Velocity: </span>
                <span className="text-gray-300">High active conversion momentum</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>
      </div>

      {/* Sources & Property Interest Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiries by Source */}
        <div className="p-6 rounded-2xl bg-[#091a13]/80 border border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Lead Acquisition Sources</span>
          </h3>
          <p className="text-xs text-gray-400">Where interested property buyers originate from</p>

          <div className="space-y-2.5 pt-2">
            {sourceEntries.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No source data available.</p>
            ) : (
              sourceEntries.map(([src, count]) => {
                const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                return (
                  <div key={src} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span className="text-xs font-semibold text-white">{src}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gray-400">{count} inquiries</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#D4AF37] font-bold">
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Top Properties in Demand */}
        <div className="p-6 rounded-2xl bg-[#091a13]/80 border border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            <span>Top Properties in Demand</span>
          </h3>
          <p className="text-xs text-gray-400">Inventory items generating the highest buyer interest</p>

          <div className="space-y-2.5 pt-2">
            {propEntries.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No property inquiries yet.</p>
            ) : (
              propEntries.map(([propName, count], idx) => (
                <div key={propName} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">{propName}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 shrink-0 ml-2">
                    {count} Enquiries
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMAnalytics;
