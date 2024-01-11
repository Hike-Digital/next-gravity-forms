import classnames from "classnames";
import React from "react";

import Captcha from "../../components/Captcha";
import Html from "../../components/Html";
import Input from "../../components/Input";
import Email from "../../components/Email";
import Multiselect from "../../components/Multiselect";
import Select from "../../components/Select";
import SelectorList from "../../components/SelectorList";
import Textarea from "../../components/Textarea";
import { valueToLowerCase } from "../../utils/helpers";
import { islabelHidden } from "../../utils/inputSettings";
import { getFieldWidthClass } from "../../utils/getFieldWidthClass";

const FieldBuilder = ({
  databaseId,
  formFields,
  formLoading,
  preOnSubmit,
  presetValues,
  settings,
  formLayoutProps,
}) => {
  // Loop through fields and create
  return formFields.map((field) => {
    // Set the wrapper classes
    const {
      id,
      captchaTheme,
      description,
      descriptionPlacement,
      isRequired,
      subLabelPlacement,
      labelPlacement,
      layoutGridColumnSpan,
      type,
      visibility,
    } = field;

    let inputWrapperClass = classnames(
      "gfield",
      "gfield--type-" + valueToLowerCase(type),
      field.cssClass,
      { gfield_contains_required: isRequired },
      { gform_hidden: type === "HIDDEN" },
      { "hidden-label": islabelHidden(labelPlacement) },
      {
        [`field_sublabel_${valueToLowerCase(subLabelPlacement)}`]:
          valueToLowerCase(subLabelPlacement),
      },
      {
        [`gfield--width-${getFieldWidthClass(layoutGridColumnSpan)}`]:
          layoutGridColumnSpan,
      },
      `field_description_${
        descriptionPlacement &&
        valueToLowerCase(descriptionPlacement) !== "inherit"
          ? valueToLowerCase(descriptionPlacement)
          : valueToLowerCase(formLayoutProps?.descriptionPlacement)
      }`,
      `field_sublabel_${
        subLabelPlacement
          ? valueToLowerCase(subLabelPlacement)
          : valueToLowerCase(formLayoutProps?.subLabelPlacement)
      }`,
      `gfield--${description ? "has-description" : "no-description"}`,
      `gfield_visibility_${
        visibility ? valueToLowerCase(visibility) : "hidden"
      }`
    );

    const wrapId = `field_${databaseId}_${id}`;

    //TODO: Should this match GF version "input_form.id_input.id"
    const inputName = `input_${field.id}`;

    const defaultValue = presetValues?.[inputName] || field?.defaultValue || "";

    switch (field.type) {
      // Add note for unsupported captcha field
      case "CAPTCHA":
        return (
          <Captcha
            captchaTheme={captchaTheme}
            fieldData={field}
            gfId={id}
            key={id}
            name={inputName}
            ref={preOnSubmit}
            settings={settings?.recaptcha}
            wrapClassName={inputWrapperClass}
          />
        );
      case "HTML":
        return (
          <Html
            fieldData={field}
            key={id}
            gfId={id}
            name={inputName}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      // Start with the standard fields
      case "TEXT":
      case "NUMBER":
      case "HIDDEN":
      case "DATE":
      case "PHONE":
        return (
          <Input
            fieldData={field}
            key={id}
            gfId={id}
            name={inputName}
            defaultValue={defaultValue}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "EMAIL":
        return (
          <Email
            fieldData={field}
            key={id}
            gfId={id}
            name={inputName}
            defaultValue={defaultValue}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "TEXTAREA":
        return (
          <Textarea
            fieldData={field}
            defaultValue={defaultValue}
            key={id}
            gfId={id}
            name={inputName}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "SELECT":
        return (
          <Select
            fieldData={field}
            key={id}
            gfId={id}
            name={inputName}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "MULTISELECT":
        return (
          <Multiselect
            fieldData={field}
            key={id}
            gfId={id}
            name={inputName}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "RADIO":
      case "CHECKBOX":
        return (
          <SelectorList
            fieldData={field}
            key={id}
            gfId={id}
            name={inputName}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );

      default:
        return null;
    }
  });
};

export default FieldBuilder;
