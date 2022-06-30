import { render } from '@testing-library/svelte';

import Index from './index.svelte';

import products from '../../fixtures/products';

describe('productList', () => {
  const renderProductList = () => render(
    Index,
  );

  it('renders title', () => {
    const { container } = renderProductList();

    expect(container).toHaveTextContent('관련 상품');
  });

  it('renders product', () => {
    const { container } = renderProductList();

    products.forEach(({ title }) => {
      expect(container).toHaveTextContent(title);
    });

  });
});
