import { P } from 'frr-web/lib/html'
import { createStyled } from 'frr-web/lib/theme/util'
import React, { ReactNode } from 'react'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldRow } from './FieldRow'
import {
  CommonThreadProps,
  FormFieldGroup,
  FormFieldType,
  GroupField,
} from './types'

const GroupWrapper = createStyled('div')

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
  const theme = useFormTheme()
  const getCSSStyle = useCSSStyles(theme, 'group')(style?.group || {})

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
    <GroupWrapper
      key={
        typeof fieldGroupIndex === 'string'
          ? fieldGroupIndex
          : `group-${fieldGroupIndex}`
      }
      {...getCSSStyle(
        'wrapper',
        fieldGroup.style ? fieldGroup.style.wrapper || {} : {},
      )}
    >
      {fieldGroup.title && (
        <P
          {...getCSSStyle(
            'title',
            fieldGroup.style ? fieldGroup.style.title || {} : {},
          )}
          label={fieldGroup.title}
        />
      )}
      {fieldGroup.description && (
        <P
          {...getCSSStyle(
            'description',
            fieldGroup.style ? fieldGroup.style.description || {} : {},
          )}
          label={fieldGroup.description}
        />
      )}
      {fieldGroup.fields.map(renderGroupField)}
      {fieldGroup.renderChildren?.()}
    </GroupWrapper>
  ) : (
    <></>
  )
}
