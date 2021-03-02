import {
  FormFieldType,
  FormField,
  FormFieldRow,
  SingleFormField,
} from '../types'
import { P } from 'frr-web/lib/html'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import { Options } from 'frr-web/lib/util'
import React from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../../theme/theme'
import { createGetStyle } from '../../theme/util'

/*
 * Value mapper
 */

var formatter = {
  long: new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
  }),
  short: new Intl.NumberFormat('de-CH'),
}

type getValueType<ValueType> = {
  value?: ValueType | null
  translate: (k: string) => string
  options?: Options<string | number>
}

const getTextValue = ({ value }: getValueType<string>): string => value || ''
const getDateValue = ({ value }: getValueType<string>): string => value || ''
const getNumberValue = ({ value }: getValueType<number>): string =>
  value ? `${value}` : '0'
const getAmountValue = ({ value }: getValueType<number>): string =>
  value ? formatter.long.format(value) : ''
const getYesNoValue = ({ value, translate }: getValueType<boolean>): string =>
  !!value ? translate('yes') : translate('no')
const getMultiSelectValue = ({
  value,
  translate,
  options,
}: getValueType<string[]>): string =>
  Array.isArray(value)
    ? value
        .map(val => getSelectValue({ value: val, translate, options }))
        .join(', ')
    : ''
const getSelectValue = ({
  value,
  translate,
  options,
}: getValueType<string | number>): string => {
  const option = Array.isArray(options) && options.find(o => o.value === value)

  return (!!option && option.label && translate(option.label)) || ''
}

const FieldValueMapper = {
  [FormFieldType.NumberInput]: getAmountValue,
  [FormFieldType.DatePicker]: getDateValue,
  [FormFieldType.MultiSelect]: getMultiSelectValue,
  [FormFieldType.CheckboxGroup]: getTextValue,
  [FormFieldType.CodeInput]: getTextValue,
  [FormFieldType.CountryDropdown]: getTextValue,
  [FormFieldType.CountrySelect]: getTextValue,
  [FormFieldType.CurrencyInput]: getAmountValue,
  [FormFieldType.Dropdown]: getTextValue,
  [FormFieldType.DropdownNumber]: getNumberValue,
  [FormFieldType.FormattedDatePicker]: getTextValue,
  [FormFieldType.InputWithDropdown]: getTextValue,
  [FormFieldType.NumberSelect]: getNumberValue,
  [FormFieldType.OptionGroup]: getTextValue,
  [FormFieldType.RadioGroup]: getSelectValue,
  [FormFieldType.SingleCheckbox]: getTextValue,
  [FormFieldType.Slider]: getTextValue,
  [FormFieldType.Switch]: getTextValue,
  [FormFieldType.TextArea]: getTextValue,
  [FormFieldType.TextInput]: getTextValue,
  [FormFieldType.TextNumber]: getTextValue,
  [FormFieldType.TextSelect]: getSelectValue,
  [FormFieldType.UnitInput]: getTextValue,
  [FormFieldType.Toggle]: getYesNoValue,
  [FormFieldType.YesNoOptionGroup]: getYesNoValue,
  [FormFieldType.YesNoRadioGroup]: getYesNoValue,
} as const

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
}>`
  position: relative;
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

type FieldItemProps<FormData> = {
  field: SingleFormField<FormData>
  // TODO: fix type for getValue: (getValueType<string | number | string[] | Date | boolean | null>) => string
  getValue: any
  style?: Partial<FormTheme> | undefined
  data: FormData
}

export const getRenderReadOnlyFormFieldItem = <FormData extends {}>({
  data,
  style,
}: {
  data: FormData
  style: Partial<FormTheme> | undefined
}) => (width: number = 100) => (
  field: SingleFormField<FormData>,
  index: number,
) => {
  const theme = React.useContext(getThemeContext())
  const getRowStyle = createGetStyle(theme, 'row')(style?.row || {})
  const getFieldStyle = createGetStyle(
    theme,
    'fieldReadonly',
  )(style?.fieldReadonly || {})

  /*
   * Render field item
   */

  const FieldItem = ({ field, getValue, data }: FieldItemProps<FormData>) => {
    const language = React.useContext(getLanguageContext())
    const translate = getTranslation(language)

    const options =
      field.type === FormFieldType.TextSelect ||
      field.type === FormFieldType.RadioGroup ||
      field.type === FormFieldType.MultiSelect
        ? (field.options as Options<string>)
        : []

    if (!getValue) console.log('GET VALUE MiSSING', field)

    return !!getValue ? (
      <div style={getFieldStyle('wrapper')}>
        {field.label && (
          <P
            style={getFieldStyle('label')}
            label={field.label.label}
            data={field.label.labelData}
          />
        )}
        <p style={{ ...getFieldStyle('item') }}>
          {getValue({ value: field.lens.get(data), translate, options })}
        </p>
      </div>
    ) : null
  }

  const getValue = FieldValueMapper[field.type]

  return !field.isVisible || field.isVisible(data) ? (
    <FormFieldWrapper
      key={`field-item-${index}`}
      className="form-field"
      style={{...getRowStyle('item'), ...getRowStyle('itemReadonly')}}
      width={`${width}%`}
    >
      <FieldItem field={field} getValue={getValue} style={style} data={data} />
    </FormFieldWrapper>
  ) : (
    <></>
  )
}
