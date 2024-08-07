import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Counter from "./Counter";

test("App Router: Works with Client Components (React State)", () => {
  render(<Counter />);
  expect(screen.getByRole("heading", { level: 2, name: "0" })).toBeDefined();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("heading", { level: 2, name: "1" })).toBeDefined();
});
