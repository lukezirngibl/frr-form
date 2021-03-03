import React from 'react'
import { Field } from './Field'
import { FieldGroup } from './FieldGroup'
import { FieldRepeatGroup } from './FieldRepeatGroup'
import { FieldRepeatSection } from './FieldRepeatSection'
import { FieldSection } from './FieldSection'
import {
  FieldType,
  FormFieldGroup,
  FormFieldRepeatGroup,
  FormFieldRepeatSection,
  FormFieldType,
  FormSection,
} from './types'

// ------------------------------------
export const FormField = <FormData extends {}>({
  data,
  field,
  fieldIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldType<FormData>) => {
  /*
   * return related field group
   */

  const fieldType = !Array.isArray(field) && field.type

  const commonFieldProps = {
    fieldIndex,
    data,
    style,
    showValidation,
    onChange,
    formReadOnly,
  }

  return (
    (fieldType === FormFieldType.FormFieldGroup && (
      <FieldGroup
        field={field as FormFieldGroup<FormData>}
        {...commonFieldProps}
      />
    )) ||
    (fieldType === FormFieldType.FormSection && (
      <FieldSection
        field={field as FormSection<FormData>}
        {...commonFieldProps}
      />
    )) ||
    (fieldType === FormFieldType.FormFieldRepeatGroup && (
      <FieldRepeatGroup
        field={field as FormFieldRepeatGroup<FormData>}
        {...commonFieldProps}
      />
    )) ||
    (fieldType === FormFieldType.FormFieldRepeatSection && (
      <FieldRepeatSection
        field={field as FormFieldRepeatSection<FormData>}
        {...commonFieldProps}
      />
    )) || <Field field={field} {...commonFieldProps} />
  )
}
