import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import strings from "../../utils/strings";
import { valueToLowerCase } from "../../utils/helpers";
import getFieldError from "../../utils/getFieldError";
import InputWrapper from "../InputWrapper";
import { Input } from "../General";

const standardType = (type) => {
  switch (type) {
    case "phone":
      return "tel";
    case "fileupload":
      return "file";
    default:
      return type;
  }
};

const InputField = ({ defaultValue, fieldData, name, ...wrapProps }) => {
  const { inputMaskValue, isRequired, maxLength, type, phoneFormat } =
    fieldData;

  const inputType = standardType(valueToLowerCase(type));
  // @TODO: based on chosen format, we should change the UI and behaviour of the input field.
  // @TODO2: make sure we not only make sure the input is numeric, but that it also follows this pattern: (###) ###-####
  const isStandardPhoneField =
    phoneFormat === "STANDARD" && inputType === "tel";

  const regex = inputMaskValue ? new RegExp(inputMaskValue) : false;

  const handleInput = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setValue(name, numericValue);
  };

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={name}
      {...wrapProps}
    >
      <Input
        defaultValue={defaultValue}
        fieldData={{ ...fieldData, type: valueToLowerCase(inputType) }}
        errors={errors}
        name={name}
        {...(isStandardPhoneField ? { onInput: handleInput } : {})}
        {...register(name, {
          required: isRequired && strings.errors.required,
          maxLength: maxLength > 0 && {
            value: maxLength,
            message: `${strings.errors.maxChar.front} ${maxLength} ${strings.errors.maxChar.back}`,
          },
          pattern: {
            value: regex,
            message: regex && getFieldError(fieldData),
          },
        })}
      />
    </InputWrapper>
  );
};

export default InputField;

InputField.propTypes = {
  defaultValue: PropTypes.string,
  fieldData: PropTypes.shape({
    cssClass: PropTypes.string,
    inputMaskValue: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.string,
  }),
  value: PropTypes.string,
  name: PropTypes.string,
  wrapProps: PropTypes.object,
};
