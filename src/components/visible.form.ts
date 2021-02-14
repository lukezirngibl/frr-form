import {
  FormField,
  FormFieldGroup,
  FormSection,
  SectionField,
  SectionFields,
  SingleFieldOrRow,
  SingleFormField,
} from './Form'
import { FormFieldType } from './types'

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

const processFormFieldGroup = <T>(
  g: FormFieldGroup<T>,
  fn: Fn<T>,
): Array<FormFieldGroup<T>> =>
  fn(g)
    ? [
        {
          ...g,
          fields: g.fields.reduce(
            (
              filteredFields: Array<SingleFieldOrRow<T>>,
              e: SingleFieldOrRow<T>,
            ) => {
              if (Array.isArray(e)) {
                return [...filteredFields, processFormFieldRow(e, fn)]
              } else {
                return [...filteredFields, ...(fn(e) ? [e] : [])]
              }
            },
            [],
          ),
        },
      ]
    : []

const processFormSectionFields = <T>(
  fields: SectionFields<T>,
  fn: Fn<T>,
): SectionFields<T> =>
  fields.reduce((acc: Array<SectionField<T>>, f) => {
    if (Array.isArray(f)) {
      return [...acc, ...processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...acc, ...processFormFieldGroup(f, fn)]
    } else if (
      f.type === FormFieldType.FormFieldRepeatGroup ||
      f.type === FormFieldType.FormFieldRepeatSection
    ) {
      return acc
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processFormSection = <T>(
  s: FormSection<T>,
  fn: Fn<T>,
): Array<FormSection<T>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: processFormSectionFields(s.fields, fn),
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
      return [...groups, ...processFormFieldGroup(f, fn)]
    } else if (f.type === FormFieldType.FormSection) {
      return [...groups, ...processFormSection(f, fn)]
    } else if (
      f.type === FormFieldType.FormFieldRepeatGroup ||
      f.type === FormFieldType.FormFieldRepeatSection
    ) {
      return groups
    } else {
      return [...groups, ...(fn(f) ? [f] : [])]
    }
  }, [])
