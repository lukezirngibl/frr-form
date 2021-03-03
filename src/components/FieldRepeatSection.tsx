import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import React from 'react'
import { createFakeFormLens } from '../util'
import { FieldSection } from './FieldSection'
import {
  FieldType,
  FormFieldRepeatSection,
  FormFieldType,
  FormSection,
} from './types'

interface FieldRepeatSection<FormData> extends FieldType<FormData> {
  field: FormFieldRepeatSection<FormData>
}
// ------------------------------------
export const FieldRepeatSection = <FormData extends {}>({
  data,
  field: fieldRepeatSection,
  fieldIndex: fieldRepeatSectionIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldRepeatSection<FormData>) => {
  // Translation
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  if (fieldRepeatSection.isVisible && !fieldRepeatSection.isVisible(data)) {
    return <></>
  }

  const length = fieldRepeatSection.length.get(data)
  const sections = Array.from({
    length,
  }).map((_, index) => {
    const title = fieldRepeatSection.title
      ? fieldRepeatSection.title({
          index,
          translate,
        })
      : `${index + 1}`
    return {
      type: FormFieldType.FormSection,
      fields: [
        {
          type: FormFieldType.FormFieldGroup,
          title,
          fields: fieldRepeatSection.fields.map((repeatSectionField, fi) => {
            if (Array.isArray(repeatSectionField)) {
              return <></>
            } else {
              return {
                ...repeatSectionField,
                lens: createFakeFormLens(
                  fieldRepeatSection.lens,
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

  return (
    <div key={`repeat-section-${fieldRepeatSectionIndex}`}>
      {sections.map((section, sectionIndex) => (
        <FieldSection
          data={data}
          field={section}
          fieldIndex={sectionIndex}
          formReadOnly={formReadOnly}
          key={`repeat-section-${fieldRepeatSectionIndex}-${sectionIndex}`}
          onChange={onChange}
          showValidation={showValidation}
          style={style}
        />
      ))}
    </div>
  )
}
