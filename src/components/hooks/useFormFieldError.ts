import { useEffect, useState } from 'react'
import { FormFieldType, MultiInputField, SingleFormField } from '../types'

export const computeFieldError = <FormData>({
  value,
  data,
  field,
}: {
  value: string | string[] | boolean | number | Date | null
  data: FormData
  field: SingleFormField<FormData>
}): { error: string | null; fieldId: string } => {
  let error = null
  const isRequired =
    'required' in field
      ? typeof field.required === 'function'
        ? field.required(data)
        : field.required
      : false

  value = typeof value === 'string' ? value.trim() : value

  if (isRequired && (value === '' || value === null || value === undefined)) {
    if (
      field.type === FormFieldType.FormattedDatePicker ||
      field.type === FormFieldType.DatePicker
    ) {
      error = 'invalidDate'
    } else {
      error = 'fieldRequired'
    }
  }

  if (!error && !!field.validate) {
    error = field.validate(value)
  }

  if (!error && field.type === FormFieldType.CurrencyInput) {
    if (!!value && isNaN(value as any)) {
      error = 'invalidAmount'
    }

    const min = 'min' in field ? field.min : 0
    const max = 'max' in field ? field.max : 10000000
    if (value < min) {
      error = 'fieldErrorMin'
    } else if (value > max) {
      error = 'fieldErrorMax'
    }
  }

  if (!error && field.type === FormFieldType.NumberInput) {
    if ('min' in field && value < field.min) {
      error = 'fieldErrorMin'
    } else if ('max' in field && value > field.max) {
      error = 'fieldErrorMax'
    }
  }

  return { error, fieldId: field.lens.id() }
}

export const useFormFieldError = <FormData>({
  value,
  data,
  field,
  showValidation,
}: {
  value: string | string[] | number | Date | boolean | null
  data: FormData
  field: SingleFormField<FormData>
  showValidation: boolean
}): string | null => {
  const [fieldError, setFieldError] = useState({ error: null, fieldId: null })
  useEffect(() => {
    showValidation
      ? setFieldError(computeFieldError({ value, field, data }))
      : setFieldError({ error: null, fieldId: null })
  }, [value, showValidation])

  return fieldError.error
}

export const useFormFieldErrors = <FormData>({
  errors,
}: {
  errors: Array<{ error: string; fieldId: string }>
}): Array<string> => {
  const [error, setError] = useState([])
  useEffect(() => {
    const errorLabels = new Set(
      errors.map((error) => error.error).filter((error) => !!error),
    )
    setError(Array.from(errorLabels))
  }, [errors])

  return error
}
