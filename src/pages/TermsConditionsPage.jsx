import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Scale, FileCheck, AlertCircle, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader
        badge="Statutory Legal Terms"
        title="Terms &"
        highlight="Conditions"
        subtitle="Please read these terms and conditions carefully before utilizing the AR Homes digital platform, requesting site visits, or initiating advisory consultations."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 py-16 sm:py-24 text-gray-300 font-light space-y-12">
        
        {/* Statutory Intro Badge */}
        <div className="p-6 rounded-2xl bg-[#0b1612] border border-[#205843] flex items-center gap-4 shadow-xl">
          <Scale className="w-8 h-8 text-[#D4AF37] shrink-0" />
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            These Terms & Conditions govern your access to the official AR Homes digital platform (<code className="text-[#D4AF37]">arhomes.in</code>) and advisory services in Jaipur, Rajasthan, under the jurisdiction of the High Court of Rajasthan and Rajasthan RERA regulations.
          </p>
        </div>

        {/* 1. Nature of Website Content */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">1. Informational Nature of Digital Portal</h2>
          <p className="text-sm leading-relaxed">
            The visual materials, 3D architectural renders, computer-generated walkthroughs, layout plans, and descriptive property narratives displayed across this website are intended solely to convey design concepts and architectural intent. 
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-relaxed">
            <span className="text-[#D4AF37] font-semibold block mb-1">Important Legal Distinction:</span>
            Submitting a consultation enquiry, scheduling a site visit, or downloading a project brochure does <strong>not</strong> constitute an official offer of sale, reservation, title conveyance, or binding allotment. Legally enforceable property rights are created exclusively upon execution and registration of an official Agreement for Sale in accordance with the Rajasthan Real Estate (Regulation and Development) Rules, 2017.
          </div>
        </section>

        {/* 2. RERA Compliance & Sanction Verification */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">2. RERA Compliance & Sanction Approvals</h2>
          <p className="text-sm leading-relaxed">
            All residential independent floors, sky penthouses, luxury villas, and commercial spaces promoted by AR Homes are registered under Rajasthan Real Estate Regulatory Authority (RAJ-RERA). Prospective buyers are encouraged to inspect sanctioned building plans, promoter disclosures, and project milestone timelines on the official RAJ-RERA portal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
            <div className="p-4 rounded-xl bg-[#0b1612] border border-white/10 space-y-1">
              <span className="text-[#D4AF37] font-semibold block">Regulatory Authority:</span>
              <p>Rajasthan Real Estate Regulatory Authority (RAJ-RERA), Jaipur</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1612] border border-white/10 space-y-1">
              <span className="text-[#D4AF37] font-semibold block">Corporate Registry:</span>
              <p>Civil Lines / C-Scheme, Jaipur, Rajasthan - 302006</p>
            </div>
          </div>
        </section>

        {/* 3. Pricing & Booking Disclaimers */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">3. Pricing Disclaimers & Ancillary Charges</h2>
          <p className="text-sm leading-relaxed">
            Indicative base prices quoted on the website (e.g., ₹3.85 Cr onwards) are subject to revision without prior public notice prior to formal booking confirmation. Base prices exclude:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-gray-400">
            <li>Applicable Goods and Services Tax (GST) and statutory government levies.</li>
            <li>Stamp duty, registration charges, and documentation fees payable to the Sub-Registrar.</li>
            <li>Electric connection security deposits, water meter infrastructure, and initial society maintenance funds.</li>
          </ul>
        </section>

        {/* 4. User Obligations & Anti-Spam Safeguards */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">4. User Obligations & Fair Use</h2>
          <p className="text-sm leading-relaxed">
            By submitting an enquiry form, you warrant that the contact credentials provided (Name, Phone Number, Email) belong to you and are accurate. You agree not to submit fraudulent data, automated crawler requests, or unauthorized bot traffic. Automated scraping or framing of this portal without written consent is strictly prohibited.
          </p>
        </section>

        {/* 5. Intellectual Property Rights */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">5. Intellectual Property Rights</h2>
          <p className="text-sm leading-relaxed">
            The "AR Homes" brand crest, architectural designs, bespoke interior renderings, photography, and digital layouts are the exclusive intellectual property of AR Homes. Reproduction, duplication, or public redistribution without express written authorization is strictly prohibited under Indian Copyright Law.
          </p>
        </section>

        {/* 6. Governing Law & Dispute Resolution */}
        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="font-serif text-2xl font-normal text-white">6. Governing Law & Exclusive Jurisdiction</h2>
          <p className="text-sm leading-relaxed">
            These Terms & Conditions shall be governed by and construed in accordance with the substantive laws of India. Any legal dispute or proceeding arising out of or in connection with this digital platform shall be submitted to the exclusive jurisdiction of the competent courts situated in <strong>Jaipur, Rajasthan</strong>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsConditionsPage;
