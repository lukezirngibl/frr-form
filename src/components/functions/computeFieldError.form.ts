import { FormFieldType, SingleFormField } from "../types"

export const getComputeFieldError = <FormData>(data: FormData) => (f: SingleFormField<FormData>): string | null => {
  const isRequired =
    'required' in f
      ? typeof f.required === 'function'
        ? f.required(data)
        : f.required
      : false

  let val = f.lens.get(data)
  val = typeof val === 'string' ? val.trim() : val

  if (isRequired) {
    if (val === '' || val === null || val === undefined) {
      return 'fieldRequired' as string
    }
  }

  if ('validate' in f && f.validate !== undefined) {
    const l = f.validate(data)
    if (l !== null) {
      return l
    }
  }

  if (f.type === FormFieldType.NumberInput) {
    if ('min' in f && val < f.min) {
      return 'fieldErrorMin' as string
    } else if ('max' in f && val > f.max) {
      return 'fieldErrorMax' as string
    }
  }

  return null
}
