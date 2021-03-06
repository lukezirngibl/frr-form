import React from 'react'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { FieldItem } from './FieldItem'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRow, FieldRowWrapper } from './FieldRow'
import { FieldType, FormField, FormFieldRow, SingleFormField } from './types'

// ------------------------------------
type FieldProps<FormData> = FieldType<FormData> & {
  field: FormField<FormData>
}

// ------------------------------------
export const Field = <FormData extends {}>({
  data,
  field,
  fieldIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldProps<FormData>) => {
  // Form styles
  const theme = React.useContext(getThemeContext()) as FormTheme
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})

  const commonFieldProps = { data, style }

  return Array.isArray(field) ? (
    <FieldRow
      field={field as FormFieldRow<FormData>}
      fieldIndex={fieldIndex}
      formReadOnly={formReadOnly}
      onChange={onChange}
      showValidation={showValidation}
      {...commonFieldProps}
    />
  ) : (
    <FieldRowWrapper
      style={{
        ...getRowStyle('wrapper'),
        ...(formReadOnly ? getRowStyle('wrapperReadOnly') : {}),
      }}
    >
      {formReadOnly ? (
        <FieldItemReadOnly
          {...commonFieldProps}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
        />
      ) : (
        <FieldItem
          {...commonFieldProps}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
          onChange={onChange}
          showValidation={showValidation}
        />
      )}
    </FieldRowWrapper>
  )
}
