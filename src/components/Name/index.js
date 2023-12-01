import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import InputWrapper from "../InputWrapper";
import { Input, InputFieldWrapper } from "../General";
import strings from "../../utils/strings";
import getFieldError from "../../utils/getFieldError";

const Name = ({ fieldData, name, ...wrapProps }) => {
  const { inputs, subLabelPlacement } = fieldData;
  const { gfId } = wrapProps;

  const { inputMaskValue, isRequired, maxLength } = fieldData;
  const fieldInputs = [...inputs].filter((i) => !i.isHidden);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const regex = inputMaskValue ? new RegExp(inputMaskValue) : false;

  if (!fieldInputs?.length > 0) return null;

  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={name}
      {...wrapProps}
    >
      {fieldInputs.map(({ key, id, choices, defaultValue, placeholder, ...rest }) => {
        const fieldId = `input_${gfId}_${id}`;
        return (
          <InputFieldWrapper
            key={key}
            {...rest}
            name={fieldId}
            subLabelPlacement={subLabelPlacement}
            className="ginput_right"
          >
            {choices?.length > 0 ? (
              <select
                aria-required={isRequired}
                id={fieldId}
                name={`input_${id}`}
                {...register(`input_${id}`, {
                  required: isRequired && "This field is required",
                })}
              >
                <option value></option>
                {choices.map(({ isSelected, text, value }, index) => {
                  return (
                    <option
                      defaultValue={isSelected}
                      key={`${`input_${id}`}-${index}`}
                      value={value}
                    >
                      {text}
                    </option>
                  );
                })}
              </select>
            ) : (
              <Input
                defaultValue={defaultValue}
                placeholder={placeholder}
                fieldData={{ ...fieldData, type: "text" }}
                errors={errors}
                name={`input_${id}`}
                id={fieldId}
                {...register(`input_${id}`, {
                  required: isRequired && strings.errors.required,
                  maxlength: {
                    value: maxLength > 0 && maxLength,
                    message:
                      maxLength > 0 &&
                      `${strings.errors.maxChar.front}  ${maxLength} ${strings.errors.maxChar.back}`,
                  },
                  pattern: {
                    value: regex,
                    message: regex && getFieldError(fieldData),
                  },
                })}
              />
            )}
          </InputFieldWrapper>
        );
      })}
    </InputWrapper>
  );
};

export default Name;

Name.propTypes = {
  defaultValue: PropTypes.string,
  fieldData: PropTypes.shape({
    cssClass: PropTypes.string,
    inputMaskValue: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.string,
    inputs: PropTypes.array,
    subLabelPlacement: PropTypes.string,
  }),
  value: PropTypes.string,
  name: PropTypes.string,
  wrapProps: PropTypes.object,
};
