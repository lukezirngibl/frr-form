import { Lens } from 'monocle-ts'
import React, { ReactNode, useEffect } from 'react'
import styled, { CSSProperties } from 'styled-components'
import {
  CheckboxGroup,
  CheckboxGroupProps,
} from 'frr-web/lib/components/CheckboxGroup'
import {
  NumberInput,
  Props as NumberInputProps,
} from 'frr-web/lib/components/NumberInput'
import {
  Dropdown,
  Props as DropdownProps,
} from 'frr-web/lib/components/Dropdown'
import {
  SingleCheckbox,
  Props as SingleCheckboxProps,
} from 'frr-web/lib/components/SingleCheckbox'
import {
  YesNoToggle,
  Props as YesNoToggleProps,
} from 'frr-web/lib/components/YesNoToggle'
import {
  TextInput,
  Props as TextInputProps,
} from 'frr-web/lib/components/TextInput'
import { DisplayType, FormFieldType } from './types'
import { TextArea, TextAreaProps } from 'frr-web/lib/components/TextArea'
import {
  TextNumberInput,
  Props as TextNumberInputProps,
} from 'frr-web/lib/components/TextNumberInput'
import {
  DatePicker,
  Props as DatePickerProps,
} from 'frr-web/lib/components/DatePicker'
import { someFormFields } from './some.form'
import { filterByVisibility } from './visible.form'
import { TranslationGeneric } from 'frr-web/lib/util'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import { getThemeContext, FormTheme as Theme, FormTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { Button, Props as ButtonProps } from 'frr-web/lib/components/Button'
import {
  Props as DropdownNumberProps,
  DropdownNumber,
} from 'frr-web/lib/components/DropdownNumber'
import {
  Props as InputWithDropdownProps,
  InputWithDropdown,
} from 'frr-web/lib/components/InputWithDropdown'
import {
  Props as CountryDropdownProps,
  CountryDropdown,
} from 'frr-web/lib/components/CountryDropdown'
import { Switch, Props as SwithProps } from 'frr-web/lib/components/Switch'
import {
  CurrencyInput,
  Props as CurrencyInputProps,
} from 'frr-web/lib/components/CurrencyInput'
import {
  MultiSelect,
  Props as MultiSelectProps,
} from 'frr-web/lib/components/MultiSelect'
import { Select, Props as SelectProps } from 'frr-web/lib/components/Select'
import {
  CodeInput,
  Props as CodeInputProps,
} from 'frr-web/lib/components/CodeInput'
import {
  RadioGroup,
  Props as RadioGroupProps,
} from 'frr-web/lib/components/RadioGroup'
import { Toggle, Props as ToggleProps } from 'frr-web/lib/components/Toggle'
import {
  OptionGroup,
  Props as OptionGroupProps,
} from 'frr-web/lib/components/OptionGroup'
import { useDispatch } from 'react-redux'

type FormInput<P extends {}, L, T> = Omit<
  P,
  'onChange' | 'value' | 'error' | 'required'
> & {
  lens: L
  type: T
}

export type OptionGroupField<FormData, TM> = FormInput<
  OptionGroupProps<TM>,
  Lens<FormData, string>,
  FormFieldType.OptionGroup
>

export type ToggleField<FormData, TM> = FormInput<
  ToggleProps<TM>,
  Lens<FormData, boolean>,
  FormFieldType.Toggle
>

export type RadioGroupField<FormData, TM> = FormInput<
  RadioGroupProps<TM>,
  Lens<FormData, string>,
  FormFieldType.RadioGroup
>

export type CodeInputField<FormData, TM> = FormInput<
  CodeInputProps<TM>,
  Lens<FormData, string>,
  FormFieldType.CodeInput
>

export type CurrencyInputField<FormData, TM> = FormInput<
  CurrencyInputProps<TM>,
  Lens<FormData, number>,
  FormFieldType.CurrencyInput
>

export type MultiSelectField<FormData, TM> = FormInput<
  MultiSelectProps<TM>,
  Lens<FormData, Array<string>>,
  FormFieldType.MultiSelect
>

export type TextSelectField<FormData, TM> = FormInput<
  SelectProps<TM>,
  Lens<FormData, string> | Lens<FormData, string | null>,
  FormFieldType.TextSelect
>

export type NumberSelectField<FormData, TM> = FormInput<
  SelectProps<TM>,
  Lens<FormData, number | null> | Lens<FormData, number>,
  FormFieldType.NumberSelect
>

export type SwitchField<FormData, TM> = FormInput<
  SwithProps<TM>,
  Lens<FormData, boolean>,
  FormFieldType.Switch
>

export type CountryDropdownField<FormData, TM> = FormInput<
  CountryDropdownProps<TM>,
  Lens<FormData, string>,
  FormFieldType.CountryDropdown
>

export type InputWithDropdownField<FormData, TM> = FormInput<
  InputWithDropdownProps<TM>,
  Lens<FormData, string>,
  FormFieldType.InputWithDropdown
>

export type DropdownNumberField<FormData, TM> = FormInput<
  DropdownNumberProps<TM>,
  Lens<FormData, number>,
  FormFieldType.DropdownNumber
>

export type TextAreaField<FormData, TM> = FormInput<
  TextAreaProps<TM>,
  Lens<FormData, string>,
  FormFieldType.TextArea
>

export type TextNumberInputField<FormData, TM> = FormInput<
  TextNumberInputProps<TM>,
  Lens<FormData, number>,
  FormFieldType.TextNumber
>

export type TextInputField<FormData, TM> = FormInput<
  TextInputProps<TM>,
  Lens<FormData, string>,
  FormFieldType.TextInput
>

export type YesNoToggleField<FormData, TM> = FormInput<
  YesNoToggleProps<TM>,
  Lens<FormData, boolean>,
  FormFieldType.YesNoToggle
>

export type DatePickerField<FormData, TM> = FormInput<
  DatePickerProps<TM>,
  Lens<FormData, Date>,
  FormFieldType.DatePicker
>

export type DropdownField<FormData, TM> = FormInput<
  DropdownProps<TM>,
  Lens<FormData, string>,
  FormFieldType.Dropdown
>

export type CheckboxGroupField<FormData, TM> = FormInput<
  CheckboxGroupProps<TM>,
  Lens<FormData, Array<string>>,
  FormFieldType.CheckboxGroup
>

export type NumberInputField<FormData, TM> = FormInput<
  NumberInputProps<TM>,
  Lens<FormData, number>,
  FormFieldType.NumberInput
>

export type SingleCheckboxField<FormData, TM> = FormInput<
  SingleCheckboxProps<TM>,
  Lens<FormData, boolean>,
  FormFieldType.SingleCheckbox
>

type CommonFieldProps<FormData, TM> = {
  isVisible?: (formData: FormData) => boolean
  isDisabled?: boolean
  validate?: (formData: FormData) => null | keyof TM
  maxwidth?: number
  itemStyle?: CSSProperties
  required?: boolean | ((formData: FormData) => boolean)
}

export type SingleFormField<FormData, TM> = (
  | CheckboxGroupField<FormData, TM>
  | NumberInputField<FormData, TM>
  | DropdownField<FormData, TM>
  | SingleCheckboxField<FormData, TM>
  | TextAreaField<FormData, TM>
  | TextNumberInputField<FormData, TM>
  | TextInputField<FormData, TM>
  | InputWithDropdownField<FormData, TM>
  | DropdownNumberField<FormData, TM>
  | SwitchField<FormData, TM>
  | MultiSelectField<FormData, TM>
  | CountryDropdownField<FormData, TM>
  | CurrencyInputField<FormData, TM>
  | YesNoToggleField<FormData, TM>
  | TextSelectField<FormData, TM>
  | NumberSelectField<FormData, TM>
  | CodeInputField<FormData, TM>
  | RadioGroupField<FormData, TM>
  | ToggleField<FormData, TM>
  | OptionGroupField<FormData, TM>
  | DatePickerField<FormData, TM>
) &
  CommonFieldProps<FormData, TM>

export type FormFieldRow<FormData, TM> = Array<SingleFormField<FormData, TM>>

export type Fields<FormData, TM> = Array<
  SingleFormField<FormData, TM> | FormFieldRow<FormData, TM>
>

export type SingleFieldOrRow<FormData, TM> =
  | SingleFormField<FormData, TM>
  | FormFieldRow<FormData, TM>

export type GroupFields<FormData, TM> = Array<SingleFieldOrRow<FormData, TM>>

export type FormFieldGroup<FormData, TM> = {
  title?: keyof TM
  description?: keyof TM
  style?: Partial<FormTheme['group']>
  type: FormFieldType.FormFieldGroup
  fields: GroupFields<FormData, TM>
  isVisible?: (formData: FormData) => boolean
}

export type FormFieldNumberList<FormData, TM> = {
  title?: keyof TM
  description?: keyof TM
  style?: Partial<FormTheme['group']>
  type: FormFieldType.NumberList
  field: Omit<TextNumberInputField<FormData, TM>, 'lens' | 'type'>
  lens: Lens<FormData, Array<number>>
  isVisible?: (formData: FormData) => boolean
  length: Lens<FormData, number>
}

export type FormField<FormData, TM> =
  | SingleFormField<FormData, TM>
  | FormFieldRow<FormData, TM>
  | FormFieldGroup<FormData, TM>
  | FormSection<FormData, TM>
  | FormFieldNumberList<FormData, TM>

export type SectionField<FormData, TM> =
  | SingleFormField<FormData, TM>
  | FormFieldRow<FormData, TM>
  | FormFieldGroup<FormData, TM>
  | FormFieldNumberList<FormData, TM>

export type SectionFields<FormData, TM> = Array<SectionField<FormData, TM>>

export type FormSection<FormData, TM> = {
  title?: keyof TM
  description?: keyof TM
  style?: Partial<FormTheme['section']>
  type: FormFieldType.FormSection
  fields: SectionFields<FormData, TM>
  isVisible?: (formData: FormData) => boolean
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const FormFieldRowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

export const FormFieldWrapper = styled.div<{
  width: string
  maxwidth?: number
}>`
  position: relative;
  max-width: ${props =>
    props.maxwidth !== undefined ? `${props.maxwidth}px` : 'none'};
  width: ${props => props.width};

  @media (max-width: 768px) {
    width: 100% !important;
    margin-top: 12px;
    margin-left: 0 !important;
    margin-right: 0 !important;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .ui.checkbox.error {
    label {
      color: red !important;
    }
  }
`

export const FormFieldGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  flex-shrink: 0;
`

export const FormFieldGroupTitle = styled.h4`
  margin: 32px 0 12px 0;
`

export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 8px 0;
  flex-shrink: 0;
`

export const FormSectionTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
`

export const FormFieldGroupDescription = styled.p``

export const FormSectionDescription = styled.p``

export type Props<FormData, TM> = {
  children?: ReactNode
  style?: Partial<FormTheme>
  data: FormData
  display?: DisplayType
  formFields: Array<FormField<FormData, TM>>
  onSubmit?: (params: { dispatch: any }) => void
  onInvalidSubmit?: () => void
  onChange: (formState: FormData) => void
  buttons?: Array<
    Omit<ButtonProps<TM>, 'onClick'> & {
      onClick: (params: { submit: () => void; dispatch: any }) => void
      isDisabled?: (d: FormData) => boolean
    }
  >
  renderTopChildren?: (f: FormData) => ReactNode
  renderBottomChildren?: (f: FormData) => ReactNode
  readOnly?: boolean
  isVisible?: (formData: FormData) => boolean
}

export const Form = <FormData extends {}, TM extends TranslationGeneric>(
  props: Props<FormData, TM>,
) => {
  // const formRef = React.createRef<HTMLFormElement>()

  const dispatch = useDispatch()
  const theme = React.useContext(getThemeContext())

  const getRowStyle = createGetStyle(theme, 'row')(props.style?.row || {})
  const getSectionStyle = createGetStyle(
    theme,
    'section',
  )(props.style?.section || {})
  const getGroupStyle = createGetStyle(theme, 'group')(props.style?.group || {})
  const getFormStyle = createGetStyle(theme, 'form')(props.style?.form || {})

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const [showValidation, setShowValidation] = React.useState(false)

  useEffect(() => {
    setShowValidation(false)
  }, [props.formFields])

  const computeFieldError = (
    f: SingleFormField<FormData, TM>,
  ): keyof TM | null => {
    if ('validate' in f && f.validate !== undefined) {
      return f.validate(props.data)
    }

    const isRequired =
      'required' in f
        ? typeof f.required === 'function'
          ? f.required(props.data)
          : f.required
        : false

    if (isRequired) {
      let val = f.lens.get(props.data)
      val = typeof val === 'string' ? val.trim() : val
      let isInvalid = val === '' || val === null || val === undefined

      if (f.type === FormFieldType.NumberInput) {
        if ('min' in f && val < f.min) {
          isInvalid = val < f.min
          return 'fieldErrorMin' as keyof TM
        } else if ('max' in f && val > f.max) {
          return 'fieldErrorMax' as keyof TM
        }
      }
    }

    return null
  }

  const isFieldInvalid = (f: SingleFormField<FormData, TM>): boolean =>
    computeFieldError(f) !== null

  const submit = () => {
    const visibleFormFields = filterByVisibility(props.formFields, props.data)
    const isNotValid = someFormFields(visibleFormFields, isFieldInvalid)

    if (isNotValid) {
      setShowValidation(true)
      if (props.onInvalidSubmit) {
        props.onInvalidSubmit()
      }
    } else if (typeof props.onSubmit === 'function') {
      props.onSubmit({ dispatch })
    }
  }

  const renderFormFieldInput = (
    fieldI: SingleFormField<FormData, TM>,
    key: number | string,
  ) => {
    const field = { ...fieldI, key }
    const { data, onChange, readOnly } = props

    const errorLabel = showValidation ? computeFieldError(field) : null

    const hasError = errorLabel !== null

    let { label } = field
    if (label) {
      label = { error: errorLabel !== null, errorLabel, ...label }
    }

    if (field.type === FormFieldType.TextArea) {
      const { type, lens, validate, ...fieldProps } = field
      return (
        <TextArea
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.TextInput) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <TextInput
          {...fieldProps}
          value={lens.get(data) || ''}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          readOnly={readOnly || field.readOnly}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.Toggle) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <Toggle
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.DatePicker) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <DatePicker
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.CheckboxGroup) {
      const { lens, validate, ...fieldProps } = field
      return (
        <CheckboxGroup
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.YesNoToggle) {
      const { lens, validate, ...fieldProps } = field
      return (
        <YesNoToggle
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.OptionGroup) {
      const { lens, validate, ...fieldProps } = field
      return (
        <OptionGroup
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          label={label}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.RadioGroup) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <RadioGroup
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          label={label}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.SingleCheckbox) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <SingleCheckbox
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.CodeInput) {
      const { lens, validate, ...fieldProps } = field
      return (
        <CodeInput
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.Switch) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Switch
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.NumberInput) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <NumberInput
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          readOnly={readOnly}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.TextNumber) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <TextNumberInput
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          // error={hasError}
          readOnly={readOnly || field.readOnly}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.TextSelect) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Select
          {...fieldProps}
          value={lens.get(data)}
          onChange={(value: string) => onChange(lens.set(value)(data))}
          label={label}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.NumberSelect) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Select
          {...fieldProps}
          value={lens.get(data)}
          onChange={(value: number) => onChange(lens.set(value)(data))}
          label={label}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.MultiSelect) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <MultiSelect
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.InputWithDropdown) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <InputWithDropdown
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          readOnly={readOnly || field.readOnly}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.CountryDropdown) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <CountryDropdown
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.CurrencyInput) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <CurrencyInput
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.Dropdown) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Dropdown
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          readOnly={readOnly || field.readOnly}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.DropdownNumber) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <DropdownNumber
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
          readOnly={readOnly || field.readOnly}
          label={label}
        />
      )
    }

    return <div />
  }

  const renderFormFieldItem = (width: number = 100) => (
    field: SingleFormField<FormData, TM>,
    key: number | string,
  ) => {
    return !field.isVisible || field.isVisible(props.data) ? (
      <FormFieldWrapper
        key={key}
        width={`calc(${width}% - ${width === 100 ? 0 : 4}px)`}
        maxwidth={field.maxwidth}
        className="form-field"
        style={{ ...getRowStyle('item'), ...(field.itemStyle || {}) }}
      >
        {renderFormFieldInput(field, key)}
      </FormFieldWrapper>
    ) : (
      <></>
    )
  }

  const renderFormFieldRow = (
    formFieldRow: FormFieldRow<FormData, TM>,
    key: number | string,
  ) =>
    formFieldRow.some(r => !r.isVisible || r.isVisible(props.data)) ? (
      <FormFieldRowWrapper key={key} style={getRowStyle('wrapper')}>
        {formFieldRow.map(renderFormFieldItem((1 / formFieldRow.length) * 100))}
      </FormFieldRowWrapper>
    ) : null

  const renderFormField = (
    formField: FormFieldRow<FormData, TM> | SingleFormField<FormData, TM>,
    key: string | number,
  ) => {
    if (Array.isArray(formField)) {
      return renderFormFieldRow(formField, key)
    } else {
      return (
        <FormFieldRowWrapper style={getRowStyle('wrapper')} key={key}>
          {renderFormFieldItem()(formField, key)}
        </FormFieldRowWrapper>
      )
    }
  }

  const renderNumberList = (
    formField: FormFieldNumberList<FormData, TM>,
    key: number | string,
  ) => {
    const length = formField.length.get(props.data)
    const fields: Array<FormFieldRow<FormData, TM>> = Array.from({
      length,
    }).map((_, i) => [
      {
        ...formField.field,
        type: FormFieldType.TextNumber,
        lens: formField.lens.compose(Lens.fromPath<Array<number>>()([i])),
      },
    ])
    return fields.map((f, i) => renderFormField(f, `${key}-${i}`))
  }

  const renderFormSectionItem = (
    formField: SectionField<FormData, TM>,
    key: number | string,
  ) => {
    if (
      !Array.isArray(formField) &&
      formField.type === FormFieldType.FormFieldGroup
    ) {
      return renderFormGroup(formField, key)
    } else if ('field' in formField) {
      return renderNumberList(formField, key)
    } else {
      return renderFormField(formField, key)
    }
  }

  const renderFormGroup = (
    formGroup: FormFieldGroup<FormData, TM>,
    key: number | string,
  ) =>
    !formGroup.isVisible || formGroup.isVisible(props.data) ? (
      <FormFieldGroupWrapper
        key={key}
        style={{
          ...getGroupStyle('wrapper'),
          ...(formGroup.style ? formGroup.style.wrapper || {} : {}),
        }}
      >
        {formGroup.title && (
          <FormFieldGroupTitle
            itemID={formGroup.title as string}
            style={{
              ...getGroupStyle('title'),
              ...(formGroup.style ? formGroup.style.title || {} : {}),
            }}
          >
            {translate(formGroup.title)}
          </FormFieldGroupTitle>
        )}
        {formGroup.description && (
          <FormFieldGroupDescription
            itemID={formGroup.description as string}
            style={{
              ...getGroupStyle('description'),
              ...(formGroup.style ? formGroup.style.description || {} : {}),
            }}
          >
            {translate(formGroup.description)}
          </FormFieldGroupDescription>
        )}
        {formGroup.fields.map(renderFormField)}
      </FormFieldGroupWrapper>
    ) : null

  const renderFormSection = (
    formSection: FormSection<FormData, TM>,
    key: number,
  ) =>
    !formSection.isVisible || formSection.isVisible(props.data) ? (
      <FormSectionWrapper
        key={key}
        style={{
          ...getSectionStyle('wrapper'),
          ...(formSection.style ? formSection.style.wrapper || {} : {}),
        }}
      >
        {formSection.title && (
          <FormSectionTitle
            itemID={formSection.title as string}
            style={{
              ...getSectionStyle('title'),
              ...(formSection.style ? formSection.style.title || {} : {}),
            }}
          >
            {translate(formSection.title)}
          </FormSectionTitle>
        )}
        {formSection.description && (
          <FormSectionDescription
            itemID={formSection.description as string}
            style={{
              ...getSectionStyle('description'),
              ...(formSection.style ? formSection.style.description || {} : {}),
            }}
          >
            {translate(formSection.description)}
          </FormSectionDescription>
        )}
        {formSection.fields.map(renderFormSectionItem)}
      </FormSectionWrapper>
    ) : null

  const { formFields } = props

  return !props.isVisible || props.isVisible(props.data) ? (
    <FormWrapper
      style={getFormStyle('wrapper')}
      className={props.readOnly ? 'read-only' : ''}
    >
      {props.renderTopChildren && props.renderTopChildren(props.data)}
      <FormContent style={getFormStyle('content')}>
        {formFields.map((f: FormField<FormData, TM>, key: number) => {
          if (Array.isArray(f)) {
            return renderFormFieldRow(f, key)
          } else if (f.type === FormFieldType.FormFieldGroup) {
            return renderFormGroup(f, key)
          } else if (f.type === FormFieldType.FormSection) {
            return renderFormSection(f, key)
          } else if (f.type === FormFieldType.NumberList) {
            return renderNumberList(f, key)
          } else {
            return renderFormField(f, key)
          }
        })}
      </FormContent>
      {props.renderBottomChildren && props.renderBottomChildren(props.data)}
      {props.buttons && (
        <ButtonContainer style={getFormStyle('buttonContainer')}>
          {props.buttons.map((b, k) => (
            <Button<TM>
              {...b}
              key={k}
              disabled={b.isDisabled ? b.isDisabled(props.data) : false}
              onClick={() => b.onClick({ submit, dispatch })}
            />
          ))}
        </ButtonContainer>
      )}
    </FormWrapper>
  ) : (
    <></>
  )
}
