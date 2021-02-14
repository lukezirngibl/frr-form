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
import {
  Props as CountrySelectProps,
  CountrySelect,
} from 'frr-web/lib/components/CountrySelect'
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
import { P } from 'frr-web/lib/html'
import { Optional } from 'monocle-ts'
import { none, some } from 'fp-ts/lib/Option'
import { range } from 'fp-ts/lib/Array'

type FormInput<P extends {}, L, T> = Omit<
  P,
  'onChange' | 'value' | 'error' | 'required'
> & {
  lens: L
  type: T
}

export type OptionGroupField<FormData> = FormInput<
  OptionGroupProps,
  Lens<FormData, string>,
  FormFieldType.OptionGroup
>

export type ToggleField<FormData> = FormInput<
  ToggleProps,
  Lens<FormData, boolean>,
  FormFieldType.Toggle
>

export type RadioGroupField<FormData> = FormInput<
  RadioGroupProps,
  Lens<FormData, string>,
  FormFieldType.RadioGroup
>

export type CodeInputField<FormData> = FormInput<
  CodeInputProps,
  Lens<FormData, string>,
  FormFieldType.CodeInput
>

export type CurrencyInputField<FormData> = FormInput<
  CurrencyInputProps,
  Lens<FormData, number>,
  FormFieldType.CurrencyInput
>

export type MultiSelectField<FormData> = FormInput<
  MultiSelectProps,
  Lens<FormData, Array<string>>,
  FormFieldType.MultiSelect
>

export type TextSelectField<FormData> = FormInput<
  SelectProps,
  Lens<FormData, string> | Lens<FormData, string | null>,
  FormFieldType.TextSelect
>

export type NumberSelectField<FormData> = FormInput<
  SelectProps,
  Lens<FormData, number | null> | Lens<FormData, number>,
  FormFieldType.NumberSelect
>

export type SwitchField<FormData> = FormInput<
  SwithProps,
  Lens<FormData, boolean>,
  FormFieldType.Switch
>

export type CountryDropdownField<FormData> = FormInput<
  CountryDropdownProps,
  Lens<FormData, string>,
  FormFieldType.CountryDropdown
>

export type CountrySelectField<FormData> = FormInput<
  CountryDropdownProps,
  Lens<FormData, string>,
  FormFieldType.CountrySelect
>

export type InputWithDropdownField<FormData> = FormInput<
  InputWithDropdownProps,
  Lens<FormData, string>,
  FormFieldType.InputWithDropdown
>

export type DropdownNumberField<FormData> = FormInput<
  DropdownNumberProps,
  Lens<FormData, number>,
  FormFieldType.DropdownNumber
>

export type TextAreaField<FormData> = FormInput<
  TextAreaProps,
  Lens<FormData, string>,
  FormFieldType.TextArea
>

export type TextNumberInputField<FormData> = FormInput<
  TextNumberInputProps,
  Lens<FormData, number>,
  FormFieldType.TextNumber
>

export type TextInputField<FormData> = FormInput<
  TextInputProps,
  Lens<FormData, string>,
  FormFieldType.TextInput
>

export type YesNoToggleField<FormData> = FormInput<
  YesNoToggleProps,
  Lens<FormData, boolean>,
  FormFieldType.YesNoToggle
>

export type DatePickerField<FormData> = FormInput<
  DatePickerProps,
  Lens<FormData, Date>,
  FormFieldType.DatePicker
>

export type DropdownField<FormData> = FormInput<
  DropdownProps,
  Lens<FormData, string>,
  FormFieldType.Dropdown
>

export type CheckboxGroupField<FormData> = FormInput<
  CheckboxGroupProps,
  Lens<FormData, Array<string>>,
  FormFieldType.CheckboxGroup
>

export type NumberInputField<FormData> = FormInput<
  NumberInputProps,
  Lens<FormData, number>,
  FormFieldType.NumberInput
>

export type SingleCheckboxField<FormData> = FormInput<
  SingleCheckboxProps,
  Lens<FormData, boolean>,
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
  | YesNoToggleField<FormData>
  | TextSelectField<FormData>
  | NumberSelectField<FormData>
  | CodeInputField<FormData>
  | RadioGroupField<FormData>
  | ToggleField<FormData>
  | OptionGroupField<FormData>
  | DatePickerField<FormData>
  | CountrySelectField<FormData>
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
//   lens: Lens<FormData, Array<number>>
//   isVisible?: (formData: FormData) => boolean
//   length: Lens<FormData, number>
// }

export type FormFieldRepeatGroup<FormData, T extends {} = {}> = {
  lens: Lens<FormData, Array<T>>
  type: FormFieldType.FormFieldRepeatGroup
  fields: GroupFields<T>
  length: Lens<FormData, number>
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
  lens: Lens<FormData, Array<T>>
  type: FormFieldType.FormFieldRepeatSection
  fields: Array<SingleFieldOrRow<FormData>>
  length: Lens<FormData, number>
}

export type FormSection<FormData> = {
  title?: string
  description?: string
  style?: Partial<FormTheme['section']>
  type: FormFieldType.FormSection
  fields: SectionFields<FormData>
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
`

export const FormFieldGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  flex-shrink: 0;
`

export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 8px 0;
  flex-shrink: 0;
`

export type Props<FormData> = {
  children?: ReactNode
  style?: Partial<FormTheme>
  data: FormData
  display?: DisplayType
  formFields: Array<FormField<FormData>>
  onSubmit?: (params: { dispatch: any }) => void
  onInvalidSubmit?: () => void
  onChange: (formState: FormData) => void
  buttons?: Array<
    Omit<ButtonProps, 'onClick'> & {
      onClick: (params: { submit: () => void; dispatch: any }) => void
      isDisabled?: (d: FormData) => boolean
    }
  >
  renderTopChildren?: (f: FormData) => ReactNode
  renderBottomChildren?: (f: FormData) => ReactNode
  readOnly?: boolean
  isVisible?: (formData: FormData) => boolean
}

export const Form = <FormData extends {}>(props: Props<FormData>) => {
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

  const computeFieldError = (f: SingleFormField<FormData>): string | null => {
    const isRequired =
      'required' in f
        ? typeof f.required === 'function'
          ? f.required(props.data)
          : f.required
        : false

    let val = f.lens.get(props.data)
    val = typeof val === 'string' ? val.trim() : val

    if (isRequired) {
      if (val === '' || val === null || val === undefined) {
        return 'fieldRequired' as string
      }
    }

    if ('validate' in f && f.validate !== undefined) {
      const l = f.validate(props.data)
      if (l !== null) {
        return l
      }
    }

    if (f.type === FormFieldType.NumberInput) {
      if ('min' in f && val < f.min) {
        return 'fieldErrorMin' as string
      } else if ('max' in f && val > f.max) {
        return 'fieldErrorMax' as string
      }
    }

    return null
  }

  const isFieldInvalid = (f: SingleFormField<FormData>): boolean =>
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
    fieldI: SingleFormField<FormData>,
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

    if (field.type === FormFieldType.CountrySelect) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <CountrySelect
          {...fieldProps}
          value={lens.get(data)}
          onChange={(value: string) => onChange(lens.set(value)(data))}
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
    field: SingleFormField<FormData>,
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
    formFieldRow: FormFieldRow<FormData>,
    key: number | string,
  ) =>
    formFieldRow.some(r => !r.isVisible || r.isVisible(props.data)) ? (
      <FormFieldRowWrapper key={key} style={getRowStyle('wrapper')}>
        {formFieldRow.map(renderFormFieldItem((1 / formFieldRow.length) * 100))}
      </FormFieldRowWrapper>
    ) : null

  const renderFormField = (
    formField: FormFieldRow<FormData> | SingleFormField<FormData>,
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

  // -------- TOTAL HACK ---------
  // -----------------------------
  const createItemLens = (arrayLens: Lens<any, any>, index: number) =>
    arrayLens
      .compose(Lens.fromPath<any>()([index]))
      .asOptional()
      .compose(
        new Optional<any, any>(
          s => (s === undefined ? none : some(s)),
          s => a => s,
        ),
      )

  const updateArrayAtIndex = <T extends {}>(
    array: Array<T>,
    index: number,
    item: T,
  ): Array<T> => {
    let filled = array
    if (index > array.length - 1) {
      filled = [
        ...array,
        ...range(array.length, index).map(i => ({})),
      ] as Array<T>
    }
    return [...filled.slice(0, index), item, ...filled.slice(index + 1)]
  }

  const createLens = (
    arrayLens: Lens<any, any>,
    index: number,
    lens: Lens<any, any>,
  ): any => {
    const itemLens = createItemLens(arrayLens, index)
    return {
      get: (data: any) => {
        const o: any = itemLens.getOption(data)
        const val = o.fold(null, v => lens.get(v))
        return val
      },
      set: (v: any) => (data: any) => {
        const o: any = arrayLens.get(data)
        const i: any = (itemLens.getOption(data) as any).getOrElse({})
        const newArray = updateArrayAtIndex(
          o,
          index,
          lens.set(v)({ ...(i || {}) }),
        )
        return arrayLens.set(newArray)(data)
      },
    }
  }

  const renderFormRepeatSection = (
    formSection: FormFieldRepeatSection<FormData>,
    key: number | string,
  ) => {
    const length = formSection.length.get(props.data)

    const groups = Array.from({
      length,
    }).map((_, index) => ({
      type: FormFieldType.FormSection,
      fields: [
        {
          type: FormFieldType.FormFieldGroup,
          title: `${index + 1}`,
          fields: formSection.fields.map((f, fi) => {
            if (Array.isArray(f)) {
              return <></>
            } else {
              return {
                ...f,
                lens: createLens(formSection.lens, index, f.lens),
              }
            }
          }),
        },
      ],
    })) as Array<FormSection<FormData>>

    return groups.map((g, i) => renderFormSection(g, `${key}-${i}`))
  }

  const renderFormRepeatGroup = (
    formGroup: FormFieldRepeatGroup<FormData>,
    key: number | string,
  ) => {
    const length = formGroup.length.get(props.data)

    const groups = Array.from({
      length,
    }).map((_, index) => ({
      type: FormFieldType.FormFieldGroup,
      fields: formGroup.fields.map((f, fi) => {
        if (Array.isArray(f)) {
          return <></>
        } else {
          return {
            ...f,
            lens: createLens(formGroup.lens, index, f.lens),
          }
        }
      }),
    })) as Array<FormFieldGroup<FormData>>

    return groups.map((g, i) => renderFormGroup(g, `${key}-${i}`))
  }
  // ------------------------------------

  const renderFormSectionItem = (
    formField: SectionField<FormData>,
    key: number | string,
  ) => {
    if (
      !Array.isArray(formField) &&
      formField.type === FormFieldType.FormFieldGroup
    ) {
      return renderFormGroup(formField, key)
    } else if (
      !Array.isArray(formField) &&
      formField.type === FormFieldType.FormFieldRepeatGroup
    ) {
      return renderFormRepeatGroup(formField, key)
    } else if (
      !Array.isArray(formField) &&
      formField.type === FormFieldType.FormFieldRepeatSection
    ) {
      return renderFormRepeatSection(formField, key)
    } else {
      return renderFormField(formField, key)
    }
  }

  const renderFormGroup = (
    formGroup: FormFieldGroup<FormData>,
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
          <P
            style={{
              ...getGroupStyle('title'),
              ...(formGroup.style ? formGroup.style.title || {} : {}),
            }}
            label={formGroup.title}
          />
        )}
        {formGroup.description && (
          <P
            style={{
              ...getGroupStyle('description'),
              ...(formGroup.style ? formGroup.style.description || {} : {}),
            }}
            label={formGroup.description}
          />
        )}
        {formGroup.fields.map(renderFormField)}
      </FormFieldGroupWrapper>
    ) : null

  const renderFormSection = (
    formSection: FormSection<FormData>,
    key: number | string,
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
          <P
            style={{
              ...getSectionStyle('title'),
              ...(formSection.style ? formSection.style.title || {} : {}),
            }}
            label={formSection.title}
          />
        )}
        {formSection.description && (
          <P
            style={{
              ...getSectionStyle('description'),
              ...(formSection.style ? formSection.style.description || {} : {}),
            }}
            label={formSection.description}
          />
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
        {formFields.map((f: FormField<FormData>, key: number) => {
          if (Array.isArray(f)) {
            return renderFormFieldRow(f, key)
          } else if (f.type === FormFieldType.FormFieldGroup) {
            return renderFormGroup(f, key)
          } else if (f.type === FormFieldType.FormSection) {
            return renderFormSection(f, key)
          } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
            return renderFormRepeatGroup(f, key)
          } else if (f.type === FormFieldType.FormFieldRepeatSection) {
            return renderFormRepeatSection(f, key)
          } else {
            return renderFormField(f, key)
          }
        })}
      </FormContent>
      {props.renderBottomChildren && props.renderBottomChildren(props.data)}
      {props.buttons && (
        <ButtonContainer style={getFormStyle('buttonContainer')}>
          {props.buttons.map((b, k) => (
            <Button
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
