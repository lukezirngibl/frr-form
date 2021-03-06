import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useCSSStyle } from '../theme/util'
import { FieldItem } from './FieldItem'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldType, FormFieldRow } from './types'

export const FieldRowWrapper = createStyled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
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
`

type FieldRowProps<FormData> = FieldType<FormData> & {
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
  const getRowStyle = useCSSStyle(theme, 'row')(style?.row || {})

  const commonFieldItemProps = { data, style, width: (1 / field.length) * 100 }

  return field.some(r => !r.isVisible || r.isVisible(data)) ? (
    <FieldRowWrapper
      key={`row-${fieldIndex}`}
      read-only={formReadOnly}
      {...getRowStyle('wrapper')}
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
          <FieldItem
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
