import {
  FormFieldType,
  FormField,
  FormFieldGroup,
  FormSection,
  SectionFields,
  SingleFormField,
} from '../types'

const processFormFieldGroup = <T, U>(
  g: FormFieldGroup<T>,
  fn: (i: SingleFormField<T>) => Promise<U>,
): Array<Promise<U>> => {
  let acc: Array<Promise<U>> = []
  for (let f of g.fields) {
    if (Array.isArray(f)) {
      acc = [...acc, ...f.map(fn)]
    } else {
      acc = [...acc, fn(f)]
    }
  }

  return acc
}

const processFormSectionFields = <T, U>(
  fields: SectionFields<T>,
  fn: (i: SingleFormField<T>) => Promise<U>,
): Array<Promise<U>> => {
  let acc: Array<Promise<U>> = []
  for (let f of fields) {
    if (Array.isArray(f)) {
      acc = [...acc, ...f.map(fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      acc = [...acc, ...processFormFieldGroup(f, fn)]
    } else if (
      f.type === FormFieldType.FormFieldRepeatGroup ||
      f.type === FormFieldType.FormFieldRepeatSection
    ) {
      acc = acc
    } else {
      acc = [...acc, fn(f)]
    }
  }
  return acc
}

const processFormSection = <T, U>(
  s: FormSection<T>,
  fn: (i: SingleFormField<T>) => Promise<U>,
): Array<Promise<U>> => processFormSectionFields(s.fields, fn)

export const forEachPromiseFormFields = async <T, U>(
  formFields: Array<FormField<T>>,
  fn: (i: SingleFormField<T>) => Promise<U>,
): Promise<unknown> => {
  let groups: Array<Promise<U>> = []
  for (let f of formFields) {
    if (Array.isArray(f)) {
      groups = [...groups, ...f.map(fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      groups = [...groups, ...processFormFieldGroup(f, fn)]
    } else if (f.type === FormFieldType.FormSection) {
      groups = [...groups, ...processFormSection(f, fn)]
    } else if (
      f.type === FormFieldType.FormFieldRepeatGroup ||
      f.type === FormFieldType.FormFieldRepeatSection
    ) {
      groups = groups
    } else {
      groups = [...groups, fn(f)]
    }
  }
  return Promise.all(groups)
}
