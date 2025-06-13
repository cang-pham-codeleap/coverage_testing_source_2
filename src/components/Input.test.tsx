/**
 * Input component tests
 * - Tests basic rendering
 * - Tests different states (default, error, disabled)
 * - Tests event handling
 * - Tests accessibility attributes
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input Component", () => {
  // Test basic rendering
  test("renders input element with correct attributes", () => {
    render(<Input id="test-input" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("id", "test-input");
    expect(inputElement).toMatchSnapshot();
  });

  // Test different input types
  test("renders with specified type", () => {
    render(<Input id="email-input" type="email" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "email");
  });

  // Test placeholder
  test("displays placeholder text when provided", () => {
    const placeholder = "Enter your name";
    render(<Input id="name-input" placeholder={placeholder} />);
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  // Test default value
  test("displays default value when provided", () => {
    const defaultValue = "John Doe";
    render(<Input id="name-input" defaultValue={defaultValue} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue(defaultValue);
  });

  // Test value
  test("displays controlled value when provided", () => {
    const value = "Jane Doe";
    render(<Input id="name-input" value={value} onChange={jest.fn()} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue(value);
  });

  // Test disabled state
  test("applies disabled attribute and styling when disabled", () => {
    render(<Input id="disabled-input" disabled />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
    expect(inputElement.className).toContain("bg-gray-100");
    expect(inputElement.className).toContain("cursor-not-allowed");
  });

  // Test required attribute
  test("applies required attribute when required", () => {
    render(<Input id="required-input" required />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeRequired();
  });

  // Test error status
  test("applies error status styling", () => {
    render(<Input id="error-input" status="error" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.className).toContain("border-red-500");
  });

  // Test error message
  test("displays error message when status is error and message is provided", () => {
    const errorMessage = "This field is required";
    render(
      <Input id="error-input" status="error" errorMessage={errorMessage} />
    );
    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveAttribute("role", "alert");
    expect(messageElement.className).toContain("text-red-500");
  });

  // Test no error message when status is not error
  test("does not display error message when status is default", () => {
    const errorMessage = "This field is required";
    render(
      <Input id="input" status="default" errorMessage={errorMessage} />
    );
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  // Test onChange handler
  test("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    render(<Input id="test-input" onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Test accessibility attributes
  test("applies correct aria attributes for error state", () => {
    render(
      <Input 
        id="accessibility-input" 
        status="error" 
        errorMessage="Invalid input" 
      />
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-invalid", "true");
    expect(inputElement).toHaveAttribute("aria-describedby", "accessibility-input-error");
  });

  // Test forwarding ref
  test("forwards ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input id="ref-input" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.id).toBe("ref-input");
  });

  // Test custom class name
  test("applies custom className when provided", () => {
    const customClass = "custom-input-class";
    render(<Input id="styled-input" className={customClass} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.className).toContain(customClass);
  });
});
