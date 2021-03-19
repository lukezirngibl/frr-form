import React, { useEffect } from 'react'

import { CommonThreadProps, FormFieldType, SingleFormField } from './types'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormFieldError } from './hooks/useFormFieldError'
import { Field } from './Field'

type Props<FormData> = CommonThreadProps<FormData> & {
  field: SingleFormField<FormData>
  isNotScrollable?: boolean
}
// ------------------------------------

export const FieldRowItem = <FormData extends {}>({
  data,
  errorFieldId,
  field,
  fieldIndex,
  formReadOnly,
  isNotScrollable,
  onChange,
  showValidation,
  style,
}: Props<FormData>) => {
  /* Error handling */

  const errorLabel = useFormFieldError({ data, field, showValidation })
  const hasError = errorLabel !== null

  const commonFieldProps = {
    data,
    hasError,
    errorLabel,
    style,
    onChange,
    showValidation,
  }

  if (formReadOnly || field.readOnly) {
    return (
      <FieldItemReadOnly
        {...commonFieldProps}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
      />
    )
  }

  return !field.isVisible || field.isVisible(data) ? (
    !isNotScrollable ? (
      <FieldScrollableWrapper
        key={`field-${fieldIndex}`}
        isScrollToError={field.lens.id() === errorFieldId}
        style={field.itemStyle}
      >
        <Field
          {...commonFieldProps}
          hasFocus={field.lens.id() === errorFieldId}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
          onChange={onChange}
        />
      </FieldScrollableWrapper>
    ) : (
      <Field
        {...commonFieldProps}
        hasFocus={field.lens.id() === errorFieldId}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
        onChange={onChange}
      />
    )
  ) : (
    <></>
  )
}
