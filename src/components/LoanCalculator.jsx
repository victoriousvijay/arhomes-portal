import React, { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, CheckCircle2, Sparkles, Building2, TrendingUp, HelpCircle } from 'lucide-react';

export const LoanCalculator = ({ onOpenEnquiry, defaultAmount = 25000000 }) => {
  const [loanAmount, setLoanAmount] = useState(defaultAmount); // ₹2.50 Cr
  const [loanTenure, setLoanTenure] = useState(20); // 20 years
  const [cibilScore, setCibilScore] = useState(785); // 785
  const [interestRate, setInterestRate] = useState(8.35); // 8.35%

  // Determine CIBIL Tier and Recommended Base Rate
  const getCibilTier = (score) => {
    if (score >= 780) {
      return {
        label: 'Excellent Credit',
        tag: 'Prime Tier',
        baseRate: 8.35,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        perk: 'Lowest interest rates & 100% processing fee waiver'
      };
    } else if (score >= 730) {
      return {
        label: 'Good Credit',
        tag: 'Preferred Tier',
        baseRate: 8.75,
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        perk: 'Fast-track approval with HDFC, SBI & ICICI'
      };
    } else if (score >= 680) {
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
        perk: 'Structured collateral & flexible loan tenure support'
      };
    }
  };

  const currentTier = getCibilTier(cibilScore);

  // When CIBIL score changes, update interest rate to recommended base rate
  const handleCibilChange = (score) => {
    setCibilScore(score);
    const tier = getCibilTier(score);
    setInterestRate(tier.baseRate);
  };

  // Real-time EMI Calculation
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTenure * 12;
    if (monthlyRate === 0) return Math.round(loanAmount / totalMonths);
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalPayment = emi * loanTenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Real-Time Mortgage & EMI Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2 leading-relaxed">
              Adjust your loan amount, duration, interest rate, and CIBIL score to calculate precise monthly outflows with preferred lending partners.
            </p>
          </div>

          {/* 1. Loan Amount Slider */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700">Loan Principal Amount</span>
              <span className="text-base sm:text-lg font-bold text-[#013724]">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min="2000000"
              max="70000000"
              step="500000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>₹20 Lakhs</span>
              <span>₹2.50 Cr</span>
              <span>₹7.00 Cr</span>
            </div>
          </div>

          {/* 2. Tenure Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700">Loan Tenure</span>
              <span className="text-base sm:text-lg font-bold text-[#013724]">
                {loanTenure} Years ({loanTenure * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="30"
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>3 Years</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* 3. Real-Time CIBIL Score Slider */}
          <div className="space-y-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-slate-800">CIBIL Credit Score</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currentTier.color}`}>
                  {cibilScore} • {currentTier.label}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-normal">
                Adjusts base interest rate
              </span>
            </div>

            <input
              type="range"
              min="600"
              max="900"
              step="5"
              value={cibilScore}
              onChange={(e) => handleCibilChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1">
              <button 
                type="button" 
                onClick={() => handleCibilChange(650)}
                className="hover:text-[#013724] cursor-pointer"
              >
                650 (Fair)
              </button>
              <button 
                type="button" 
                onClick={() => handleCibilChange(720)}
                className="hover:text-[#013724] cursor-pointer"
              >
                720 (Good)
              </button>
              <button 
                type="button" 
                onClick={() => handleCibilChange(785)}
                className="hover:text-[#013724] font-bold text-[#013724] cursor-pointer"
              >
                785 (Excellent)
              </button>
              <button 
                type="button" 
                onClick={() => handleCibilChange(850)}
                className="hover:text-[#013724] cursor-pointer"
              >
                850+ (Prime)
              </button>
            </div>

            <p className="text-[11px] text-slate-600 font-light pt-1">
              💡 {currentTier.perk}
            </p>
          </div>

          {/* 4. Interest Rate Adjustment Slider & Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700">Annual Interest Rate</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="6.5"
                  max="15.0"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-20 text-right font-bold text-base text-[#013724] bg-white border border-slate-300 rounded-lg px-2 py-0.5 focus:outline-none focus:border-[#013724]"
                />
                <span className="text-sm font-bold text-slate-700">% p.a.</span>
              </div>
            </div>

            <input
              type="range"
              min="7.0"
              max="13.0"
              step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>7.00% (Subsidized)</span>
              <span>8.35% (Current AR Homes Tie-Up)</span>
              <span>13.00%</span>
            </div>
          </div>

          {/* Preferred Banking Partners */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Official Tie-Ups:</span>
            <span className="px-2.5 py-1 rounded bg-slate-100 font-medium text-slate-800">State Bank of India</span>
            <span className="px-2.5 py-1 rounded bg-slate-100 font-medium text-slate-800">HDFC Bank</span>
            <span className="px-2.5 py-1 rounded bg-slate-100 font-medium text-slate-800">ICICI Bank</span>
            <span className="px-2.5 py-1 rounded bg-slate-100 font-medium text-slate-800">Axis Bank</span>
          </div>

        </div>

        {/* Right: Dynamic Calculation Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#013724] to-[#012217] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
              Monthly Equated Installment (EMI)
            </span>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              ₹{emi.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-300">/ month</span>
            </div>
            <div className="text-xs text-slate-300 mt-2 font-light">
              Based on <strong className="text-[#D4AF37]">{interestRate}% p.a.</strong> reducing balance with CIBIL score of <strong className="text-white">{cibilScore}</strong>.
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2.5 border-t border-white/15 pt-4 text-xs text-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Principal Amount:</span>
              <span className="text-white font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Interest Payable:</span>
              <span className="text-[#F3E5AB] font-semibold">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Amount Payable:</span>
              <span className="text-white font-bold">{formatCurrency(totalPayment)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Tenure Duration:</span>
              <span className="text-white font-medium">{loanTenure} Years ({loanTenure * 12} Months)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Prepayment Charges:</span>
              <span className="text-emerald-400 font-semibold">Zero (Nil)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry({ 
              title: `Home Loan Pre-Approval Assistance (Amount: ${formatCurrency(loanAmount)}, Tenure: ${loanTenure}Y, CIBIL: ${cibilScore})` 
            })}
            className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#013724] font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            Apply for Pre-Approved Loan
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoanCalculator;
