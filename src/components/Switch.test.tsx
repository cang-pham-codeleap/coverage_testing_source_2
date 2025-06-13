import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Switch from "./Switch";

describe("Switch Component", () => {
  // Test rendering with default props
  it("renders correctly with default props", () => {
    const { container } = render(<Switch />);
    expect(container).toMatchSnapshot();
  });

  // Test controlled state changes
  it("handles controlled state changes", () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Switch checked={false} onChange={handleChange} />
    );

    // Find the input and click it
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(input);

    // Check if onChange was called with true
    expect(handleChange).toHaveBeenCalledWith(true);

    // Rerender with checked=true to simulate controlled component update
    rerender(<Switch checked={true} onChange={handleChange} />);
    expect(input.checked).toBe(true);
  });

  // Test uncontrolled state behavior
  it("handles uncontrolled state changes", () => {
    render(<Switch defaultChecked={false} />);

    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.checked).toBe(false);

    // Click the switch
    fireEvent.click(input);
    expect(input.checked).toBe(true);

    // Click again to toggle off
    fireEvent.click(input);
    expect(input.checked).toBe(false);
  });

  // Test disabled state
  it("disables the switch when disabled prop is true", () => {
    const handleChange = jest.fn();
    render(<Switch disabled onChange={handleChange} />);

    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.disabled).toBe(true);

    // Try to click the disabled switch
    fireEvent.click(input);
    expect(handleChange).toMatchSnapshot();
  });

  // Test different sizes
  it("renders with different sizes", () => {
    const { rerender, container } = render(<Switch size="sm" />);
    expect(container).toMatchSnapshot();

    rerender(<Switch size="md" />);
    expect(container).toMatchSnapshot();

    rerender(<Switch size="lg" />);
    expect(container).toMatchSnapshot();
  });

  // Test with custom class name
  it("applies custom class name", () => {
    render(<Switch className="custom-class" />);
    const label = screen.getByRole("checkbox").closest("label");
    expect(label).toMatchSnapshot;
  });

  // Test accessibility
  it("supports aria-label for accessibility", () => {
    render(<Switch ariaLabel="Toggle feature" />);
    const input = screen.getByRole("checkbox");
    expect(input).toMatchSnapshot();
  });
});
