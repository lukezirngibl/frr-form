import {
  FormFieldType,
  FormField,
  FormFieldGroup,
  FormSection,
  SectionField,
  SectionFields,
  SingleFieldOrRow,
  SingleFormField,
  GroupField,
} from '../types'
import { processRepeatGroup, processRepeatSection } from '../../util'

type Fn<T> = (i: { isVisible?: (d: T) => boolean }) => boolean

const processFormFieldRow = <T>(
  a: Array<SingleFormField<T>>,
  fn: Fn<T>,
): Array<SingleFormField<T>> =>
  a.reduce(
    (acc: Array<SingleFormField<T>>, j: SingleFormField<T>) =>
      fn(j) ? [...acc, j] : acc,
    [],
  )

const processGroupFields = <T>(
  fields: Array<GroupField<T>>,
  fn: Fn<T>,
): Array<GroupField<T>> =>
  fields.reduce((acc: Array<GroupField<T>>, f) => {
    if (Array.isArray(f)) {
      return [...acc, ...processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...acc, ...processFormFieldRow(f.fields, fn)]
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processFormSectionFields = <T>(
  fields: SectionFields<T>,
  fn: Fn<T>,
  data: T,
): SectionFields<T> =>
  fields.reduce((acc: Array<SectionField<T>>, f) => {
    if (Array.isArray(f)) {
      return [...acc, ...processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...acc, ...processFormFieldRow(f.fields, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...acc, ...processGroupFields(f.fields, fn)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      return [...acc, ...processFormSectionFields(groups, fn, data)]
    } else if (f.type === FormFieldType.TextInputDescription) {
      return acc
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processFormSection = <T>(
  s: FormSection<T>,
  fn: Fn<T>,
  data: T,
): Array<FormSection<T>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: processFormSectionFields(s.fields, fn, data),
        },
      ]
    : []

export const filterByVisibility = <T>(
  formFields: Array<FormField<T>>,
  data: T,
): Array<FormField<T>> =>
  formFields.reduce((groups: Array<FormField<T>>, f: FormField<T>) => {
    const fn = (i: { isVisible?: (d: T) => boolean }) =>
      i.isVisible ? i.isVisible(data) : true

    if (Array.isArray(f)) {
      return [...groups, ...processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...groups, ...processGroupFields(f.fields, fn)]
    } else if (f.type === FormFieldType.FormSection) {
      return [...groups, ...processFormSection(f, fn, data)]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...groups, ...processFormFieldRow(f.fields, fn)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      return processFormSectionFields(groups, fn, data)
    } else if (f.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(f, data, () => '')
      return [...groups, ...filterByVisibility(sections, data)]
    } else if (f.type === FormFieldType.TextInputDescription) {
      return groups
    } else {
      return [...groups, ...(fn(f) ? [f] : [])]
    }
  }, [])
