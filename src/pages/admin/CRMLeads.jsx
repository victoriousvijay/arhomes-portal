import React, { useState, useRef } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Plus, 
  Phone, 
  MessageCircle, 
  Trash2, 
  Flame, 
  Thermometer, 
  CheckCircle2, 
  Clock, 
  Calendar,
  X,
  FileSpreadsheet,
  Eye,
  Mail
} from 'lucide-react';

const STATUS_OPTIONS = [
  'New Lead',
  'Contacted',
  'Site Visit Scheduled',
  'Negotiation',
  'Won',
  'Lost'
];

const TEMPERATURE_OPTIONS = [
  { value: 'Hot', label: 'Hot 🔥', color: 'bg-red-500/20 text-red-300 border-red-500/40' },
  { value: 'Warm', label: 'Warm 🟡', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { value: 'Cold', label: 'Cold ❄️', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' }
];

export const CRMLeads = () => {
  const { leads, addLead, updateLead, deleteLead, importLeadsCSV, exportLeadsCSV } = useSiteData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTemp, setSelectedTemp] = useState('All');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailLead, setDetailLead] = useState(null);
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    property_interest: '',
    budget: '',
    message: '',
    temperature: 'Warm',
    status: 'New Lead'
  });

  const fileInputRef = useRef(null);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === '' ||
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.property_interest?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    const matchesTemp = selectedTemp === 'All' || lead.temperature === selectedTemp;

    return matchesSearch && matchesStatus && matchesTemp;
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.phone) return;
    await addLead({ ...newLeadData, source: 'Manual Admin Entry' });
    setIsAddModalOpen(false);
    setNewLeadData({
      name: '',
      phone: '',
      email: '',
      property_interest: '',
      budget: '',
      message: '',
      temperature: 'Warm',
      status: 'New Lead'
    });
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result;
      if (typeof text !== 'string') return;

      const lines = text.split('\n').filter(Boolean);
      if (lines.length < 2) return;

      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
      const parsedRows = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        if (values.length >= 2) {
          const rowObj = {};
          headers.forEach((h, idx) => {
            rowObj[h] = values[idx] || '';
          });
          parsedRows.push(rowObj);
        }
      }

      if (parsedRows.length > 0) {
        await importLeadsCSV(parsedRows);
        alert(`Successfully imported ${parsedRows.length} leads!`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const formatWhatsAppLink = (phone, name, prop) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello ${name || 'Sir/Ma\'am'}, this is AR Homes Client Relations regarding your interest in ${prop || 'our luxury residences in Jaipur'}. How may I assist you today?`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Leads & Client Inquiries CRM
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time inquiries, pipeline stages, lead temperatures, and one-click communication desk.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* CSV Import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Import Leads from CSV"
          >
            <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Import CSV</span>
          </button>

          {/* CSV Export */}
          <button
            type="button"
            onClick={exportLeadsCSV}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Download CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export CSV</span>
          </button>

          {/* Add Lead */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#013724] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#030906] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone, email, or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a1811] border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Temperature Filter */}
          <select
            value={selectedTemp}
            onChange={(e) => setSelectedTemp(e.target.value)}
            className="bg-[#0a1811] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="All">All Temperatures</option>
            <option value="Hot">🔥 Hot</option>
            <option value="Warm">🟡 Warm</option>
            <option value="Cold">❄️ Cold</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0a1811] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="All">All Pipeline Stages</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Leads Table */}
      <div className="bg-[#030906] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-black/50 text-gray-400 border-b border-white/10 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3.5">Client & Contact</th>
                <th className="px-5 py-3.5">Property & Budget</th>
                <th className="px-5 py-3.5">Temperature</th>
                <th className="px-5 py-3.5">Pipeline Stage</th>
                <th className="px-5 py-3.5">Source & Date</th>
                <th className="px-5 py-3.5 text-right">Instant Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No leads found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const currentTemp = TEMPERATURE_OPTIONS.find(t => t.value === lead.temperature) || TEMPERATURE_OPTIONS[1];

                  return (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Client & Contact */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="text-gray-400 font-mono text-[11px] mt-0.5">{lead.phone}</div>
                        {lead.email && <div className="text-gray-400 text-[10px] truncate max-w-[180px]">{lead.email}</div>}
                      </td>

                      {/* Property & Budget */}
                      <td className="px-5 py-4">
                        <div className="font-medium text-white">{lead.property_interest || 'General'}</div>
                        <div className="text-xs text-[#D4AF37] font-semibold">{lead.budget || 'Budget Unspecified'}</div>
                        {lead.message && (
                          <div className="text-[11px] text-gray-400 font-light mt-1 line-clamp-1 max-w-xs" title={lead.message}>
                            "{lead.message}"
                          </div>
                        )}
                      </td>

                      {/* Temperature Dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={lead.temperature || 'Warm'}
                          onChange={(e) => updateLead(lead.id, { temperature: e.target.value })}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${currentTemp.color} bg-black/40 focus:outline-none cursor-pointer`}
                        >
                          <option value="Hot" className="bg-[#030906] text-white">🔥 Hot</option>
                          <option value="Warm" className="bg-[#030906] text-white">🟡 Warm</option>
                          <option value="Cold" className="bg-[#030906] text-white">❄️ Cold</option>
                        </select>
                      </td>

                      {/* Pipeline Stage Dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={lead.status || 'New Lead'}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                          className="bg-[#0a1811] border border-white/20 text-gray-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#030906] text-white">{opt}</option>
                          ))}
                        </select>
                      </td>

                      {/* Source & Date */}
                      <td className="px-5 py-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-medium mb-1">
                          {lead.source || 'Website'}
                        </span>
                        <div className="text-[10px] text-gray-500 font-mono">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                        </div>
                      </td>

                      {/* Instant Actions (View Details, WhatsApp, Phone, Delete) */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Full Details */}
                          <button
                            type="button"
                            onClick={() => setDetailLead(lead)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-[#013724] text-gray-300 hover:text-[#D4AF37] transition-all cursor-pointer border border-white/15"
                            title="View Full Inquirer Details & Answers"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* One-Click WhatsApp */}
                          <a
                            href={formatWhatsAppLink(lead.phone, lead.name, lead.property_interest)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all cursor-pointer border border-[#25D366]/30"
                            title="Send WhatsApp Follow-up"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          {/* One-Click Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-xl bg-[#013724] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#013724] transition-all cursor-pointer border border-[#205843]"
                            title="Call Lead"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          {/* Delete Lead */}
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete lead for ${lead.name}?`)) deleteLead(lead.id);
                            }}
                            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all cursor-pointer border border-white/10"
                            title="Delete Lead"
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

      {/* Lead Details & Custom Responses Modal */}
      {detailLead && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#05110a] border border-white/20 rounded-3xl p-6 sm:p-7 max-w-lg w-full text-white shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">
                  Client Inquiry Profile
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">{detailLead.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailLead(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/50 border border-white/10">
              <a
                href={formatWhatsAppLink(detailLead.phone, detailLead.name, detailLead.property_interest)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${detailLead.phone}`}
                className="flex-1 py-2 px-3 rounded-xl bg-[#013724] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#013724] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Client</span>
              </a>

              {detailLead.email && (
                <a
                  href={`mailto:${detailLead.email}`}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                </a>
              )}
            </div>

            {/* Inquirer Key Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Phone Number</span>
                <div className="font-mono text-white font-bold">{detailLead.phone}</div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Email</span>
                <div className="text-gray-200 truncate">{detailLead.email || 'Not Provided'}</div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Property Interest</span>
                <div className="text-white font-medium truncate">{detailLead.property_interest || 'General Luxury'}</div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Target Budget</span>
                <div className="text-[#D4AF37] font-bold">{detailLead.budget || 'Unspecified'}</div>
              </div>
            </div>

            {/* Custom Question Responses / Client Preferences */}
            {(detailLead.notes || detailLead.message) && (
              <div className="p-3.5 rounded-2xl bg-[#013724]/40 border border-[#D4AF37]/30 space-y-2 text-xs">
                <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <span>Client Form Responses & Preferences:</span>
                </div>
                <div className="text-gray-200 text-xs whitespace-pre-wrap leading-relaxed font-light">
                  {detailLead.notes || detailLead.message}
                </div>
              </div>
            )}

            {/* Status & Temperature Updaters */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-semibold mb-1">
                  Lead Temperature
                </label>
                <select
                  value={detailLead.temperature || 'Warm'}
                  onChange={(e) => {
                    const newTemp = e.target.value;
                    updateLead(detailLead.id, { temperature: newTemp });
                    setDetailLead({ ...detailLead, temperature: newTemp });
                  }}
                  className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Hot">🔥 Hot (Ready Buyer)</option>
                  <option value="Warm">🟡 Warm (Interested)</option>
                  <option value="Cold">❄️ Cold (Browsing)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-semibold mb-1">
                  Pipeline Stage
                </label>
                <select
                  value={detailLead.status || 'New Lead'}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    updateLead(detailLead.id, { status: newStatus });
                    setDetailLead({ ...detailLead, status: newStatus });
                  }}
                  className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-gray-400">
              <span className="text-[10px]">Source: {detailLead.source || 'Website'}</span>
              <button
                type="button"
                onClick={() => setDetailLead(null)}
                className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#040c08] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-xl font-bold">Add New Lead to CRM</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aniruddh Singh"
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98..."
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Property Interest</label>
                  <input
                    type="text"
                    placeholder="e.g. C2 Civil Lines Floor"
                    value={newLeadData.property_interest}
                    onChange={(e) => setNewLeadData({ ...newLeadData, property_interest: e.target.value })}
                    className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Target Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹3 - 5 Cr"
                    value={newLeadData.budget}
                    onChange={(e) => setNewLeadData({ ...newLeadData, budget: e.target.value })}
                    className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Lead Temperature</label>
                  <select
                    value={newLeadData.temperature}
                    onChange={(e) => setNewLeadData({ ...newLeadData, temperature: e.target.value })}
                    className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Hot">🔥 Hot (Immediate Intent)</option>
                    <option value="Warm">🟡 Warm (Interested)</option>
                    <option value="Cold">❄️ Cold (Browsing)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Pipeline Stage</label>
                  <select
                    value={newLeadData.status}
                    onChange={(e) => setNewLeadData({ ...newLeadData, status: e.target.value })}
                    className="w-full bg-[#0a1811] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Notes / Requirement Summary</label>
                <textarea
                  rows={2}
                  placeholder="Notes from initial conversation..."
                  value={newLeadData.message}
                  onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                  className="w-full bg-[#0a1811] border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#013724] font-bold uppercase tracking-wider cursor-pointer shadow-lg"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CRMLeads;
