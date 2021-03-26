import { findFirst } from 'fp-ts/lib/Array'
import { P } from 'frr-web/lib/html'
import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import styled from 'styled-components'
import { useCSSStyles } from '../theme/util'
import {
  fieldMap,
  CommonThreadProps,
  FormFieldType,
  MultiInputField,
  SingleFormField,
} from './types'
import { MediaQuery } from 'frr-web/lib/theme/theme'
import {
  Language,
  useLanguage,
  useTranslate,
  mapLanguageToLocale,
} from 'frr-web/lib/theme/language'
import { useFormTheme } from '../theme/theme'
import { format, isMatch, isValid } from 'date-fns'

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

type MapperParams<T> = {
  value: T
  translate: (str: string) => string
  language?: Language
}

const defaultStringNumberMapper = ({
  value,
}: MapperParams<string | number | null>): string => (value ? `${value}` : '')

const defaultDateStringMapper = ({
  value,
  language,
}: MapperParams<string | null>): string => {
  const locale = mapLanguageToLocale[language]
  return value && isValid(new Date(value))
    ? format(new Date(value), 'P', { locale })
    : ''
}

const defaultBooleanMapper = ({ value }: MapperParams<boolean>): string =>
  value ? 'yes' : 'no'

const defaultCurrencyMapper = ({ value }: MapperParams<number>): string =>
  formatter.long.format(value || 0)

const defaultOptionArrayMapper = (
  params: MapperParams<Array<string>> & {
    options: Array<{ label?: string; value: string }>
  },
): string =>
  Array.isArray(params.value)
    ? params.value
        .map((val) =>
          params.translate(
            findFirst(params.options, (option) => option.value === val).fold(
              'null',
              (option) => option.label,
            ),
          ),
        )
        .join(', ')
    : ''

const defaultOptionMapper = (
  params: MapperParams<string | number> & {
    options: Array<{ label?: string; value: string }>
  },
): string => {
  return findFirst(
    params.options,
    (option) => option.value === params.value,
  ).fold('', (option) => option.label)
}

const defaultReadOnlyMappers: {
  [K in FormFieldType]: (
    params: Omit<typeof fieldMap[K], 'lens' | '_value' | 'type'> & {
      value: typeof fieldMap[K]['_value']
      translate: (str: string) => string
      language?: Language
    },
  ) => string
} = {
  // [FormFieldType.CheckboxGroup]: defaultOptionArrayMapper,
  // [FormFieldType.CountryDropdown]: defaultStrNumMapper,
  // [FormFieldType.Dropdown]: defaultStrNumMapper,
  // [FormFieldType.DropdownNumber]: defaultStrNumMapper,
  // [FormFieldType.InputWithDropdown]: defaultStrNumMapper,

  [FormFieldType.CodeInput]: defaultStringNumberMapper,
  [FormFieldType.CountrySelect]: defaultStringNumberMapper,
  [FormFieldType.CurrencyInput]: defaultCurrencyMapper,
  [FormFieldType.DatePicker]: (v) =>
    !!v
      ? format(v.value, 'P', { locale: mapLanguageToLocale[v.language] })
      : '',
  [FormFieldType.FormattedDatePicker]: defaultDateStringMapper,
  [FormFieldType.FormFieldGroup]: () => '',
  [FormFieldType.FormFieldRepeatGroup]: () => '',
  [FormFieldType.FormFieldRepeatSection]: () => '',
  [FormFieldType.FormSection]: () => '',
  [FormFieldType.FormText]: () => '',
  [FormFieldType.MultiSelect]: defaultOptionArrayMapper,
  [FormFieldType.MultiInput]: () => '',
  [FormFieldType.NumberInput]: defaultStringNumberMapper,
  [FormFieldType.NumberSelect]: defaultOptionMapper,
  [FormFieldType.OptionGroup]: defaultOptionMapper,
  [FormFieldType.RadioGroup]: defaultOptionMapper,
  [FormFieldType.SingleCheckbox]: defaultBooleanMapper,
  [FormFieldType.Slider]: defaultStringNumberMapper,
  [FormFieldType.Switch]: defaultBooleanMapper,
  [FormFieldType.TextArea]: defaultStringNumberMapper,
  [FormFieldType.TextInput]: defaultStringNumberMapper,
  [FormFieldType.TextInputDescription]: () => '',
  [FormFieldType.TextNumber]: defaultStringNumberMapper,
  [FormFieldType.TextSelect]: defaultOptionMapper,
  [FormFieldType.Toggle]: defaultBooleanMapper,
  [FormFieldType.YesNoOptionGroup]: defaultBooleanMapper,
  [FormFieldType.YesNoRadioGroup]: defaultBooleanMapper,
  [FormFieldType.Static]: () => '',
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
const FieldItemValueWrapper = createStyled('div')

const Image = createStyled('img')

/*
 * Field value component
 */

type FieldItemReadOnlyValueProps<FormData> = {
  field: SingleFormField<FormData>
  data: FormData
  getFieldStyle: any //
}

const FieldItemReadOnlyValue = <FormData extends {}>(
  props: FieldItemReadOnlyValueProps<FormData>,
) => {
  const language = useLanguage()
  const translate = useTranslate(language)

  const readOnlyStyle: Array<'value' | 'valueHighlighted'> = ['value']

  const readOnlyMapper =
    props.field.readOnlyMapper || defaultReadOnlyMappers[props.field.type]

  props.field.readOnlyOptions?.isHighlighted &&
    readOnlyStyle.push('valueHighlighted')

  return props.field.readOnlyOptions?.image ? (
    <Image
      src={props.field.readOnlyOptions.image}
      alt="value image"
      {...props.getFieldStyle('image')}
    />
  ) : (
    <P
      {...props.getFieldStyle(readOnlyStyle)}
      data={readOnlyMapper({
        ...props.field,
        value: props.field.lens.get(props.data),
        translate,
        language,
      } as any)}
    />
  )
}

/*
 * Field readonly component
 */

type FieldItemReadOnlyProps<FormData> = Omit<
  CommonThreadProps<FormData>,
  'onChange' | 'showValidation' | 'formReadOnly'
> & {
  field: SingleFormField<FormData> | MultiInputField<FormData>
  width?: number
}

export const FieldItemReadOnly = <FormData extends {}>(
  props: FieldItemReadOnlyProps<FormData>,
) => {
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')({})
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')({})

  return !props.field.isVisible || props.field.isVisible(props.data) ? (
    <FormFieldWrapper
      key={`field-item-${props.fieldIndex}`}
      className="form-field field-readonly"
      {...getRowStyle('item')}
      readOnly={true}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    >
      <FieldItemWrapper {...getFieldStyle('wrapper')}>
        {props.field.label && (
          <P
            {...getFieldStyle('label')}
            label={props.field.label.label}
            data={props.field.label.labelData}
          />
        )}
        <FieldItemValueWrapper {...getFieldStyle('item')}>
          {props.field.type === FormFieldType.MultiInput ? (
            props.field.fields.map((fieldItem, fieldItemIndex) => {
              return (
                <FieldItemReadOnlyValue<FormData>
                  field={fieldItem}
                  data={props.data}
                  key={`field-item-value-${fieldItemIndex}`}
                  getFieldStyle={getFieldStyle}
                />
              )
            })
          ) : (
            <FieldItemReadOnlyValue<FormData>
              field={props.field}
              data={props.data}
              key={`field-item-value-${props.fieldIndex}`}
              getFieldStyle={getFieldStyle}
            />
          )}
        </FieldItemValueWrapper>
      </FieldItemWrapper>
    </FormFieldWrapper>
  ) : (
    <></>
  )
}
