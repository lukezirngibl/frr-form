import React from 'react'
import { FormTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { FieldItem } from './FieldItem'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRow, FieldRowWrapper } from './FieldRow'
import { FieldType, FormField, FormFieldRow, SingleFormField } from './types'

// ------------------------------------
interface FieldProps<FormData> extends FieldType<FormData> {
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
  const getRowStyle = createGetStyle(theme, 'row')(style?.row || {})

  const commonFieldItemProps = { data, style }
  
  return Array.isArray(field) ? (
    <FieldRow
      field={field as FormFieldRow<FormData>}
      fieldIndex={fieldIndex}
      data={data}
      formReadOnly={formReadOnly}
      onChange={onChange}
      showValidation={showValidation}
      style={style}
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
          {...commonFieldItemProps}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
        />
      ) : (
        <FieldItem
          {...commonFieldItemProps}
          field={field as SingleFormField<FormData>}
          fieldIndex={fieldIndex}
          onChange={onChange}
          showValidation={showValidation}
        />
      )}
    </FieldRowWrapper>
  )
}
