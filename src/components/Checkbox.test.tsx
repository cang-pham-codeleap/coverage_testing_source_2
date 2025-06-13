import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox Component", () => {
  // Test rendering with default props
  it("renders correctly with default props", () => {
    const { container } = render(<Checkbox />);
    expect(container).toMatchSnapshot();
  });

  // Test with label
  it("renders with a label", () => {
    render(<Checkbox label="Test Label" />);
    expect(screen.getByText("Test Label")).toMatchSnapshot();
    expect(screen.getByLabelText("Test Label")).toMatchSnapshot();
  });

  // Test controlled state changes
  it("handles controlled state changes", () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Checkbox checked={false} onChange={handleChange} />
    );

    // Find the input and click it
    const input = screen.getByRole("checkbox");
    fireEvent.click(input);

    // Check if onChange was called with true
    expect(handleChange).toHaveBeenCalledWith(true);

    // Rerender with checked=true to simulate controlled component update
    rerender(<Checkbox checked={true} onChange={handleChange} />);
    expect(input).toMatchSnapshot();
  });

  // Test uncontrolled state behavior
  it("handles uncontrolled state changes", () => {
    render(<Checkbox defaultChecked={false} />);

    const input = screen.getByRole("checkbox");
    expect(input).toMatchSnapshot();

    // Click the checkbox
    fireEvent.click(input);
    expect(input).toMatchSnapshot();

    // Click again to toggle off
    fireEvent.click(input);
    expect(input).toMatchSnapshot();
  });

  // Test disabled state
  it("disables the checkbox when disabled prop is true", () => {
    const handleChange = jest.fn();
    render(<Checkbox disabled onChange={handleChange} />);

    const input = screen.getByRole("checkbox");
    expect(input).toMatchSnapshot();

    // Try to click the disabled checkbox
    fireEvent.click(input);
    expect(handleChange).toMatchSnapshot();
  });

  // Test indeterminate state
  it("sets the indeterminate state correctly", () => {
    render(<Checkbox indeterminate />);

    const input = screen.getByRole("checkbox");
    expect(input).toMatchSnapshot();

    // We can't directly check the indeterminate property through testing-library
    // because it's a DOM property, not an attribute
  });

  // Test different sizes
  it("renders with different sizes", () => {
    const { rerender, container } = render(
      <Checkbox size="sm" label="Small" />
    );
    expect(container).toMatchSnapshot();

    rerender(<Checkbox size="md" label="Medium" />);
    expect(container).toMatchSnapshot();

    rerender(<Checkbox size="lg" label="Large" />);
    expect(container).toMatchSnapshot();
  });

  // Test with custom props
  it("passes through custom props", () => {
    render(
      <Checkbox
        id="custom-id"
        name="custom-name"
        value="custom-value"
        required
      />
    );

    const input = screen.getByRole("checkbox");
    expect(input).toMatchSnapshot();
  });

  // Test with custom class name
  it("applies custom class name", () => {
    render(<Checkbox className="custom-class" />);
    const wrapper = screen.getByRole("checkbox").closest("div");
    expect(wrapper).toMatchSnapshot();
  });
});
