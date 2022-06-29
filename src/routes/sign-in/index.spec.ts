import { render } from '@testing-library/svelte';
import Index from './index@void.svelte';

describe('sign-in page', () => {
  it('renders title', () => {
    const { container } = render(Index);

    expect(container).toHaveTextContent('로그인 페이지');
  });
});
