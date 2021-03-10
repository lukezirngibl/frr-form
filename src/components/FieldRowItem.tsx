import React, { useEffect } from 'react'

import { CommonThreadProps, FormFieldType, SingleFormField } from './types'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { getComputeFieldError } from './functions/computeFieldError.form'
import { Field } from './Field'

// ------------------------------------
export const FieldRowItem = <FormData extends {}>({
  data,
  field,
  fieldIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
  noScrollableWrapper,
}: CommonThreadProps<FormData> & {
  field: SingleFormField<FormData>
  noScrollableWrapper?: boolean
}) => {
  /* Error handling */
  const computeFieldError = getComputeFieldError(data)
  const errorLabel = showValidation ? computeFieldError(field) : null
  const hasError = errorLabel !== null

  const commonFieldProps = {
    data,
    hasError,
    errorLabel,
    style,
    onChange,
    showValidation,
  }

  if (formReadOnly) {
    return (
      <FieldItemReadOnly
        {...commonFieldProps}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
      />
    )
  }

  return !field.isVisible || field.isVisible(data) ? (
    !noScrollableWrapper ? (
      <FieldScrollableWrapper
        key={`field-${fieldIndex}`}
        showValidation={showValidation}
        hasError={hasError}
        style={field.itemStyle}
      >
        <Field
          {...commonFieldProps}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
          onChange={onChange}
        />
      </FieldScrollableWrapper>
    ) : (
      <Field
        {...commonFieldProps}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
        onChange={onChange}
      />
    )
  ) : (
    <></>
  )
}
