import { P } from 'frr-web/lib/html'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import { Options } from 'frr-web/lib/util'
import React from 'react'
import styled from 'styled-components'
import { getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { FieldType, FormFieldType, SingleFormField, fieldMap } from './types'
import { Form } from './Form'
import { format } from 'date-fns';

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

const getTextValue = ({ value }: getValueType<string>): string => value || ''
const getDateValue = ({ value }: getValueType<string>): string => value || ''

const getNumberValue = ({ value }: getValueType<number>): string =>
  value ? `${value}` : '0'

const getAmountValue = ({ value }: number): string =>
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
        .map(val => translate(getSelectValue({ value: val, options })))
        .join(', ')
    : ''

const getSelectValue = ({
  value,
  options,
}: getValueType<string | number>): string => {
  const option = Array.isArray(options) && options.find(o => o.value === value)

  return option?.label || ''
}

const FieldValueMapper: {
  [K in FormFieldType]: (
    params: Omit<typeof fieldMap[K], 'lens' | '_value' | 'type'> & {
      value: typeof fieldMap[K]['_value']
    },
  ) => string
} = {
  [FormFieldType.NumberInput]: v => `${v.value}`,
  [FormFieldType.DatePicker]: v => format(v.value, v.),
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
  [FormFieldType.Toggle]: getYesNoValue,
  [FormFieldType.YesNoOptionGroup]: getYesNoValue,
  [FormFieldType.YesNoRadioGroup]: getYesNoValue,
}

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

interface FieldItemReadOnlyProps<FormData>
  extends Omit<
    FieldType<FormData>,
    'onChange' | 'showValidation' | 'formReadOnly'
  > {
  field: SingleFormField<FormData>
  width?: number
}

export const FieldItemReadOnly = <FormData extends {}>(
  props: FieldItemReadOnlyProps<FormData>,
) => {
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const theme = React.useContext(getThemeContext())
  const getRowStyle = createGetStyle(theme, 'row')(props.style?.row || {})
  const getFieldStyle = createGetStyle(
    theme,
    'fieldReadOnly',
  )(props.style?.fieldReadOnly || {})

  const options =
    props.field.type === FormFieldType.TextSelect ||
    props.field.type === FormFieldType.RadioGroup ||
    props.field.type === FormFieldType.MultiSelect
      ? (props.field.options as Options<string>)
      : []

  const getValue = FieldValueMapper[props.field.type]

  if (!getValue) console.log('GET VALUE MiSSING', props.field)

  return !props.field.isVisible || props.field.isVisible(props.data) ? (
    <FormFieldWrapper
      className="form-field"
      style={{ ...getRowStyle('item'), ...getRowStyle('itemReadOnly') }}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    >
      {!!getValue ? (
        <div style={getFieldStyle('wrapper')}>
          {props.field.label && (
            <P
              style={getFieldStyle('label')}
              label={props.field.label.label}
              data={props.field.label.labelData}
            />
          )}
          <P
            style={{ ...getFieldStyle('item') }}
            label={getValue({
              value: props.field.lens.get(props.data) as any,
              translate,
              options,
            })}
          />
        </div>
      ) : null}
    </FormFieldWrapper>
  ) : (
    <></>
  )
}
