import {
  FormFieldType,
  FormField,
  FormFieldGroup,
  SectionFields,
  SingleFormField,
} from '../types'

type Fn<T, V> = (i: SingleFormField<T>) => V

const processFormFieldRow = <T, V>(
  a: Array<SingleFormField<T>>,
  func: Fn<T, V>,
): Array<V> => a.map((j) => func(j))

const processFormFieldGroup = <T, V>(
  group: FormFieldGroup<T>,
  func: Fn<T, V>,
): Array<V> =>
  group.fields.reduce((values, field) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [] as Array<V>)

const processFormSectionFields = <T, V>(
  fields: SectionFields<T>,
  func: Fn<T, V>,
): Array<V> =>
  fields.reduce((values, field) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.FormFieldGroup) {
      newValues = processFormFieldGroup(field, func)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else if (
      field.type === FormFieldType.FormFieldRepeatGroup ||
      field.type === FormFieldType.FormFieldRepeatSection ||
      field.type === FormFieldType.TextInputDescription
    ) {
      newValues = []
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [] as Array<V>)

export const mapFormFields = <T, V>(
  formFields: Array<FormField<T>>,
  func: Fn<T, V>,
): Array<V> =>
  formFields.reduce((values: Array<V>, field: FormField<T>) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.FormFieldGroup) {
      newValues = processFormFieldGroup(field, func)
    } else if (field.type === FormFieldType.FormSection) {
      newValues = processFormSectionFields(field.fields, func)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else if (
      field.type === FormFieldType.FormFieldRepeatGroup ||
      field.type === FormFieldType.FormFieldRepeatSection ||
      field.type === FormFieldType.TextInputDescription
    ) {
      newValues = []
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [])
