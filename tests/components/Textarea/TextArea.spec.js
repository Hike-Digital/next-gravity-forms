import { fireEvent, render, screen } from "@testing-library/react";
import Textarea from "../../../src/components/Textarea";
import "@testing-library/jest-dom";

describe("textarea component", () => {
  //   it("should render pre defined content", () => {
  //     const fieldData = { content: "<p>html content</p>" };
  //     render(<Textarea fieldData={fieldData}/>);

  //     // check if the html got rendered
  //     expect(screen.getByTestId("html_field_component")).toHaveTextContent(
  //       "html content"
  //     );
  //   });
  it("should accept user input", () => {
    const fieldData = {
      displayOnly: false,
      id: 12,
      inputType: null,
      layoutGridColumnSpan: 12,
      layoutSpacerGridColumnSpan: null,
      pageNumber: 1,
      type: "TEXTAREA",
      visibility: "VISIBLE",
      adminLabel: "sdf",
      canPrepopulate: false,
      conditionalLogic: null,
      cssClass: "sd",
      defaultValue: "sdf",
      description: null,
      descriptionPlacement: "INHERIT",
      errorMessage: "s",
      inputName: null,
      isRequired: false,
      label: "Untitled",
      maxLength: 0,
      shouldAllowDuplicates: true,
      placeholder: "sdf",
      size: "LARGE",
      hasRichTextEditor: false,
      value: null,
    };
    const component = render(
      <Textarea
        fieldData={fieldData}
        name="field title"
        wrapClassName="cssClass"
        wrapId={"1"}
      />
    );
    
    fireEvent.change(component,{target: {value:"kaas"}})
    })

  it("should match the snapshot", () => {
    const fieldData = {
      displayOnly: false,
      id: 12,
      inputType: null,
      layoutGridColumnSpan: 12,
      layoutSpacerGridColumnSpan: null,
      pageNumber: 1,
      type: "TEXTAREA",
      visibility: "VISIBLE",
      adminLabel: "sdf",
      canPrepopulate: false,
      conditionalLogic: null,
      cssClass: "sd",
      defaultValue: "sdf",
      description: null,
      descriptionPlacement: "INHERIT",
      errorMessage: "s",
      inputName: null,
      isRequired: false,
      label: "Untitled",
      maxLength: 0,
      shouldAllowDuplicates: true,
      placeholder: "sdf",
      size: "LARGE",
      hasRichTextEditor: false,
      value: null,
    };
    const component = render(
      <Textarea
        fieldData={fieldData}
        name="field title"
        wrapClassName="cssClass"
        wrapId={"1"}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
