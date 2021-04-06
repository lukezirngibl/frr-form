import { Props as CodeInputProps } from 'frr-web/lib/components/CodeInput'
import { Props as CountrySelectProps } from 'frr-web/lib/components/CountrySelect'
import { Props as CurrencyInputProps } from 'frr-web/lib/components/CurrencyInput'
import { Props as DatePickerProps } from 'frr-web/lib/components/DatePicker'
import { Props as FormattedDatePickerProps } from 'frr-web/lib/components/FormattedDatePicker'
import { LabelProps } from 'frr-web/lib/components/Label'
import { Props as MultiSelectProps } from 'frr-web/lib/components/MultiSelect'
import { Props as NumberInputProps } from 'frr-web/lib/components/NumberInput'
import { Props as OptionGroupProps } from 'frr-web/lib/components/OptionGroup'
import { Props as RadioGroupProps } from 'frr-web/lib/components/RadioGroup'
import { Props as SelectProps } from 'frr-web/lib/components/Select'
import { Props as SingleCheckboxProps } from 'frr-web/lib/components/SingleCheckbox'
import { Props as SliderProps } from 'frr-web/lib/components/Slider'
import { Props as SwithProps } from 'frr-web/lib/components/Switch'
import { Props as TextProps } from 'frr-web/lib/components/Text'
import { TextAreaProps } from 'frr-web/lib/components/TextArea'
import { Props as TextInputProps } from 'frr-web/lib/components/TextInput'
import { Props as TextInputDescriptionProps } from 'frr-web/lib/components/TextInputDescription'
import { Props as TextNumberInputProps } from 'frr-web/lib/components/TextNumberInput'
import { Props as ToggleProps } from 'frr-web/lib/components/Toggle'
import { Props as YesNoOptionGroupProps } from 'frr-web/lib/components/YesNoOptionGroup'
import { Props as YesNoRadioGroupProps } from 'frr-web/lib/components/YesNoRadioGroup'
import { ReactNode } from 'react'
import { CSSProperties } from 'styled-components'
import { FormTheme } from '../theme/theme'
import { FormLens } from '../util'

// import { CheckboxGroupProps } from 'frr-web/lib/components/CheckboxGroup'
// import { Props as DropdownProps } from 'frr-web/lib/components/Dropdown'
// import { Props as DropdownNumberProps } from 'frr-web/lib/components/DropdownNumber'
// import { Props as InputWithDropdownProps } from 'frr-web/lib/components/InputWithDropdown'
// import { Props as CountryDropdownProps } from 'frr-web/lib/components/CountryDropdown'

export enum FormFieldType {
  // CountryDropdown = 'CountryDropdown',
  // CheckboxGroup = 'CheckboxGroup',
  // Dropdown = 'Dropdown',
  // DropdownNumber = 'DropdownNumber',
  // InputWithDropdown = 'InputWithDropdown',

  CodeInput = 'CodeInput',
  CountrySelect = 'CountrySelect',
  CurrencyInput = 'CurrencyInput',
  DatePicker = 'DatePicker',
  FormattedDatePicker = 'FormattedDatePicker',
  FormFieldGroup = 'FormFieldGroup',
  FormFieldRepeatGroup = 'FormFieldRepeatGroup',
  FormFieldRepeatSection = 'FormFieldRepeatSection',
  FormSection = 'FormSection',
  FormText = 'FormText',
  MultiSelect = 'MultiSelect',
  MultiInput = 'MultiInput',
  NumberInput = 'NumberInput',
  NumberSelect = 'NumberSelect',
  OptionGroup = 'OptionGroup',
  RadioGroup = 'RadioGroup',
  SingleCheckbox = 'SingleCheckbox',
  Slider = 'Slider',
  Switch = 'Switch',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  TextInputDescription = 'TextInputDescription',
  TextNumber = 'TextNumber',
  TextSelect = 'TextSelect',
  Toggle = 'Toggle',
  YesNoOptionGroup = 'YesNoOptionGroup',
  YesNoRadioGroup = 'YesNoRadioGroup',
  Static = 'Static',
}

export enum Orientation {
  Row = 'Row',
  Column = 'Column',
}

export enum DisplayType {
  Edit = 'Edit',
  View = 'View',
}

export type DropdownOption = {
  label: string
  value: string
}

type FormInput<V, P extends { value: V }, L, T> = Omit<
  P,
  'onChange' | 'onBlur' | 'value' | 'error' | 'required'
> & {
  lens: L
  type: T
  readOnly?: boolean
  readOnlyMapper?: (
    params: Omit<P, 'onChange' | 'onBlur'> & {
      translate: (v: string) => string
    },
  ) => string
  readOnlyOptions?: {
    isHighlighted?: boolean
    image?: string
  }
  _value?: P['value']
}

export type FormTextField<FormData> = FormInput<
  string,
  TextProps,
  FormLens<FormData, string>,
  FormFieldType.FormText
>

export type OptionGroupField<FormData> = FormInput<
  string | null,
  OptionGroupProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.OptionGroup
>

export type SliderField<FormData> = FormInput<
  number | null,
  SliderProps,
  FormLens<FormData, number>,
  FormFieldType.Slider
>

export type ToggleField<FormData> = FormInput<
  boolean | null,
  ToggleProps,
  FormLens<FormData, boolean> | FormLens<FormData, boolean | null>,
  FormFieldType.Toggle
>

export type RadioGroupField<FormData> = FormInput<
  string | null,
  RadioGroupProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.RadioGroup
>

export type CodeInputField<FormData> = FormInput<
  string | null,
  CodeInputProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.CodeInput
>

export type CurrencyInputField<FormData> = FormInput<
  number | null,
  CurrencyInputProps,
  FormLens<FormData, number> | FormLens<FormData, number | null>,
  FormFieldType.CurrencyInput
>

export type MultiSelectField<FormData> = FormInput<
  Array<string>,
  MultiSelectProps,
  FormLens<FormData, Array<string>>,
  FormFieldType.MultiSelect
>

export type TextSelectField<FormData> = FormInput<
  string | number | null,
  SelectProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.TextSelect
>

export type NumberSelectField<FormData> = FormInput<
  string | number | null,
  SelectProps,
  FormLens<FormData, number> | FormLens<FormData, number | null>,
  FormFieldType.NumberSelect
>

export type SwitchField<FormData> = FormInput<
  boolean | null,
  SwithProps,
  FormLens<FormData, boolean>,
  FormFieldType.Switch
>

export type CountrySelectField<FormData> = FormInput<
  string | number | null,
  CountrySelectProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.CountrySelect
>

// export type CountryDropdownField<FormData> = FormInput<
//   string | null,
//   CountryDropdownProps,
//   FormLens<FormData, string> | FormLens<FormData, string | null>,
//   FormFieldType.CountryDropdown
// >

// export type InputWithDropdownField<FormData> = FormInput<
//   string | null,
//   InputWithDropdownProps,
//   FormLens<FormData, string> | FormLens<FormData, string | null>,
//   FormFieldType.InputWithDropdown
// >

// export type DropdownNumberField<FormData> = FormInput<
//   number | null,
//   DropdownNumberProps,
//   FormLens<FormData, number> | FormLens<FormData, number | null>,
//   FormFieldType.DropdownNumber
// >
// export type DropdownField<FormData> = FormInput<
//   string | null,
//   DropdownProps,
//   FormLens<FormData, string> | FormLens<FormData, string | null>,
//   FormFieldType.Dropdown
// >

// export type CheckboxGroupField<FormData> = FormInput<
//   Array<string>,
//   CheckboxGroupProps,
//   FormLens<FormData, Array<string>>,
//   FormFieldType.CheckboxGroup
// >

export type TextAreaField<FormData> = FormInput<
  string | null,
  TextAreaProps,
  FormLens<FormData, string>,
  FormFieldType.TextArea
>

export type TextNumberInputField<FormData> = FormInput<
  number | null,
  TextNumberInputProps,
  FormLens<FormData, number>,
  FormFieldType.TextNumber
>

export type TextInputField<FormData> = FormInput<
  string | null,
  TextInputProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.TextInput
>

export type TextInputDescriptionField<FormData> = TextInputDescriptionProps & {
  type: FormFieldType.TextInputDescription
  isVisible?: (formData: FormData) => boolean
}

export type YesNoOptionGroupField<FormData> = FormInput<
  boolean | null,
  YesNoOptionGroupProps,
  FormLens<FormData, boolean> | FormLens<FormData, boolean | null>,
  FormFieldType.YesNoOptionGroup
>

export type YesNoRadioGroupField<FormData> = FormInput<
  boolean | null,
  YesNoRadioGroupProps,
  FormLens<FormData, boolean> | FormLens<FormData, boolean | null>,
  FormFieldType.YesNoRadioGroup
>

export type DatePickerField<FormData> = FormInput<
  Date | null,
  DatePickerProps,
  FormLens<FormData, Date> | FormLens<FormData, Date | null>,
  FormFieldType.DatePicker
>

export type FormattedDatePickerField<FormData> = FormInput<
  string | null,
  FormattedDatePickerProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.FormattedDatePicker
>

export type NumberInputField<FormData> = FormInput<
  number | null,
  NumberInputProps,
  FormLens<FormData, number> | FormLens<FormData, number | null>,
  FormFieldType.NumberInput
>

export type SingleCheckboxField<FormData> = FormInput<
  boolean,
  SingleCheckboxProps,
  FormLens<FormData, boolean>,
  FormFieldType.SingleCheckbox
>

type CommonFieldProps<FormData> = {
  isVisible?: (formData: FormData) => boolean
  isDisabled?: boolean
  validate?: (value: any) => null | string
  maxwidth?: number
  itemStyle?: CSSProperties
  required?: boolean | ((formData: FormData) => boolean)
}

// @ts-ignore
export const fieldMap = {
  // [FormFieldType.CheckboxGroup]: null as CheckboxGroupField<unknown>,
  // [FormFieldType.InputWithDropdown]: null as InputWithDropdownField<unknown>,
  // [FormFieldType.CountryDropdown]: null as CountryDropdownField<unknown>,
  // [FormFieldType.Dropdown]: null as DropdownField<unknown>,
  // [FormFieldType.DropdownNumber]: null as DropdownField<unknown>,

  [FormFieldType.CodeInput]: null as CodeInputField<unknown>,
  [FormFieldType.CountrySelect]: null as CountrySelectField<unknown>,
  [FormFieldType.CurrencyInput]: null as CurrencyInputField<unknown>,
  [FormFieldType.DatePicker]: null as DatePickerField<unknown>,
  [FormFieldType.FormattedDatePicker]: null as FormattedDatePickerField<unknown>,
  [FormFieldType.FormFieldGroup]: null,
  [FormFieldType.FormFieldRepeatGroup]: null,
  [FormFieldType.FormFieldRepeatSection]: null,
  [FormFieldType.FormSection]: null,
  [FormFieldType.FormText]: null,
  [FormFieldType.Static]: null,
  [FormFieldType.MultiSelect]: null as MultiSelectField<unknown>,
  [FormFieldType.MultiInput]: null as MultiInputField<unknown>,
  [FormFieldType.NumberInput]: null as NumberInputField<unknown>,
  [FormFieldType.NumberSelect]: null as NumberSelectField<unknown>,
  [FormFieldType.OptionGroup]: null as OptionGroupField<unknown>,
  [FormFieldType.RadioGroup]: null as RadioGroupField<unknown>,
  [FormFieldType.SingleCheckbox]: null as SingleCheckboxField<unknown>,
  [FormFieldType.Slider]: null as SliderField<unknown>,
  [FormFieldType.Switch]: null as SwitchField<unknown>,
  [FormFieldType.TextArea]: null as TextAreaField<unknown>,
  [FormFieldType.TextInput]: null as TextInputField<unknown>,
  [FormFieldType.TextInputDescription]: null as TextInputDescriptionField<unknown>,
  [FormFieldType.TextNumber]: null as TextNumberInputField<unknown>,
  [FormFieldType.TextSelect]: null as TextSelectField<unknown>,
  [FormFieldType.Toggle]: null as ToggleField<unknown>,
  [FormFieldType.YesNoOptionGroup]: null as YesNoOptionGroupField<unknown>,
  [FormFieldType.YesNoRadioGroup]: null as YesNoRadioGroupField<unknown>,
} as const

export type SingleFormField<FormData> = (
  | // | CheckboxGroupField<FormData>
  // | CountryDropdownField<FormData>
  // | DropdownField<FormData>
  // | DropdownNumberField<FormData>
  // | InputWithDropdownField<FormData>

  CodeInputField<FormData>
  | CountrySelectField<FormData>
  | CurrencyInputField<FormData>
  | DatePickerField<FormData>
  | FormattedDatePickerField<FormData>
  | MultiSelectField<FormData>
  | NumberInputField<FormData>
  | NumberSelectField<FormData>
  | OptionGroupField<FormData>
  | RadioGroupField<FormData>
  | SingleCheckboxField<FormData>
  | SliderField<FormData>
  | SwitchField<FormData>
  | TextAreaField<FormData>
  | TextInputField<FormData>
  | TextNumberInputField<FormData>
  | TextSelectField<FormData>
  | ToggleField<FormData>
  | YesNoOptionGroupField<FormData>
  | YesNoRadioGroupField<FormData>
) &
  CommonFieldProps<FormData>

export type MultiInputField<FormData> = {
  label?: LabelProps
  type: FormFieldType.MultiInput
  fields: Array<SingleFormField<FormData>>
  itemStyle?: CSSProperties
  isVisible?: (formData: FormData) => boolean
}

export type FormFieldRow<FormData> = Array<SingleFormField<FormData>>

// export type Fields<FormData> = Array<
//   SingleFormField<FormData> | FormFieldRow<FormData>
// >

export type SingleFieldOrRow<FormData> =
  | SingleFormField<FormData>
  | MultiInputField<FormData>
  | FormFieldRow<FormData>

export type GroupField<FormData> =
  | MultiInputField<FormData>
  | SingleFormField<FormData>
  | FormFieldRow<FormData>

export type FormFieldGroup<FormData> = {
  title?: string
  description?: string
  style?: Partial<FormTheme['group']>
  type: FormFieldType.FormFieldGroup
  fields: Array<GroupField<FormData>>
  isVisible?: (formData: FormData) => boolean
}

export type FormFieldRepeatGroup<FormData, T extends {} = {}> = {
  lens: FormLens<FormData, Array<T>>
  title?: (params: { index: number; translate: any }) => string
  type: FormFieldType.FormFieldRepeatGroup
  fields: Array<SingleFieldOrRow<FormData>>
  length: FormLens<FormData, number> | FormLens<FormData, number | null>
  isVisible?: (formData: FormData) => boolean
}

export type SectionField<FormData> =
  | MultiInputField<FormData>
  | SingleFormField<FormData>
  | TextInputDescriptionField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormFieldRepeatGroup<FormData>
  | FormFieldRepeatSection<FormData>

export type SectionFields<FormData> = Array<SectionField<FormData>>

export type FormFieldRepeatSection<FormData, T extends {} = {}> = {
  fields: Array<SingleFieldOrRow<FormData>>
  isVisible?: (formData: FormData) => boolean
  length: FormLens<FormData, number> | FormLens<FormData, number | null>
  lens: FormLens<FormData, Array<T>>
  onEdit?: (params: { dispatch: any }) => void
  title?: (params: { index: number; translate: any }) => string
  type: FormFieldType.FormFieldRepeatSection
}

export type FormSection<FormData> = {
  description?: string
  fieldComponent?: ReactNode
  fields: SectionFields<FormData>
  introduction?: string
  introductionReadOnly?: string
  isVisible?: (formData: FormData) => boolean
  onEdit?: (params: { dispatch: any }) => void
  style?: Partial<FormTheme['section']>
  title?: string
  type: FormFieldType.FormSection
}

export type FormField<FormData> =
  | SingleFormField<FormData>
  | TextInputDescriptionField<FormData>
  | MultiInputField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormSection<FormData>
  | FormFieldRepeatGroup<FormData>
  | FormFieldRepeatSection<FormData>

export type CommonThreadProps<FormData> = {
  data: FormData
  errorFieldId?: string
  fieldIndex: number
  formReadOnly: boolean
  onChange: (lens: FormLens<FormData, any>, value: any) => void
  showValidation: boolean
  style: Partial<FormTheme> | undefined
}

export type FieldError = {
  error: string | null
  fieldId: string
}