/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Index from './[id].svelte';

describe('product', () => {
  const renderProduct = () => render(Index);

  it('renders title', () => {
    const { container } = renderProduct();

    expect(container).toHaveTextContent('상품 상세 페이지');
  });


});
