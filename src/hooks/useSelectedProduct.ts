import { useState } from 'react';
import type { SavingsProduct } from '../apis/savingsProduct/savingsProduct.type';

export const useSelectedProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(selectedProductId === productId ? null : productId);
  };

  const validateSelectedProduct = (filteredProducts: SavingsProduct[]) => {
    if (selectedProductId && !filteredProducts.some(product => product.id === selectedProductId)) {
      setSelectedProductId(null);
    }
  };

  return {
    selectedProductId,
    handleSelectProduct,
    validateSelectedProduct,
  };
};
