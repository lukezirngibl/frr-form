import React from 'react'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { CommonThreadProps, FormFieldRow, MultiInputField } from './types'
import { Label } from 'frr-web/lib/components'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { FieldRowItem } from './FieldRowItem'

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
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})

  const commonFieldItemProps = {
    data,
    style,
    showValidation,
    formReadOnly,
  }

  return field.fields.some((r) => !r.isVisible || r.isVisible(data)) ? (
    <FieldScrollableWrapper
      key={`field-${fieldIndex}`}
      showValidation={showValidation}
      hasError={false} // TODO
      style={getRowStyle('item')}
    >
      {field.label && <Label {...field.label} />}
      <div
        style={getFieldMultiInputStyle('item')}
        key={`field-mulit-input-${fieldIndex}`}
      >
        {field.fields.map((fieldItem, fieldItemIndex) => (
          <FieldRowItem
            {...commonFieldItemProps}
            key={`field-item-${fieldItemIndex}`}
            field={fieldItem}
            fieldIndex={fieldItemIndex}
            onChange={onChange}
            noScrollableWrapper
          />
        ))}
      </div>
    </FieldScrollableWrapper>
  ) : null
}
