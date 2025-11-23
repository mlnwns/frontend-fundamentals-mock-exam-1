import type { SavingsProduct } from '../apis/savingsProduct/savingsProduct.type';

export interface SavingsFilter {
  monthlyAmount: number;
  savingsTerm: number;
}

export const filterSavingsProducts = (products: SavingsProduct[], filter: SavingsFilter): SavingsProduct[] => {
  return products.filter(product => {
    const isMonthlyAmountValid =
      filter.monthlyAmount === 0 ||
      (product.minMonthlyAmount <= filter.monthlyAmount && filter.monthlyAmount <= product.maxMonthlyAmount);

    const isSavingsTermValid = product.availableTerms === filter.savingsTerm;

    return isMonthlyAmountValid && isSavingsTermValid;
  });
};
