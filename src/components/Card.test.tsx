/**
 * Card component tests
 * - Tests basic rendering
 * - Tests different variants and padding sizes
 * - Tests title and footer rendering
 * - Tests divider visibility
 * - Tests custom styling
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  // Test basic rendering
  test("renders card with children", () => {
    render(<Card>Card Content</Card>);
    const cardContent = screen.getByText("Card Content");
    expect(cardContent).toMatchSnapshot();
  });

  // Test default variant
  test("renders default variant by default", () => {
    render(<Card>Default Card</Card>);
    // Find card by its content and then get the parent div (card container)
    const cardContent = screen.getByText("Default Card");
    const cardElement = cardContent.parentElement?.parentElement;
    expect(cardElement?.className).toMatchSnapshot();
  });

  // Test bordered variant
  test("renders bordered variant when specified", () => {
    render(<Card variant="bordered">Bordered Card</Card>);
    const cardContent = screen.getByText("Bordered Card");
    const cardElement = cardContent.parentElement?.parentElement;
    expect(cardElement?.className).toMatchSnapshot();
  });

  // Test elevated variant
  test("renders elevated variant when specified", () => {
    render(<Card variant="elevated">Elevated Card</Card>);
    const cardContent = screen.getByText("Elevated Card");
    const cardElement = cardContent.parentElement?.parentElement;
    expect(cardElement?.className).toMatchSnapshot();
  });

  // Test different padding sizes
  test("applies correct padding size classes", () => {
    const { rerender } = render(<Card padding="none">No Padding</Card>);
    let cardContent = screen.getByText("No Padding");
    expect(cardContent.className).toMatchSnapshot();

    rerender(<Card padding="sm">Small Padding</Card>);
    cardContent = screen.getByText("Small Padding");
    expect(cardContent.className).toMatchSnapshot();

    rerender(<Card padding="md">Medium Padding</Card>);
    cardContent = screen.getByText("Medium Padding");
    expect(cardContent.className).toMatchSnapshot();

    rerender(<Card padding="lg">Large Padding</Card>);
    cardContent = screen.getByText("Large Padding");
    expect(cardContent.className).toMatchSnapshot();
  });

  // Test title rendering
  test("renders title when provided", () => {
    const title = "Card Title";
    render(<Card title={title}>Card with Title</Card>);
    const titleElement = screen.getByText(title);
    expect(titleElement).toMatchSnapshot();
  });

  // Test footer rendering
  test("renders footer when provided", () => {
    const footer = "Card Footer";
    render(<Card footer={<div>{footer}</div>}>Card with Footer</Card>);
    const footerElement = screen.getByText(footer);
    expect(footerElement).toMatchSnapshot();
  });

  // Test divider visibility
  test("renders dividers by default when title or footer is present", () => {
    render(
      <Card title="Card Title" footer={<div>Footer</div>}>
        Card Content
      </Card>
    );
    // Using querySelectorAll to find dividers (elements with border-t class)
    // We need to use querySelector on the container since querySelectorAll doesn't exist on RTL's screen
    const container =
      screen.getByText("Card Content").parentElement?.parentElement;
    const dividers = container?.querySelectorAll(".border-t");
    expect(dividers?.length).toBe(2); // One for title and one for footer
  });

  // Test hiding dividers
  test("doesn't render dividers when noDivider is true", () => {
    render(
      <Card title="Card Title" footer={<div>Footer</div>} noDivider>
        Card Content
      </Card>
    );
    const container =
      screen.getByText("Card Content").parentElement?.parentElement;
    const dividers = container?.querySelectorAll(".border-t");
    expect(dividers?.length).toBe(0);
  });

  // Test custom class name
  test("applies custom className when provided", () => {
    const customClass = "custom-card-class";
    render(<Card className={customClass}>Custom Card</Card>);
    const cardContent = screen.getByText("Custom Card");
    const cardElement = cardContent.parentElement?.parentElement;
    expect(cardElement?.className).toMatchSnapshot();
  });

  // Test additional props
  test("applies additional props to the card element", () => {
    render(
      <Card data-testid="custom-card" id="special-card">
        Card with Custom Props
      </Card>
    );
    const cardElement = screen.getByTestId("custom-card");
    expect(cardElement).toMatchSnapshot();
  });

  // Test combining complex features
  test("correctly renders a complex card with all features", () => {
    render(
      <Card
        title="Complex Card"
        variant="bordered"
        padding="lg"
        footer={<button>Action Button</button>}
      >
        Complex Card Content
      </Card>
    );

    expect(screen.getByText("Complex Card")).toMatchSnapshot();
    expect(screen.getByText("Complex Card Content")).toMatchSnapshot();
    expect(screen.getByRole("button")).toMatchSnapshot();

    const cardContent = screen.getByText("Complex Card Content");
    const cardElement = cardContent.parentElement?.parentElement;
    expect(cardElement).toMatchSnapshot();
  });
});
