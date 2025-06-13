/**
 * Label component tests
 * - Tests basic rendering
 * - Tests different variants
 * - Tests screen reader only mode
 * - Tests custom class application
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Label Component", () => {
  // Test basic rendering
  test("renders label with children", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toMatchSnapshot();
  });

  // Test default variant
  test("renders default variant by default", () => {
    render(<Label htmlFor="test-input">Default Label</Label>);
    const labelElement = screen.getByText("Default Label");
    expect(labelElement.className).toContain("text-gray-700");
  });

  // Test error variant
  test("renders error variant when specified", () => {
    render(<Label htmlFor="test-input" variant="error">Error Label</Label>);
    const labelElement = screen.getByText("Error Label");
    expect(labelElement.className).toContain("text-red-500");
  });

  // Test required variant
  test("renders required variant with asterisk styling", () => {
    render(<Label htmlFor="test-input" variant="required">Required Field</Label>);
    const labelElement = screen.getByText("Required Field");
    expect(labelElement.className).toContain("after:content-[\"*\"]");
    expect(labelElement.className).toContain("after:text-red-500");
  });

  // Test screen reader only mode
  test("applies sr-only class when srOnly is true", () => {
    render(<Label htmlFor="test-input" srOnly>Screen Reader Only Label</Label>);
    const labelElement = screen.getByText("Screen Reader Only Label");
    expect(labelElement.className).toContain("sr-only");
  });

  // Test htmlFor attribute
  test("applies htmlFor attribute correctly", () => {
    render(<Label htmlFor="test-id">Label with For Attribute</Label>);
    const labelElement = screen.getByText("Label with For Attribute");
    expect(labelElement).toHaveAttribute("for", "test-id");
  });

  // Test custom class name
  test("applies custom className when provided", () => {
    const customClass = "my-custom-class";
    render(<Label htmlFor="test-input" className={customClass}>Custom Style</Label>);
    const labelElement = screen.getByText("Custom Style");
    expect(labelElement.className).toContain(customClass);
  });

  // Test additional attributes
  test("applies additional HTML attributes", () => {
    render(<Label htmlFor="test-input" data-testid="custom-label">Custom Attribute</Label>);
    const labelElement = screen.getByTestId("custom-label");
    expect(labelElement).toMatchSnapshot();
  });
});
