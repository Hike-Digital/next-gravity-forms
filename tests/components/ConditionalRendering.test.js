import {
  getByText,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import renderGravityForm from "./render";

describe("GravityFormForm", () => {
  const fields = [
    {
      id: 1,
      type: "TEXT",
      label: "Single",
      labelPlacement: "INHERIT",
      size: "LARGE",
      conditionalLogic: {
        actionType: "SHOW",
        logicType: "ANY",
        rules: [
          {
            fieldId: 2,
            operator: "IS",
            value: "test",
          },
        ],
      },
    },
    {
      id: 2,
      type: "TEXT",
      label: "Second",
      labelPlacement: "INHERIT",
      size: "LARGE",
    },
  ];

  let container;
  let element;
  beforeEach(() => {
    const rendered = renderGravityForm({
      gfForm: { formFields: { nodes: fields } },
    });
    container = rendered.container;
  });

  it("should display invalid email error when value is not valid", async () => {
    fireEvent.input(screen.getByLabelText(/Second/i), {
      target: {
        value: "asd",
      },
    });

    // await waitFor(() => {
    //   //   const parentElement = screen.getByLabelText(/asdasd/i).closest('gfield');
    //   // expect(parentElement).not.toBeNull();

    //   // const displayStyle = window.getComputedStyle(parentElement).display;
    //   // expect(displayStyle).toBe('none');

    //   expect(
    //     screen.getByLabelText(/asdasd/i).closest(".gfield")
    //   ).toBeInTheDocument();
    // });
  });
});
