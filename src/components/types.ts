import {
  CheckboxGroupProps
} from 'frr-web/lib/components/CheckboxGroup'
import {
  Props as CodeInputProps
} from 'frr-web/lib/components/CodeInput'
import {
  Props as CountryDropdownProps
} from 'frr-web/lib/components/CountryDropdown'
import {
  Props as CountrySelectProps
} from 'frr-web/lib/components/CountrySelect'
import {
  Props as CurrencyInputProps
} from 'frr-web/lib/components/CurrencyInput'
import {
  Props as DatePickerProps
} from 'frr-web/lib/components/DatePicker'
import {
  Props as DropdownProps
} from 'frr-web/lib/components/Dropdown'
import {
  Props as DropdownNumberProps
} from 'frr-web/lib/components/DropdownNumber'
import {
  Props as FormattedDatePickerProps
} from 'frr-web/lib/components/FormattedDatePicker'
import {
  Props as InputWithDropdownProps
} from 'frr-web/lib/components/InputWithDropdown'
import {
  Props as MultiSelectProps
} from 'frr-web/lib/components/MultiSelect'
import {
  Props as NumberInputProps
} from 'frr-web/lib/components/NumberInput'
import {
  Props as OptionGroupProps
} from 'frr-web/lib/components/OptionGroup'
import {
  Props as RadioGroupProps
} from 'frr-web/lib/components/RadioGroup'
import { Props as SelectProps } from 'frr-web/lib/components/Select'
import {
  Props as SingleCheckboxProps
} from 'frr-web/lib/components/SingleCheckbox'
import { Props as SliderProps } from 'frr-web/lib/components/Slider'
import { Props as SwithProps } from 'frr-web/lib/components/Switch'
import { TextAreaProps } from 'frr-web/lib/components/TextArea'
import {
  Props as TextInputProps
} from 'frr-web/lib/components/TextInput'
import {
  Props as TextNumberInputProps
} from 'frr-web/lib/components/TextNumberInput'
import { Props as ToggleProps } from 'frr-web/lib/components/Toggle'
import {
  Props as YesNoOptionGroupProps
} from 'frr-web/lib/components/YesNoOptionGroup'
import {
  Props as YesNoRadioGroupProps
} from 'frr-web/lib/components/YesNoRadioGroup'
import { ReactNode } from 'react'
import { CSSProperties } from 'styled-components'
import { FormTheme } from '../theme/theme'
import { FormLens } from '../util'

export enum FormFieldType {
  DatePicker = 'DatePicker',
  FormattedDatePicker = 'FormattedDatePicker',
  CheckboxGroup = 'CheckboxGroup',
  FormFieldGroup = 'FormFieldGroup',
  FormSection = 'FormSection',
  NumberInput = 'NumberInput',
  RadioGroup = 'RadioGroup',
  Dropdown = 'Dropdown',
  CurrencyInput = 'CurrencyInput',
  CountryDropdown = 'CountryDropdown',
  SingleCheckbox = 'SingleCheckbox',
  DropdownNumber = 'DropdownNumber',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  UnitInput = 'UnitInput',
  TextNumber = 'TextNumber',
  InputWithDropdown = 'InputWithDropdown',
  Switch = 'Switch',
  MultiSelect = 'MultiSelect',
  YesNoOptionGroup = 'YesNoOptionGroup',
  TextSelect = 'TextSelect',
  NumberSelect = 'NumberSelect',
  CodeInput = 'CodeInput',
  FormFieldRepeatGroup = 'FormFieldRepeatGroup',
  FormFieldRepeatSection = 'FormFieldRepeatSection',
  Toggle = 'Toggle',
  OptionGroup = 'OptionGroup',
  CountrySelect = 'CountrySelect',
  YesNoRadioGroup = 'YesNoRadioGroup',
  Slider = 'Slider',
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

type FormInput<P extends {}, L, T> = Omit<
  P,
  'onChange' | 'value' | 'error' | 'required'
> & {
  lens: L
  type: T
}

export type OptionGroupField<FormData> = FormInput<
  OptionGroupProps,
  FormLens<FormData, string>,
  FormFieldType.OptionGroup
>

export type SliderField<FormData> = FormInput<
  SliderProps,
  FormLens<FormData, number>,
  FormFieldType.Slider
>

export type ToggleField<FormData> = FormInput<
  ToggleProps,
  FormLens<FormData, boolean>,
  FormFieldType.Toggle
>

export type RadioGroupField<FormData> = FormInput<
  RadioGroupProps,
  FormLens<FormData, string>,
  FormFieldType.RadioGroup
>

export type CodeInputField<FormData> = FormInput<
  CodeInputProps,
  FormLens<FormData, string>,
  FormFieldType.CodeInput
>

export type CurrencyInputField<FormData> = FormInput<
  CurrencyInputProps,
  FormLens<FormData, number>,
  FormFieldType.CurrencyInput
>

export type MultiSelectField<FormData> = FormInput<
  MultiSelectProps,
  FormLens<FormData, Array<string>>,
  FormFieldType.MultiSelect
>

export type TextSelectField<FormData> = FormInput<
  SelectProps,
  FormLens<FormData, string> | FormLens<FormData, string | null>,
  FormFieldType.TextSelect
>

export type NumberSelectField<FormData> = FormInput<
  SelectProps,
  FormLens<FormData, number | null> | FormLens<FormData, number>,
  FormFieldType.NumberSelect
>

export type SwitchField<FormData> = FormInput<
  SwithProps,
  FormLens<FormData, boolean>,
  FormFieldType.Switch
>

export type CountryDropdownField<FormData> = FormInput<
  CountryDropdownProps,
  FormLens<FormData, string>,
  FormFieldType.CountryDropdown
>

export type CountrySelectField<FormData> = FormInput<
  CountrySelectProps,
  FormLens<FormData, string>,
  FormFieldType.CountrySelect
>

export type InputWithDropdownField<FormData> = FormInput<
  InputWithDropdownProps,
  FormLens<FormData, string>,
  FormFieldType.InputWithDropdown
>

export type DropdownNumberField<FormData> = FormInput<
  DropdownNumberProps,
  FormLens<FormData, number>,
  FormFieldType.DropdownNumber
>

export type TextAreaField<FormData> = FormInput<
  TextAreaProps,
  FormLens<FormData, string>,
  FormFieldType.TextArea
>

export type TextNumberInputField<FormData> = FormInput<
  TextNumberInputProps,
  FormLens<FormData, number>,
  FormFieldType.TextNumber
>

export type TextInputField<FormData> = FormInput<
  TextInputProps,
  FormLens<FormData, string>,
  FormFieldType.TextInput
>

export type YesNoOptionGroupField<FormData> = FormInput<
  YesNoOptionGroupProps,
  FormLens<FormData, boolean>,
  FormFieldType.YesNoOptionGroup
>

export type YesNoRadioGroupField<FormData> = FormInput<
  YesNoRadioGroupProps,
  FormLens<FormData, boolean>,
  FormFieldType.YesNoRadioGroup
>

export type DatePickerField<FormData> = FormInput<
  DatePickerProps,
  FormLens<FormData, Date>,
  FormFieldType.DatePicker
>

export type FormattedDatePickerField<FormData> = FormInput<
  FormattedDatePickerProps,
  FormLens<FormData, string>,
  FormFieldType.FormattedDatePicker
>

export type DropdownField<FormData> = FormInput<
  DropdownProps,
  FormLens<FormData, string>,
  FormFieldType.Dropdown
>

export type CheckboxGroupField<FormData> = FormInput<
  CheckboxGroupProps,
  FormLens<FormData, Array<string>>,
  FormFieldType.CheckboxGroup
>

export type NumberInputField<FormData> = FormInput<
  NumberInputProps,
  FormLens<FormData, number>,
  FormFieldType.NumberInput
>

export type SingleCheckboxField<FormData> = FormInput<
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

export type SingleFormField<FormData> = (
  | CheckboxGroupField<FormData>
  | NumberInputField<FormData>
  | DropdownField<FormData>
  | SingleCheckboxField<FormData>
  | TextAreaField<FormData>
  | TextNumberInputField<FormData>
  | TextInputField<FormData>
  | InputWithDropdownField<FormData>
  | DropdownNumberField<FormData>
  | SwitchField<FormData>
  | MultiSelectField<FormData>
  | CountryDropdownField<FormData>
  | CurrencyInputField<FormData>
  | YesNoOptionGroupField<FormData>
  | TextSelectField<FormData>
  | NumberSelectField<FormData>
  | CodeInputField<FormData>
  | RadioGroupField<FormData>
  | ToggleField<FormData>
  | OptionGroupField<FormData>
  | DatePickerField<FormData>
  | CountrySelectField<FormData>
  | YesNoRadioGroupField<FormData>
  | SliderField<FormData>
  | FormattedDatePickerField<FormData>
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

// export type FormFieldNumberList<FormData> = {
//   title?: string
//   description?: string
//   style?: Partial<FormTheme['group']>
//   type: FormFieldType.NumberList
//   field: Omit<TextNumberInputField<FormData>, 'lens' | 'type'>
//   lens: FormLens<FormData, Array<number>>
//   isVisible?: (formData: FormData) => boolean
//   length: FormLens<FormData, number>
// }

export type FormFieldRepeatGroup<FormData, T extends {} = {}> = {
  lens: FormLens<FormData, Array<T>>
  title?: (params: { index: number; translate: any }) => string
  type: FormFieldType.FormFieldRepeatGroup
  fields: GroupFields<T>
  length: FormLens<FormData, number>
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
  length: FormLens<FormData, number>
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
  onEdit?: () => void
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