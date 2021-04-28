import React from 'react'
import { useTranslation } from 'react-i18next'
import { processRepeatSection } from '../util'
import { FieldSection } from './FieldSection'
import { CommonThreadProps, FormFieldRepeatSection } from './types'

type FieldRepeatSection<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldRepeatSection<FormData>
  localeNamespace?: string
}
// ------------------------------------
export const FieldRepeatSection = <FormData extends {}>(
  props: FieldRepeatSection<FormData>,
) => {
  const {
    data,
    field: fieldRepeatSection,
    fieldIndex: fieldRepeatSectionIndex,
    localeNamespace,
    onChange,
    ...otherProps
  } = props
  const { t: translate } = useTranslation(localeNamespace)

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
          key={`repeat-section-${fieldRepeatSectionIndex}-${sectionIndex}`}
          onChange={onChange}
          {...otherProps}
        />
      ))}
    </div>
  )
}
