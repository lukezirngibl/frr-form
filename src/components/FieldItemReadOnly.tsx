import { P } from 'frr-web/lib/html'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import React from 'react'
import styled from 'styled-components'
import { getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { FieldType, FormFieldType, SingleFormField, fieldMap } from './types'
import { findFirst } from 'fp-ts/lib/Array'

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

const defaultStrNumMapper = ({
  value,
}: MapperParams<string | number | null>): string => (value ? `${value}` : '')

const defaultBooleanMapper = ({ value }: MapperParams<boolean>): string =>
  value ? 'yes' : 'no'

const defaultCurrencyMapper = ({ value }: MapperParams<number>): string =>
  value ? formatter.long.format(value) : ''

const defaultOptionArrayMapper = (
  params: MapperParams<Array<string>> & {
    options: Array<{ label: string; value: string }>
  },
): string =>
  Array.isArray(params.value)
    ? params.value
        .map(val =>
          params.translate(
            findFirst(params.options, o => o.value === val).fold(
              'null',
              o => o.label,
            ),
          ),
        )
        .join(', ')
    : ''

const defaultOptionMapper = (
  params: MapperParams<string> & {
    options: Array<{ label: string; value: string }>
  },
): string =>
  findFirst(params.options, o => o.value === params.value).fold(
    '',
    o => o.label,
  )

const defaultReadOnlyMappers: {
  [K in FormFieldType]: (
    params: Omit<typeof fieldMap[K], 'lens' | '_value' | 'type'> & {
      value: typeof fieldMap[K]['_value']
      translate: (str: string) => string
    },
  ) => string
} = {
  [FormFieldType.NumberInput]: defaultStrNumMapper,
  [FormFieldType.DatePicker]: v => v.value.toDateString(),
  [FormFieldType.MultiSelect]: defaultOptionArrayMapper,
  [FormFieldType.CheckboxGroup]: defaultOptionArrayMapper,
  [FormFieldType.CodeInput]: defaultStrNumMapper,
  [FormFieldType.CountryDropdown]: defaultStrNumMapper,
  [FormFieldType.CountrySelect]: defaultStrNumMapper,
  [FormFieldType.CurrencyInput]: defaultCurrencyMapper,
  [FormFieldType.Dropdown]: defaultStrNumMapper,
  [FormFieldType.DropdownNumber]: defaultStrNumMapper,
  [FormFieldType.FormattedDatePicker]: defaultStrNumMapper,
  [FormFieldType.InputWithDropdown]: defaultStrNumMapper,
  [FormFieldType.NumberSelect]: defaultOptionMapper,
  [FormFieldType.OptionGroup]: defaultOptionMapper,
  [FormFieldType.RadioGroup]: defaultOptionMapper,
  [FormFieldType.SingleCheckbox]: defaultBooleanMapper,
  [FormFieldType.Slider]: defaultStrNumMapper,
  [FormFieldType.Switch]: defaultBooleanMapper,
  [FormFieldType.TextArea]: defaultStrNumMapper,
  [FormFieldType.TextInput]: defaultStrNumMapper,
  [FormFieldType.TextNumber]: defaultStrNumMapper,
  [FormFieldType.TextSelect]: defaultOptionMapper,
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
    props.field.readOnlyMapper || defaultReadOnlyMappers[props.field.type]

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
