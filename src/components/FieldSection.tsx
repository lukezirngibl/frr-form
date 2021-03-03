import { P } from 'frr-web/lib/html'
import React from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
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
import { renderHtml } from './utils/renderHtml'

export const FormSectionWrapper = styled.div`
  display: flex;
  margin: 16px 0 8px 0;
`

export const MainSectionWrapper = styled.div`
  flex-grow: 1;
`

export const RightSectionWrapper = styled.div`
  width: auto;
`

const EditLink = styled.a`
  display: flex;
  cursor: pointer;
`
const EditIcon = styled.svg`
  height: 20px;
  width: 20px;
  color: currentColor;

  & path,
  circle,
  polygon {
    fill: currentColor;
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
  const getSectionStyle = createGetStyle(theme, 'section')(style?.section || {})
  const getSectionRightStyle = createGetStyle(
    theme,
    'sectionRight',
  )(style?.section || {})

  // Icon
  const getIcon = createGetStyle(theme, 'icon')({})
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
        ...getSectionStyle('wrapper'),
        ...(fieldSection.style ? fieldSection.style.wrapper || {} : {}),
      }}
    >
      <MainSectionWrapper>
        {fieldSection.title && (
          <P
            style={{
              ...getSectionStyle('title'),
              ...(formReadOnly ? getSectionStyle('titleReadOnly') : {}),
              ...(fieldSection.style ? fieldSection.style.title || {} : {}),
            }}
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
      <RightSectionWrapper style={getSectionRightStyle('wrapper')}>
        {!!fieldSection.onEdit && (
          <EditLink
            onClick={() => {
              console.log('Go to tab', fieldSection.title)
              fieldSection.onEdit()
            }}
            style={getSectionRightStyle('editLink')}
          >
            <EditIcon
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox={editIcon.viewBox}
              style={getSectionRightStyle('editIcon')}
            >
              {editIcon.svg && renderHtml(editIcon.svg)}
            </EditIcon>
            <P label={'edit'} />
          </EditLink>
        )}
      </RightSectionWrapper>
    </FormSectionWrapper>
  ) : (
    <></>
  )
}
