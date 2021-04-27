import {
  FormFieldType,
  FormField,
  FormFieldGroup,
  SectionFields,
  SingleFormField,
} from '../types'
import { processRepeatGroup, processRepeatSection } from '../../util'

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
  data: T,
): Array<V> =>
  fields.reduce((values, field) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.FormFieldGroup) {
      newValues = processFormFieldGroup(field, func)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else if (field.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(field, data)
      return processFormSectionFields(groups, func, data)
    } else if (field.type === FormFieldType.TextInputDescription) {
      newValues = []
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [] as Array<V>)

export const mapFormFields = <T, V>(
  formFields: Array<FormField<T>>,
  func: Fn<T, V>,
  data: T,
): Array<V> =>
  formFields.reduce((values: Array<V>, field: FormField<T>) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.FormFieldGroup) {
      newValues = processFormFieldGroup(field, func)
    } else if (field.type === FormFieldType.FormSection) {
      newValues = processFormSectionFields(field.fields, func, data)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else if (field.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(field, data)
      return processFormSectionFields(groups, func, data)
    } else if (field.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(field, data, () => '')
      return mapFormFields(sections, func, data)
    } else if (field.type === FormFieldType.TextInputDescription) {
      newValues = []
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [])
