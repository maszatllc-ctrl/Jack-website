/**
 * Client-side rate estimation based on quiz answers.
 * Returns approximate starting monthly rates for display purposes only.
 */

const RATE_TABLE = {
  '18-30': {
    '$100,000 – $250,000': { base: 15, smokerMultiplier: 1.8 },
    '$250,000 – $500,000': { base: 22, smokerMultiplier: 1.8 },
    '$500,000 – $1,000,000': { base: 35, smokerMultiplier: 2.0 },
    '$1,000,000+': { base: 55, smokerMultiplier: 2.0 },
  },
  '31-45': {
    '$100,000 – $250,000': { base: 22, smokerMultiplier: 2.0 },
    '$250,000 – $500,000': { base: 35, smokerMultiplier: 2.0 },
    '$500,000 – $1,000,000': { base: 55, smokerMultiplier: 2.2 },
    '$1,000,000+': { base: 85, smokerMultiplier: 2.2 },
  },
  '46-65': {
    '$100,000 – $250,000': { base: 45, smokerMultiplier: 2.5 },
    '$250,000 – $500,000': { base: 75, smokerMultiplier: 2.5 },
    '$500,000 – $1,000,000': { base: 120, smokerMultiplier: 2.5 },
    '$1,000,000+': { base: 200, smokerMultiplier: 2.5 },
  },
  '66+': {
    '$100,000 – $250,000': { base: 95, smokerMultiplier: 3.0 },
    '$250,000 – $500,000': { base: 165, smokerMultiplier: 3.0 },
    '$500,000 – $1,000,000': { base: 280, smokerMultiplier: 3.0 },
    '$1,000,000+': { base: 450, smokerMultiplier: 3.0 },
  },
};

const HEALTH_MULTIPLIERS = {
  excellent: 0.85,
  good: 1.0,
  fair: 1.3,
};

export function estimateRate({ age_range, smoker, health, coverage_amount }) {
  const ageRates = RATE_TABLE[age_range];
  if (!ageRates) return null;

  const coverageRates = ageRates[coverage_amount];
  if (!coverageRates) return null;

  let rate = coverageRates.base;

  if (smoker === 'yes') {
    rate *= coverageRates.smokerMultiplier;
  }

  const healthMultiplier = HEALTH_MULTIPLIERS[health] || 1.0;
  rate *= healthMultiplier;

  return Math.round(rate);
}
