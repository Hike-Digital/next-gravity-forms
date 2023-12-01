import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import strings from "../../utils/strings";
import getFieldError from "../../utils/getFieldError";
import InputWrapper from "../InputWrapper";
import { Input, ConditionalWrapper, InputFieldWrapper } from "../General";

const Email = ({ defaultValue, fieldData, name, ...wrapProps }) => {
  const { isRequired, maxLength, placeholder, inputs, subLabelPlacement, id } = fieldData;
  const [emailField, confirmEmailField] = inputs || [];
  const { gfId } = wrapProps;

  console.log({ wrapProps });

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <InputWrapper
      errors={errors?.[name] || errors?.[`${name}_2`] || {}}
      inputData={fieldData}
      labelFor={!confirmEmailField ? name : undefined}
      {...wrapProps}
    >
      <ConditionalWrapper // render only when there is confirmed field
        condition={Boolean(confirmEmailField)}
        wrapper={(children) => (
          <InputFieldWrapper
            {...emailField}
            name={`input_${gfId}_${id}`}
            subLabelPlacement={subLabelPlacement}
            id={1}
            className="ginput_left"
          >
            {children}
          </InputFieldWrapper>
        )}
      >
        <Input
          name={name}
          errors={errors}
          defaultValue={emailField?.defaultValue || defaultValue}
          fieldData={{ ...fieldData, type: "email" }}
          {...register(name, {
            required: isRequired && strings.errors.required,
            maxlength: {
              value: maxLength > 0 && maxLength,
              message:
                maxLength > 0 &&
                `${strings.errors.maxChar.front}  ${maxLength} ${strings.errors.maxChar.back}`,
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: getFieldError({ ...fieldData, inputMaskValue: true }),
            },
          })}
          placeholder={emailField?.placeholder || placeholder}
          id={`input_${gfId}_${id}`}
        />
      </ConditionalWrapper>

      {confirmEmailField && (
        <InputFieldWrapper
          {...confirmEmailField}
          name={`input_${gfId}_${id}_2`}
          subLabelPlacement={subLabelPlacement}
          id={id}
          className="ginput_right"
        >
          <Input
            name={`${name}_2`}
            errors={errors}
            defaultValue={confirmEmailField?.defaultValue || defaultValue}
            fieldData={{ ...fieldData, type: "email" }}
            {...register(`${name}_2`, {
              required: isRequired && strings.errors.required,
              validate: (val) => {
                if (watch(name) != val) {
                  return strings.errors.emailsDontmatch;
                }
              },
            })}
            placeholder={confirmEmailField?.placeholder || placeholder}
            id={`input_${gfId}_${id}_2`}
          />
        </InputFieldWrapper>
      )}
    </InputWrapper>
  );
};

export default Email;

Email.propTypes = {
  defaultValue: PropTypes.string,
  fieldData: PropTypes.shape({
    cssClass: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.string,
    subLabelPlacement: PropTypes.string,
    inputs: PropTypes.array,
    id: PropTypes.number,
  }),
  value: PropTypes.string,
  name: PropTypes.string,
  wrapProps: PropTypes.object,
};
