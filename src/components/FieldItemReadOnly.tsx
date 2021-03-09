import { findFirst } from 'fp-ts/lib/Array'
import { P } from 'frr-web/lib/html'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import styled from 'styled-components'
import { getThemeContext } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import {
  fieldMap,
  FieldType,
  FormFieldType,
  MultiInputField,
  SingleFormField,
} from './types'
import { MediaQuery } from 'frr-web/lib/theme/theme'

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
  [FormFieldType.CheckboxGroup]: defaultOptionArrayMapper,
  [FormFieldType.CodeInput]: defaultStrNumMapper,
  [FormFieldType.CountryDropdown]: defaultStrNumMapper,
  [FormFieldType.CountrySelect]: defaultStrNumMapper,
  [FormFieldType.CurrencyInput]: defaultCurrencyMapper,
  [FormFieldType.DatePicker]: v => v.value.toDateString(),
  [FormFieldType.Dropdown]: defaultStrNumMapper,
  [FormFieldType.DropdownNumber]: defaultStrNumMapper,
  [FormFieldType.FormattedDatePicker]: defaultStrNumMapper,
  [FormFieldType.FormFieldGroup]: () => '',
  [FormFieldType.FormFieldRepeatGroup]: () => '',
  [FormFieldType.FormFieldRepeatSection]: () => '',
  [FormFieldType.FormSection]: () => '',
  [FormFieldType.FormText]: () => '',
  [FormFieldType.InputWithDropdown]: defaultStrNumMapper,
  [FormFieldType.MultiSelect]: defaultOptionArrayMapper,
  [FormFieldType.MultiInput]: () => '',
  [FormFieldType.NumberInput]: defaultStrNumMapper,
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
}

/*
 * Styled components
 */

const FormFieldWrapper = createStyled(styled.div`
  position: relative;
  width: ${({ width }: { width?: string }) => width || '100%'};

  @media ${MediaQuery.Mobile} {
    width: 100%;
    margin-left: 0;
    margin-right: 0;

    &:first-of-type {
      margin-top: 0;
    }
  }
`)

const FieldItemWrapper = createStyled('div')

/*
 * Render field function
 */

type FieldItemReadOnlyProps<FormData> = Omit<
  FieldType<FormData>,
  'onChange' | 'showValidation' | 'formReadOnly'
> & {
  field: SingleFormField<FormData> | MultiInputField<FormData>
  width?: number
}

export const FieldItemReadOnly = <FormData extends {}>(
  props: FieldItemReadOnlyProps<FormData>,
) => {
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const theme = React.useContext(getThemeContext())
  const getRowStyle = useCSSStyles(theme, 'row')({})
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')({})

  const readOnlyMapper =
    props.field.type !== FormFieldType.MultiInput &&
    (props.field.readOnlyMapper || defaultReadOnlyMappers[props.field.type])

  return !props.field.isVisible || props.field.isVisible(props.data) ? (
    <FormFieldWrapper
      key={`field-item-${props.fieldIndex}`}
      className="form-field field-readonly"
      cssStyles={getRowStyle('item')}
      readOnly={true}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    >
      <FieldItemWrapper cssStyles={getFieldStyle('wrapper')}>
        {props.field.label && (
          <P
            cssStyles={getFieldStyle('label')}
            label={props.field.label.label}
            data={props.field.label.labelData}
          />
        )}
        {props.field.type === FormFieldType.MultiInput ? (
          props.field.fields.map((fieldItem, fieldItemIndex) => {
            const readOnlyItemMapper =
              fieldItem.readOnlyMapper ||
              defaultReadOnlyMappers[props.field.type]

            return (
              <P
                key={`field-item-${fieldItemIndex}`}
                cssStyles={getFieldStyle('item')}
                label={readOnlyItemMapper({
                  ...fieldItem,
                  value: fieldItem.lens.get(props.data),
                  translate,
                } as any)}
              />
            )
          })
        ) : (
          <P
            cssStyles={getFieldStyle('item')}
            label={readOnlyMapper({
              ...props.field,
              value: props.field.lens.get(props.data),
              translate,
            } as any)}
          />
        )}
      </FieldItemWrapper>
    </FormFieldWrapper>
  ) : (
    <></>
  )
}
