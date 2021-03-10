import React from 'react'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { CommonThreadProps, FormFieldRow, MultiInputField } from './types'
import { Label } from 'frr-web/lib/components'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { FieldRowItem } from './FieldRowItem'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'

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
  const getCssRowStyle = useCSSStyles(theme, 'row')(style?.row || {})

  const commonFieldProps = {
    data,
    style,
    showValidation,
    formReadOnly,
  }

  if (formReadOnly) {
    return (
      <FieldRowWrapper
        key={`row-${fieldIndex}`}
        cssStyles={getCssRowStyle('wrapper')}
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

  return field.fields.some((r) => !r.isVisible || r.isVisible(data)) ? (
    <FieldRowWrapper
      key={`row-${fieldIndex}`}
      cssStyles={getCssRowStyle('wrapper')}
      readOnly={formReadOnly}
    >
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
              {...commonFieldProps}
              key={`field-item-${fieldItemIndex}`}
              field={fieldItem}
              fieldIndex={fieldItemIndex}
              onChange={onChange}
              noScrollableWrapper
            />
          ))}
        </div>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  ) : null
}
