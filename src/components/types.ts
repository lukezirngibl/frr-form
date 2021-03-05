import { CheckboxGroupProps } from 'frr-web/lib/components/CheckboxGroup'
import { Props as CodeInputProps } from 'frr-web/lib/components/CodeInput'
import { Props as CountryDropdownProps } from 'frr-web/lib/components/CountryDropdown'
import { Props as CountrySelectProps } from 'frr-web/lib/components/CountrySelect'
import { Props as CurrencyInputProps } from 'frr-web/lib/components/CurrencyInput'
import { Props as DatePickerProps } from 'frr-web/lib/components/DatePicker'
import { Props as DropdownProps } from 'frr-web/lib/components/Dropdown'
import { Props as DropdownNumberProps } from 'frr-web/lib/components/DropdownNumber'
import { Props as FormattedDatePickerProps } from 'frr-web/lib/components/FormattedDatePicker'
import { Props as InputWithDropdownProps } from 'frr-web/lib/components/InputWithDropdown'
import { Props as MultiSelectProps } from 'frr-web/lib/components/MultiSelect'
import { Props as NumberInputProps } from 'frr-web/lib/components/NumberInput'
import { Props as OptionGroupProps } from 'frr-web/lib/components/OptionGroup'
import { Props as RadioGroupProps } from 'frr-web/lib/components/RadioGroup'
import { Props as SelectProps } from 'frr-web/lib/components/Select'
import { Props as SingleCheckboxProps } from 'frr-web/lib/components/SingleCheckbox'
import { Props as SliderProps } from 'frr-web/lib/components/Slider'
import { Props as SwithProps } from 'frr-web/lib/components/Switch'
import { TextAreaProps } from 'frr-web/lib/components/TextArea'
import { Props as TextInputProps } from 'frr-web/lib/components/TextInput'
import { Props as TextNumberInputProps } from 'frr-web/lib/components/TextNumberInput'
import { Text, Props as TextProps } from 'frr-web/lib/components/Text'
import { Props as ToggleProps } from 'frr-web/lib/components/Toggle'
import { Props as YesNoOptionGroupProps } from 'frr-web/lib/components/YesNoOptionGroup'
import { Props as YesNoRadioGroupProps } from 'frr-web/lib/components/YesNoRadioGroup'
import { ReactNode } from 'react'
import { CSSProperties } from 'styled-components'
import { FormTheme } from '../theme/theme'
import { FormLens } from '../util'

export enum FormFieldType {
  DatePicker = 'DatePicker',
  FormattedDatePicker = 'FormattedDatePicker',
  CheckboxGroup = 'CheckboxGroup',

  NumberInput = 'NumberInput',
  RadioGroup = 'RadioGroup',
  Dropdown = 'Dropdown',
  CurrencyInput = 'CurrencyInput',
  CountryDropdown = 'CountryDropdown',
  SingleCheckbox = 'SingleCheckbox',
  DropdownNumber = 'DropdownNumber',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  TextNumber = 'TextNumber',
  InputWithDropdown = 'InputWithDropdown',
  Switch = 'Switch',
  MultiSelect = 'MultiSelect',
  YesNoOptionGroup = 'YesNoOptionGroup',
  TextSelect = 'TextSelect',
  NumberSelect = 'NumberSelect',
  CodeInput = 'CodeInput',
  Toggle = 'Toggle',
  OptionGroup = 'OptionGroup',
  CountrySelect = 'CountrySelect',
  YesNoRadioGroup = 'YesNoRadioGroup',
  Slider = 'Slider',
  FormText = 'FormText',
  FormFieldGroup = 'FormFieldGroup',
  FormSection = 'FormSection',
  FormFieldRepeatGroup = 'FormFieldRepeatGroup',
  FormFieldRepeatSection = 'FormFieldRepeatSection',
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
  'onChange' | 'value' | 'error' | 'required'
> & {
  lens: L
  type: T
  readOnlyMapper?: (
    params: Omit<P, 'onChange'> & { translate: (str: string) => string },
  ) => string
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

export type CountryDropdownField<FormData> = FormInput<
  string | null,
  CountryDropdownProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.CountryDropdown
>

export type CountrySelectField<FormData> = FormInput<
  string | number | null,
  CountrySelectProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.CountrySelect
>

export type InputWithDropdownField<FormData> = FormInput<
  string | null,
  InputWithDropdownProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.InputWithDropdown
>

export type DropdownNumberField<FormData> = FormInput<
  number | null,
  DropdownNumberProps,
  FormLens<FormData, number> | FormLens<FormData, number | null>,
  FormFieldType.DropdownNumber
>

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

export type DropdownField<FormData> = FormInput<
  string | null,
  DropdownProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.Dropdown
>

export type CheckboxGroupField<FormData> = FormInput<
  Array<string>,
  CheckboxGroupProps,
  FormLens<FormData, Array<string>>,
  FormFieldType.CheckboxGroup
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
  validate?: (formData: FormData) => null | string
  maxwidth?: number
  itemStyle?: CSSProperties
  required?: boolean | ((formData: FormData) => boolean)
}

export const fieldMap = {
  [FormFieldType.NumberInput]: null as NumberInputField<unknown>,
  [FormFieldType.TextInput]: null as TextInputField<unknown>,
  [FormFieldType.DatePicker]: null as DatePickerField<unknown>,
  [FormFieldType.MultiSelect]: null as MultiSelectField<unknown>,
  [FormFieldType.CheckboxGroup]: null as CheckboxGroupField<unknown>,
  [FormFieldType.CodeInput]: null as CodeInputField<unknown>,
  [FormFieldType.CountryDropdown]: null as CountryDropdownField<unknown>,
  [FormFieldType.CountrySelect]: null as CountrySelectField<unknown>,
  [FormFieldType.CurrencyInput]: null as CurrencyInputField<unknown>,
  [FormFieldType.Dropdown]: null as DropdownField<unknown>,
  [FormFieldType.DropdownNumber]: null as DropdownField<unknown>,
  [FormFieldType.FormattedDatePicker]: null as FormattedDatePickerField<
    unknown
  >,
  [FormFieldType.InputWithDropdown]: null as InputWithDropdownField<unknown>,
  [FormFieldType.NumberSelect]: null as NumberSelectField<unknown>,
  [FormFieldType.OptionGroup]: null as OptionGroupField<unknown>,
  [FormFieldType.RadioGroup]: null as RadioGroupField<unknown>,
  [FormFieldType.SingleCheckbox]: null as SingleCheckboxField<unknown>,
  [FormFieldType.Slider]: null as SliderField<unknown>,
  [FormFieldType.Switch]: null as SwitchField<unknown>,
  [FormFieldType.TextArea]: null as TextAreaField<unknown>,
  [FormFieldType.TextNumber]: null as TextNumberInputField<unknown>,
  [FormFieldType.TextSelect]: null as TextSelectField<unknown>,
  [FormFieldType.Toggle]: null as ToggleField<unknown>,
  [FormFieldType.YesNoOptionGroup]: null as YesNoOptionGroupField<unknown>,
  [FormFieldType.YesNoRadioGroup]: null as YesNoRadioGroupField<unknown>,
  [FormFieldType.FormFieldGroup]: null,
  [FormFieldType.FormFieldRepeatGroup]: null,
  [FormFieldType.FormFieldRepeatSection]: null,
  [FormFieldType.FormSection]: null,
  [FormFieldType.FormText]: null,
} as const

export type SingleFormField<FormData> = (
  | CheckboxGroupField<FormData>
  | CodeInputField<FormData>
  | CountryDropdownField<FormData>
  | CountrySelectField<FormData>
  | CurrencyInputField<FormData>
  | DatePickerField<FormData>
  | DropdownField<FormData>
  | DropdownNumberField<FormData>
  | FormattedDatePickerField<FormData>
  | InputWithDropdownField<FormData>
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

export type FormFieldRow<FormData> = Array<SingleFormField<FormData>>

export type Fields<FormData> = Array<
  SingleFormField<FormData> | FormFieldRow<FormData>
>

export type SingleFieldOrRow<FormData> =
  | SingleFormField<FormData>
  | FormFieldRow<FormData>

export type GroupFields<FormData> = Array<SingleFieldOrRow<FormData>>

export type FormFieldGroup<FormData> = {
  title?: string
  description?: string
  style?: Partial<FormTheme['group']>
  type: FormFieldType.FormFieldGroup
  fields: GroupFields<FormData>
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

export type FormField<FormData> =
  | SingleFormField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormSection<FormData>
  | FormFieldRepeatGroup<FormData>
  | FormFieldRepeatSection<FormData>

export type SectionField<FormData> =
  | SingleFormField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormFieldRepeatGroup<FormData>
  | FormFieldRepeatSection<FormData>

export type SectionFields<FormData> = Array<SectionField<FormData>>

export type FormFieldRepeatSection<FormData, T extends {} = {}> = {
  lens: FormLens<FormData, Array<T>>
  title?: (params: { index: number; translate: any }) => string
  type: FormFieldType.FormFieldRepeatSection
  fields: Array<SingleFieldOrRow<FormData>>
  length: FormLens<FormData, number> | FormLens<FormData, number | null>
  isVisible?: (formData: FormData) => boolean
}

export type FormSection<FormData> = {
  title?: string
  description?: string
  style?: Partial<FormTheme['section']>
  type: FormFieldType.FormSection
  fields: SectionFields<FormData>
  isVisible?: (formData: FormData) => boolean
  fieldComponent?: ReactNode
  onEdit?: (params: { dispatch: any }) => void
}

export type FieldType<FormData> = {
  data: FormData
  field: FormField<FormData>
  fieldIndex: number
  formReadOnly: boolean
  onChange: (formState: FormData) => void
  showValidation: boolean
  style: Partial<FormTheme> | undefined
}
