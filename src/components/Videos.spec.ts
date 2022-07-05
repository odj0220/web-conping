import { fireEvent, render } from '@testing-library/svelte';

import contents from '../fixtures/contents';

import PopularVideoContainer from './PopularVideoContainer.svelte';

describe('PopularVideoContainer', () => {
  const handleClick = jest.fn();

  const renderPopularVideoContainer = () => {
    return render(PopularVideoContainer);
  };

  it('renders title', () => {
    const { container } = renderPopularVideoContainer();

    expect(container).toHaveTextContent('지금 인기있는 영상');
  });

  context('with contents', () => {
    it('renders contents name text', () => {
      const { container } = renderPopularVideoContainer();

      contents.forEach(({ program }) => {
        expect(container).toHaveTextContent(program.name);
      });
    });

  });

});

