import { useEffect, useState } from 'react';
import { useSavingsProducts } from 'hooks/useSavingsProducts';
import { useSavingsForm } from 'hooks/useSavingsForm';
import { useDebounce } from 'hooks/useDebounce';
import { useSelectedProduct } from 'hooks/useSelectedProduct';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsForm } from '../components/SavingsForm';
import { ProductList } from '../components/ProductList';
import { CalculationResult } from '../components/CalculationResult';
import { filterSavingsProducts } from '../utils/filterSavingsProducts';
import { parseNumberWithComma } from '../utils/formatNumber';
import { TAB_VALUES, type TabValue } from '../types/tab';

export function SavingsCalculatorPage() {
  const { products } = useSavingsProducts();
  const { formState, handleTargetAmountChange, handleMonthlyAmountChange, handleSavingsTermChange } = useSavingsForm();
  const { selectedProductId, handleSelectProduct, validateSelectedProduct } = useSelectedProduct();
  const [activeTab, setActiveTab] = useState<TabValue>(TAB_VALUES.PRODUCTS);

  const debouncedMonthlyAmount = useDebounce(formState.monthlyAmount);
  const monthlyAmount = parseInt(parseNumberWithComma(debouncedMonthlyAmount)) || 0;
  const targetAmount = parseInt(parseNumberWithComma(formState.targetAmount)) || 0;
  const filteredProducts = filterSavingsProducts(products, {
    monthlyAmount,
    savingsTerm: formState.savingsTerm,
  });

  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null;

  useEffect(() => {
    validateSelectedProduct(filteredProducts);
  }, [filteredProducts, validateSelectedProduct]);

  const handleTabChange = (value: string) => {
    if (value === TAB_VALUES.PRODUCTS || value === TAB_VALUES.RESULTS) {
      setActiveTab(value);
    }
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <SavingsForm
        formState={formState}
        onTargetAmountChange={handleTargetAmountChange}
        onMonthlyAmountChange={handleMonthlyAmountChange}
        onSavingsTermChange={handleSavingsTermChange}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={handleTabChange}>
        <Tab.Item value={TAB_VALUES.PRODUCTS} selected={activeTab === TAB_VALUES.PRODUCTS}>
          적금 상품
        </Tab.Item>
        <Tab.Item value={TAB_VALUES.RESULTS} selected={activeTab === TAB_VALUES.RESULTS}>
          계산 결과
        </Tab.Item>
      </Tab>

      {activeTab === TAB_VALUES.PRODUCTS && (
        <ProductList
          products={filteredProducts}
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {activeTab === TAB_VALUES.RESULTS && (
        <CalculationResult
          targetAmount={targetAmount}
          monthlyAmount={monthlyAmount}
          savingsTerm={formState.savingsTerm}
          selectedProduct={selectedProduct}
          filteredProducts={filteredProducts}
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </>
  );
}
