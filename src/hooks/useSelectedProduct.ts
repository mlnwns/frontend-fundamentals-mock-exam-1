import { useState } from 'react';

export const useSelectedProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(selectedProductId === productId ? null : productId);
  };

  return {
    selectedProductId,
    handleSelectProduct,
  };
};
