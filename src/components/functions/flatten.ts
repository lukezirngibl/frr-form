import {
  FormFieldType,
  FormField,
  FormFieldGroup,
  FormSection,
  SectionFields,
  SingleFormField,
  MultiTextInputField,
} from '../types'
import { processRepeatGroup, processRepeatSection } from '../../util'

const processFormFieldGroup = <T>(
  g: FormFieldGroup<T>,
): Array<SingleFormField<T> | MultiTextInputField<T>> => {
  let acc: Array<SingleFormField<T> | MultiTextInputField<T>> = []
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
  data: T,
): Array<SingleFormField<T> | MultiTextInputField<T>> => {
  let acc: Array<SingleFormField<T> | MultiTextInputField<T>> = []
  for (let f of fields) {
    if (Array.isArray(f)) {
      acc = [...acc, ...f]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      acc = [...acc, ...processFormFieldGroup(f)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      acc = [
        ...acc,
        ...groups.reduce((acc, g) => [...acc, ...processFormFieldGroup(g)], []),
      ]
    } else if (f.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(f, data, v => v)
      acc = [
        ...acc,
        ...sections.reduce(
          (acc, s) => [...acc, ...processFormSection(s, data)],
          [],
        ),
      ]
    } else {
      acc = [...acc, f]
    }
  }
  return acc
}

const processFormSection = <T>(
  s: FormSection<T>,
  data: T,
): Array<SingleFormField<T> | MultiTextInputField<T>> =>
  processFormSectionFields(s.fields, data)

export const flatten = <T>(
  formFields: Array<FormField<T>>,
  data: T,
): Array<SingleFormField<T> | MultiTextInputField<T>> => {
  console.log('flatten...')
  let array: Array<SingleFormField<T> | MultiTextInputField<T>> = []
  for (let f of formFields) {
    if (Array.isArray(f)) {
      array = [...array, ...f]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      array = [...array, ...processFormFieldGroup(f)]
    } else if (f.type === FormFieldType.FormSection) {
      array = [...array, ...processFormSection(f, data)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      array = [
        ...array,
        ...groups.reduce((acc, g) => [...acc, ...processFormFieldGroup(g)], []),
      ]
    } else if (f.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(f, data, v => v)
      array = [
        ...array,
        ...sections.reduce(
          (acc, s) => [...acc, ...processFormSection(s, data)],
          [],
        ),
      ]
    } else {
      array = [...array, f]
    }
  }
  return array
}
