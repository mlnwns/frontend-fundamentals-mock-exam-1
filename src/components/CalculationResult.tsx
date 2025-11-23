import { Assets, colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '../apis/savingsProduct/savingsProduct.type';
import { calculateRecommendedMonthly, getTopProductsByRate } from '../utils/calculationUtils';

interface CalculationResultProps {
  targetAmount: number;
  monthlyAmount: number;
  savingsTerm: number;
  selectedProduct: SavingsProduct | null;
  filteredProducts: SavingsProduct[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

export function CalculationResult({
  targetAmount,
  monthlyAmount,
  savingsTerm,
  selectedProduct,
  filteredProducts,
  selectedProductId,
  onSelectProduct,
}: CalculationResultProps) {
  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const expectedProfit = monthlyAmount * savingsTerm * (1 + selectedProduct.annualRate * 0.01 * 0.5);
  const targetDifference = targetAmount - expectedProfit;
  const recommendedMonthly = calculateRecommendedMonthly(targetAmount, savingsTerm, selectedProduct.annualRate);
  const topProducts = getTopProductsByRate(filteredProducts, 2);

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${Math.round(expectedProfit).toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${Math.round(targetDifference).toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendedMonthly.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <ListRow
        contents={
          <ListRow.Texts
            type="1RowTypeA"
            top="추천 상품 목록"
            topProps={{ fontWeight: 'bold', fontSize: 14, color: colors.grey900 }}
          />
        }
      />

      {topProducts.map(product => (
        <ListRow
          key={product.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={selectedProductId === product.id ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
          onClick={() => onSelectProduct(product.id)}
        />
      ))}
    </>
  );
}
