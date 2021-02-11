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

const processFormFieldRow = <T, E>(
  a: Array<SingleFormField<T, E>>,
  fn: Fn<T>,
): Array<SingleFormField<T, E>> =>
  a.reduce(
    (acc: Array<SingleFormField<T, E>>, j: SingleFormField<T, E>) =>
      fn(j) ? [...acc, j] : acc,
    [],
  )

const processFormFieldGroup = <T, E>(
  g: FormFieldGroup<T, E>,
  fn: Fn<T>,
): Array<FormFieldGroup<T, E>> =>
  fn(g)
    ? [
        {
          ...g,
          fields: g.fields.reduce(
            (
              filteredFields: Array<SingleFieldOrRow<T, E>>,
              e: SingleFieldOrRow<T, E>,
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

const processFormSectionFields = <T, E>(
  fields: SectionFields<T, E>,
  fn: Fn<T>,
): SectionFields<T, E> =>
  fields.reduce((acc: Array<SectionField<T, E>>, f) => {
    if (Array.isArray(f)) {
      return [...acc, ...processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...acc, ...processFormFieldGroup(f, fn)]
    } else if (f.type === FormFieldType.NumberList) {
      return acc
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processFormSection = <T, E>(
  s: FormSection<T, E>,
  fn: Fn<T>,
): Array<FormSection<T, E>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: processFormSectionFields(s.fields, fn),
        },
      ]
    : []

export const filterByVisibility = <T, E>(
  formFields: Array<FormField<T, E>>,
  data: T,
): Array<FormField<T, E>> =>
  formFields.reduce((groups: Array<FormField<T, E>>, f: FormField<T, E>) => {
    const fn = (i: { isVisible?: (d: T) => boolean }) =>
      i.isVisible ? i.isVisible(data) : true

    if (Array.isArray(f)) {
      return [...groups, ...processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...groups, ...processFormFieldGroup(f, fn)]
    } else if (f.type === FormFieldType.FormSection) {
      return [...groups, ...processFormSection(f, fn)]
    } else if (f.type === FormFieldType.NumberList) {
      return groups
    } else {
      return [...groups, ...(fn(f) ? [f] : [])]
    }
  }, [])
