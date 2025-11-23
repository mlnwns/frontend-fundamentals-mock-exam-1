import type { SavingsProduct } from '../apis/savingsProduct/savingsProduct.type';

export interface CalculationValues {
  expectedProfit: number;
  targetDifference: number;
  recommendedMonthlyAmount: number;
}

export const calculateSavingsResult = (
  monthlyAmount: number,
  savingsTerm: number,
  annualRate: number
): CalculationValues => {
  const expectedProfit = monthlyAmount * savingsTerm * (1 + annualRate * 0.01 * 0.5);

  return {
    expectedProfit: Math.round(expectedProfit),
    targetDifference: 0,
    recommendedMonthlyAmount: 0,
  };
};

export const calculateRecommendedMonthly = (targetAmount: number, savingsTerm: number, annualRate: number): number => {
  const divisor = savingsTerm * (1 + annualRate * 0.01 * 0.5);
  const recommended = targetAmount / divisor;
  return Math.round(recommended / 1000) * 1000;
};

export const getTopProductsByRate = (products: SavingsProduct[], limit: number = 2): SavingsProduct[] => {
  return [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, limit);
};
