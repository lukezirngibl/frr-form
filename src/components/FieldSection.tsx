import { Link } from 'frr-web/lib/components/Link'
import { P } from 'frr-web/lib/html'
import { MediaQuery } from 'frr-web/lib/theme/theme'
import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { FieldDescription } from './FieldDescription'
import { FieldGroup } from './FieldGroup'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldRepeatGroup } from './FieldRepeatGroup'
import { FieldRepeatSection } from './FieldRepeatSection'
import { FieldRow } from './FieldRow'
import {
  CommonThreadProps,
  FormFieldType,
  FormSection,
  SectionField,
} from './types'

const Container = createStyled('div')
const TitleSpaceMobile = styled.div`
  display: none;
  @media ${MediaQuery.Mobile} {
    display: block;
    margin-bottom: 32px;
  }
`

type FieldSection<FormData> = CommonThreadProps<FormData> & {
  field: FormSection<FormData>
}

export const FieldSection = <FormData extends {}>({
  data,
  errorFieldId,
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

  const commonFieldProps = {
    data,
    errorFieldId,
    formReadOnly,
    onChange,
    showValidation,
    style,
  }

  const renderSectionField = (
    field: SectionField<FormData>,
    fieldIndex: number,
  ) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-section-${fieldIndex}`}
          field={field}
          fieldIndex={fieldIndex}
          {...commonFieldProps}
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

      case FormFieldType.TextInputDescription:
        return (
          <FieldDescription
            field={field}
            fieldIndex={fieldIndex}
            key={`field-${fieldIndex}`}
            formReadOnly={formReadOnly}
          />
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
    <>
      <Container
        key={
          typeof fieldSectionIndex === 'string'
            ? fieldSectionIndex
            : `section-${fieldSectionIndex}`
        }
        readOnly={formReadOnly}
        {...getSectionStyle('wrapper', fieldSection.style?.wrapper || {})}
      >
        {!formReadOnly && fieldSection.introduction && (
          <P
            {...getSectionStyle(
              'introduction',
              fieldSection.style?.introduction || {},
            )}
            readOnly={formReadOnly}
            label={fieldSection.introduction}
          />
        )}

        {formReadOnly && fieldSection.introductionReadOnly && (
          <P
            {...getSectionStyle(
              'introduction',
              fieldSection.style?.introduction || {},
            )}
            readOnly={formReadOnly}
            label={fieldSection.introductionReadOnly}
          />
        )}

        <Container {...getSectionStyle('contentWrapper')}>
          <Container {...getSectionStyle('content')}>
            {fieldSection.title && (
              <P
                {...getSectionStyle('title', fieldSection.style?.title || {})}
                readOnly={formReadOnly}
                label={fieldSection.title}
              />
            )}
            {formReadOnly && !fieldSection.title && <TitleSpaceMobile />}

            {!formReadOnly && fieldSection.description && (
              <P
                {...getSectionStyle('description')}
                label={fieldSection.description}
              />
            )}

            {fieldSection.fields.map(renderSectionField)}
          </Container>

          {!!fieldSection.onEdit && (
            <Container
              {...getSectionRightStyle('wrapper')}
              readOnly={formReadOnly}
            >
              <Link
                icon={{ type: 'edit', style: getSectionRightStyle('editIcon') }}
                label={fieldSection.editLabel}
                onClick={() => fieldSection.onEdit({ dispatch })}
                style={getSectionRightStyle('editLink')}
              />
            </Container>
          )}
        </Container>
      </Container>
    </>
  ) : (
    <></>
  )
}
