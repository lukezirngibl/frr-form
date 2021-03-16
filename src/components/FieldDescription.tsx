import { TextInputDescription } from 'frr-web/lib/components/TextInputDescription'
import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import styled from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { TextInputDescriptionField } from './types'

type FieldDescriptionProps<FormData> = {
  field: TextInputDescriptionField<FormData>
  fieldIndex: number
  formReadOnly?: boolean
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
export const FieldDescription = <FormData extends {}>({
  field,
  fieldIndex,
  formReadOnly,
}: FieldDescriptionProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')({})

  console.log('FIELD', field)
  return formReadOnly ? null : (
    <FieldRowWrapper key={`row-${fieldIndex}`} {...getRowStyle('wrapper')}>
      <TextInputDescription descriptionLabel={field.descriptionLabel} />
    </FieldRowWrapper>
  )
}
