import classnames from "classnames";
import PropTypes from "prop-types";
import { valueToLowerCase } from "../../utils/helpers";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { fieldData, defaultValue, errors, name, id, ...props },
  ref
) {
  const { cssClass, isRequired, maxLength, placeholder, size, type } = fieldData;

  // substr default value if there is maxLength set
  const defaultFieldValue =
    defaultValue && maxLength ? defaultValue.substring(0, maxLength) : defaultValue;

  return (
    <input
      ref={ref}
      aria-invalid={Boolean(errors?.[name])}
      aria-required={isRequired}
      className={classnames(
        "gravityform__field__input",
        `gravityform__field__input__${valueToLowerCase(type)}`,
        cssClass,
        valueToLowerCase(size)
      )}
      defaultValue={defaultFieldValue}
      id={id}
      maxLength={maxLength || 524288} // 524288 = 512kb, avoids invalid prop type error if maxLength is undefined.
      name={name}
      placeholder={placeholder}
      type={valueToLowerCase(type)}
      {...props}
    />
  );
});

Input.propTypes = {
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
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

export default Input;
