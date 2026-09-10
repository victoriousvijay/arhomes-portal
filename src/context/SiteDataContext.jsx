import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { BRAND, RESIDENCES } from '../data/projectsData';

const SiteDataContext = createContext(null);

const DEFAULT_SETTINGS = {
  phone: BRAND.phone,
  phone_display: BRAND.phoneDisplay,
  whatsapp: BRAND.whatsapp,
  email: BRAND.email,
  corporate_address: BRAND.corporateAddress,
  facebook: BRAND.facebook,
  instagram: BRAND.instagram,
  youtube: BRAND.youtube,
  linkedin: 'https://linkedin.com',
  enquiry_fields: {
    budget: true,
    propertyType: true,
    visitDate: true,
    message: true,
    custom_fields: [
      {
        id: 'cf-locality',
        label: 'Preferred Locality in Jaipur',
        type: 'select',
        options: ['Civil Lines', 'C-Scheme', 'Vaishali Nagar', 'Tonk Road Corridor', 'Ajmer Road', 'Other'],
        required: false,
        placeholder: 'Choose preferred sector'
      },
      {
        id: 'cf-loan',
        label: 'Need Bank Loan Advisory?',
        type: 'select',
        options: ['Yes, Need Home Loan Guidance', 'Partially Funded (30-50%)', 'No, Self-Financed / Cash'],
        required: false,
        placeholder: 'Select loan requirement'
      }
    ]
  }
};

const DEFAULT_OWNERS = [
  {
    id: 'anand-verma',
    name: 'Anand R. Verma',
    role: 'Co-Founder & Managing Director',
    expertise: 'Land Acquisitions & Master Planning',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    bio: 'Pioneered the AR Homes vision of low-density independent floors in Jaipur. With over 22 years of development leadership, Anand directs land acquisitions, master planning, and strategic partnerships across Civil Lines, C-Scheme, and Vaishali Nagar.',
    credentials: 'B.E. Civil • 22+ Years Real Estate Experience',
    display_order: 1
  },
  {
    name: 'Rajesh K. Sharma',
    id: 'rajesh-sharma',
    role: 'Co-Founder & Director of Architecture',
    expertise: 'Structural Integrity & Design Execution',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    bio: 'Dedicated to architectural precision and European finish standards. Rajesh personally supervises structural concrete casting, seismic safety compliance, imported Italian marble joinery, and on-schedule handover across every AR Homes project.',
    credentials: 'M.Arch Architecture • 19+ Years Engineering Execution',
    display_order: 2
  },
  {
    name: 'Amit V. Rathore',
    id: 'amit-rathore',
    role: 'Co-Founder & Director of Finance & Legal',
    expertise: 'Banking Alliances & RERA Compliance',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=85',
    bio: 'Guarantees 100% legal title transparency and buyer security. Amit orchestrates preferred loan alliances with SBI, HDFC, ICICI, and Axis Bank while managing statutory RERA governance and NRI real estate foreign exchange advisory.',
    credentials: 'FCA & Corporate Finance • 18+ Years Banking & Law',
    display_order: 3
  }
];

const DEFAULT_SERVICES = [
  {
    id: 'home-loans',
    icon_name: 'Landmark',
    title: 'Home Loans & Instant Pre-Approvals',
    desc: 'Exclusive builder-subsidized tie-ups with SBI, HDFC, ICICI, and Axis Bank. Fast-track sanction with transparent legal due diligence and zero processing friction.',
    highlights: ['Preferential 8.35% Base Rates', 'Same-Week In-Principle Sanction', 'Tax Savings Optimization'],
    category: 'Finance & Lending',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    display_order: 1
  },
  {
    id: 'business-loans',
    icon_name: 'Briefcase',
    title: 'Business Loans & Commercial Finance',
    desc: 'Capital financing for enterprise expansion, corporate office floor acquisition, and commercial property investment backed by flexible tenure and structured repayment.',
    highlights: ['Commercial Asset Financing', 'Working Capital Lines', 'MSME & Corporate Loan Desk'],
    category: 'Commercial Funding',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    display_order: 2
  },
  {
    id: 'personal-loans',
    icon_name: 'Wallet',
    title: 'Personal Loans & Liquid Credit Assistance',
    desc: 'Unsecured high-value personal credit lines designed for bespoke interior staging, Italian marble upgrades, furnishings, and emergency financial liquidity.',
    highlights: ['Collateral-Free Disbursement', '12 to 60 Months Flexible Tenure', 'Minimal Doorstep Paperwork'],
    category: 'Personal Finance',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    display_order: 3
  },
  {
    id: 'cibil-desk',
    icon_name: 'TrendingUp',
    title: 'CIBIL Score Improvisation Desk',
    desc: 'Professional credit health audits to help buyers elevate their credit rating above 750+. We rectify reporting discrepancies, restructure debt ratios, and secure lower interest rates.',
    highlights: ['Credit Report Dispute Redressal', 'Debt-to-Income Optimization', 'Rate-Reduction Consulting'],
    category: 'Credit Advisory',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    display_order: 4
  },
  {
    id: 'banking-desk',
    icon_name: 'FileCheck',
    title: 'All-Loans Assistance & Banking Desk',
    desc: 'Comprehensive, end-to-end loan coordination. From document collection and property valuation to title search and bank disbursement, our dedicated banking officers handle everything.',
    highlights: ['100% Dedicated Relationship Manager', 'Doorstep Verification & Pickup', 'Zero Hidden Advisory Charges'],
    category: 'Banking Concierge',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    display_order: 5
  },
  {
    id: 'land-acquisition',
    icon_name: 'Compass',
    title: 'Property & Land Acquisition Advisory',
    desc: 'Verified acquisition consulting for buyers seeking prime Jaipur real estate. We curate high-return independent floors, luxury villas, apartments, commercial suites, and freehold plots.',
    highlights: ['Villas & Triplex Mansions', 'Apartments & Commercial Towers', 'Freehold Plots & Estate Land'],
    category: 'Property Portfolio',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    display_order: 6
  }
];

const DEFAULT_PROPERTIES = [
  ...RESIDENCES.map((res, idx) => ({
    ...res,
    category: idx % 2 === 0 ? 'residential' : 'apartments',
    subCategory: idx === 0 ? 'villas-houses' : 'new-properties',
    isNew: idx < 2,
    is_featured_home: true,
    is_hero_carousel: true,
    display_order: idx + 1
  })),
  {
    id: 'ar-commercial-tower',
    title: 'AR Pinnacle Business Suites',
    location: 'Tonk Road Commercial District, Jaipur',
    builtForm: 'G + 24 Grade-A Commercial Tower',
    category: 'commercial',
    subCategory: 'commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: 'GRADE-A OFFICE SUITES', icon: 'building' },
      { label: 'DOUBLE-GLAZED FACADE', icon: 'wind' },
      { label: 'HIGH RENTAL YIELDS (8.4%)', icon: 'sun' },
      { label: 'CENTRAL METRO ACCESS', icon: 'map' }
    ],
    overview: 'LEED Gold certified commercial floor plates designed for corporate headquarters and high-net-worth investors looking for prime commercial capital appreciation in Jaipur.',
    price: '₹2.45 Cr onwards',
    priceUsd: '$295,000 onwards',
    rera: 'RAJ/P/2026/890',
    status: 'Ready to Fit-Out',
    isNew: true,
    is_featured_home: true,
    is_hero_carousel: true,
    display_order: 6
  },
  {
    id: 'ar-meadows-plots',
    title: 'AR Palm Meadows Estate Plots',
    location: 'Ajmer Road Express Corridor, Jaipur',
    builtForm: 'Gated Plotted Enclave',
    category: 'plots-land',
    subCategory: 'plots-land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: '300 TO 800 SQ.YD PLOTS', icon: 'maximize' },
      { label: 'FREEHOLD REGISTRATION', icon: 'shield' },
      { label: 'CLUBHOUSE & POOL ACCESS', icon: 'home' },
      { label: 'IMMEDIATE POSSESSION', icon: 'sun' }
    ],
    overview: 'Bespoke freehold residential plots surrounded by serene landscaped avenues, complete with underground cabling, private security checkpoints, and grand club amenities in Jaipur.',
    price: '₹1.80 Cr onwards',
    priceUsd: '$215,000 onwards',
    rera: 'RAJ/P/2026/612',
    status: 'Ready for Registry',
    isNew: false,
    is_featured_home: false,
    is_hero_carousel: false,
    display_order: 7
  },
  {
    id: 'ar-imperial-villas',
    title: 'The Imperial Mansions & Villas',
    location: 'Sirsi Road / Vaishali Estate, Jaipur',
    builtForm: 'Triplex Independent Luxury Villas',
    category: 'villas-houses',
    subCategory: 'villas-houses',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: '5 & 6 BHK PRIVATE VILLAS', icon: 'home' },
      { label: 'PRIVATE TEMPERATURE POOL', icon: 'maximize' },
      { label: 'PRIVATE ELEVATOR', icon: 'wind' },
      { label: '3-CAR BASEMENT PARKING', icon: 'sun' }
    ],
    overview: 'Palatial triplex mansions designed with Scandinavian floor-to-ceiling glass pavilions, double-height great rooms, and private rooftop sky lounges in Jaipur.',
    price: '₹6.75 Cr onwards',
    priceUsd: '$815,000 onwards',
    rera: 'RAJ/P/2026/981',
    status: 'Exclusive Launch',
    isNew: true,
    is_featured_home: true,
    is_hero_carousel: true,
    display_order: 5
  }
];

const DEFAULT_GALLERY = [
  {
    id: 1,
    category: 'villas',
    title: 'The Imperial Mansions & Villas',
    location: 'Sirsi Road / Vaishali Estate, Jaipur',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    display_order: 1
  },
  {
    id: 2,
    category: 'floors',
    title: 'C2 Boutique Independent Floor',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    display_order: 2
  },
  {
    id: 3,
    category: 'land',
    title: 'AR Palm Meadows Freehold Estate Land & Plots',
    location: 'Ajmer Road Express Corridor, Jaipur',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
    display_order: 3
  },
  {
    id: 4,
    category: 'commercial',
    title: 'AR Pinnacle Business Suites Commercial Tower',
    location: 'Tonk Road Commercial District, Jaipur',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    display_order: 4
  },
  {
    id: 5,
    category: 'apartments',
    title: 'AR Homes Altura High-Rise Monolith',
    location: 'Tonk Road Corridor, Jaipur',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    display_order: 5
  },
  {
    id: 6,
    category: 'floors',
    title: 'C5 Sculpted Verandas & Facade',
    location: 'Vaishali Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    display_order: 6
  },
  {
    id: 7,
    category: 'land',
    title: 'Gated Luxury Residential Land Enclave',
    location: 'Sirsi Road Corridor, Jaipur',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=85',
    display_order: 7
  },
  {
    id: 8,
    category: 'interiors',
    title: 'Double-Height Living Salon in Statuario Marble',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    display_order: 8
  }
];

const DEFAULT_LEADS = [
  {
    id: 'lead-1',
    name: 'Vikramaditya Singhania',
    phone: '+91 98290 11223',
    email: 'v.singhania@apexcorp.in',
    property_interest: 'The Imperial Mansions & Villas',
    budget: '₹6 - 8 Cr',
    message: 'Interested in triplex villa with private temperature pool. Requesting site visit this Saturday.',
    source: 'Website Enquiry',
    status: 'Site Visit Scheduled',
    temperature: 'Hot',
    notes: 'Chauffeured pickup arranged from Civil Lines residence.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'lead-2',
    name: 'Dr. Ananya Mathur',
    phone: '+91 94140 55443',
    email: 'ananya.mathur@fortis.com',
    property_interest: 'C2 at Civil Lines',
    budget: '₹3.5 - 4.5 Cr',
    message: 'Need independent floor in low-density sector near healthcare hub.',
    source: 'Loan Calculator',
    status: 'Contacted',
    temperature: 'Warm',
    notes: 'Pre-approved loan eligibility assessed with HDFC.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'lead-3',
    name: 'Capt. Raghavendra Rathore',
    phone: '+91 98281 99887',
    email: 'raghav.rathore@aviation.in',
    property_interest: 'AR Palm Meadows Estate Plots',
    budget: '₹1.5 - 2.5 Cr',
    message: 'Looking for 500 sq.yd residential freehold plot for custom bungalow construction.',
    source: 'Contact Page',
    status: 'Negotiation',
    temperature: 'Hot',
    notes: 'Registry paperwork draft sent for legal check.',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const DEFAULT_DEALS = [
  {
    id: 'deal-1',
    client_name: 'Rajiv Bansal (HNI Portfolio)',
    property_title: 'The Imperial Mansions Villa #04',
    deal_value: 67500000,
    commission_earned: 1350000,
    payment_status: 'Token Received',
    stage: 'In Progress',
    close_date: '2026-09-30',
    created_at: new Date().toISOString()
  },
  {
    id: 'deal-2',
    client_name: 'Sunil & Kavita Mittal',
    property_title: 'C2 Civil Lines Floor 3',
    deal_value: 38500000,
    commission_earned: 770000,
    payment_status: 'Agreement Signed',
    stage: 'In Progress',
    close_date: '2026-09-25',
    created_at: new Date().toISOString()
  },
  {
    id: 'deal-3',
    client_name: 'Dr. Pradeep Choudhary',
    property_title: 'AR Palm Meadows Plot #12',
    deal_value: 18000000,
    commission_earned: 360000,
    payment_status: 'Registration Completed',
    stage: 'Completed',
    close_date: '2026-09-02',
    created_at: new Date().toISOString()
  }
];

export const SiteDataProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('arhomes_settings');
    if (!saved) return DEFAULT_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      const isStale = !parsed.youtube || parsed.phone === '+91 84509 84509' || parsed.corporate_address?.includes('Civil Lines / C-Scheme') || parsed.email === 'info@arhomes.in' || parsed.whatsapp === '8875566970' || !String(parsed.whatsapp || '').startsWith('91');
      const merged = { ...DEFAULT_SETTINGS, ...parsed };
      if (isStale) {
        merged.phone = DEFAULT_SETTINGS.phone;
        merged.phone_display = DEFAULT_SETTINGS.phone_display;
        merged.whatsapp = DEFAULT_SETTINGS.whatsapp;
        merged.email = DEFAULT_SETTINGS.email;
        merged.corporate_address = DEFAULT_SETTINGS.corporate_address;
        merged.facebook = DEFAULT_SETTINGS.facebook;
        merged.instagram = DEFAULT_SETTINGS.instagram;
        merged.youtube = DEFAULT_SETTINGS.youtube;
      }
      // Always enforce clean country code (91) for WhatsApp
      let cleanWa = String(merged.whatsapp || DEFAULT_SETTINGS.whatsapp).replace(/\D/g, '').replace(/^0+/, '');
      if (cleanWa.length === 10) cleanWa = `91${cleanWa}`;
      merged.whatsapp = cleanWa;
      localStorage.setItem('arhomes_settings', JSON.stringify(merged));
      return merged;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('arhomes_properties');
    return saved ? JSON.parse(saved) : DEFAULT_PROPERTIES;
  });

  const [owners, setOwners] = useState(() => {
    const saved = localStorage.getItem('arhomes_owners');
    return saved ? JSON.parse(saved) : DEFAULT_OWNERS;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('arhomes_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('arhomes_services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('arhomes_leads');
    return saved ? JSON.parse(saved) : DEFAULT_LEADS;
  });

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('arhomes_deals');
    return saved ? JSON.parse(saved) : DEFAULT_DEALS;
  });

  const [loading, setLoading] = useState(true);

  // Sync with Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadFromSupabase() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        // 1. Settings
        // 1. Settings
        const { data: sData } = await supabase.from('site_settings').select('*').eq('id', 'global').maybeSingle();
        if (sData && isMounted) {
          const mergedEnquiry = {
            ...DEFAULT_SETTINGS.enquiry_fields,
            ...(sData.enquiry_fields || {})
          };
          if (!mergedEnquiry.custom_fields || mergedEnquiry.custom_fields.length === 0) {
            mergedEnquiry.custom_fields = DEFAULT_SETTINGS.enquiry_fields.custom_fields;
          }
          const merged = { ...DEFAULT_SETTINGS, ...sData, enquiry_fields: mergedEnquiry };
          setSettings(merged);
          localStorage.setItem('arhomes_settings', JSON.stringify(merged));
        }

        // 2. Properties
        const { data: pData } = await supabase.from('properties').select('*').order('display_order', { ascending: true });
        if (pData && pData.length > 0 && isMounted) {
          const mappedProps = pData.map(p => ({
            ...p,
            builtForm: p.builtForm || p.built_form || 'Luxury Residence',
            priceUsd: p.priceUsd || p.price_usd || '',
            subCategory: p.subCategory || p.sub_category || p.category,
            isNew: p.isNew !== undefined ? p.isNew : (p.is_new !== undefined ? p.is_new : false),
            is_featured_home: p.is_featured_home !== undefined ? p.is_featured_home : true,
            is_hero_carousel: p.is_hero_carousel !== undefined ? p.is_hero_carousel : true
          }));
          setProperties(mappedProps);
          localStorage.setItem('arhomes_properties', JSON.stringify(mappedProps));
        }

        // 3. Owners
        const { data: oData } = await supabase.from('owners').select('*').order('display_order', { ascending: true });
        if (oData && oData.length > 0 && isMounted) {
          setOwners(oData);
          localStorage.setItem('arhomes_owners', JSON.stringify(oData));
        }

        // 4. Gallery
        const { data: gData } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
        if (gData && gData.length > 0 && isMounted) {
          setGallery(gData);
          localStorage.setItem('arhomes_gallery', JSON.stringify(gData));
        }

        // 5. Leads
        const { data: lData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (lData && lData.length > 0 && isMounted) {
          setLeads(lData);
          localStorage.setItem('arhomes_leads', JSON.stringify(lData));
        }

        // 6. Deals
        const { data: dData } = await supabase.from('deals').select('*').order('created_at', { ascending: false });
        if (dData && dData.length > 0 && isMounted) {
          setDeals(dData);
          localStorage.setItem('arhomes_deals', JSON.stringify(dData));
        }

        // 7. Services
        try {
          const { data: srvData } = await supabase.from('services').select('*').order('display_order', { ascending: true });
          if (srvData && srvData.length > 0 && isMounted) {
            setServices(srvData);
            localStorage.setItem('arhomes_services', JSON.stringify(srvData));
          }
        } catch (srvErr) {
          // Table may not exist yet in Supabase, uses localStorage
        }
      } catch (err) {
        console.warn('Supabase fetch error, using local fallback:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFromSupabase();
    return () => { isMounted = false; };
  }, []);

  // Update Global Settings
  const updateSettings = async (newSettings) => {
    const merged = { ...settings, ...newSettings };
    if (merged.whatsapp) {
      let cleanWa = String(merged.whatsapp).replace(/\D/g, '').replace(/^0+/, '');
      if (cleanWa.length === 10) cleanWa = `91${cleanWa}`;
      merged.whatsapp = cleanWa;
    }
    setSettings(merged);
    localStorage.setItem('arhomes_settings', JSON.stringify(merged));

    if (supabase) {
      try {
        await supabase.from('site_settings').upsert({
          id: 'global',
          phone: merged.phone,
          phone_display: merged.phone_display,
          whatsapp: merged.whatsapp,
          email: merged.email,
          corporate_address: merged.corporate_address,
          facebook: merged.facebook,
          instagram: merged.instagram,
          youtube: merged.youtube,
          linkedin: merged.linkedin,
          enquiry_fields: merged.enquiry_fields,
          updated_at: new Date().toISOString()
        });
      } catch (e) {
        console.error('Supabase settings update error:', e);
      }
    }
    return merged;
  };

  // Custom Enquiry Fields Management
  const addCustomEnquiryField = async (newField) => {
    const currentFields = settings.enquiry_fields || {};
    const customList = currentFields.custom_fields || [];
    const fieldItem = {
      id: `cf-${Date.now()}`,
      label: newField.label || 'Custom Field',
      type: newField.type || 'text',
      options: newField.options || [],
      required: Boolean(newField.required),
      placeholder: newField.placeholder || ''
    };
    const updatedCustom = [...customList, fieldItem];
    const updatedSettings = {
      ...settings,
      enquiry_fields: {
        ...currentFields,
        custom_fields: updatedCustom
      }
    };
    await updateSettings(updatedSettings);
    return fieldItem;
  };

  const removeCustomEnquiryField = async (fieldId) => {
    const currentFields = settings.enquiry_fields || {};
    const customList = currentFields.custom_fields || [];
    const updatedCustom = customList.filter(f => f.id !== fieldId);
    const updatedSettings = {
      ...settings,
      enquiry_fields: {
        ...currentFields,
        custom_fields: updatedCustom
      }
    };
    await updateSettings(updatedSettings);
  };

  // Property CRUD
  const saveProperty = async (prop) => {
    let updated;
    const exists = properties.some(p => p.id === prop.id);
    if (exists) {
      updated = properties.map(p => (p.id === prop.id ? prop : p));
    } else {
      updated = [prop, ...properties];
    }
    setProperties(updated);
    localStorage.setItem('arhomes_properties', JSON.stringify(updated));

    if (supabase) {
      try {
        const payload = {
          id: prop.id,
          title: prop.title,
          category: prop.category,
          sub_category: prop.subCategory || prop.sub_category || prop.category,
          "subCategory": prop.subCategory || prop.sub_category || prop.category,
          location: prop.location,
          price: prop.price,
          price_usd: prop.priceUsd || prop.price_usd || '',
          "priceUsd": prop.priceUsd || prop.price_usd || '',
          built_form: prop.builtForm || prop.built_form || '',
          "builtForm": prop.builtForm || prop.built_form || '',
          rera: prop.rera || '',
          status: prop.status || 'Ready to Move',
          overview: prop.overview || '',
          features: prop.features || [],
          image: prop.image,
          is_new: prop.isNew !== undefined ? prop.isNew : prop.is_new,
          "isNew": prop.isNew !== undefined ? prop.isNew : prop.is_new,
          is_featured_home: prop.is_featured_home !== undefined ? prop.is_featured_home : true,
          is_hero_carousel: prop.is_hero_carousel !== undefined ? prop.is_hero_carousel : false,
          display_order: prop.display_order || 1
        };
        await supabase.from('properties').upsert(payload);
      } catch (e) {
        console.error('Supabase property save error:', e);
      }
    }
  };

  const deleteProperty = async (propId) => {
    const updated = properties.filter(p => p.id !== propId);
    setProperties(updated);
    localStorage.setItem('arhomes_properties', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('properties').delete().eq('id', propId);
      } catch (e) {
        console.error('Supabase property delete error:', e);
      }
    }
  };

  // Owners CRUD
  const saveOwner = async (owner) => {
    let updated;
    const exists = owners.some(o => o.id === owner.id);
    if (exists) {
      updated = owners.map(o => (o.id === owner.id ? owner : o));
    } else {
      updated = [...owners, owner];
    }
    setOwners(updated);
    localStorage.setItem('arhomes_owners', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('owners').upsert(owner);
      } catch (e) {
        console.error('Supabase owner save error:', e);
      }
    }
  };

  const deleteOwner = async (ownerId) => {
    const updated = owners.filter(o => o.id !== ownerId);
    setOwners(updated);
    localStorage.setItem('arhomes_owners', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('owners').delete().eq('id', ownerId);
      } catch (e) {
        console.error('Supabase owner delete error:', e);
      }
    }
  };

  // Gallery CRUD
  const saveGalleryItem = async (item) => {
    let updated;
    const exists = gallery.some(g => g.id === item.id);
    if (exists) {
      updated = gallery.map(g => (g.id === item.id ? item : g));
    } else {
      const newItem = { ...item, id: item.id || Date.now() };
      updated = [newItem, ...gallery];
    }
    setGallery(updated);
    localStorage.setItem('arhomes_gallery', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('gallery').upsert(item);
      } catch (e) {
        console.error('Supabase gallery save error:', e);
      }
    }
  };

  const deleteGalleryItem = async (itemId) => {
    const updated = gallery.filter(g => g.id !== itemId);
    setGallery(updated);
    localStorage.setItem('arhomes_gallery', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('gallery').delete().eq('id', itemId);
      } catch (e) {
        console.error('Supabase gallery delete error:', e);
      }
    }
  };

  // Services CRUD
  const saveService = async (serviceItem) => {
    let updated;
    const exists = services.some(s => s.id === serviceItem.id);
    if (exists) {
      updated = services.map(s => (s.id === serviceItem.id ? serviceItem : s));
    } else {
      const newItem = { ...serviceItem, id: serviceItem.id || `service-${Date.now()}` };
      updated = [...services, newItem];
    }
    updated.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setServices(updated);
    localStorage.setItem('arhomes_services', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('services').upsert(serviceItem);
      } catch (e) {
        console.warn('Supabase service save error:', e);
      }
    }
  };

  const deleteService = async (serviceId) => {
    const updated = services.filter(s => s.id !== serviceId);
    setServices(updated);
    localStorage.setItem('arhomes_services', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('services').delete().eq('id', serviceId);
      } catch (e) {
        console.warn('Supabase service delete error:', e);
      }
    }
  };

  // Leads CRM CRUD & Capture
  const addLead = async (leadData) => {
    const timestamp = leadData.consent_timestamp || new Date().toISOString();
    const policyVer = leadData.policy_version || 'v2026.1';
    const auditLine = `[Consent Audit: Privacy=${leadData.privacy_consent !== false ? 'Granted' : 'Declined'}, Marketing=${leadData.marketing_consent ? 'Opt-In' : 'Opt-Out'}, Terms=${leadData.terms_accepted ? 'Accepted' : 'Unchecked'}, Version=${policyVer} @ ${timestamp}]`;
    const combinedNotes = leadData.notes ? `${leadData.notes}\n${auditLine}` : auditLine;

    const newLead = {
      id: `lead-${Date.now()}`,
      name: leadData.name || 'Anonymous Visitor',
      phone: leadData.phone || '',
      email: leadData.email || '',
      property_interest: leadData.property_interest || leadData.title || 'General Enquiry',
      budget: leadData.budget || 'Unspecified',
      message: leadData.message || leadData.query || '',
      source: leadData.source || 'Website Form',
      status: 'New Lead',
      temperature: leadData.temperature || 'Warm',
      notes: combinedNotes,
      privacy_consent: leadData.privacy_consent !== false,
      marketing_consent: Boolean(leadData.marketing_consent),
      terms_accepted: Boolean(leadData.terms_accepted),
      policy_version: policyVer,
      consent_timestamp: timestamp,
      consent_audit_trail: auditLine,
      created_at: timestamp
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('arhomes_leads', JSON.stringify(updated));

    if (supabase) {
      try {
        const { data, error } = await supabase.from('leads').insert({
          name: newLead.name,
          phone: newLead.phone,
          email: newLead.email,
          property_interest: newLead.property_interest,
          budget: newLead.budget,
          message: newLead.message,
          source: newLead.source,
          status: newLead.status,
          temperature: newLead.temperature,
          notes: newLead.notes
        }).select().maybeSingle();

        if (data && data.id) {
          newLead.id = data.id;
        }
      } catch (e) {
        console.error('Supabase lead add error:', e);
      }
    }
    return newLead;
  };

  const updateLead = async (leadId, updates) => {
    const updated = leads.map(l => (l.id === leadId ? { ...l, ...updates } : l));
    setLeads(updated);
    localStorage.setItem('arhomes_leads', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('leads').update(updates).eq('id', leadId);
      } catch (e) {
        console.error('Supabase lead update error:', e);
      }
    }
  };

  const deleteLead = async (leadId) => {
    const updated = leads.filter(l => l.id !== leadId);
    setLeads(updated);
    localStorage.setItem('arhomes_leads', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('leads').delete().eq('id', leadId);
      } catch (e) {
        console.error('Supabase lead delete error:', e);
      }
    }
  };

  // Bulk CSV Import & Export for Leads
  const importLeadsCSV = async (importedLeads) => {
    const formatted = importedLeads.map((item, idx) => ({
      id: `imported-${Date.now()}-${idx}`,
      name: item.name || item.Name || 'Contact',
      phone: item.phone || item.Phone || item.Mobile || '',
      email: item.email || item.Email || '',
      property_interest: item.property_interest || item.Property || item.Interest || 'General',
      budget: item.budget || item.Budget || 'Unspecified',
      message: item.message || item.Message || item.Notes || '',
      source: item.source || 'CSV Import',
      status: item.status || 'New Lead',
      temperature: item.temperature || 'Warm',
      notes: item.notes || 'Imported via Bulk CSV',
      created_at: new Date().toISOString()
    }));

    const updated = [...formatted, ...leads];
    setLeads(updated);
    localStorage.setItem('arhomes_leads', JSON.stringify(updated));

    if (supabase) {
      try {
        const rows = formatted.map(f => ({
          name: f.name,
          phone: f.phone,
          email: f.email,
          property_interest: f.property_interest,
          budget: f.budget,
          message: f.message,
          source: f.source,
          status: f.status,
          temperature: f.temperature,
          notes: f.notes
        }));
        await supabase.from('leads').insert(rows);
      } catch (e) {
        console.error('Supabase bulk lead import error:', e);
      }
    }
    return formatted.length;
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Property Interest', 'Budget', 'Status', 'Temperature', 'Source', 'Message', 'Created At'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.property_interest || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${l.status || 'New Lead'}"`,
      `"${l.temperature || 'Warm'}"`,
      `"${l.source || 'Website'}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arhomes-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Deals & Revenue CRUD
  const saveDeal = async (deal) => {
    let updated;
    const exists = deals.some(d => d.id === deal.id);
    if (exists) {
      updated = deals.map(d => (d.id === deal.id ? deal : d));
    } else {
      const newDeal = { ...deal, id: deal.id || `deal-${Date.now()}` };
      updated = [newDeal, ...deals];
    }
    setDeals(updated);
    localStorage.setItem('arhomes_deals', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('deals').upsert(deal);
      } catch (e) {
        console.error('Supabase deal save error:', e);
      }
    }
  };

  const deleteDeal = async (dealId) => {
    const updated = deals.filter(d => d.id !== dealId);
    setDeals(updated);
    localStorage.setItem('arhomes_deals', JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from('deals').delete().eq('id', dealId);
      } catch (e) {
        console.error('Supabase deal delete error:', e);
      }
    }
  };

  // Image Upload helper (Local File to Supabase Storage, with fallback)
  const uploadImage = async (file) => {
    if (supabase && file) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('arhomes-media')
          .upload(filePath, file);

        if (!uploadError) {
          const { data } = supabase.storage
            .from('arhomes-media')
            .getPublicUrl(filePath);
          if (data && data.publicUrl) return data.publicUrl;
        }
      } catch (e) {
        console.warn('Storage upload error, falling back to local FileReader:', e);
      }
    }

    // Fallback: Read as base64 data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <SiteDataContext.Provider
      value={{
        settings,
        properties,
        owners,
        gallery,
        services,
        leads,
        deals,
        loading,
        updateSettings,
        saveProperty,
        deleteProperty,
        saveOwner,
        deleteOwner,
        saveGalleryItem,
        deleteGalleryItem,
        saveService,
        deleteService,
        addLead,
        updateLead,
        deleteLead,
        importLeadsCSV,
        exportLeadsCSV,
        saveDeal,
        deleteDeal,
        uploadImage,
        addCustomEnquiryField,
        removeCustomEnquiryField
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};

export default SiteDataContext;
