import { render } from '@testing-library/svelte';

import PopularVideos from './PopularVideos.svelte';

import contents from '../fixtures/contents';

describe('popular-videos', () => {
  const renderVideos = () => {
    return render(PopularVideos, {
      props: { contents },
    });
  };

  it('renders title', () => {
    const { container } = renderVideos();

    expect(container).toHaveTextContent('지금 인기있는 영상');
  });

  context('with contents', () => {
    it('renders contents name text', () => {
      const { container } = renderVideos();

      contents.forEach(({ program }) => {
        expect(container).toHaveTextContent(program.name);
      });
    });
  });
});
