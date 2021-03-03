import { P } from 'frr-web/lib/html'
import React from 'react'
import { FormTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { Field } from './Field'
import { FieldType, FormFieldGroup } from './types'

interface FieldGroup<FormData> extends FieldType<FormData> {
  field: FormFieldGroup<FormData>
}
// ------------------------------------
export const FieldGroup = <FormData extends {}>({
  data,
  field: fieldGroup,
  fieldIndex: fieldGroupIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldGroup<FormData>) => {
  // Form styles
  const theme = React.useContext(getThemeContext()) as FormTheme
  const getGroupStyle = createGetStyle(theme, 'group')(style?.group || {})

  return !fieldGroup.isVisible || fieldGroup.isVisible(data) ? (
    <div
      key={
        typeof fieldGroupIndex === 'string'
          ? fieldGroupIndex
          : `group-${fieldGroupIndex}`
      }
      style={{
        ...getGroupStyle('wrapper'),
        ...(fieldGroup.style ? fieldGroup.style.wrapper || {} : {}),
      }}
    >
      {fieldGroup.title && (
        <P
          style={{
            ...getGroupStyle('title'),
            ...(fieldGroup.style ? fieldGroup.style.title || {} : {}),
          }}
          label={fieldGroup.title}
        />
      )}
      {fieldGroup.description && (
        <P
          style={{
            ...getGroupStyle('description'),
            ...(fieldGroup.style ? fieldGroup.style.description || {} : {}),
          }}
          label={fieldGroup.description}
        />
      )}
      {fieldGroup.fields.map((field, fieldIndex) => (
        <Field
          key={`field-${field}`}
          data={data}
          field={field}
          fieldIndex={fieldIndex}
          formReadOnly={formReadOnly}
          onChange={onChange}
          showValidation={showValidation}
          style={style}
        />
      ))}
    </div>
  ) : (
    <></>
  )
}
