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
  FormText = 'FormText',
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
