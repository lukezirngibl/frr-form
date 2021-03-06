import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import styled from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { FieldRowItem } from './FieldRowItem'
import { CommonThreadProps, FormFieldRow } from './types'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldRow<FormData>
}

export const FieldRowWrapper = createStyled(styled.div`
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
  errorFieldId,
  field,
  fieldIndex,
  formReadOnly,
  localeNamespace,
  onChange,
  showValidation,
  style,
}: FieldRowProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(style?.row || {})

  return field.some((r) => !r.isVisible || r.isVisible(data)) ? (
    <FieldRowWrapper
      key={`row-${fieldIndex}`}
      {...getRowStyle('wrapper')}
      readOnly={formReadOnly}
    >
      {field.map((fieldItem, fieldItemIndex) => (
        <FieldRowItem
          data={data}
          errorFieldId={errorFieldId}
          field={fieldItem}
          fieldIndex={fieldItemIndex}
          formReadOnly={formReadOnly}
          key={`field-item-${fieldItemIndex}`}
          localeNamespace={localeNamespace}
          onChange={onChange}
          showValidation={showValidation}
          style={style}
        />
      ))}
    </FieldRowWrapper>
  ) : null
}
