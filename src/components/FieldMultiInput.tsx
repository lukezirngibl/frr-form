import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { CommonThreadProps, FormFieldRow, MultiInputField } from './types'
import { FieldItem } from './FieldItem'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputField<FormData>
}

// ------------------------------------
export const FieldMultiInput = <FormData extends {}>({
  data,
  field,
  fieldIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldRowProps<FormData>) => {
  // Form styles
  const theme = React.useContext(getThemeContext()) as FormTheme

  const getFieldMultiInputStyle = useInlineStyle(theme, 'fieldMultiInput')({})

  const commonFieldItemProps = {
    data,
    style,
  }

  return field.fields.some((r) => !r.isVisible || r.isVisible(data)) ? (
    <div
      style={getFieldMultiInputStyle('item')}
      key={`field-mulit-input-${fieldIndex}`}
    >
      {field.fields.map((fieldItem, fieldItemIndex) => (
        <FieldItem
          {...commonFieldItemProps}
          formReadOnly={formReadOnly}
          key={`field-item-${fieldItemIndex}`}
          field={fieldItem}
          fieldIndex={fieldItemIndex}
          onChange={onChange}
          showValidation={showValidation}
        />
      ))}
    </div>
  ) : null
}
