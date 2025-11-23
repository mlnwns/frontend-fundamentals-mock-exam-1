export type TabValue = 'products' | 'results';

export const TAB_VALUES = {
  PRODUCTS: 'products' as const,
  RESULTS: 'results' as const,
} as const;
