/**
 * Button component tests
 * - Tests basic rendering
 * - Tests different variants
 * - Tests disabled state
 * - Tests click handling
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  // Test basic rendering
  test("renders button with children", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByTestId("button");
    expect(buttonElement).toMatchSnapshot();
  });

  // Test primary variant (default)
  test("renders primary variant by default", () => {
    render(<Button>Primary</Button>);
    const buttonElement = screen.getByTestId("button");
    // Check for primary class existence based on our implementation
    expect(buttonElement.className).toContain("bg-blue-500");
  });

  // Test secondary variant
  test("renders secondary variant when specified", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const buttonElement = screen.getByTestId("button");
    // Check for secondary class existence
    expect(buttonElement.className).toContain("bg-gray-200");
  });

  // Test disabled state
  test("applies disabled attribute when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByTestId("button");
    expect(buttonElement).toMatchSnapshot();
    expect(buttonElement.className).toContain("opacity-50");
  });

  // Test click handler
  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByTestId("button");

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test click handler not called when disabled
  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    const buttonElement = screen.getByTestId("button");

    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test custom class name
  test("applies custom className when provided", () => {
    const customClass = "my-custom-class";
    render(<Button className={customClass}>Custom Style</Button>);
    const buttonElement = screen.getByTestId("button");

    expect(buttonElement.className).toContain(customClass);
  });

  // Test custom test ID
  test("applies custom data-testid when provided", () => {
    render(<Button data-testid="custom-button">Custom TestID</Button>);
    const buttonElement = screen.getByTestId("custom-button");

    expect(buttonElement).toMatchSnapshot();
  });
});
