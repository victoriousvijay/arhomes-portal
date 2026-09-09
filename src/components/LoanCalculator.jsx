import React, { useState } from 'react';
import {
  LOAN_DEFAULTS,
  calculateLoanDetails,
  formatCurrencyShort,
  formatIndianRupees,
  parseLoanAmount,
  getCibilTier,
} from '../utils/loanCalculations';

export const LoanCalculator = ({ onOpenEnquiry, defaultAmount = LOAN_DEFAULTS.DEFAULT_AMOUNT }) => {
  // Single sources of truth (numerical)
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [loanTenure, setLoanTenure] = useState(LOAN_DEFAULTS.DEFAULT_TENURE_YEARS);
  const [cibilScore, setCibilScore] = useState(LOAN_DEFAULTS.DEFAULT_CIBIL);
  const [interestRate, setInterestRate] = useState(LOAN_DEFAULTS.DEFAULT_RATE);

  // Synchronized draft input strings to allow smooth direct typing
  const [amountInput, setAmountInput] = useState(Number(defaultAmount).toLocaleString('en-IN'));
  const [tenureInput, setTenureInput] = useState(String(LOAN_DEFAULTS.DEFAULT_TENURE_YEARS));
  const [cibilInput, setCibilInput] = useState(String(LOAN_DEFAULTS.DEFAULT_CIBIL));
  const [rateInput, setRateInput] = useState(String(LOAN_DEFAULTS.DEFAULT_RATE));

  // Determine CIBIL Tier (Pure credit assessment indicator)
  const currentTier = getCibilTier(cibilScore);

  // Pure reducing-balance calculations
  const { emi, totalPayment, totalInterest } = calculateLoanDetails({
    principal: loanAmount,
    annualRate: interestRate,
    tenureMonths: loanTenure * 12,
  });

  // Handlers for Loan Amount
  const handleAmountInputChange = (e) => {
    const rawVal = e.target.value;
    setAmountInput(rawVal);
    const parsed = parseLoanAmount(rawVal);
    if (!isNaN(parsed) && parsed > 0) {
      setLoanAmount(parsed);
    }
  };

  const handleAmountBlur = () => {
    const parsed = parseLoanAmount(amountInput);
    const clamped = Math.max(LOAN_DEFAULTS.MIN_AMOUNT, Math.min(LOAN_DEFAULTS.MAX_AMOUNT, parsed || LOAN_DEFAULTS.MIN_AMOUNT));
    setLoanAmount(clamped);
    setAmountInput(clamped.toLocaleString('en-IN'));
  };

  const handleAmountSliderChange = (e) => {
    const val = Number(e.target.value);
    setLoanAmount(val);
    setAmountInput(val.toLocaleString('en-IN'));
  };

  // Handlers for Loan Tenure
  const handleTenureInputChange = (e) => {
    const rawVal = e.target.value;
    setTenureInput(rawVal);
    const num = parseInt(rawVal, 10);
    if (!isNaN(num) && num >= 1 && num <= 40) {
      setLoanTenure(num);
    }
  };

  const handleTenureBlur = () => {
    const num = parseInt(tenureInput, 10);
    const clamped = Math.max(LOAN_DEFAULTS.MIN_TENURE_YEARS, Math.min(LOAN_DEFAULTS.MAX_TENURE_YEARS, num || LOAN_DEFAULTS.MIN_TENURE_YEARS));
    setLoanTenure(clamped);
    setTenureInput(String(clamped));
  };

  const handleTenureSliderChange = (e) => {
    const val = Number(e.target.value);
    setLoanTenure(val);
    setTenureInput(String(val));
  };

  // Handlers for CIBIL Score (Option A: Credit Quality Indicator, does NOT override interest rate)
  const handleCibilInputChange = (e) => {
    const rawVal = e.target.value;
    setCibilInput(rawVal);
    const num = parseInt(rawVal, 10);
    if (!isNaN(num) && num >= 300 && num <= 900) {
      setCibilScore(num);
    }
  };

  const handleCibilBlur = () => {
    const num = parseInt(cibilInput, 10);
    const clamped = Math.max(LOAN_DEFAULTS.MIN_CIBIL, Math.min(LOAN_DEFAULTS.MAX_CIBIL, num || LOAN_DEFAULTS.MIN_CIBIL));
    setCibilScore(clamped);
    setCibilInput(String(clamped));
  };

  const handleCibilSliderChange = (score) => {
    setCibilScore(score);
    setCibilInput(String(score));
  };

  // Handlers for Interest Rate
  const handleRateInputChange = (e) => {
    const rawVal = e.target.value;
    setRateInput(rawVal);
    const num = parseFloat(rawVal);
    if (!isNaN(num) && num >= 0 && num <= 30) {
      setInterestRate(num);
    }
  };

  const handleRateBlur = () => {
    const num = parseFloat(rateInput);
    const clamped = Math.max(LOAN_DEFAULTS.MIN_RATE, Math.min(LOAN_DEFAULTS.MAX_RATE, isNaN(num) ? LOAN_DEFAULTS.DEFAULT_RATE : num));
    setInterestRate(clamped);
    setRateInput(String(clamped));
  };

  const handleRateSliderChange = (e) => {
    const val = Number(e.target.value);
    setInterestRate(val);
    setRateInput(String(val));
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

          {/* 1. Loan Amount Slider & Input */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center text-xs font-semibold gap-2">
              <span className="text-slate-700">Loan Principal Amount</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  ({formatCurrencyShort(loanAmount)})
                </span>
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-slate-400 font-semibold text-xs">₹</span>
                  <input
                    type="text"
                    value={amountInput}
                    onChange={handleAmountInputChange}
                    onBlur={handleAmountBlur}
                    className="w-32 sm:w-36 text-right font-bold text-sm sm:text-base text-[#013724] bg-white border border-slate-300 rounded-lg pl-6 pr-2.5 py-1 focus:outline-none focus:border-[#013724]"
                    aria-label="Loan Principal Amount in Rupees"
                  />
                </div>
              </div>
            </div>
            <input
              type="range"
              min={LOAN_DEFAULTS.MIN_AMOUNT}
              max={LOAN_DEFAULTS.MAX_AMOUNT}
              step={LOAN_DEFAULTS.AMOUNT_STEP}
              value={Math.min(LOAN_DEFAULTS.MAX_AMOUNT, Math.max(LOAN_DEFAULTS.MIN_AMOUNT, loanAmount))}
              onChange={handleAmountSliderChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>₹5 Lakhs</span>
              <span>₹2.50 Cr</span>
              <span>₹10.00 Cr</span>
            </div>
          </div>

          {/* 2. Tenure Duration Slider & Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold gap-2">
              <span className="text-slate-700">Loan Tenure</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={LOAN_DEFAULTS.MIN_TENURE_YEARS}
                  max={LOAN_DEFAULTS.MAX_TENURE_YEARS}
                  step="1"
                  value={tenureInput}
                  onChange={handleTenureInputChange}
                  onBlur={handleTenureBlur}
                  className="w-16 sm:w-20 text-right font-bold text-sm sm:text-base text-[#013724] bg-white border border-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-[#013724]"
                  aria-label="Loan Tenure in Years"
                />
                <span className="text-xs font-bold text-[#013724]">
                  Years <span className="text-slate-500 font-normal hidden sm:inline">({loanTenure * 12} Mos)</span>
                </span>
              </div>
            </div>
            <input
              type="range"
              min={LOAN_DEFAULTS.MIN_TENURE_YEARS}
              max={LOAN_DEFAULTS.MAX_TENURE_YEARS}
              step={LOAN_DEFAULTS.TENURE_STEP}
              value={Math.min(LOAN_DEFAULTS.MAX_TENURE_YEARS, Math.max(LOAN_DEFAULTS.MIN_TENURE_YEARS, loanTenure))}
              onChange={handleTenureSliderChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* 3. Real-Time CIBIL Score Slider & Input (Pure Credit Indicator) */}
          <div className="space-y-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-slate-800">CIBIL Credit Score</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currentTier.color}`}>
                  {cibilScore} • {currentTier.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-normal hidden sm:inline">
                  Used to assess credit eligibility
                </span>
                <input
                  type="number"
                  min={LOAN_DEFAULTS.MIN_CIBIL}
                  max={LOAN_DEFAULTS.MAX_CIBIL}
                  step="1"
                  value={cibilInput}
                  onChange={handleCibilInputChange}
                  onBlur={handleCibilBlur}
                  className="w-16 text-right font-bold text-xs text-[#013724] bg-white border border-slate-300 rounded-lg px-2 py-0.5 focus:outline-none focus:border-[#013724]"
                  aria-label="CIBIL Credit Score"
                />
              </div>
            </div>

            <input
              type="range"
              min={LOAN_DEFAULTS.MIN_CIBIL}
              max={LOAN_DEFAULTS.MAX_CIBIL}
              step={LOAN_DEFAULTS.CIBIL_STEP}
              value={Math.min(LOAN_DEFAULTS.MAX_CIBIL, Math.max(LOAN_DEFAULTS.MIN_CIBIL, cibilScore))}
              onChange={(e) => handleCibilSliderChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1">
              <button 
                type="button" 
                onClick={() => handleCibilSliderChange(650)}
                className="hover:text-[#013724] cursor-pointer"
              >
                650 (Caution)
              </button>
              <button 
                type="button" 
                onClick={() => handleCibilSliderChange(720)}
                className="hover:text-[#013724] cursor-pointer"
              >
                720 (Good)
              </button>
              <button 
                type="button" 
                onClick={() => handleCibilSliderChange(785)}
                className="hover:text-[#013724] font-bold text-[#013724] cursor-pointer"
              >
                785 (Preferred)
              </button>
              <button 
                type="button" 
                onClick={() => handleCibilSliderChange(850)}
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
                  min={LOAN_DEFAULTS.MIN_RATE}
                  max={LOAN_DEFAULTS.MAX_RATE}
                  step={LOAN_DEFAULTS.RATE_STEP}
                  value={rateInput}
                  onChange={handleRateInputChange}
                  onBlur={handleRateBlur}
                  className="w-20 text-right font-bold text-base text-[#013724] bg-white border border-slate-300 rounded-lg px-2 py-0.5 focus:outline-none focus:border-[#013724]"
                  aria-label="Annual Interest Rate in Percent"
                />
                <span className="text-sm font-bold text-slate-700">% p.a.</span>
              </div>
            </div>

            <input
              type="range"
              min="5.0"
              max="18.0"
              step={LOAN_DEFAULTS.RATE_STEP}
              value={Math.min(18.0, Math.max(5.0, interestRate))}
              onChange={handleRateSliderChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#013724]"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>7.00% (Subsidized)</span>
              <span>8.35% (Current AR Homes Tie-Up)</span>
              <span>13.00%+</span>
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
              {formatIndianRupees(emi)} <span className="text-xs font-normal text-slate-300">/ month</span>
            </div>
            <div className="text-xs text-slate-300 mt-2 font-light">
              Based on <strong className="text-[#D4AF37]">{interestRate}% p.a.</strong> reducing balance with CIBIL credit score of <strong className="text-white">{cibilScore}</strong>.
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2.5 border-t border-white/15 pt-4 text-xs text-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Principal Amount:</span>
              <span className="text-white font-semibold">
                {formatIndianRupees(loanAmount)} ({formatCurrencyShort(loanAmount)})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Interest Payable:</span>
              <span className="text-[#F3E5AB] font-semibold">{formatCurrencyShort(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Amount Payable:</span>
              <span className="text-white font-bold">{formatCurrencyShort(totalPayment)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Tenure Duration:</span>
              <span className="text-white font-medium">{loanTenure} Years ({loanTenure * 12} Months)</span>
            </div>
            <div className="flex justify-between items-start gap-2 pt-1 border-t border-white/10">
              <span className="text-slate-300 whitespace-nowrap">Prepayment Charges:</span>
              <div className="text-right">
                <span className="text-emerald-400 font-semibold block">Zero (Nil)</span>
                <span className="text-[10px] text-slate-300 font-light block leading-tight mt-0.5">
                  Zero on floating rate home loans (per RBI norms); varies for commercial
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry({ 
              title: `Home Loan Pre-Approval Assistance (Amount: ${formatCurrencyShort(loanAmount)}, Tenure: ${loanTenure}Y, CIBIL: ${cibilScore}, Rate: ${interestRate}%)` 
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
