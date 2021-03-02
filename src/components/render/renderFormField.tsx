import { P } from 'frr-web/lib/html'
import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import React from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../../theme/theme'
import { createGetStyle } from '../../theme/util'
import { createFakeFormLens } from '../../util'
import {
  FormField,
  FormFieldGroup,
  FormFieldRepeatGroup,
  FormFieldRepeatSection,
  FormFieldRow,
  FormFieldType,
  FormSection,
  SectionField,
  SingleFormField,
} from '../types'
import { renderHtml } from '../utils/renderHtml'
import { getRenderFormFieldItem } from './renderFormFieldItem'
import { getRenderReadOnlyFormFieldItem } from './renderReadOnlyFieldItem'

export const FormFieldGroupWrapper = styled.div`
  margin-bottom: 8px;
`

export const FormSectionWrapper = styled.div`
  display: flex;
  margin: 16px 0 8px 0;
`

export const FormFieldRowWrapper = styled.div`
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

type FormFieldsProps<FormData> = {
  data: FormData
  formReadOnly: boolean
  onChange: (formState: FormData) => void
  showValidation: boolean
  style: Partial<FormTheme> | undefined
}

// ------------------------------------
export const getRenderFormField = <FormData extends {}>({
  data,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FormFieldsProps<FormData>) => (
  field: FormField<FormData>,
  index: number,
) => {
  // Form styles
  const theme = React.useContext(getThemeContext()) as FormTheme
  const getSectionStyle = createGetStyle(theme, 'section')(style?.section || {})
  const getSectionRightStyle = createGetStyle(
    theme,
    'sectionRight',
  )(style?.section || {})
  const getGroupStyle = createGetStyle(theme, 'group')(style?.group || {})
  const getRowStyle = createGetStyle(theme, 'row')(style?.row || {})

  const getIcon = createGetStyle(theme, 'icon')({})
  const editIcon = getIcon('edit')

  // Translation
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const renderFieldItem = formReadOnly
    ? getRenderReadOnlyFormFieldItem({ data, style })
    : getRenderFormFieldItem({ data, style, onChange, showValidation })

  /*
   * Render field
   */

  const renderFieldRow = (
    formFieldRow: FormFieldRow<FormData>,
    key: number | string,
  ) =>
    formFieldRow.some(r => !r.isVisible || r.isVisible(data)) ? (
      <FormFieldRowWrapper
        key={key}
        style={{
          ...getRowStyle('wrapper'),
          ...(formReadOnly ? getRowStyle('wrapperReadonly') : {}),
        }}
      >
        {formFieldRow.map(renderFieldItem((1 / formFieldRow.length) * 100))}
      </FormFieldRowWrapper>
    ) : null

  const renderField = (
    formField: FormField<FormData>,
    formFieldIndex: number,
  ) => {
    return Array.isArray(formField) ? (
      renderFieldRow(formField as FormFieldRow<FormData>, formFieldIndex)
    ) : (
      <FormFieldRowWrapper
        style={getRowStyle('wrapper')}
        key={`field-${formFieldIndex}`}
      >
        {renderFieldItem()(
          formField as SingleFormField<FormData>,
          formFieldIndex,
        )}
      </FormFieldRowWrapper>
    )
  }

  /*
   * Render group field
   */

  const renderGroup = (
    group: FormFieldGroup<FormData>,
    groupIndex: number | string,
  ) =>
    !group.isVisible || group.isVisible(data) ? (
      <FormFieldGroupWrapper
        key={typeof groupIndex === 'string' ? groupIndex : `group-${index}`}
        style={{
          ...getGroupStyle('wrapper'),
          ...(group.style ? group.style.wrapper || {} : {}),
        }}
      >
        {group.title && (
          <P
            style={{
              ...getGroupStyle('title'),
              ...(group.style ? group.style.title || {} : {}),
            }}
            label={group.title}
          />
        )}
        {group.description && (
          <P
            style={{
              ...getGroupStyle('description'),
              ...(group.style ? group.style.description || {} : {}),
            }}
            label={group.description}
          />
        )}
        {group.fields.map(renderField)}
      </FormFieldGroupWrapper>
    ) : (
      <></>
    )

  /*
   * Render repeating section field
   */

  const renderRepeatSection = (
    repeatSection: FormFieldRepeatSection<FormData>,
    repeatSectionIndex: number | string,
  ) => {
    if (repeatSection.isVisible && !repeatSection.isVisible(data)) {
      return <></>
    }

    const length = repeatSection.length.get(data)

    const sections = Array.from({
      length,
    }).map((_, index) => {
      const title = repeatSection.title
        ? repeatSection.title({ index, translate })
        : `${index + 1}`
      return {
        type: FormFieldType.FormSection,
        fields: [
          {
            type: FormFieldType.FormFieldGroup,
            title,
            fields: repeatSection.fields.map((repeatSectionField, fi) => {
              if (Array.isArray(repeatSectionField)) {
                return <></>
              } else {
                return {
                  ...repeatSectionField,
                  lens: createFakeFormLens(
                    repeatSection.lens,
                    index,
                    repeatSectionField.lens,
                  ),
                }
              }
            }),
          },
        ],
      }
    }) as Array<FormSection<FormData>>

    return sections.map((section, sectionIndex) =>
      renderFieldSection(
        section,
        `repeat-section-${repeatSectionIndex}-${sectionIndex}`,
      ),
    )
  }

  /*
   * Render repeating group field
   */

  const renderRepeatGroup = (
    repeatGroup: FormFieldRepeatGroup<FormData>,
    repeatGroupIndex: number | string,
  ) => {
    if (repeatGroup.isVisible && !repeatGroup.isVisible(data)) {
      return <></>
    }
    const length = repeatGroup.length.get(data)

    const groups = Array.from({
      length,
    }).map((_, index) => ({
      type: FormFieldType.FormFieldGroup,
      fields: repeatGroup.fields.map(repeatGroup => {
        if (Array.isArray(repeatGroup)) {
          return <></>
        } else {
          return {
            ...repeatGroup,
            lens: createFakeFormLens(repeatGroup.lens, index, repeatGroup.lens),
          }
        }
      }),
    })) as Array<FormFieldGroup<FormData>>

    return groups.map((group, groupIndex) =>
      renderGroup(group, `repeat-group-${repeatGroupIndex}-${groupIndex}`),
    )
  }

  /*
   * Render section item field
   */

  const renderFieldSectionItem = (
    item: SectionField<FormData>,
    itemIndex: number,
  ) => {
    const itemType = !Array.isArray(item) && item.type

    return (
      (itemType === FormFieldType.FormFieldGroup &&
        renderGroup(item as FormFieldGroup<FormData>, itemIndex)) ||
      (itemType === FormFieldType.FormFieldRepeatGroup &&
        renderRepeatGroup(item as FormFieldRepeatGroup<FormData>, itemIndex)) ||
      (itemType === FormFieldType.FormFieldRepeatSection &&
        renderRepeatSection(
          item as FormFieldRepeatSection<FormData>,
          itemIndex,
        )) ||
      renderField(item, itemIndex)
    )
  }

  /*
   * Render section field
   */

  const renderFieldSection = (
    section: FormSection<FormData>,
    sectionIndex: number | string,
  ) => {
    return !section.isVisible || section.isVisible(data) ? (
      <FormSectionWrapper
        key={
          typeof sectionIndex === 'string'
            ? sectionIndex
            : `section-${sectionIndex}`
        }
        style={{
          ...getSectionStyle('wrapper'),
          ...(section.style ? section.style.wrapper || {} : {}),
        }}
      >
        <MainSectionWrapper>
          {section.title && (
            <P
              style={{
                ...getSectionStyle('title'),
                ...(formReadOnly ? getSectionStyle('titleReadonly') : {}),
                ...(section.style ? section.style.title || {} : {}),
              }}
              label={section.title}
            />
          )}

          {section.fields.map(renderFieldSectionItem)}
        </MainSectionWrapper>
        <RightSectionWrapper style={getSectionRightStyle('wrapper')}>
          {!!section.onEdit && (
            <EditLink
              onClick={() => {
                console.log('Go to tab', section.title)
                section.onEdit()
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
              {translate('edit')}
            </EditLink>
          )}
        </RightSectionWrapper>
      </FormSectionWrapper>
    ) : (
      <></>
    )
  }

  /*
   * return related field group
   */

  const type = !Array.isArray(field) && field.type

  return (
    (type === FormFieldType.FormFieldGroup &&
      renderGroup(field as FormFieldGroup<FormData>, index)) ||
    (type === FormFieldType.FormSection &&
      renderFieldSection(field as FormSection<FormData>, index)) ||
    (type === FormFieldType.FormFieldRepeatGroup &&
      renderRepeatGroup(field as FormFieldRepeatGroup<FormData>, index)) ||
    (type === FormFieldType.FormFieldRepeatSection &&
      renderRepeatSection(field as FormFieldRepeatSection<FormData>, index)) ||
    // Render single value field
    renderField(field as FormField<FormData>, index)
  )
}
