import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Scale, FileCheck, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';

export const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader
        badge="Legal Agreements"
        title="Terms &"
        highlight="Conditions"
        subtitle="Please read these terms and conditions carefully before utilizing the AR Homes digital platform and booking services."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 py-16 sm:py-20 text-gray-300 font-light space-y-12">
        <div className="p-6 rounded-2xl bg-[#0b1612] border border-white/10 flex items-center gap-4">
          <Scale className="w-8 h-8 text-[#D4AF37] shrink-0" />
          <p className="text-xs sm:text-sm text-gray-200">
            These Terms & Conditions govern your access to the official AR Homes website and services within Jaipur, Rajasthan, under the jurisdiction of the High Court of Rajasthan.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">1. Nature of Website Content</h2>
          <p className="text-sm leading-relaxed">
            The visual materials, 3D floor plan renders, artist impressions, and descriptive summaries presented on this website are intended solely to communicate architectural design intent. While every effort is made to maintain factual accuracy, final dimensions, finishes, and project amenities are formally governed by the registered Agreement for Sale executed between the buyer and AR Homes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">2. RERA Compliance & Project Sanctions</h2>
          <p className="text-sm leading-relaxed">
            All residential independent floors, villas, and high-rise residences advertised by AR Homes are registered under Rajasthan RERA (RAJ-RERA). Prospective buyers are encouraged to verify individual project sanction approvals on the official Rajasthan Real Estate Regulatory Authority portal.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
            <strong>Corporate Address:</strong> Civil Lines / C-Scheme, Jaipur, Rajasthan - 302006.
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">3. Pricing & Booking Disclaimers</h2>
          <p className="text-sm leading-relaxed">
            Starting prices quoted on the website (e.g. ₹3.85 Cr onwards) exclude statutory taxes, GST, stamp duty, registration charges, electricity meter connection fees, and maintenance deposits unless explicitly stated. Formal allotment requires submission of an official Booking Form accompanied by the stipulated application deposit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">4. Intellectual Property Rights</h2>
          <p className="text-sm leading-relaxed">
            The "AR Homes" brand emblem, architectural layouts, photography, copywriting, and trademarks displayed on this domain are the exclusive intellectual property of AR Homes. Unauthorized reproduction or commercial distribution without written authorization is strictly prohibited.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="font-serif text-2xl font-normal text-white">5. Governing Law & Dispute Resolution</h2>
          <p className="text-sm leading-relaxed">
            Any dispute, controversy, or claim arising out of or relating to this website or services rendered shall be settled in accordance with the laws of India and subject to the exclusive jurisdiction of the competent courts in <strong>Jaipur, Rajasthan</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
