import { useQuery } from '@tanstack/react-query';
import { getSavingsProducts } from '../apis/savingsProduct/getSavingsProduct';
import type { SavingsProduct } from '../apis/savingsProduct/savingsProduct.type';

export const useSavingsProducts = () => {
  const { data, isLoading, error } = useQuery<SavingsProduct[]>({
    queryKey: ['savingsProducts'],
    queryFn: getSavingsProducts,
  });

  return {
    products: data ?? [],
    isLoading,
    error,
  };
};
