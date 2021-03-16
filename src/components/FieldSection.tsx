import { Link } from 'frr-web/lib/components/Link'
import { StaticChecklist } from 'frr-web/lib/components/StaticChecklist'
import { P } from 'frr-web/lib/html'
import { createStyled } from 'frr-web/lib/theme/util'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
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

const FormSectionWrapper = createStyled('div')

const MainSectionWrapper = styled.div`
  flex-grow: 1;
`

const RightSectionWrapper = createStyled('div')

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
          <Link
            icon={{ type: 'edit', style: getSectionRightStyle('editIcon') }}
            label="edit"
            onClick={() => fieldSection.onEdit({ dispatch })}
            style={getSectionRightStyle('editLink')}
          />
        )}
      </RightSectionWrapper>
    </FormSectionWrapper>
  ) : (
    <></>
  )
}
