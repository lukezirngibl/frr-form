import React from 'react'
import { processRepeatSection } from '../util'
import { FieldSection } from './FieldSection'
import { CommonThreadProps, FormFieldRepeatSection } from './types'
import { useLanguage, useTranslate } from 'frr-web/lib/theme/language'

type FieldRepeatSection<FormData> = CommonThreadProps<FormData> & {
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
  const language = useLanguage()
  const translate = useTranslate(language)

  if (fieldRepeatSection.isVisible && !fieldRepeatSection.isVisible(data)) {
    return <></>
  }

  const sections = processRepeatSection(fieldRepeatSection, data, translate)

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
