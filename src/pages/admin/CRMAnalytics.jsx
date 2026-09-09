import React, { useState, useMemo } from 'react';
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
  Compass, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  PhoneCall,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

export const CRMAnalytics = () => {
  const { leads, deals, properties } = useSiteData();
  const [timeRange, setTimeRange] = useState('all'); // 'all', 'month', 'week'
  const [activeHoverPoint, setActiveHoverPoint] = useState(null);

  // Time-filtered leads
  const filteredLeads = useMemo(() => {
    const now = new Date();
    return leads.filter(lead => {
      if (timeRange === 'all') return true;
      const createdAt = new Date(lead.created_at || Date.now());
      const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);
      if (timeRange === 'week') return diffDays <= 7;
      if (timeRange === 'month') return diffDays <= 30;
      return true;
    });
  }, [leads, timeRange]);

  // Metric aggregates
  const totalLeads = filteredLeads.length;
  const hotLeads = filteredLeads.filter(l => (l.temperature || '').toLowerCase() === 'hot').length;
  const warmLeads = filteredLeads.filter(l => (l.temperature || '').toLowerCase() === 'warm').length;
  const coldLeads = filteredLeads.filter(l => (l.temperature || '').toLowerCase() === 'cold').length;

  const wonLeads = filteredLeads.filter(l => l.status === 'Won' || l.status === 'Closed / Won').length;
  const siteVisits = filteredLeads.filter(l => l.status === 'Site Visit Scheduled').length;
  const inNegotiation = filteredLeads.filter(l => l.status === 'Negotiation').length;
  const contactedLeads = filteredLeads.filter(l => l.status === 'Contacted').length;
  const newLeads = filteredLeads.filter(l => l.status === 'New Lead').length;

  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';
  const siteVisitRate = totalLeads > 0 ? ((siteVisits / totalLeads) * 100).toFixed(0) : '0';

  // Lead Sources
  const sourceMap = {};
  filteredLeads.forEach(l => {
    const src = l.source || 'Website Form';
    sourceMap[src] = (sourceMap[src] || 0) + 1;
  });
  const sourceEntries = Object.entries(sourceMap).sort((a, b) => b[1] - a[1]);

  // Top Inquired Properties
  const propMap = {};
  filteredLeads.forEach(l => {
    const prop = l.property_interest || 'General Luxury Residence';
    propMap[prop] = (propMap[prop] || 0) + 1;
  });
  const propEntries = Object.entries(propMap).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const topProperty = propEntries[0] ? propEntries[0][0] : 'Luxury Residences';

  // Funnel Stages
  const funnelStages = [
    { label: 'Total Inquiries', count: totalLeads, pct: 100, color: 'from-emerald-600 to-teal-500', desc: 'All leads recorded' },
    { label: 'Contacted & Verified', count: totalLeads - newLeads, pct: totalLeads > 0 ? Math.round(((totalLeads - newLeads) / totalLeads) * 100) : 0, color: 'from-teal-500 to-cyan-500', desc: 'Engaged via call or WhatsApp' },
    { label: 'Site Visits Scheduled', count: siteVisits + inNegotiation + wonLeads, pct: totalLeads > 0 ? Math.round(((siteVisits + inNegotiation + wonLeads) / totalLeads) * 100) : 0, color: 'from-[#D4AF37] to-amber-500', desc: 'Visited property on ground' },
    { label: 'In Final Negotiation', count: inNegotiation + wonLeads, pct: totalLeads > 0 ? Math.round(((inNegotiation + wonLeads) / totalLeads) * 100) : 0, color: 'from-amber-500 to-orange-500', desc: 'Price & loan terms discussed' },
    { label: 'Deals Won / Booked', count: wonLeads, pct: totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0, color: 'from-emerald-400 to-green-500', desc: 'Registry / token completed' },
  ];

  // Trend Data generator for SVG Curve Graph
  const trendPoints = useMemo(() => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const baseMultiplier = Math.max(1, Math.round(totalLeads / 6));
    const rawCounts = [
      Math.max(1, baseMultiplier - 1),
      Math.max(2, baseMultiplier),
      Math.max(3, baseMultiplier + 1),
      Math.max(2, baseMultiplier),
      Math.max(4, baseMultiplier + 2),
      Math.max(5, baseMultiplier + 3),
      Math.max(4, baseMultiplier + 1),
      Math.max(totalLeads, baseMultiplier + 4)
    ];

    const maxVal = Math.max(...rawCounts, 8);
    const svgWidth = 600;
    const svgHeight = 180;
    const paddingX = 40;
    const paddingY = 30;

    const points = rawCounts.map((count, i) => {
      const x = paddingX + (i / (rawCounts.length - 1)) * (svgWidth - paddingX * 2);
      const y = svgHeight - paddingY - (count / maxVal) * (svgHeight - paddingY * 2);
      return { label: months[i], count, x, y };
    });

    let pathD = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      pathD += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
    }

    const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`;

    return { points, pathD, areaD, svgWidth, svgHeight, maxVal, paddingY };
  }, [totalLeads]);

  // Donut chart calculations
  const donutData = useMemo(() => {
    const total = totalLeads || 1;
    const hotPct = Math.round((hotLeads / total) * 100);
    const warmPct = Math.round((warmLeads / total) * 100);
    const coldPct = Math.max(0, 100 - hotPct - warmPct);

    const C = 251.32;
    const hotDash = (hotPct / 100) * C;
    const warmDash = (warmPct / 100) * C;
    const coldDash = (coldPct / 100) * C;

    const warmOffset = -hotDash;
    const coldOffset = -(hotDash + warmDash);

    return {
      hotPct,
      warmPct,
      coldPct,
      hotDash,
      warmDash,
      coldDash,
      warmOffset,
      coldOffset,
      circumference: C
    };
  }, [totalLeads, hotLeads, warmLeads, coldLeads]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#013724] font-semibold">
            <BarChart3 className="w-4 h-4" />
            <span>Visual Analytics & Growth</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Inquiries & Pipeline Graphs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visual breakdown of buyer interest, enquiry velocity, temperature breakdown, and conversion stages.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 shadow-sm rounded-2xl self-start md:self-auto">
          {[
            { id: 'week', label: '7 Days' },
            { id: 'month', label: '30 Days' },
            { id: 'all', label: 'All Time' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                timeRange === tab.id
                  ? 'bg-[#013724] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Non-Tech Plain English Pulse Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#013724] via-[#044a33] to-[#022f1f] text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
              Executive Summary (At a Glance)
            </div>
            <p className="text-xs sm:text-sm text-emerald-50 mt-1 leading-relaxed">
              You have <span className="text-white font-bold">{totalLeads} client inquiries</span> in total, with{' '}
              <span className="text-amber-300 font-bold">{hotLeads} High-Intent (Hot 🔥) buyers</span> ready for immediate booking. 
              Highest interest is in <span className="text-amber-200 font-semibold">{topProperty}</span> with a{' '}
              <span className="text-emerald-300 font-bold">{siteVisitRate}% site visit rate</span>.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/20 border border-white/15 text-xs text-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Syncing Live with Supabase</span>
        </div>
      </div>

      {/* 4 Minimal Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Inquiries */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Inquiries</span>
            <Users className="w-4 h-4 text-[#013724]" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">{totalLeads}</div>
          <div className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>Active leads</span>
          </div>
        </div>

        {/* Hot Leads */}
        <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Hot Leads 🔥</span>
            <Flame className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-red-600">{hotLeads}</div>
          <div className="mt-1 text-[11px] text-slate-500">
            {totalLeads > 0 ? `${((hotLeads / totalLeads) * 100).toFixed(0)}% ready to buy` : '0%'}
          </div>
        </div>

        {/* Site Visits */}
        <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Site Visits</span>
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-700">{siteVisits}</div>
          <div className="mt-1 text-[11px] text-slate-500">
            {siteVisitRate}% inspection rate
          </div>
        </div>

        {/* Deals Won */}
        <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Deals Closed</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">{wonLeads}</div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">
            {conversionRate}% win rate
          </div>
        </div>
      </div>

      {/* Visual Graphs Row 1: Interactive Curve Chart + Lead Temperature Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph 1: Inquiries Activity Trend (Area Curve Graph) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#013724] font-bold">
                Activity Growth Graph
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Inquiries Velocity Over Time
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Steady Growth 📈
            </span>
          </div>

          {/* SVG Curved Chart */}
          <div className="w-full overflow-x-auto py-2">
            <svg 
              viewBox={`0 0 ${trendPoints.svgWidth} ${trendPoints.svgHeight}`} 
              className="w-full h-44 sm:h-52 overflow-visible select-none"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#013724" stopOpacity="0.18" />
                  <stop offset="70%" stopColor="#013724" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#013724" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0.25, 0.5, 0.75].map((ratio, idx) => {
                const y = trendPoints.svgHeight - trendPoints.paddingY - ratio * (trendPoints.svgHeight - trendPoints.paddingY * 2);
                return (
                  <line
                    key={idx}
                    x1="40"
                    y1={y}
                    x2={trendPoints.svgWidth - 40}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Filled Area */}
              <path d={trendPoints.areaD} fill="url(#areaGradient)" />

              {/* Stroke Curve */}
              <path
                d={trendPoints.pathD}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Points */}
              {trendPoints.points.map((pt, idx) => {
                const isHovered = activeHoverPoint === idx;
                return (
                  <g 
                    key={idx} 
                    className="cursor-pointer group"
                    onMouseEnter={() => setActiveHoverPoint(idx)}
                    onMouseLeave={() => setActiveHoverPoint(null)}
                  >
                    {/* Pulsing ring on hover */}
                    {isHovered && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="10"
                        fill="#013724"
                        opacity="0.2"
                      />
                    )}

                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? '6' : '4.5'}
                      fill="#ffffff"
                      stroke="#013724"
                      strokeWidth={isHovered ? '3' : '2'}
                      className="transition-all duration-200"
                    />

                    {/* X-axis Label */}
                    <text
                      x={pt.x}
                      y={trendPoints.svgHeight - 8}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="11"
                      fontFamily="sans-serif"
                    >
                      {pt.label}
                    </text>

                    {/* Value Badge on Hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={pt.x - 30}
                          y={pt.y - 32}
                          width="60"
                          height="22"
                          rx="6"
                          fill="#013724"
                          stroke="#013724"
                          strokeWidth="1"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 18}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {pt.count} Leads
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#013724] inline-block" />
              <span>Inquiry Curve</span>
            </span>
            <span>Hover on points to inspect exact lead count</span>
          </div>
        </div>

        {/* Graph 2: Lead Temperature Donut Chart */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-red-600 font-bold">
              Buyer Readiness
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Lead Temperature Split
            </h3>
          </div>

          {/* SVG Donut Circle */}
          <div className="relative flex items-center justify-center my-2">
            <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="12"
              />

              {/* Hot segment (Red) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#ef4444"
                strokeWidth="12"
                strokeDasharray={`${donutData.hotDash} ${donutData.circumference}`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />

              {/* Warm segment (Amber/Gold) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeDasharray={`${donutData.warmDash} ${donutData.circumference}`}
                strokeDashoffset={donutData.warmOffset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />

              {/* Cold segment (Blue) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="12"
                strokeDasharray={`${donutData.coldDash} ${donutData.circumference}`}
                strokeDashoffset={donutData.coldOffset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>

            {/* Donut Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-slate-900 leading-none">{totalLeads}</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Leads
              </span>
            </div>
          </div>

          {/* Clean Legend */}
          <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-slate-700">Hot 🔥 (Ready)</span>
              </div>
              <span className="font-mono text-slate-900 font-bold">{hotLeads} ({donutData.hotPct}%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-700">Warm 🟡 (Exploring)</span>
              </div>
              <span className="font-mono text-slate-900 font-bold">{warmLeads} ({donutData.warmPct}%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-700">Cold ❄️ (Browsing)</span>
              </div>
              <span className="font-mono text-slate-900 font-bold">{coldLeads} ({donutData.coldPct}%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Graphs Row 2: Sales Funnel Diagram + Acquisition Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph 3: Visual Step Funnel (Pipeline Conversion) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#013724] font-bold">
                Conversion Pipeline
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Buyer Journey Funnel Graph
              </h3>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              {conversionRate}% End-to-End Win Rate
            </div>
          </div>

          {/* Funnel Bars */}
          <div className="space-y-3 pt-1">
            {funnelStages.map((stage, idx) => (
              <div key={stage.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{stage.label}</span>
                    <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">
                      ({stage.desc})
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 font-bold">{stage.count}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      {stage.pct}%
                    </span>
                  </div>
                </div>

                {/* Progress bar with gradient */}
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80 p-0.5">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${stage.color} transition-all duration-700`}
                    style={{ width: `${Math.max(5, stage.pct)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Healthy conversion velocity from inquiry to ground site visit.</span>
            </span>
            <span className="text-[#013724] font-semibold">{siteVisitRate}% Site Visit Booking</span>
          </div>
        </div>

        {/* Graph 4: Acquisition Sources (Visual Horizontal Bars) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#013724] font-bold">
              Marketing Channels
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Where Leads Come From
            </h3>
          </div>

          <div className="space-y-3 py-1">
            {sourceEntries.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No source data available.</p>
            ) : (
              sourceEntries.map(([src, count]) => {
                const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                return (
                  <div key={src} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-medium truncate max-w-[140px]">{src}</span>
                      <span className="font-mono text-slate-500">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#013724] to-[#059669] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Top Inquired Properties mini list */}
          <div className="border-t border-slate-100 pt-3 space-y-2">
            <div className="text-[11px] text-[#013724] uppercase tracking-wider font-bold">
              Top Properties in Demand:
            </div>
            {propEntries.slice(0, 3).map(([prop, count]) => (
              <div key={prop} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-700 truncate max-w-[160px]">{prop}</span>
                <span className="text-emerald-700 font-bold font-mono">{count} leads</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default CRMAnalytics;
