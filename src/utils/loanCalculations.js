/**
 * Reducing-Balance Mortgage & EMI Calculation Utilities
 * AR Homes Client Advisory Desk
 */

export const LOAN_DEFAULTS = {
  MIN_AMOUNT: 500000,        // ₹5 Lakhs
  MAX_AMOUNT: 100000000,     // ₹10 Crores
  DEFAULT_AMOUNT: 25000000,  // ₹2.50 Crores
  AMOUNT_STEP: 500000,       // ₹5 Lakhs

  MIN_TENURE_YEARS: 1,
  MAX_TENURE_YEARS: 30,
  DEFAULT_TENURE_YEARS: 20,
  TENURE_STEP: 1,

  MIN_CIBIL: 300,
  MAX_CIBIL: 900,
  DEFAULT_CIBIL: 785,
  CIBIL_STEP: 5,

  MIN_RATE: 5.0,
  MAX_RATE: 20.0,
  DEFAULT_RATE: 8.35,
  RATE_STEP: 0.05,
};

/**
 * Calculates reducing balance EMI, total payable, and total interest.
 * Maintains full precision internally; rounds only for display.
 * 
 * Formula:
 *   r = annualRate / 12 / 100
 *   n = tenureYears * 12
 *   EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 *
 * @param {Object} params
 * @param {number} params.principal - Principal loan amount in INR
 * @param {number} params.annualRate - Annual interest rate in percent (e.g. 10.8)
 * @param {number} params.tenureMonths - Total tenure in months (e.g. 180)
 * @returns {{ emi: number, rawEmi: number, totalPayment: number, totalInterest: number }}
 */
export function calculateLoanDetails({ principal, annualRate, tenureMonths }) {
  const P = Number(principal) || 0;
  const annual = Number(annualRate) || 0;
  const n = Number(tenureMonths) || 0;

  if (P <= 0 || n <= 0) {
    return { emi: 0, rawEmi: 0, totalPayment: 0, totalInterest: 0 };
  }

  // Monthly interest rate
  const r = annual / 1200;

  let exactEMI = 0;
  if (r <= 0) {
    // 0% interest edge case
    exactEMI = P / n;
  } else {
    // Standard reducing balance formula
    const factor = Math.pow(1 + r, n);
    if (!Number.isFinite(factor) || factor <= 1) {
      exactEMI = P / n;
    } else {
      exactEMI = (P * r * factor) / (factor - 1);
    }
  }

  // Total payable over n months
  const exactTotalPayment = exactEMI * n;
  const exactTotalInterest = Math.max(0, exactTotalPayment - P);

  return {
    emi: Math.round(exactEMI),
    rawEmi: exactEMI,
    totalPayment: exactTotalPayment,
    totalInterest: exactTotalInterest,
  };
}

/**
 * Short Indian currency format (Lakhs & Crores)
 * e.g., 25000000 -> ₹2.50 Cr, 2046651 -> ₹20.47 L, 50000 -> ₹50,000
 */
export function formatCurrencyShort(val) {
  const num = Number(val) || 0;
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  }
  return `₹${Math.round(num).toLocaleString('en-IN')}`;
}

/**
 * Full Indian currency format with comma separators
 * e.g., 2000000 -> ₹20,00,000
 */
export function formatIndianRupees(val) {
  const num = Number(val) || 0;
  return `₹${Math.round(num).toLocaleString('en-IN')}`;
}

/**
 * Parse string or number into loan principal integer
 */
export function parseLoanAmount(str) {
  if (typeof str === 'number') return Math.max(0, Math.round(str));
  if (!str) return 0;
  const clean = String(str).replace(/[₹,\s]/g, '').trim();

  if (/cr(ore)?s?$/i.test(clean)) {
    const num = parseFloat(clean.replace(/cr(ore)?s?$/i, ''));
    return isNaN(num) ? 0 : Math.round(num * 10000000);
  }
  if (/l(akh)?s?$/i.test(clean)) {
    const num = parseFloat(clean.replace(/l(akh)?s?$/i, ''));
    return isNaN(num) ? 0 : Math.round(num * 100000);
  }
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : Math.round(num);
}

/**
 * CIBIL credit tier evaluation (indicator only)
 */
export function getCibilTier(score) {
  const num = Number(score) || 300;
  if (num >= 780) {
    return {
      label: 'Excellent Credit',
      tag: 'Prime Tier',
      baseRate: 8.35,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      perk: 'Lowest interest rates & 100% processing fee waiver'
    };
  } else if (num >= 730) {
    return {
      label: 'Good Credit',
      tag: 'Preferred Tier',
      baseRate: 8.75,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      perk: 'Fast-track approval with HDFC, SBI & ICICI Bank'
    };
  } else if (num >= 680) {
    return {
      label: 'Average Credit',
      tag: 'Standard Tier',
      baseRate: 9.35,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      perk: 'Standard documentation & eligible with co-borrower'
    };
  } else {
    return {
      label: 'Needs Co-Applicant',
      tag: 'Caution Tier',
      baseRate: 9.95,
      color: 'text-orange-700 bg-orange-50 border-orange-200',
      perk: 'Structured collateral & flexible loan tenure advisory support'
    };
  }
}
