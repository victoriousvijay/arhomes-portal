import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ChevronDown, HelpCircle, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

const FAQS_LIST = [
  {
    q: 'Where are AR Homes residential projects located in Jaipur, Rajasthan?',
    a: 'Our flagship developments are situated across Jaipur\'s most prestigious and high-growth micro-markets: Civil Lines, Vaishali Nagar, C-Scheme, Jagatpura, and the Tonk Road / Mansarovar corridors. Each project offers proximity to premier educational institutions, healthcare centers, and the Jaipur International Airport.'
  },
  {
    q: 'What does the AR Homes tagline "Ghar Bethe, Ghar Dekho" mean for buyers?',
    a: '"Ghar Bethe, Ghar Dekho" is our transparent digital-first promise. Buyers can explore 360-degree virtual tours, examine exact 3D architectural floor plans, verify material specifications, and track bi-weekly construction milestone photos from the comfort of their home before scheduling an on-site visit.'
  },
  {
    q: 'Are all AR Homes properties registered with Rajasthan RERA?',
    a: 'Yes, 100% of our residential independent floors, luxury apartments, and gated villas hold valid RAJ-RERA registrations. We provide full transparent documentation, approved sanction plans, and clear title certificates for every residence.'
  },
  {
    q: 'What is the structural built form and density of AR Homes independent floors?',
    a: 'Our independent floors are built with a Stilt + 4 (S+4) boutique low-density configuration. This means only one expansive family residence per floor, ensuring 3-sided open ventilation, private basement spaces, 2 dedicated covered car parking bays, and direct biometric elevator access.'
  },
  {
    q: 'Can buyers customize interior finishes or floor plan layouts?',
    a: 'Yes. For early-stage and under-construction bookings, our in-house architectural team collaborates directly with homeowners to customize internal non-loadbearing partitions, Italian marble varieties, modular kitchen configurations, and smart home lighting controls.'
  },
  {
    q: 'Which banking partners provide pre-approved home loans for AR Homes in Jaipur?',
    a: 'We maintain pre-approved home loan relationships with leading institutions including HDFC Bank, State Bank of India (SBI), ICICI Bank, and Axis Bank with competitive interest rates and fast-track loan disbursements.'
  },
  {
    q: 'How can I schedule a private visit to an AR Homes show residence in Jaipur?',
    a: 'You can book a viewing by clicking "Enquire Now" on our website, messaging us directly on WhatsApp, or calling our helpline at +91 88755 66970. Our client hospitality team will arrange a personalized VIP walkthrough.'
  }
];

export const FaqsPage = ({ onOpenEnquiry }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader
        badge="Got Questions?"
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Find answers to common questions about our Jaipur developments, construction quality, RAJ-RERA approvals, and customization options."
        breadcrumbs={[{ label: 'FAQs' }]}
      />

      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 py-16 sm:py-24">
        
        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {FAQS_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0b1612] border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/10 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#013724] border border-[#205843] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Have a Question Not Answered Here?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              Speak directly with our Jaipur property advisory desk in Civil Lines.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'FAQ In-depth Consultation Request' })}
              className="px-6 py-3 bg-[#D4AF37] text-[#013724] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-xl"
            >
              Ask Our Experts
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FaqsPage;
