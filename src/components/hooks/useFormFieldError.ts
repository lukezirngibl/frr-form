import { useEffect, useState } from 'react'
import { FormFieldType, MultiInputField, SingleFormField } from '../types'

const computeFieldError = <FormData>({
  value,
  data,
  field,
}: {
  value: string | string[] | boolean | number | Date | null
  data: FormData
  field: SingleFormField<FormData>
}): string | null => {
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
    error = field.validate(data)
  }

  if (!error && field.type === FormFieldType.CurrencyInput) {
    if (!!value && isNaN(value as any)) {
      error = 'invalidAmount'
    }

    const min = 'min' in field ? field.min : 0
    const max = 'max' in field ? field.max : 1000000
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

  return error
}

export const useFormFieldError = <FormData>({
  data,
  field,
  showValidation,
}: {
  data: FormData
  field: SingleFormField<FormData>
  showValidation: boolean
}): string | null => {
  let value = field.lens.get(data)

  const [error, setError] = useState(null)
  useEffect(() => {
    showValidation
      ? setError(computeFieldError({ value, field, data }))
      : setError(null)
  }, [value, showValidation])

  return error as string
}

export const useFormFieldErrors = <FormData>({
  data,
  field,
  showValidation,
}: {
  data: FormData
  field: MultiInputField<FormData>
  showValidation: boolean
}): Array<string> => {
  const [error, setError] = useState([])
  useEffect(() => {
    const errorLabels = new Set(
      showValidation
        ? field.fields
            .map((field: SingleFormField<FormData>) =>
              computeFieldError({ data, field, value: field.lens.get(data) }),
            )
            .filter((label: string) => !!label)
        : [],
    )
    setError(Array.from(errorLabels))
  }, [showValidation, data])

  return error
}
