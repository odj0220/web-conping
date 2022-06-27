/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/svelte";
import Index from "./index.svelte";

test("Welcome the user", () => {
  const { getByText } = render(Index);

  expect(getByText("Welcome to SvelteKit")).toBeInTheDocument();
});
