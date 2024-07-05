import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { valueToLowerCase, isNonEmptyObject } from "../../utils/helpers";
import { outputDescription } from "../../utils/inputSettings";
import { useRangeUtilities } from "../Input/helpers";

const InputWrapper = ({
  children,
  errors,
  inputData: {
    description,
    descriptionPlacement,
    isRequired,
    id,
    label,
    maxLength,
    rangeMin,
    rangeMax,
    type,
    inputs,
  },
  labelFor,
  wrapClassName,
  ginputClassName,
  wrapId,
  errorMessage,
}) => {
  const joinedLabel = `${label}${
    isRequired ? '<span className="gfield_required">*</span>' : ""
  }`;

  const Label = inputs?.length > 0 ? "legend" : "label"; // if field has inputs, we render label as <legend>
  // @TODO replace li with div to match new GF markup
  const Wrapper = inputs?.length > 0 ? "fieldset" : "div"; // if field has inputs, we render wrapper as <fieldset>

  const { rangeInstruction, showInstruction } = useRangeUtilities({
    range: { minValue: rangeMin, maxValue: rangeMax },
    isError: !!errors?.message,
    customErrorText: errorMessage,
  });

  return (
    <Wrapper
      className={classnames(
        wrapClassName,
        errors?.type && "gravityform__field--error"
      )}
      id={wrapId}
    >
      {labelFor && (
        <Label
          className="gfield_label gform-field-label"
          htmlFor={labelFor}
          dangerouslySetInnerHTML={{ __html: joinedLabel }}
        />
      )}
      {description &&
        valueToLowerCase(descriptionPlacement) == "above" &&
        outputDescription(description, wrapId)}
      <div
        className={classnames(
          `ginput_container ginput_container_${valueToLowerCase(type)}`,
          ginputClassName
        )}
      >
        {children}
        {maxLength > 0 && (
          <div className="charleft ginput_counter warningTextareaInfo">
            {maxLengthSentence(maxLength, type)}
          </div>
        )}
        {showInstruction && (
          <div
            className="gfield_description instruction"
            id={`gfield_instruction_${id}`}
            dangerouslySetInnerHTML={{
              __html: rangeInstruction,
            }}
          />
        )}
      </div>
      {description &&
        (valueToLowerCase(descriptionPlacement) == "below" ||
          valueToLowerCase(descriptionPlacement) == "inherit") &&
        outputDescription(description, wrapId)}
      {isNonEmptyObject(errors) && (
        <div
          aria-live="polite"
          id={`validation_message_${id}`}
          className="gfield_description validation_message gfield_validation_message"
          /* @OTODO: i changed this so it checks for custom errorMessages first, is it enough? */
          dangerouslySetInnerHTML={{
            __html: errorMessage ? errorMessage : errors.message,
          }}
        />
      )}
    </Wrapper>
  );
};

const maxLengthSentence = (length, type) => {
  const word = type === "number" ? "numbers" : "characters";
  return length && ` (maxiumum ${length} ${word})`;
};

export default InputWrapper;

InputWrapper.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.object,
  errorMessage: PropTypes.string,
  inputData: PropTypes.shape({
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    maxLength: PropTypes.number,
    type: PropTypes.string,
    inputs: PropTypes.array,
  }),
  labelFor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  wrapClassName: PropTypes.string,
  ginputClassName: PropTypes.string,
  wrapId: PropTypes.string,
};
