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
  Mail,
  ShieldCheck
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
  { value: 'Hot', label: 'Hot 🔥', color: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'Warm', label: 'Warm 🟡', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { value: 'Cold', label: 'Cold ❄️', color: 'bg-blue-50 text-blue-700 border-blue-200' }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Leads & Client Inquiries CRM
          </h1>
          <p className="text-xs text-slate-500 mt-1">
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
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Import Leads from CSV"
          >
            <Upload className="w-3.5 h-3.5 text-[#013724]" />
            <span>Import CSV</span>
          </button>

          {/* CSV Export */}
          <button
            type="button"
            onClick={exportLeadsCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Download CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-[#013724]" />
            <span>Export CSV</span>
          </button>

          {/* Add Lead */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#013724] hover:bg-[#024d33] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone, email, or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#013724] focus:bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Temperature Filter */}
          <select
            value={selectedTemp}
            onChange={(e) => setSelectedTemp(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#013724] cursor-pointer"
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
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#013724] cursor-pointer"
          >
            <option value="All">All Pipeline Stages</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Leads Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3.5">Client & Contact</th>
                <th className="px-5 py-3.5">Property & Budget</th>
                <th className="px-5 py-3.5">Temperature</th>
                <th className="px-5 py-3.5">Pipeline Stage</th>
                <th className="px-5 py-3.5">Source & Date</th>
                <th className="px-5 py-3.5 text-right">Instant Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No leads found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const currentTemp = TEMPERATURE_OPTIONS.find(t => t.value === lead.temperature) || TEMPERATURE_OPTIONS[1];

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Client & Contact */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                        <div className="text-slate-500 font-mono text-[11px] mt-0.5">{lead.phone}</div>
                        {lead.email && <div className="text-slate-500 text-[10px] truncate max-w-[180px]">{lead.email}</div>}
                      </td>

                      {/* Property & Budget */}
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">{lead.property_interest || 'General'}</div>
                        <div className="text-xs text-[#013724] font-bold">{lead.budget || 'Budget Unspecified'}</div>
                        {lead.message && (
                          <div className="text-[11px] text-slate-500 font-light mt-1 line-clamp-1 max-w-xs" title={lead.message}>
                            "{lead.message}"
                          </div>
                        )}
                      </td>

                      {/* Temperature Dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={lead.temperature || 'Warm'}
                          onChange={(e) => updateLead(lead.id, { temperature: e.target.value })}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${currentTemp.color} bg-white focus:outline-none cursor-pointer`}
                        >
                          <option value="Hot">🔥 Hot</option>
                          <option value="Warm">🟡 Warm</option>
                          <option value="Cold">❄️ Cold</option>
                        </select>
                      </td>

                      {/* Pipeline Stage Dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={lead.status || 'New Lead'}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                          className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#013724] cursor-pointer"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>

                      {/* Source, Date & Consent Badges */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                            {lead.source || 'Website'}
                          </span>
                          {lead.privacy_consent !== false && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold" title="DPDPA & RERA Consent Verified">
                              <span>🛡️ Consent</span>
                            </span>
                          )}
                          {lead.marketing_consent && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[9px] font-semibold" title="Marketing Opt-In Granted">
                              <span>📢 Marketing</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
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
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer border border-slate-200"
                            title="View Full Inquirer Details & Answers"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* One-Click WhatsApp */}
                          <a
                            href={formatWhatsAppLink(lead.phone, lead.name, lead.property_interest)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-all cursor-pointer border border-emerald-200"
                            title="Send WhatsApp Follow-up"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          {/* One-Click Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 transition-all cursor-pointer border border-blue-200"
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
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-all cursor-pointer border border-rose-200"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-lg w-full max-h-[88vh] flex flex-col text-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Pinned Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#013724] font-bold">
                  Client Inquiry Profile
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{detailLead.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailLead(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4 text-xs pr-1">
              {/* Quick Contact & Action Buttons */}
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <a
                  href={formatWhatsAppLink(detailLead.phone, detailLead.name, detailLead.property_interest)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${detailLead.phone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#013724] hover:bg-[#024d33] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Call Client</span>
                </a>

                {detailLead.email && (
                  <a
                    href={`mailto:${detailLead.email}`}
                    className="py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4 text-slate-700" />
                  </a>
                )}
              </div>

              {/* Inquirer Key Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Phone Number</span>
                  <div className="font-mono text-slate-900 font-bold">{detailLead.phone}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Email</span>
                  <div className="text-slate-700 truncate">{detailLead.email || 'Not Provided'}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Property Interest</span>
                  <div className="text-slate-900 font-medium truncate">{detailLead.property_interest || 'General Luxury'}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Target Budget</span>
                  <div className="text-[#013724] font-bold">{detailLead.budget || 'Unspecified'}</div>
                </div>
              </div>

              {/* Custom Question Responses / Client Preferences */}
              {(detailLead.notes || detailLead.message) && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-[#013724] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Client Form Responses & Preferences:</span>
                  </div>
                  <div className="text-slate-800 text-xs whitespace-pre-wrap leading-relaxed">
                    {detailLead.notes || detailLead.message}
                  </div>
                </div>
              )}

              {/* Legal Consent & Compliance Audit Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>DPDPA & RERA Legal Consent Audit</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-normal">
                    Policy {detailLead.policy_version || 'v2026.1'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-0.5 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Privacy Consent</span>
                    <span className={`font-semibold text-xs ${detailLead.privacy_consent !== false ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {detailLead.privacy_consent !== false ? '✓ Granted (Mandatory)' : '✗ Not Granted'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Marketing Opt-In</span>
                    <span className={`font-semibold text-xs ${detailLead.marketing_consent ? 'text-purple-700' : 'text-slate-600'}`}>
                      {detailLead.marketing_consent ? '✓ Opt-In (WhatsApp/SMS)' : '○ Opt-Out (No Promo)'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Terms & Conditions</span>
                    <span className={`font-semibold text-xs ${detailLead.terms_accepted ? 'text-slate-900' : 'text-slate-500'}`}>
                      {detailLead.terms_accepted ? '✓ Accepted' : '○ Not Clicked'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Recorded Timestamp</span>
                    <span className="font-mono text-[10.5px] text-slate-700 truncate block" title={detailLead.consent_timestamp || detailLead.created_at}>
                      {detailLead.consent_timestamp ? new Date(detailLead.consent_timestamp).toLocaleString('en-IN') : 'Logged on submission'}
                    </span>
                  </div>
                </div>

                {detailLead.consent_audit_trail && (
                  <div className="text-[10px] font-mono text-slate-600 bg-white p-2 rounded-lg border border-slate-200 break-all leading-tight">
                    {detailLead.consent_audit_trail}
                  </div>
                )}
              </div>

              {/* Status & Temperature Updaters */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <label className="block text-slate-600 text-[10px] uppercase font-semibold mb-1">
                    Lead Temperature
                  </label>
                  <select
                    value={detailLead.temperature || 'Warm'}
                    onChange={(e) => {
                      const newTemp = e.target.value;
                      updateLead(detailLead.id, { temperature: newTemp });
                      setDetailLead({ ...detailLead, temperature: newTemp });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-[#013724]"
                  >
                    <option value="Hot">🔥 Hot (Ready Buyer)</option>
                    <option value="Warm">🟡 Warm (Interested)</option>
                    <option value="Cold">❄️ Cold (Browsing)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 text-[10px] uppercase font-semibold mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={detailLead.status || 'New Lead'}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      updateLead(detailLead.id, { status: newStatus });
                      setDetailLead({ ...detailLead, status: newStatus });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-[#013724]"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pinned Footer */}
            <div className="shrink-0 flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500">
              <span className="text-[10px]">Source: {detailLead.source || 'Website'}</span>
              <button
                type="button"
                onClick={() => setDetailLead(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal with Internal Scroll */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[88vh] flex flex-col text-slate-800 shadow-2xl overflow-hidden animate-in fade-in">
            {/* Pinned Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-serif text-xl font-bold text-slate-900">Add New Lead to CRM</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form with Internal Scroll */}
            <form onSubmit={handleAddSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 py-4 text-xs pr-1">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aniruddh Singh"
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98..."
                      value={newLeadData.phone}
                      onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="client@gmail.com"
                      value={newLeadData.email}
                      onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Property Interest</label>
                    <input
                      type="text"
                      placeholder="e.g. C2 Civil Lines Floor"
                      value={newLeadData.property_interest}
                      onChange={(e) => setNewLeadData({ ...newLeadData, property_interest: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Target Budget</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹3 - 5 Cr"
                      value={newLeadData.budget}
                      onChange={(e) => setNewLeadData({ ...newLeadData, budget: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Lead Temperature</label>
                    <select
                      value={newLeadData.temperature}
                      onChange={(e) => setNewLeadData({ ...newLeadData, temperature: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#013724]"
                    >
                      <option value="Hot">🔥 Hot (Immediate Intent)</option>
                      <option value="Warm">🟡 Warm (Interested)</option>
                      <option value="Cold">❄️ Cold (Browsing)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Pipeline Stage</label>
                    <select
                      value={newLeadData.status}
                      onChange={(e) => setNewLeadData({ ...newLeadData, status: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#013724]"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Notes / Requirement Summary</label>
                  <textarea
                    rows={2}
                    placeholder="Notes from initial conversation..."
                    value={newLeadData.message}
                    onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#013724]"
                  />
                </div>
              </div>

              {/* Pinned Footer */}
              <div className="shrink-0 pt-3 border-t border-slate-200 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#013724] hover:bg-[#024d33] text-white font-bold uppercase tracking-wider cursor-pointer shadow-md"
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
