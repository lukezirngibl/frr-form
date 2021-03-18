import { FormFieldType, SingleFormField } from '../types'

export const getComputeFieldError = <FormData>(data: FormData) => (
  f: SingleFormField<FormData>,
): string | null => {
  let error = null
  const isRequired =
    'required' in f
      ? typeof f.required === 'function'
        ? f.required(data)
        : f.required
      : false

  let val = f.lens.get(data)
  val = typeof val === 'string' ? val.trim() : val

  if (isRequired && (val === '' || val === null || val === undefined)) {
    if (
      f.type === FormFieldType.FormattedDatePicker ||
      f.type === FormFieldType.DatePicker
    ) {
      error = 'invalidDate'
    } else {
      error = 'fieldRequired' as string
    }
  }

  if (!error && !!f.validate) {
    error = f.validate(data)
  }

  if (!error && f.type === FormFieldType.NumberInput) {
    if ('min' in f && val < f.min) {
      error = 'fieldErrorMin' as string
    } else if ('max' in f && val > f.max) {
      error = 'fieldErrorMax' as string
    }
  }

  return error
}
