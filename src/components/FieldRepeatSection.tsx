import { getLanguageContext, getTranslation } from 'frr-web/lib/theme/language'
import React from 'react'
import { createFakeFormLens, processRepeatSection } from '../util'
import { FieldSection } from './FieldSection'
import {
  FieldType,
  FormFieldRepeatSection,
  FormFieldType,
  FormSection,
} from './types'

type FieldRepeatSection<FormData> = FieldType<FormData> & {
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
