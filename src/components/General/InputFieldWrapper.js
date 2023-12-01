import classnames from "classnames";
import PropTypes from "prop-types";

const InputFieldWrapper = ({
  subLabelPlacement,
  children,
  label,
  customLabel,
  name,
  className,
}) => {
  const sub_label_class =
    subLabelPlacement == "hidden_label" ? "hidden_sub_label screen-reader-text" : "";

  return (
    <>
      <span className={classnames(className, "gform-grid-col")} id={`${name}_container`}>
        {subLabelPlacement === "ABOVE" && (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            htmlFor={name}
            className={classnames(
              "gform-field-label gform-field-label--type-sub",
              sub_label_class
            )}
            dangerouslySetInnerHTML={{ __html: customLabel || label }}
          />
        )}

        {children}

        {subLabelPlacement === "BELOW" && (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            htmlFor={name}
            className={classnames(
              "gform-field-label gform-field-label--type-sub",
              sub_label_class
            )}
            dangerouslySetInnerHTML={{ __html: customLabel || label }}
          />
        )}
      </span>
    </>
  );
};

export default InputFieldWrapper;

InputFieldWrapper.propTypes = {
  subLabelPlacement: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
  customLabel: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.number,
};
