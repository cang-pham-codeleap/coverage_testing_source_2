/**
 * Text component tests
 * - Tests basic rendering
 * - Tests different sizes, weights and variants
 * - Tests truncate property
 * - Tests polymorphic "as" prop
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Text from "./Text";

describe("Text Component", () => {
  // Test basic rendering
  test("renders text with children", () => {
    render(<Text>Sample Text</Text>);
    const textElement = screen.getByText("Sample Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toMatchSnapshot();
  });

  // Test default rendering as paragraph
  test("renders as paragraph by default", () => {
    render(<Text>Default Text</Text>);
    const textElement = screen.getByText("Default Text");
    expect(textElement.tagName).toBe("P");
  });

  // Test polymorphic "as" prop
  test("renders as specified element when 'as' prop is provided", () => {
    render(<Text as="h1">Heading Text</Text>);
    const textElement = screen.getByText("Heading Text");
    expect(textElement.tagName).toBe("H1");
  });

  // Test different sizes
  test("applies correct size classes", () => {
    const { rerender } = render(<Text size="xs">Extra Small</Text>);
    let textElement = screen.getByText("Extra Small");
    expect(textElement.className).toContain("text-xs");

    rerender(<Text size="lg">Large Text</Text>);
    textElement = screen.getByText("Large Text");
    expect(textElement.className).toContain("text-lg");

    rerender(<Text size="2xl">Extra Large</Text>);
    textElement = screen.getByText("Extra Large");
    expect(textElement.className).toContain("text-2xl");
  });

  // Test different weights
  test("applies correct weight classes", () => {
    const { rerender } = render(<Text weight="normal">Normal Weight</Text>);
    let textElement = screen.getByText("Normal Weight");
    expect(textElement.className).toContain("font-normal");

    rerender(<Text weight="medium">Medium Weight</Text>);
    textElement = screen.getByText("Medium Weight");
    expect(textElement.className).toContain("font-medium");

    rerender(<Text weight="bold">Bold Weight</Text>);
    textElement = screen.getByText("Bold Weight");
    expect(textElement.className).toContain("font-bold");
  });

  // Test different variants
  test("applies correct variant classes", () => {
    const { rerender } = render(<Text variant="default">Default Variant</Text>);
    let textElement = screen.getByText("Default Variant");
    expect(textElement.className).toContain("text-gray-900");

    rerender(<Text variant="muted">Muted Variant</Text>);
    textElement = screen.getByText("Muted Variant");
    expect(textElement.className).toContain("text-gray-500");

    rerender(<Text variant="error">Error Variant</Text>);
    textElement = screen.getByText("Error Variant");
    expect(textElement.className).toContain("text-red-600");

    rerender(<Text variant="success">Success Variant</Text>);
    textElement = screen.getByText("Success Variant");
    expect(textElement.className).toContain("text-green-600");
  });

  // Test truncate property
  test("applies truncate class when truncate is true", () => {
    render(<Text truncate>Truncated Text</Text>);
    const textElement = screen.getByText("Truncated Text");
    expect(textElement.className).toContain("truncate");
  });

  // Test custom class name
  test("applies custom className when provided", () => {
    const customClass = "custom-text-class";
    render(<Text className={customClass}>Custom Style</Text>);
    const textElement = screen.getByText("Custom Style");
    expect(textElement.className).toContain(customClass);
  });

  // Test additional attributes
  test("applies additional HTML attributes", () => {
    render(<Text data-testid="custom-text" id="special-text">Custom Attribute</Text>);
    const textElement = screen.getByTestId("custom-text");
    expect(textElement).toHaveAttribute("id", "special-text");
    expect(textElement).toMatchSnapshot();
  });
});
