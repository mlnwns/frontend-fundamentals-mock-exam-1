import { ListRow } from 'tosslib';
import type { SavingsProduct } from '../apis/savingsProduct/savingsProduct.type';
import { ProductRow } from './ProductRow';

interface ProductListProps {
  products: SavingsProduct[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

export function ProductList({ products, selectedProductId, onSelectProduct }: ProductListProps) {
  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품을 찾을 수 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => (
        <ProductRow
          key={product.id}
          product={product}
          isSelected={selectedProductId === product.id}
          onSelect={onSelectProduct}
        />
      ))}
    </>
  );
}
