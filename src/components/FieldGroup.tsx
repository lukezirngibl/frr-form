import { P } from 'frr-web/lib/html'
import React from 'react'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import {
  CommonThreadProps,
  FormFieldGroup,
  GroupField,
  FormFieldType,
} from './types'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldRow } from './FieldRow'

type FieldGroup<FormData> = CommonThreadProps<FormData> & {
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
  const getGroupStyle = useInlineStyle(theme, 'group')(style?.group || {})

  const commonFieldProps = {
    data,
    style,
    showValidation,
    onChange,
    formReadOnly,
  }

  const renderGroupField = (
    field: GroupField<FormData>,
    fieldIndex: number,
  ) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-section-${fieldIndex}`}
          fieldIndex={fieldIndex}
          {...commonFieldProps}
          field={field}
        />
      )
    }

    switch (field.type) {
      case FormFieldType.MultiInput:
        return (
          <FieldMultiInput
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
      default:
        return (
          <FieldRow
            key={`field-${fieldIndex}`}
            field={[field]}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
    }
  }
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
      {fieldGroup.fields.map(renderGroupField)}
    </div>
  ) : (
    <></>
  )
}
