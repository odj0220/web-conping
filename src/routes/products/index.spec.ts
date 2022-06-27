/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/svelte";
import Index from "./index.svelte";

describe("products", () => {
  const renderProductList = () => render(Index);

  it("renders title", () => {
    const { container } = renderProductList();

    expect(container).toHaveTextContent('상품 리스트 페이지');
  });
});
