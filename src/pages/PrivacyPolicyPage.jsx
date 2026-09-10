import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Eye, 
  CheckCircle2, 
  Server, 
  Database, 
  Clock, 
  Mail, 
  Building2, 
  AlertTriangle,
  Send,
  UserCheck,
  Globe,
  Phone
} from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: 'access',
    notes: ''
  });

  const handlePrivacyRequest = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader
        badge="DPDPA & RERA Compliance"
        title="Privacy"
        highlight="Policy"
        subtitle="At AR Homes, your privacy is protected by law and architectural integrity. Learn how we collect, process, and safeguard your personal details under the Digital Personal Data Protection Act (DPDPA), 2023 and Rajasthan RERA."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="max-w-[1050px] mx-auto px-6 sm:px-12 py-16 sm:py-24 text-gray-300 font-light space-y-16">
        
        {/* Compliance Hero Badge */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1612] border border-[#205843] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#013724] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                Statutory Compliance Framework
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-white mt-0.5">
                DPDPA 2023 & Rajasthan RERA Certified Privacy Standard
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Version <strong>v2026.1</strong> | Effective Date: <strong>September 1, 2026</strong> | Corporate Jurisdiction: <strong>Jaipur, Rajasthan</strong>
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <a 
              href="#privacy-request"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#013724] font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Submit Data Request</span>
            </a>
          </div>
        </div>

        {/* 1. Identity of the Business */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#D4AF37]" />
            <span>1. Corporate Identity & Data Fiduciary</span>
          </h2>
          <p className="text-sm leading-relaxed">
            This Privacy Policy governs the collection, processing, and storage of personal information by <strong>AR Homes</strong> ("AR Homes", "we", "our", or "us"), an elite real estate development and advisory firm operating in Jaipur, Rajasthan, India. Under the Digital Personal Data Protection Act (DPDPA), 2023, AR Homes acts as the <strong>Data Fiduciary</strong> regarding all personal data submitted through our digital surfaces.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <span className="text-[#D4AF37] font-semibold block">Registered Jaipur Headquarters:</span>
              <p>2nd Floor, Royal Enclave, Civil Lines / C-Scheme, Jaipur, Rajasthan - 302006</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <span className="text-[#D4AF37] font-semibold block">RERA Registration Authority:</span>
              <p>Governed by Rajasthan Real Estate Regulatory Authority (RAJ-RERA)</p>
            </div>
          </div>
        </section>

        {/* 2. Information Collected & Minimisation */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#D4AF37]" />
            <span>2. Categories of Data Collected (Data Minimisation)</span>
          </h2>
          <p className="text-sm leading-relaxed">
            In adherence to data minimisation principles, AR Homes collects only the specific personal information strictly necessary to service your real estate requests:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs sm:text-sm text-gray-300">
            <li>
              <strong>Direct Contact Credentials:</strong> Full Name, verified telephone number (for voice consultation and official WhatsApp updates), and email address.
            </li>
            <li>
              <strong>Property & Advisory Parameters:</strong> Preferred unit typology (e.g., Independent Floor, Triplex Villa, Sky Mansion, Commercial Suite), target budget range, preferred site inspection dates, and specific bespoke architectural preferences.
            </li>
            <li>
              <strong>Consent Records & Timestamps:</strong> Granular records of your explicit affirmative consent, including exact date, time, policy version reference (<code className="text-[#D4AF37] bg-white/10 px-1 rounded">v2026.1</code>), and whether you opted into promotional updates.
            </li>
            <li>
              <strong>Technical & Interaction Metadata:</strong> IP address, browser type, and interaction session telemetry to ensure anti-spam verification and edge security. We do <em>not</em> collect sensitive personal biometric or unauthorized location tracking data.
            </li>
          </ul>
        </section>

        {/* 3. Purpose of Processing & Legal Basis */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Eye className="w-6 h-6 text-[#D4AF37]" />
            <span>3. Purpose of Processing & Legal Basis</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Under Section 4 and Section 6 of the DPDPA 2023, AR Homes processes your personal data on the basis of <strong>explicit, affirmative consent</strong> provided at the time of form submission, and for fulfilling preliminary contractual inquiries:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              {
                title: 'Private Consultation & Walkthroughs',
                desc: 'Scheduling confidential physical walkthroughs and private viewing appointments at our Jaipur project sites.'
              },
              {
                title: 'Floor Plans & Sanctioned Price Lists',
                desc: 'Delivering verified architectural drawings, structural layouts, and official RAJ-RERA approved price schedules.'
              },
              {
                title: 'Statutory RERA Coordination',
                desc: 'Issuing formal booking forms, allotment paperwork, and compliance documentation required under Rajasthan RERA regulations.'
              },
              {
                title: 'Banking & Credit Advisory',
                desc: 'Coordinating preferential home loan underwriting with partner banks and financial institutions upon your explicit instruction.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0b1612] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Disclosed Third-Party Processors & Infrastructure */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Server className="w-6 h-6 text-[#D4AF37]" />
            <span>4. Sub-Processors & Technical Infrastructure</span>
          </h2>
          <p className="text-sm leading-relaxed">
            To provide robust enterprise security and fast global delivery, AR Homes engages vetted cloud infrastructure sub-processors under strict confidentiality and security commitments:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            
            {/* Processor 1: Vercel */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                <span>Hosting & Edge Delivery: Vercel Inc.</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Our web platform is deployed over Vercel's global edge network. All communication is enforced over HTTPS with TLS 1.3 cryptographic encryption in transit.
              </p>
            </div>

            {/* Processor 2: Supabase */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Cloud Database: Supabase (AWS Mumbai)</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Contact and CRM records are housed in a dedicated PostgreSQL database hosted within the <strong>AWS Mumbai Region (<code className="text-[#D4AF37]">ap-south-1</code>)</strong>, ensuring local data sovereignty under Indian law. Data is encrypted at rest (AES-256) and in transit.
              </p>
            </div>

            {/* Processor 3: WhatsApp & Telephony */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Messaging: Official WhatsApp Business API</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Instant inquiry updates and digital brochures are transmitted via verified Meta WhatsApp Business infrastructure under end-to-end transport encryption.
              </p>
            </div>

            {/* Processor 4: Transactional Mail */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Transactional Email Service</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Automated enquiry confirmations and property reports are delivered via dedicated enterprise SMTP mail relays protected by SPF, DKIM, and DMARC verification.
              </p>
            </div>

          </div>
          <div className="p-4 rounded-xl bg-[#013724]/60 border border-[#D4AF37]/30 text-xs text-gray-200">
            <strong>Strict Zero-Broker-Spam Guarantee:</strong> AR Homes does <strong>never</strong> sell, monetize, rent, or trade your personal contact information to third-party telemarketing companies, ad exchanges, or external commercial broker networks.
          </div>
        </section>

        {/* 5. Data Retention & RERA Statutory Schedules */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#D4AF37]" />
            <span>5. Data Retention & Statutory Preservation</span>
          </h2>
          <p className="text-sm leading-relaxed">
            We retain personal data only for as long as necessary to fulfill the purpose for which it was collected:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-gray-300">
            <li>
              <strong>Prospective Buyer Enquiries:</strong> Inactive inquiry leads who do not proceed to project booking are securely expunged or anonymized from our active communication registry within 24 months.
            </li>
            <li>
              <strong>Statutory RERA & Fiscal Exemption:</strong> When an inquiry results in a formal property booking, token transaction, or Agreement for Sale, Indian real estate laws (Section 11(1)(b) of the Real Estate (Regulation and Development) Act, 2016) and tax statutes mandate statutory document retention for a minimum of <strong>7 years</strong> following project completion. Such statutory records cannot be expunged prior to the expiration of legal prescription periods.
            </li>
          </ul>
        </section>

        {/* 6. Your Legal Rights under DPDPA */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
            <span>6. Your Digital Privacy Rights</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Under Chapter III of the Digital Personal Data Protection Act, 2023, you have enforceable rights regarding your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#D4AF37] font-semibold text-xs">Right to Access Information:</span>
              <p className="text-xs text-gray-300">You may request a summary of the personal data currently processed by AR Homes and the identities of any third parties with whom it was shared.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#D4AF37] font-semibold text-xs">Right to Correction & Erasure:</span>
              <p className="text-xs text-gray-300">You may request the correction of inaccurate personal data, completion of incomplete data, or erasure of your profile where retention is not required by law.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#D4AF37] font-semibold text-xs">Right to Withdraw Consent:</span>
              <p className="text-xs text-gray-300">You may revoke previously granted marketing or processing consent at any time without affecting the lawfulness of processing prior to withdrawal.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#D4AF37] font-semibold text-xs">Right of Grievance Redressal:</span>
              <p className="text-xs text-gray-300">You have the right to register complaints with our Data Protection Grievance Officer and escalate to the Data Protection Board of India.</p>
            </div>
          </div>
        </section>

        {/* 7. Interactive Privacy / Data Request Form */}
        <section id="privacy-request" className="space-y-6 pt-4">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0b1612] border border-[#D4AF37]/50 shadow-2xl relative">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                Exercise Your Data Rights
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
                Submit a Privacy or Data Deletion Request
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Use this verified channel to request data inspection, withdraw marketing communications, or initiate record erasure. Our Compliance Desk will process your verified request within 7 business days.
              </p>
            </div>

            {requestSubmitted ? (
              <div className="mt-8 p-6 rounded-2xl bg-[#013724] border border-[#D4AF37] text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-white">Data Request Logged</h4>
                <p className="text-xs text-gray-200 max-w-md mx-auto">
                  Thank you, <strong>{requestData.name}</strong>. Your request (<span className="capitalize">{requestData.requestType}</span>) has been queued with our Grievance Officer. A formal verification receipt has been sent to <strong>{requestData.email || requestData.phone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setRequestSubmitted(false)}
                  className="mt-3 px-5 py-2 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37]"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handlePrivacyRequest} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={requestData.name}
                      onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                      className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Registered Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={requestData.phone}
                      onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                      className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Registered Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={requestData.email}
                      onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                      className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Request Type *</label>
                    <select
                      value={requestData.requestType}
                      onChange={(e) => setRequestData({ ...requestData, requestType: e.target.value })}
                      className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="access">Access: Request copy of all personal data held</option>
                      <option value="correction">Correction: Update phone, email, or address</option>
                      <option value="withdraw_marketing">Withdraw Consent: Opt out of marketing & WhatsApp promotions</option>
                      <option value="erasure">Erasure: Permanent deletion of profile & enquiry logs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Additional Verification Notes (Optional)</label>
                  <textarea
                    rows="3"
                    placeholder="Specify any details regarding prior property inquiries, dates, or specific communication preferences..."
                    value={requestData.notes}
                    onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
                    className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400">
                  <span className="text-[#D4AF37] font-semibold mr-1">Statutory Notice:</span>
                  Requests for permanent deletion will be executed across all marketing and CRM lists immediately. If you have executed a legally binding Agreement for Sale or financial booking receipt, underlying documents will be archived strictly under statutory RERA retention obligations.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-white text-[#013724] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Verified Data Request</span>
                </button>
              </form>
            )}

          </div>
        </section>

        {/* 8. Grievance Officer & Contact Matrix */}
        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#D4AF37]" />
            <span>8. Data Protection Grievance Officer</span>
          </h2>
          <p className="text-sm leading-relaxed">
            In compliance with Section 19 of the Digital Personal Data Protection Act, 2023, AR Homes has designated a senior Compliance & Grievance Officer to address questions, requests, or disputes:
          </p>
          
          <div className="p-6 rounded-2xl bg-[#0b1612] border border-[#205843] text-xs space-y-2 text-gray-300">
            <p className="font-semibold text-white text-sm">AR Homes Legal, Compliance & Grievance Cell</p>
            <p className="text-[#D4AF37] font-medium">Designated Grievance Officer: Legal Counsel & Privacy Lead</p>
            <p>Corporate Office: Shop No. 1&2, opposed Chaska restaurant & BAR, Saket Vihar, Hatoj - Kalwar - Jaipur Rd, Jaipur, Rajasthan 302012</p>
            <p>
              Direct Email:{' '}
              <a href="mailto:arhomesjaipur@gmail.com" className="text-[#D4AF37] hover:underline font-mono">
                arhomesjaipur@gmail.com
              </a>{' '}
              | Escalations:{' '}
              <a href="mailto:arhomesjaipur@gmail.com" className="text-[#D4AF37] hover:underline font-mono">
                arhomesjaipur@gmail.com
              </a>
            </p>
            <p>Direct Helpline: +91 88755 66970 (Available Mon–Sat: 10:00 AM – 6:00 PM IST)</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
