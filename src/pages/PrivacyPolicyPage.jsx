import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ShieldCheck, Lock, FileText, Eye, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader
        badge="Legal & Transparency"
        title="Privacy"
        highlight="Policy"
        subtitle="At AR Homes, your privacy is paramount. Learn how we collect, use, and safeguard your personal details under strict compliance with Rajasthan RERA."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 py-16 sm:py-20 text-gray-300 font-light space-y-12">
        <div className="p-6 rounded-2xl bg-[#0b1612] border border-white/10 flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0" />
          <p className="text-xs sm:text-sm text-gray-200">
            Last Updated: <strong>September 2026</strong>. AR Homes ("we", "our", or "us") operates in full compliance with the Real Estate (Regulation and Development) Act and Indian Digital Data Protection laws.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">1. Information We Collect</h2>
          <p className="text-sm leading-relaxed">
            When you browse our website, schedule a private walkthrough, or submit an enquiry for an independent floor or sky mansion in Jaipur, Rajasthan, we collect information including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-gray-400">
            <li>Full Name, phone number, email address, and preferred consultation schedule.</li>
            <li>Property requirements, preferred budget bracket, and investment horizon.</li>
            <li>Technical device information, IP address, and virtual property tour interaction logs.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">2. Purpose of Data Utilization</h2>
          <p className="text-sm leading-relaxed">
            We use your personal data strictly for legitimate real estate advisory purposes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              'Direct callback and scheduling of show residence visits in Jaipur.',
              'Transmission of verified architectural floor plans and brochure PDFs.',
              'RAJ-RERA milestone tracking and construction progress updates.',
              'Loan pre-approval eligibility coordination with banking partners.'
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">3. Zero Third-Party Spam & Data Protection</h2>
          <p className="text-sm leading-relaxed">
            We maintain an uncompromising strict zero-broker-spam guarantee. AR Homes will <strong>never sell, lease, or rent</strong> your personal phone number or email to third-party call centers or external brokers.
          </p>
          <p className="text-sm leading-relaxed">
            All stored contact records are housed in encrypted databases protected by role-based enterprise access control and monitored by our technical infrastructure team.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-white">4. Your Privacy Rights</h2>
          <p className="text-sm leading-relaxed">
            You retain the right to request access to your submitted data, request modification of your contact preferences, or request permanent deletion of your profile from our communication registry at any time by emailing <strong>privacy@arhomes.in</strong>.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="font-serif text-2xl font-normal text-white">5. Office & Grievance Contact</h2>
          <p className="text-sm leading-relaxed">
            For any queries regarding our privacy practices, please contact our nodal grievance officer at:
          </p>
          <div className="p-6 rounded-2xl bg-[#0b1612] border border-[#205843] text-xs space-y-1 text-gray-300">
            <p className="font-semibold text-[#D4AF37]">AR Homes Grievance & Compliance Cell</p>
            <p>Civil Lines / C-Scheme, Jaipur, Rajasthan - 302006</p>
            <p>Email: legal@arhomes.in | Direct Helpline: +91 84509 84509</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
