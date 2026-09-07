import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const MortgageCalculator = ({ currency, onOpenVipModal }) => {
  // Base default price in INR (e.g. 1.85 Cr) or USD ($225,000)
  const [propertyPrice, setPropertyPrice] = useState(currency === 'INR' ? 18500000 : 225000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Synchronize when currency changes if necessary
  const formatCurrency = (val) => {
    if (currency === 'INR') {
      if (val >= 10000000) {
        return `₹${(val / 10000000).toFixed(2)} Cr`;
      } else if (val >= 100000) {
        return `₹${(val / 100000).toFixed(2)} Lakh`;
      }
      return `₹${Math.round(val).toLocaleString('en-IN')}`;
    } else {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(2)}M`;
      }
      return `$${Math.round(val).toLocaleString('en-US')}`;
    }
  };

  // Math calculations
  const { downPaymentAmount, loanAmount, monthlyEmi, totalInterest, totalPayment, principalRatio, interestRatio } = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    let emi = 0;
    if (monthlyRate > 0) {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      emi = principal / totalMonths;
    }

    const totalPay = emi * totalMonths;
    const interestPay = totalPay - principal;

    const pRatio = totalPay > 0 ? (principal / totalPay) * 100 : 50;
    const iRatio = totalPay > 0 ? (interestPay / totalPay) * 100 : 50;

    return {
      downPaymentAmount: downPayment,
      loanAmount: principal,
      monthlyEmi: emi,
      totalInterest: interestPay,
      totalPayment: totalPay,
      principalRatio: pRatio,
      interestRatio: iRatio,
    };
  }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

  return (
    <section id="mortgage-calc" className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-luxury-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold">
              Financial Architecture
            </span>
            <span className="w-8 h-[1px] bg-luxury-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Mortgage & <span className="text-gold-gradient font-normal italic">EMI Calculator</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm font-light leading-relaxed">
            Plan your investment with precision. AR Homes properties are pre-approved by tier-1 institutional banking partners including SBI, HDFC, ICICI, and Axis Bank.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-xl border border-luxury-border space-y-6">
            
            {/* Property Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  Property Valuation
                </label>
                <span className="font-serif text-lg font-bold text-luxury-gold">
                  {formatCurrency(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={currency === 'INR' ? 10000000 : 120000}
                max={currency === 'INR' ? 100000000 : 1200000}
                step={currency === 'INR' ? 500000 : 10000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-luxury-black rounded-lg appearance-none cursor-pointer accent-luxury-gold"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{currency === 'INR' ? '₹1.00 Cr' : '$120K'}</span>
                <span>{currency === 'INR' ? '₹10.00 Cr' : '$1.2M'}</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="font-mono text-xs font-semibold text-slate-200">
                  {formatCurrency(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-luxury-black rounded-lg appearance-none cursor-pointer accent-luxury-gold"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10% (Min)</span>
                <span>60%</span>
              </div>
            </div>

            {/* Interest Rate & Tenure Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    Interest Rate
                  </label>
                  <span className="font-mono text-xs font-bold text-luxury-gold">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="12.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-luxury-black rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>6.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    Tenure
                  </label>
                  <span className="font-mono text-xs font-bold text-slate-200">
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-luxury-black rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>5 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>

            </div>

            {/* Pre-Approved Banking Partners Logos */}
            <div className="pt-4 border-t border-luxury-border/60">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
                Pre-Approved Lending Partners
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                <span className="px-2.5 py-1 bg-luxury-black rounded border border-luxury-border">State Bank of India</span>
                <span className="px-2.5 py-1 bg-luxury-black rounded border border-luxury-border">HDFC Bank</span>
                <span className="px-2.5 py-1 bg-luxury-black rounded border border-luxury-border">ICICI Bank</span>
                <span className="px-2.5 py-1 bg-luxury-black rounded border border-luxury-border">Axis Bank</span>
              </div>
            </div>

          </div>

          {/* Results Display Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-luxury-card to-luxury-black border border-luxury-gold/40 p-6 sm:p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl pointer-events-none" />

            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
              Estimated Outlay Breakdown
            </span>
            
            {/* Main Monthly EMI */}
            <div className="mt-2 mb-6">
              <div className="text-xs text-slate-400 uppercase tracking-wider">Estimated Monthly EMI</div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-luxury-gold mt-1">
                {formatCurrency(monthlyEmi)}
                <span className="text-xs font-sans font-normal text-slate-400 ml-1">/ month</span>
              </div>
            </div>

            {/* Visual Ratio Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                <span>Principal ({principalRatio.toFixed(0)}%)</span>
                <span>Interest ({interestRatio.toFixed(0)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-luxury-black rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${principalRatio}%` }}
                  className="bg-luxury-gold h-full transition-all duration-300"
                />
                <div
                  style={{ width: `${interestRatio}%` }}
                  className="bg-slate-700 h-full transition-all duration-300"
                />
              </div>
            </div>

            {/* Summary Metrics List */}
            <div className="space-y-3 text-xs border-y border-luxury-border/60 py-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Loan Principal:</span>
                <span className="font-mono text-white font-semibold">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Interest Payable:</span>
                <span className="font-mono text-slate-200">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Outlay (Principal + Interest):</span>
                <span className="font-mono text-luxury-gold font-semibold">{formatCurrency(totalPayment)}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onOpenVipModal({ title: `Mortgage Financial Consultation (${formatCurrency(propertyPrice)} Asset)` })}
              className="w-full py-3 bg-gradient-to-r from-luxury-gold to-luxury-goldDark text-luxury-black font-semibold text-xs tracking-wider uppercase rounded flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md active:scale-98"
            >
              <span>Connect with Home Loan Specialist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <p className="text-[10px] text-slate-400 text-center mt-3 font-light">
              *Estimates are indicative. Exact terms depend on credit appraisal and bank underwriting guidelines.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
