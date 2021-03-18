import { Label } from 'frr-web/lib/components/Label'
import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import {
  useFormFieldError,
  useFormFieldErrors,
} from './hooks/useFormFieldError'
import { CommonThreadProps, MultiInputField } from './types'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputField<FormData>
}

const WrapperItem = createStyled('div')

// ------------------------------------
export const FieldMultiInput = <FormData extends {}>({
  data,
  errorFieldId,
  field,
  fieldIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldRowProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()

  const getFieldMultiInputStyle = useInlineStyle(theme, 'fieldMultiInput')({})
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})
  const getCssRowStyle = useCSSStyles(theme, 'row')(style?.row || {})

  // Error
  const errorLabel = useFormFieldErrors({ data, field, showValidation })

  const commonFieldProps = {
    data,
    formReadOnly,
    showValidation,
    style,
  }

  if (formReadOnly) {
    return (
      <FieldRowWrapper
        key={`row-${fieldIndex}`}
        {...getCssRowStyle('wrapper')}
        readOnly={formReadOnly}
      >
        <FieldItemReadOnly
          {...commonFieldProps}
          field={field as MultiInputField<FormData>}
          fieldIndex={fieldIndex}
        />
      </FieldRowWrapper>
    )
  }

  return !field.isVisible ||
    field.isVisible(data) ||
    (!field.isVisible &&
      field.fields.some((r) => !r.isVisible || r.isVisible(data))) ? (
    <FieldRowWrapper
      key={`row-${fieldIndex}`}
      {...getCssRowStyle('wrapper')}
      readOnly={formReadOnly}
    >
      <FieldScrollableWrapper
        key={`field-${fieldIndex}`}
        isScrollToError={
          field.fields.findIndex(
            (fieldItem) => fieldItem.lens.id() === errorFieldId,
          ) !== -1
        }
        {...getRowStyle('item')}
      >
        {field.label && (
          <Label
            {...field.label}
            error={errorLabel.length > 0}
            errorLabel={errorLabel}
          />
        )}

        <WrapperItem
          {...getFieldMultiInputStyle('item')}
          key={`field-mulit-input-${fieldIndex}`}
        >
          {field.fields.map((fieldItem, fieldItemIndex) => (
            <FieldRowItem
              {...commonFieldProps}
              key={`field-item-${fieldItemIndex}`}
              field={fieldItem}
              fieldIndex={fieldItemIndex}
              onChange={onChange}
              isNotScrollable
            />
          ))}
        </WrapperItem>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  ) : null
}
