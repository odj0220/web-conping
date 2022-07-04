import { render } from '@testing-library/svelte';

import PopularVideoContainer from './PopularVideoContainer.svelte';

import contents from '../fixtures/contents';

describe('popular-videos', () => {
  const renderPopularVideosContainer = () => {
    return render(PopularVideoContainer, {
      props: { contents },
    });
  };

  it('renders title', () => {
    const { container } = renderPopularVideosContainer();

    expect(container).toHaveTextContent('지금 인기있는 영상');
  });

  context('with contents', () => {
    it('renders contents name text', () => {
      const { container } = renderPopularVideosContainer();

      contents.forEach(({ program }) => {
        expect(container).toHaveTextContent(program.name);
      });
    });
  });
});
