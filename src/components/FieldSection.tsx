import { P } from 'frr-web/lib/html'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import React from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { createStyled } from 'frr-web/lib/theme/util'
import { Field } from './Field'
import { FieldGroup } from './FieldGroup'
import { FieldRepeatGroup } from './FieldRepeatGroup'
import { FieldRepeatSection } from './FieldRepeatSection'
import {
  FieldType,
  FormFieldGroup,
  FormFieldRepeatGroup,
  FormFieldRepeatSection,
  FormFieldType,
  FormSection,
} from './types'
import { MediaQuery } from 'frr-web/lib/theme/theme'

export const FormSectionWrapper = createStyled('div')

export const MainSectionWrapper = styled.div`
  flex-grow: 1;
`

export const RightSectionWrapper = createStyled('div')

const EditLink = createStyled(styled.a`
  display: flex;
  cursor: pointer;
`)
const EditIcon = createStyled(styled.span`
  height: 20px;
  width: 20px;

  & svg {
    color: currentColor;

    & path,
    circle,
    polygon {
      fill: currentColor;
    }
  }
`)

const EditText = styled.span`
  @media ${MediaQuery.Mobile} {
    display: none;
  }
`

type FieldSection<FormData> = FieldType<FormData> & {
  field: FormSection<FormData>
}

export const FieldSection = <FormData extends {}>({
  data,
  field: fieldSection,
  fieldIndex: fieldSectionIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldSection<FormData>) => {
  // Form styles
  const theme = React.useContext(getThemeContext()) as FormTheme
  const getSectionStyle = useCSSStyles(theme, 'section')(style?.section || {})
  const getSectionRightStyle = useCSSStyles(theme, 'sectionRight')({})

  // Translation
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  // Icon
  const getIcon = useInlineStyle(theme, 'icon')({})
  const editIcon = getIcon('edit')

  const commonFieldProps = {
    data,
    style,
    showValidation,
    onChange,
    formReadOnly,
  }

  // Render
  return !fieldSection.isVisible || fieldSection.isVisible(data) ? (
    <FormSectionWrapper
      key={
        typeof fieldSectionIndex === 'string'
          ? fieldSectionIndex
          : `section-${fieldSectionIndex}`
      }
      style={{
        ...(fieldSection.style?.wrapper || {}),
      }}
      readOnly={formReadOnly}
      cssStyles={getSectionStyle('wrapper')}
    >
      <MainSectionWrapper>
        {fieldSection.title && (
          <P
            style={fieldSection.style?.title || {}}
            cssStyles={getSectionStyle('title')}
            readOnly={formReadOnly}
            label={fieldSection.title}
          />
        )}

        {fieldSection.fields.map((field, fieldIndex) => {
          const fieldType = !Array.isArray(field) && field.type

          return (
            (fieldType === FormFieldType.FormFieldGroup && (
              <FieldGroup
                key={`field-group-${fieldIndex}`}
                field={field as FormFieldGroup<FormData>}
                fieldIndex={fieldIndex}
                {...commonFieldProps}
              />
            )) ||
            (fieldType === FormFieldType.FormFieldRepeatGroup && (
              <FieldRepeatGroup
                key={`field-repeat-group-${fieldIndex}`}
                field={field as FormFieldRepeatGroup<FormData>}
                fieldIndex={fieldIndex}
                {...commonFieldProps}
              />
            )) ||
            (fieldType === FormFieldType.FormFieldRepeatSection && (
              <FieldRepeatSection
                key={`field-repeat-section-${fieldIndex}`}
                field={field as FormFieldRepeatSection<FormData>}
                fieldIndex={fieldIndex}
                {...commonFieldProps}
              />
            )) || (
              <Field
                key={`field-${fieldIndex}`}
                field={field}
                fieldIndex={fieldIndex}
                {...commonFieldProps}
              />
            )
          )
        })}
      </MainSectionWrapper>
      <RightSectionWrapper cssStyles={getSectionRightStyle('wrapper')}>
        {!!fieldSection.onEdit && (
          <EditLink
            onClick={() => {
              console.log('Go to tab', fieldSection.title)
              fieldSection.onEdit()
            }}
            cssStyles={getSectionRightStyle('editLink')}
          >
            {editIcon.svg && (
              <EditIcon
                dangerouslySetInnerHTML={{ __html: editIcon.svg }}
                cssStyles={getSectionRightStyle('editIcon')}
              />
            )}
            <EditText>{translate('edit')}</EditText>
          </EditLink>
        )}
      </RightSectionWrapper>
    </FormSectionWrapper>
  ) : (
    <></>
  )
}
