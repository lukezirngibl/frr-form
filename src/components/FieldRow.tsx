import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { FieldItem, FieldRowWrapper, Field } from './FieldItem'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { CommonThreadProps, FormFieldRow } from './types'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldRow<FormData>
}

// ------------------------------------
export const FieldRow = <FormData extends {}>({
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
  const getRowStyle = useCSSStyles(theme, 'row')(style?.row || {})

  const commonFieldItemProps = { data, style, width: (1 / field.length) * 100 }

  return field.some((r) => !r.isVisible || r.isVisible(data)) ? (
    <FieldRowWrapper
      key={`row-${fieldIndex}`}
      cssStyles={getRowStyle('wrapper')}
      readOnly={formReadOnly}
    >
      {field.map((fieldItem, fieldItemIndex) =>
        formReadOnly ? (
          <FieldItemReadOnly
            {...commonFieldItemProps}
            key={`field-item-${fieldItemIndex}`}
            field={fieldItem}
            fieldIndex={fieldItemIndex}
          />
        ) : (
          <Field
            {...commonFieldItemProps}
            key={`field-item-${fieldItemIndex}`}
            field={fieldItem}
            fieldIndex={fieldItemIndex}
            onChange={onChange}
            showValidation={showValidation}
          />
        ),
      )}
    </FieldRowWrapper>
  ) : null
}
