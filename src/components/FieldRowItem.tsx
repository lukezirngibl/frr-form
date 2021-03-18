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
