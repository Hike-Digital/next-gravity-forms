import { conditionalLogicFragment } from "../../fragments";

export const emailFieldFragment = /* GraphQL */ `
  ... on EmailField {
    canPrepopulate
    conditionalLogic {
      ${conditionalLogicFragment}
    }
    cssClass
    description
    descriptionPlacement
    errorMessage
    hasAutocomplete
    hasEmailConfirmation
    inputName
    inputs {
      ... on EmailInputProperty {
        id
        name
        autocompleteAttribute
        customLabel
        defaultValue
        label
        placeholder
      }
    }
    isRequired
    label
    placeholder
    shouldAllowDuplicates
    size
    subLabelPlacement
    value
  }
`;
