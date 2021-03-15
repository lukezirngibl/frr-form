import { P } from 'frr-web/lib/html'
import React from 'react'
import styled from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { createStyled } from 'frr-web/lib/theme/util'
import { useLanguage, useTranslate } from 'frr-web/lib/theme/language'
import { FieldGroup } from './FieldGroup'
import { FieldRepeatGroup } from './FieldRepeatGroup'
import { FieldRepeatSection } from './FieldRepeatSection'
import {
  CommonThreadProps,
  SectionField,
  FormFieldType,
  FormSection,
} from './types'
import { MediaQuery } from 'frr-web/lib/theme/theme'
import { useDispatch } from 'react-redux'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldRow } from './FieldRow'
import { StaticChecklist } from 'frr-web/lib/components/StaticChecklist'

const FormSectionWrapper = createStyled('div')

const MainSectionWrapper = styled.div`
  flex-grow: 1;
`

const RightSectionWrapper = createStyled('div')

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

type FieldSection<FormData> = CommonThreadProps<FormData> & {
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
  const dispatch = useDispatch()
  // Form styles
  const theme = useFormTheme()
  const getSectionStyle = useCSSStyles(theme, 'section')(style?.section || {})
  const getSectionRightStyle = useCSSStyles(theme, 'sectionRight')({})

  // Translation
  const language = useLanguage()
  const translate = useTranslate(language)

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

  const renderSectionField = (
    field: SectionField<FormData>,
    fieldIndex: number,
  ) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-section-${fieldIndex}`}
          fieldIndex={fieldIndex}
          {...commonFieldProps}
          field={field}
        />
      )
    }

    switch (field.type) {
      case FormFieldType.FormFieldGroup: {
        return (
          <FieldGroup
            key={`field-group-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
      }

      case FormFieldType.FormFieldRepeatGroup: {
        return (
          <FieldRepeatGroup
            key={`field-repeat-group-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
      }

      case FormFieldType.FormFieldRepeatSection: {
        return (
          <FieldRepeatSection
            key={`field-repeat-section-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
      }

      case FormFieldType.MultiInput:
        return (
          <FieldMultiInput
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      case FormFieldType.Static:
        return (
          <StaticChecklist key={`field-${fieldIndex}`} {...field.checklist} />
        )

      default:
        return (
          <FieldRow
            key={`field-${fieldIndex}`}
            field={[field]}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
    }
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
      {...getSectionStyle('wrapper')}
    >
      <MainSectionWrapper>
        {fieldSection.title && (
          <P
            style={fieldSection.style?.title || {}}
            {...getSectionStyle('title')}
            readOnly={formReadOnly}
            label={fieldSection.title}
          />
        )}
        {!formReadOnly && fieldSection.description && (
          <P
            {...getSectionStyle('description')}
            label={fieldSection.description}
          />
        )}

        {fieldSection.fields.map(renderSectionField)}
      </MainSectionWrapper>
      <RightSectionWrapper
        {...getSectionRightStyle('wrapper')}
        readOnly={formReadOnly}
      >
        {!!fieldSection.onEdit && (
          <EditLink
            onClick={() => {
              fieldSection.onEdit({ dispatch })
            }}
            {...getSectionRightStyle('editLink')}
          >
            {editIcon.style.svg && (
              <EditIcon
                dangerouslySetInnerHTML={{ __html: editIcon.style.svg }}
                {...getSectionRightStyle('editIcon')}
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
