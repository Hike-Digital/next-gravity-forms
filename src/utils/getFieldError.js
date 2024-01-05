/**
 * Return corresponding error to the field
 */
import strings from "./strings";
import { valueToLowerCase } from "./helpers";

function getFieldError({ type, typeUpper, errorMessage, inputMaskValue }) {
  const patternType = valueToLowerCase(type || typeUpper);

  if (errorMessage) return errorMessage;

  // if field has inputMask return static error
  if (inputMaskValue) {
    return (
      strings.errors.pattern[patternType] || strings.errors.pattern.default
    );
  }

  return "";
}

export default getFieldError;
