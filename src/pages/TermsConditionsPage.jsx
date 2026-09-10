import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  FileCheck, 
  AlertCircle, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Database, 
  Server, 
  UserCheck, 
  Phone, 
  Mail, 
  Clock,
  FileText
} from 'lucide-react';

export const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader
        badge="Legal Terms & Digital Safety"
        title="Terms &"
        highlight="Conditions"
        subtitle="Please review these comprehensive Terms & Conditions. By utilizing the AR Homes portal, requesting consultations, or scheduling site visits, you agree to these terms, our enterprise data security standards, and DPDPA compliance protocols."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <div className="max-w-[1050px] mx-auto px-6 sm:px-12 py-16 sm:py-24 text-gray-300 font-light space-y-16">
        
        {/* Compliance Hero Badge */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1612] border border-[#205843] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#013724] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                Binding Legal Agreement & Data Safety Protocol
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-white mt-0.5">
                Digital Personal Data Protection (DPDP) Act, 2023 & Rajasthan RERA Compliant
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Version <strong>v2026.1</strong> | Effective Date: <strong>September 1, 2026</strong> | Applicable Jurisdiction: <strong>Jaipur, Rajasthan, India</strong>
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Link 
              to="/privacy-policy"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#013724] font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Read Privacy Policy</span>
            </Link>
          </div>
        </div>

        {/* 1. Acceptance & Contractual Capacity */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#D4AF37]" />
            <span>1. Acceptance of Terms & Corporate Identity</span>
          </h2>
          <p className="text-sm leading-relaxed">
            These Terms and Conditions constitute a legally binding agreement between you ("User", "Client", or "Data Principal") and <strong>AR Homes</strong> ("AR Homes", "we", "our", or "Data Fiduciary"), having its corporate headquarters at 2nd Floor, Royal Enclave, Civil Lines / C-Scheme, Jaipur, Rajasthan - 302006.
          </p>
          <p className="text-sm leading-relaxed">
            By accessing this digital portal (<code className="text-[#D4AF37]">arhomes.in</code>), submitting an enquiry form, checking the mandatory acceptance checkboxes, requesting price sheets, or scheduling private show residence viewings, you acknowledge that you have read, understood, and agree to be bound by these Terms and our incorporated{' '}
            <Link to="/privacy-policy" className="text-[#D4AF37] underline hover:text-[#e8c868] font-medium">
              Privacy Policy
            </Link>. If you do not agree to these terms, you must refrain from using this website or submitting personal data.
          </p>
        </section>

        {/* 2. Mandatory Data Collection & Lawful Basis (DPDPA 2023) */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#D4AF37]" />
            <span>2. Personal Data Collection & Lawful Consent (DPDP Act 2023)</span>
          </h2>
          <p className="text-sm leading-relaxed">
            To provide bespoke luxury real estate advisory and fulfill your inquiries, AR Homes collects and processes specific personal data. In strict accordance with <strong>Section 4, Section 5, and Section 6 of the Digital Personal Data Protection (DPDP) Act, 2023</strong>:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#0b1612] border border-white/10 space-y-2">
              <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-wider block">
                Personal Data We Collect:
              </span>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-300">
                <li>Full legal name and salutation.</li>
                <li>Contact telephone number and WhatsApp coordinates.</li>
                <li>Verified email address.</li>
                <li>Property interest (Floor, Villa, Penthouse, Land, Commercial).</li>
                <li>Investment budget ranges and possession timeframe.</li>
                <li>Network metadata, IP address, and anti-spam verification logs.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#0b1612] border border-white/10 space-y-2">
              <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-wider block">
                Purpose & Legal Basis:
              </span>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-300">
                <li>Direct advisory communication regarding requested residences.</li>
                <li>Delivering sanctioned floor plans, specifications, and brochures.</li>
                <li>Coordinating verified physical or virtual walkthroughs in Jaipur.</li>
                <li>Statutory pre-contractual compliance under Rajasthan RERA.</li>
                <li>Banking home loan eligibility assessment (upon client request).</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-relaxed">
            <strong className="text-[#D4AF37]">Affirmative Consent Verification:</strong> By actively checking the mandatory consent checkbox and submitting an inquiry form, you grant explicit, free, specific, informed, and unambiguous consent under the DPDP Act, 2023 for AR Homes to process the personal data submitted for the stated purposes.
          </div>
        </section>

        {/* 3. Enterprise Data Security & Client Protection Safeguards */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
            <span>3. Enterprise Client Data Security & Confidentiality Safeguards</span>
          </h2>
          <p className="text-sm leading-relaxed">
            AR Homes implements rigorous technical and organizational security measures under <strong>Section 8(5) of the DPDP Act, 2023</strong> to prevent unauthorized access, alteration, disclosure, or destruction of client personal information:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>End-to-End Cryptographic Encryption</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                All form submissions and browser interactions are enforced over <strong>HTTPS with Transport Layer Security (TLS 1.3)</strong>. Stored database records are encrypted at rest using military-grade <strong>AES-256 bit encryption</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Sovereign Indian Cloud Residency</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                All client databases are hosted within the <strong>AWS Mumbai Region (<code className="text-[#D4AF37]">ap-south-1</code>)</strong>, ensuring that all client records remain strictly within the sovereign territory of the Republic of India under Indian legal jurisdiction.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>Role-Based Access Governance</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Access to client inquiry records is restricted on a strict need-to-know basis to authenticated senior relationship directors protected by Multi-Factor Authentication (MFA) and binding non-disclosure covenants.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>Zero-Broker-Spam Guarantee</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                AR Homes maintains an absolute contractual guarantee: We <strong>never sell, lease, monetize, or trade</strong> your telephone number, WhatsApp, or email to third-party telemarketers, commercial aggregators, or external brokers.
              </p>
            </div>

          </div>
        </section>

        {/* 4. Client Rights as Data Principals */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-[#D4AF37]" />
            <span>4. Client Privacy Rights as Data Principals (DPDP Act 2023)</span>
          </h2>
          <p className="text-sm leading-relaxed">
            As a Data Principal under Indian law, you possess enforceable statutory rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-gray-300">
            <li>
              <strong>Right to Access:</strong> You may request a verified summary of all personal data held by AR Homes and the identity of any third-party infrastructure processors involved in servicing your inquiry.
            </li>
            <li>
              <strong>Right to Correction & Updating:</strong> You may request rectification of inaccurate contact coordinates or update your property requirements at any time.
            </li>
            <li>
              <strong>Right to Erasure & Consent Revocation:</strong> You may withdraw your consent and request the permanent deletion of your inquiry profile from our active marketing registry via our online desk or by emailing <a href="mailto:privacy@arhomes.in" className="text-[#D4AF37] underline font-mono">privacy@arhomes.in</a>.
            </li>
            <li>
              <strong>Right of Grievance Redressal:</strong> You may file a grievance with our designated Data Protection Officer, with a statutory 7-business-day resolution timeframe.
            </li>
          </ul>
          <div className="pt-2">
            <Link 
              to="/privacy-policy#privacy-request" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Submit a Verified Data Access / Deletion Request</span>
            </Link>
          </div>
        </section>

        {/* 5. Statutory RERA Retention vs. Erasure Exception */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#D4AF37]" />
            <span>5. Statutory Real Estate (RERA) Retention Override</span>
          </h2>
          <p className="text-sm leading-relaxed">
            To ensure complete legal compliance and protect AR Homes and its clients against regulatory non-compliance:
          </p>
          <div className="p-5 rounded-2xl bg-[#0b1612] border border-[#D4AF37]/40 space-y-2 text-xs text-gray-300 leading-relaxed">
            <span className="text-[#D4AF37] font-semibold text-sm block">Statutory Exception to Premature Erasure:</span>
            <p>
              While general website browsing inquiries may be deleted upon request, where an enquiry matures into an allotment application, booking advance receipt, KYC verification, or formal Agreement for Sale, statutory real estate enactments—including <strong>Section 11(1)(b) of the Real Estate (Regulation and Development) Act, 2016 (RERA)</strong>, the Prevention of Money Laundering Act (PMLA), and the Income Tax Act, 1961—mandate document preservation for a minimum statutory period of <strong>seven (7) years</strong>.
            </p>
            <p>
              In accordance with <strong>Section 8(7) of the DPDP Act, 2023</strong>, statutory retention mandates imposed by governing Indian enactments supersede requests for premature erasure. Such records are securely archived under restricted legal access until the expiration of statutory prescription periods.
            </p>
          </div>
        </section>

        {/* 6. Informational Nature of Website Content & RERA Disclaimers */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-[#D4AF37]" />
            <span>6. Informational Nature of Architectural Representations</span>
          </h2>
          <p className="text-sm leading-relaxed">
            All visual renderings, computer-generated walk-throughs, floor plans, dimensions, and specifications displayed on this portal represent architectural concepts. They are subject to sanction approvals by competent municipal authorities and the Rajasthan Real Estate Regulatory Authority (RAJ-RERA).
          </p>
          <p className="text-sm leading-relaxed">
            Submitting an enquiry or scheduling a walkthrough does <strong>not</strong> constitute an official offer, reservation, or conveyance of property title. Binding legal obligations arise exclusively upon execution and registration of an official Agreement for Sale in accordance with the Rajasthan Real Estate (Regulation and Development) Rules, 2017.
          </p>
        </section>

        {/* 7. Pricing Disclaimers & Ancillary Charges */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">7. Pricing Disclaimers & Statutory Levies</h2>
          <p className="text-sm leading-relaxed">
            Base prices published on the website (e.g., ₹3.85 Cr onwards) are indicative and subject to revision prior to formal booking. Unless explicitly stated in writing, base prices exclude:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs text-gray-400">
            <li>Applicable Goods and Services Tax (GST) and statutory central or state taxes.</li>
            <li>Stamp duty, registration charges, and documentation fees payable to the Sub-Registrar.</li>
            <li>Electricity connection deposits, water line infrastructure charges, and society maintenance sinking funds.</li>
          </ul>
        </section>

        {/* 8. User Obligations, Anti-Fraud & Cyber Security */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">8. User Obligations & Prohibition of Fraudulent Submissions</h2>
          <p className="text-sm leading-relaxed">
            By submitting personal data, you warrant that all information supplied is accurate, truthful, and pertains to your identity. Submitting fabricated contact details, impersonating third parties, or deploying automated bot scrapers, vulnerability scanners, or denial-of-service tools is strictly prohibited and constitutes a criminal offense under <strong>Sections 43, 66, and 66D of the Information Technology Act, 2000</strong>.
          </p>
        </section>

        {/* 9. Limitation of Liability & Third-Party Telco Intermediaries */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">9. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed">
            While AR Homes maintains enterprise security measures, AR Homes shall not be liable for any indirect, punitive, or consequential damages resulting from technical transmission failures, public internet disruptions, cellular carrier latency, or malicious interceptions occurring across third-party telecommunication networks outside our direct control.
          </p>
        </section>

        {/* 10. Intellectual Property Rights */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">10. Intellectual Property & Copyright</h2>
          <p className="text-sm leading-relaxed">
            The "AR Homes" brand crest, architectural designs, bespoke interior renderings, photography, and digital layouts are the exclusive intellectual property of AR Homes. Reproduction, duplication, or public redistribution without express written authorization is strictly prohibited under Indian Copyright Law.
          </p>
        </section>

        {/* 11. Grievance Officer & Statutory Dispute Escalation (Section 19 DPDP Act) */}
        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#D4AF37]" />
            <span>11. Data Protection Grievance Officer & Escalation Matrix</span>
          </h2>
          <p className="text-sm leading-relaxed">
            In strict compliance with <strong>Section 19 of the Digital Personal Data Protection Act, 2023</strong>, AR Homes has established a designated compliance and grievance redressal cell:
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
              | Legal Escalations:{' '}
              <a href="mailto:arhomesjaipur@gmail.com" className="text-[#D4AF37] hover:underline font-mono">
                arhomesjaipur@gmail.com
              </a>
            </p>
            <p>Direct Helpline: +91 88755 66970 (Available Mon–Sat: 10:00 AM – 6:00 PM IST)</p>
            <p className="text-gray-400 text-[11px] pt-1">
              Statutory Resolution Timeline: All verified data principal grievances will be formally acknowledged within 48 hours and resolved within <strong>7 business days</strong>. Unresolved disputes may be escalated to the <strong>Data Protection Board of India</strong>.
            </p>
          </div>
        </section>

        {/* 12. Governing Law & Exclusive Judicial Jurisdiction */}
        <section className="space-y-4 pt-2">
          <h2 className="font-serif text-2xl font-normal text-white">12. Governing Law & Exclusive Jurisdiction</h2>
          <p className="text-sm leading-relaxed">
            These Terms & Conditions and all related privacy and security covenants shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, claim, or proceeding arising out of or in connection with this portal shall be submitted to the exclusive jurisdiction of the competent courts situated in <strong>Jaipur, Rajasthan, India</strong>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsConditionsPage;
