import React, { useEffect, useState } from 'react'

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

  const [value, setValue] = useState(field.lens.get(data))
  const errorLabel = useFormFieldError({ value, data, field, showValidation })
  const hasError = errorLabel !== null

  const onBlur = value => {
    setValue(value)
    onChange(field.lens, value)
  }

  if (formReadOnly || field.readOnly) {
    return (
      <FieldItemReadOnly
        data={data}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
        style={style}
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
          data={data}
          hasError={hasError}
          errorLabel={errorLabel}
          onChange={setValue}
          onBlur={onBlur}
          hasFocus={field.lens.id() === errorFieldId}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
        />
      </FieldScrollableWrapper>
    ) : (
      <Field
        data={data}
        hasError={hasError}
        errorLabel={errorLabel}
        onChange={setValue}
        onBlur={onBlur}
        hasFocus={field.lens.id() === errorFieldId}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
      />
    )
  ) : (
    <></>
  )
}
