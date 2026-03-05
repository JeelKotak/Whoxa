export interface TrendResult {
  percentage: string; // always string (formatted)
  isNegative: boolean;
  rawChange: number;   // actual calculated value (optional but useful)
}

export const calculateTrend = (
  current: number,
  previous: number
): TrendResult => {
  // If both are zero → no change
  if (current === 0 && previous === 0) {
    return {
      percentage: "0.0",
      isNegative: false,
      rawChange: 0,
    };
  }

  // If previous is zero but current is not → 100% increase
  if (previous === 0) {
    return {
      percentage: "100.0",
      isNegative: false,
      rawChange: 100,
    };
  }

  const change = ((current - previous) / previous) * 100;

  return {
    percentage: Math.abs(change).toFixed(1),
    isNegative: change < 0,
    rawChange: change,
  };
};
