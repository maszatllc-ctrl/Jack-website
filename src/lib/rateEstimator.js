/**
 * Client-side rate estimation for term life insurance.
 * Returns "as low as" monthly rate based on age, smoker status, and health.
 * Assumes a standard $250k 20-year term policy as the baseline.
 */

const BASE_RATES = {
  '18-30': { base: 15, smokerMultiplier: 1.8 },
  '31-45': { base: 22, smokerMultiplier: 2.0 },
  '46-65': { base: 45, smokerMultiplier: 2.5 },
  '66+': { base: 95, smokerMultiplier: 3.0 },
};

const HEALTH_MULTIPLIERS = {
  excellent: 0.85,
  good: 1.0,
  fair: 1.3,
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
