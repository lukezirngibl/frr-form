import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { FieldRowItem } from './FieldRowItem'
import { CommonThreadProps, FormFieldRow } from './types'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldRow<FormData>
}

export const FieldRowWrapper = createStyled(styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`)

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
      {field.map((fieldItem, fieldItemIndex) => (
        <FieldRowItem
          {...commonFieldItemProps}
          key={`field-item-${fieldItemIndex}`}
          field={fieldItem}
          fieldIndex={fieldItemIndex}
          onChange={onChange}
          showValidation={showValidation}
          formReadOnly={formReadOnly}
        />
      ))}
    </FieldRowWrapper>
  ) : null
}
