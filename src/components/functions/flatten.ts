import {
  FormFieldType,
  FormField,
  FormFieldGroup,
  FormSection,
  SectionFields,
  SingleFormField,
} from '../types'

const processFormFieldGroup = <T>(
  g: FormFieldGroup<T>,
): Array<SingleFormField<T>> => {
  let acc: Array<SingleFormField<T>> = []
  for (let f of g.fields) {
    if (Array.isArray(f)) {
      acc = [...acc, ...f]
    } else {
      acc = [...acc, f]
    }
  }

  return acc
}

const processFormSectionFields = <T>(
  fields: SectionFields<T>,
): Array<SingleFormField<T>> => {
  let acc: Array<SingleFormField<T>> = []
  for (let f of fields) {
    if (Array.isArray(f)) {
      acc = [...acc, ...f]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      acc = [...acc, ...processFormFieldGroup(f)]
    } else if (
      f.type === FormFieldType.FormFieldRepeatGroup ||
      f.type === FormFieldType.FormFieldRepeatSection
    ) {
      acc = acc
    } else {
      acc = [...acc, f]
    }
  }
  return acc
}

const processFormSection = <T>(s: FormSection<T>): Array<SingleFormField<T>> =>
  processFormSectionFields(s.fields)

export const flatten = <T>(
  formFields: Array<FormField<T>>,
): Array<SingleFormField<T>> => {
  let array: Array<SingleFormField<T>> = []
  for (let f of formFields) {
    if (Array.isArray(f)) {
      array = [...array, ...f]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      array = [...array, ...processFormFieldGroup(f)]
    } else if (f.type === FormFieldType.FormSection) {
      array = [...array, ...processFormSection(f)]
    } else if (
      f.type === FormFieldType.FormFieldRepeatGroup ||
      f.type === FormFieldType.FormFieldRepeatSection
    ) {
      array = array
    } else {
      array = [...array, f]
    }
  }
  return array
}
