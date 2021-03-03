import { P } from 'frr-web/lib/html'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import React from 'react'
import styled from 'styled-components'
import { getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { FieldType, FormFieldType, SingleFormField, fieldMap } from './types'

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

type MapperParams<T> = { value: T; translate: (str: string) => string }

const defaultMapper = ({
  value,
}: MapperParams<string | number | null>): string => (value ? `${value}` : '')

const defaultBooleanMapper = ({ value }: MapperParams<boolean>): string =>
  value ? 'yes' : 'no'

const defaultCurrencyMapper = ({ value }: MapperParams<number>): string =>
  value ? formatter.long.format(value) : ''

const getMultiSelectValue = (params: MapperParams<Array<string>>): string =>
  Array.isArray(params.value)
    ? params.value.map(val => params.translate(val)).join(', ')
    : ''

const readOnlyMappers: {
  [K in FormFieldType]: (
    params: Omit<typeof fieldMap[K], 'lens' | '_value' | 'type'> & {
      value: typeof fieldMap[K]['_value']
      translate: (str: string) => string
    },
  ) => string
} = {
  [FormFieldType.NumberInput]: defaultMapper,
  [FormFieldType.DatePicker]: v => v.value.toDateString(),
  [FormFieldType.MultiSelect]: getMultiSelectValue,
  [FormFieldType.CheckboxGroup]: getMultiSelectValue,
  [FormFieldType.CodeInput]: defaultMapper,
  [FormFieldType.CountryDropdown]: defaultMapper,
  [FormFieldType.CountrySelect]: defaultMapper,
  [FormFieldType.CurrencyInput]: defaultCurrencyMapper,
  [FormFieldType.Dropdown]: defaultMapper,
  [FormFieldType.DropdownNumber]: defaultMapper,
  [FormFieldType.FormattedDatePicker]: defaultMapper,
  [FormFieldType.InputWithDropdown]: defaultMapper,
  [FormFieldType.NumberSelect]: defaultMapper,
  [FormFieldType.OptionGroup]: defaultMapper,
  [FormFieldType.RadioGroup]: defaultMapper,
  [FormFieldType.SingleCheckbox]: defaultBooleanMapper,
  [FormFieldType.Slider]: defaultMapper,
  [FormFieldType.Switch]: defaultBooleanMapper,
  [FormFieldType.TextArea]: defaultMapper,
  [FormFieldType.TextInput]: defaultMapper,
  [FormFieldType.TextNumber]: defaultMapper,
  [FormFieldType.TextSelect]: defaultMapper,
  [FormFieldType.Toggle]: defaultBooleanMapper,
  [FormFieldType.YesNoOptionGroup]: defaultBooleanMapper,
  [FormFieldType.YesNoRadioGroup]: defaultBooleanMapper,
  [FormFieldType.FormText]: () => '',
  [FormFieldType.FormFieldGroup]: () => '',
  [FormFieldType.FormSection]: () => '',
  [FormFieldType.FormFieldRepeatGroup]: () => '',
  [FormFieldType.FormFieldRepeatSection]: () => '',
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

type FieldItemReadOnlyProps<FormData> = Omit<
  FieldType<FormData>,
  'onChange' | 'showValidation' | 'formReadOnly'
> & {
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

  const readOnlyMapper =
    props.field.readOnlyMapper || readOnlyMappers[props.field.type]

  return !props.field.isVisible || props.field.isVisible(props.data) ? (
    <FormFieldWrapper
      className="form-field"
      style={{ ...getRowStyle('item'), ...getRowStyle('itemReadOnly') }}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    >
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
          label={readOnlyMapper({
            ...props.field,
            value: props.field.lens.get(props.data),
            translate,
          } as any)}
        />
      </div>
    </FormFieldWrapper>
  ) : (
    <></>
  )
}
