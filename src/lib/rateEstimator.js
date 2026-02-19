/**
 * Client-side rate estimation for term life insurance.
 * Returns realistic mid-range monthly rate based on age, smoker status, and health.
 * Uses mid-point of each age bracket to avoid unrealistically low estimates.
 * Assumes a standard $250k 20-year term policy as the baseline.
 */

const BASE_RATES = {
  '18-30': { base: 25, smokerMultiplier: 2.0 },
  '31-45': { base: 38, smokerMultiplier: 2.2 },
  '46-65': { base: 75, smokerMultiplier: 2.5 },
  '66+': { base: 145, smokerMultiplier: 3.0 },
};

const HEALTH_MULTIPLIERS = {
  excellent: 0.9,
  good: 1.05,
  fair: 1.4,
};

export function estimateRate({ age_range, smoker, health }) {
  const ageRate = BASE_RATES[age_range];
  if (!ageRate) return null;

  let rate = ageRate.base;

  if (smoker === 'yes') {
    rate *= ageRate.smokerMultiplier;
  }

  const healthMultiplier = HEALTH_MULTIPLIERS[health] || 1.0;
  rate *= healthMultiplier;

  return Math.round(rate);
}
