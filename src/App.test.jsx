import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("shows the student name on the page", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /victor leung/i })
    ).toBeInTheDocument();
  });
});
