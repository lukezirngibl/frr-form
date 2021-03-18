import { FormFieldType, SingleFormField } from '../types'

export const getComputeFieldError = <FormData>(data: FormData) => (
  field: SingleFormField<FormData>,
): string | null => {
  let error = null
  const isRequired =
    'required' in field
      ? typeof field.required === 'function'
        ? field.required(data)
        : field.required
      : false

  let val = field.lens.get(data)
  val = typeof val === 'string' ? val.trim() : val

  if (isRequired && (val === '' || val === null || val === undefined)) {
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
    if (!!val && isNaN(val as any)) {
      error = 'invalidAmount'
    }

    const min = 'min' in field ? field.min : 0
    const max = 'max' in field ? field.max : 1000000
    if (val < min) {
      error = 'fieldErrorMin'
    } else if (val > max) {
      error = 'fieldErrorMax'
    }
  }

  if (!error && field.type === FormFieldType.NumberInput) {
    if ('min' in field && val < field.min) {
      error = 'fieldErrorMin'
    } else if ('max' in field && val > field.max) {
      error = 'fieldErrorMax'
    }
  }

  return error
}
