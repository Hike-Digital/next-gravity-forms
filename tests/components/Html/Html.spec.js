import { render, screen } from "@testing-library/react";
import Html from "../../../src/components/Html";
import "@testing-library/jest-dom";

describe("html component", () => {
  it("should render pre defined content", () => {
    const fieldData = { content: "<p>html content</p>" };
    render(<Html fieldData={fieldData}/>);

    // check if the html got rendered
    expect(screen.getByTestId("html_field_component")).toHaveTextContent(
      "html content"
    );
  });

  it("should the snapshot", () => {
    const fieldData = {
      content: "<p>html content</p>",
      cssClass: "CustomCssForHtmlField",
      type: "html"
    };
    const component = render(<Html fieldData={fieldData} name="field title" wrapClassName="cssClass" />);

    expect(component).toMatchSnapshot()
  });
});
