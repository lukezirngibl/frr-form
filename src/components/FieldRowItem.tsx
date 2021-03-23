import React, { useCallback, useEffect, useState } from 'react'
import { Field } from './Field'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormFieldError } from './hooks/useFormFieldError'
import { CommonThreadProps, SingleFormField } from './types'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { useFormTheme } from '../theme/theme'
import { Form } from './Form'

type Props<FormData> = CommonThreadProps<FormData> & {
  field: SingleFormField<FormData>
  onError?: (error: { error: string; fieldId: string }) => void
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
  onChange: onValueChange,
  onError,
  showValidation,
  style,
}: Props<FormData>) => {
  const theme = useFormTheme()
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})

  // Error handling
  const errorLabel = useFormFieldError({ data, field, showValidation })
  const hasError = errorLabel !== null

  const onChange = useCallback((value: any) => {
    onValueChange(field.lens, value)
  }, [])

  useEffect(() => {
    showValidation && onError?.({ error: errorLabel, fieldId: field.lens.id() })
  }, [showValidation, errorLabel])

  // Render components
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

  return (
    ((!field.isVisible || field.isVisible(data)) &&
      ((isNotScrollable && (
        <Field
          data={data}
          hasError={hasError}
          errorLabel={errorLabel}
          onChange={onChange}
          hasFocus={field.lens.id() === errorFieldId}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
        />
      )) || (
        <FieldScrollableWrapper
          key={`field-${fieldIndex}`}
          isScrollToError={field.lens.id() === errorFieldId}
          style={getRowStyle('item', field.itemStyle).style}
        >
          <Field
            data={data}
            hasError={hasError}
            errorLabel={errorLabel}
            onChange={onChange}
            hasFocus={field.lens.id() === errorFieldId}
            field={field as SingleFormField<FormData>}
            fieldIndex={fieldIndex}
          />
        </FieldScrollableWrapper>
      ))) || <></>
  )
}
