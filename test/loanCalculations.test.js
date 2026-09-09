import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateLoanDetails,
  formatCurrencyShort,
  formatIndianRupees,
  parseLoanAmount,
  getCibilTier,
} from '../src/utils/loanCalculations.js';

test('Test 1: P=20,00,000, rate=10.8%, tenure=15Y (180 months)', () => {
  const result = calculateLoanDetails({
    principal: 2000000,
    annualRate: 10.8,
    tenureMonths: 180,
  });

  assert.equal(result.emi, 22481);
  assert.equal(formatIndianRupees(result.emi), '₹22,481');
  assert.equal(formatCurrencyShort(result.totalPayment), '₹40.47 L');
  assert.equal(formatCurrencyShort(result.totalInterest), '₹20.47 L');
});

test('Test 2: P=20,00,000, rate=10.8%, tenure=10Y (120 months)', () => {
  const result = calculateLoanDetails({
    principal: 2000000,
    annualRate: 10.8,
    tenureMonths: 120,
  });

  assert.equal(result.emi, 27324);
  assert.equal(formatIndianRupees(result.emi), '₹27,324');
});

test('Test 3: P=30,00,000, rate=9.0%, tenure=20Y (240 months)', () => {
  const result = calculateLoanDetails({
    principal: 3000000,
    annualRate: 9.0,
    tenureMonths: 240,
  });

  assert.equal(result.emi, 26992);
  assert.equal(formatIndianRupees(result.emi), '₹26,992');
});

test('Edge cases: rate=0% (zero interest financing)', () => {
  const result = calculateLoanDetails({
    principal: 1200000,
    annualRate: 0,
    tenureMonths: 12,
  });

  assert.equal(result.emi, 100000);
  assert.equal(result.totalPayment, 1200000);
  assert.equal(result.totalInterest, 0);
});

test('Edge cases: principal=0 or tenure=0', () => {
  const res1 = calculateLoanDetails({ principal: 0, annualRate: 8.5, tenureMonths: 120 });
  assert.equal(res1.emi, 0);

  const res2 = calculateLoanDetails({ principal: 1000000, annualRate: 8.5, tenureMonths: 0 });
  assert.equal(res2.emi, 0);
});

test('Input parsing: numbers, strings, shorthand units', () => {
  assert.equal(parseLoanAmount('2000000'), 2000000);
  assert.equal(parseLoanAmount('₹20,00,000'), 2000000);
  assert.equal(parseLoanAmount('20 Lakhs'), 2000000);
  assert.equal(parseLoanAmount('2.5 Cr'), 25000000);
  assert.equal(parseLoanAmount('1.25 Crore'), 12500000);
});

test('CIBIL tier evaluation (pure indicator)', () => {
  assert.equal(getCibilTier(800).tag, 'Prime Tier');
  assert.equal(getCibilTier(750).tag, 'Preferred Tier');
  assert.equal(getCibilTier(700).tag, 'Standard Tier');
  assert.equal(getCibilTier(620).tag, 'Caution Tier');
});
