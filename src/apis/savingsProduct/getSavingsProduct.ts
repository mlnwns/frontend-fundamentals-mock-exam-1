import { http } from 'tosslib';
import type { SavingsProduct } from './savingsProduct.type';

export const getSavingsProducts = async () => {
  const response = await http.get<SavingsProduct[]>('/api/savings-products');
  return response;
};
