import { CheckboxGroup } from 'frr-web/lib/components/CheckboxGroup'
import { CodeInput } from 'frr-web/lib/components/CodeInput'
import { CountryDropdown } from 'frr-web/lib/components/CountryDropdown'
import { CountrySelect } from 'frr-web/lib/components/CountrySelect'
import { CurrencyInput } from 'frr-web/lib/components/CurrencyInput'
import { DatePicker } from 'frr-web/lib/components/DatePicker'
import { Dropdown } from 'frr-web/lib/components/Dropdown'
import { DropdownNumber } from 'frr-web/lib/components/DropdownNumber'
import { FormattedDatePicker } from 'frr-web/lib/components/FormattedDatePicker'
import { InputWithDropdown } from 'frr-web/lib/components/InputWithDropdown'
import { Label } from 'frr-web/lib/components/Label'
import { MultiSelect } from 'frr-web/lib/components/MultiSelect'
import { NumberInput } from 'frr-web/lib/components/NumberInput'
import { OptionGroup } from 'frr-web/lib/components/OptionGroup'
import { RadioGroup } from 'frr-web/lib/components/RadioGroup'
import { Select } from 'frr-web/lib/components/Select'
import { SingleCheckbox } from 'frr-web/lib/components/SingleCheckbox'
import { Slider } from 'frr-web/lib/components/Slider'
import { Switch } from 'frr-web/lib/components/Switch'
import { TextArea } from 'frr-web/lib/components/TextArea'
import { TextInput } from 'frr-web/lib/components/TextInput'
import { TextNumberInput } from 'frr-web/lib/components/TextNumberInput'
import { Toggle } from 'frr-web/lib/components/Toggle'
import { YesNoOptionGroup } from 'frr-web/lib/components/YesNoOptionGroup'
import { YesNoRadioGroup } from 'frr-web/lib/components/YesNoRadioGroup'
import React from 'react'
import styled from 'styled-components'
import { getThemeContext } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { getComputeFieldError } from './functions/computeFieldError.form'
import {
  FieldType,
  FormFieldType,
  MultiFormField,
  SingleFormField,
} from './types'

/*
 * Styled components
 */

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
  width?: string
  maxwidth?: number
}>`
  position: relative;
  max-width: ${({ maxwidth }) => (!!maxwidth ? `${maxwidth}px` : 'none')};
  width: ${({ width }) => width || '100%'};

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

/*
 * Render field function
 */

type FieldItemProps<FormData> = Omit<FieldType<FormData>, 'formReadOnly'> & {
  field: SingleFormField<FormData> | MultiFormField<FormData>
  width?: number
}

let scrolled = false

export const FieldItem = <FormData extends {}>(
  props: FieldItemProps<FormData>,
) => {
  const theme = React.useContext(getThemeContext())
  const getRowStyle = useInlineStyle(theme, 'row')(props.style?.row || {})

  const computeFieldError = getComputeFieldError(props.data)

  const renderFormFieldInput = (
    field: SingleFormField<FormData>,
    error: { errorLabel: string | null; hasError: boolean },
    key: number | string,
  ) => {
    const { errorLabel, hasError } = error

    const dataTestId = field.lens.id()

    let { label } = field
    if (label) {
      label = { error: errorLabel !== null, errorLabel, ...label }
    }

    if (field.type === FormFieldType.TextArea) {
      const { type, lens, validate, ...fieldProps } = field
      return (
        <TextArea
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.TextInput) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <TextInput
          {...fieldProps}
          key={key}
          value={lens.get(props.data) || ''}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.Toggle) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <Toggle
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.FormattedDatePicker) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <FormattedDatePicker
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.DatePicker) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <DatePicker
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.CountrySelect) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <CountrySelect
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={(value: string) =>
            props.onChange(lens.set(value)(props.data))
          }
          error={hasError}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.Slider) {
      const { type, lens, validate, required, ...fieldProps } = field
      return (
        <Slider
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          // error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.CheckboxGroup) {
      const { lens, validate, ...fieldProps } = field
      return (
        <CheckboxGroup
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.YesNoOptionGroup) {
      const { lens, validate, ...fieldProps } = field
      return (
        <YesNoOptionGroup
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.YesNoRadioGroup) {
      const { lens, validate, ...fieldProps } = field
      return (
        <YesNoRadioGroup
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.OptionGroup) {
      const { lens, validate, ...fieldProps } = field
      return (
        <OptionGroup
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
          error={hasError}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.RadioGroup) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <RadioGroup
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
          error={hasError}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.SingleCheckbox) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <SingleCheckbox
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
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
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.Switch) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Switch
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
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
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.TextNumber) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <TextNumberInput
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          // error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.TextSelect) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Select
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={(value: string) =>
            props.onChange(lens.set(value)(props.data))
          }
          label={label}
          error={hasError}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.NumberSelect) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Select
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={(value: number) =>
            props.onChange(lens.set(value)(props.data))
          }
          label={label}
          error={hasError}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.MultiSelect) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <MultiSelect
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
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
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.CountryDropdown) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <CountryDropdown
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
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
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
          dataTestId={dataTestId}
        />
      )
    }

    if (field.type === FormFieldType.Dropdown) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <Dropdown
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
        />
      )
    }

    if (field.type === FormFieldType.DropdownNumber) {
      const { lens, validate, required, ...fieldProps } = field
      return (
        <DropdownNumber
          {...fieldProps}
          key={key}
          value={lens.get(props.data)}
          onChange={value => props.onChange(lens.set(value)(props.data))}
          error={hasError}
          label={label}
        />
      )
    }

    return <div />
  }

  const width = !isNaN(props.width) ? props.width : 100

  const renderFieldItemWrapper = (
    field: SingleFormField<FormData>,
    fieldIndex: number,
  ) => {
    const errorLabel = props.showValidation ? computeFieldError(field) : null

    const hasError = errorLabel !== null

    let ref = React.createRef<HTMLDivElement>()
    if (!scrolled && hasError) {
      scrolled = true
      setTimeout(() => {
        if (ref.current) {
          scrolled = false
          ref.current.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }, 300)
    }

    return !field.isVisible || field.isVisible(props.data) ? (
      <div ref={ref}>
        {renderFormFieldInput(field, { hasError, errorLabel }, fieldIndex)}
      </div>
    ) : (
      <></>
    )
  }

  const renderMultiFieldItemWrapper = (field: MultiFormField<FormData>) => {
    return (
      <>
        {field.label && <Label {...field.label} />}
        {field.fields.map((fieldItem, fieldItemIndex) =>
          renderFieldItemWrapper(fieldItem, fieldItemIndex),
        )}
      </>
    )
  }

  return (
    <FormFieldWrapper
      width={`calc(${width}% - ${width === 100 ? 0 : 4}px)`}
      className="form-field"
      style={{
        ...getRowStyle('item'),
        ...(props.field.itemStyle || {}),
      }}
    >
      {props.field.type === FormFieldType.MultiTextInput
        ? renderMultiFieldItemWrapper(props.field)
        : renderFieldItemWrapper(props.field, props.fieldIndex)}
    </FormFieldWrapper>
  )
}
