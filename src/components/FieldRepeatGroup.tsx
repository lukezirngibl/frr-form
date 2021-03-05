import React from 'react'
import { createFakeFormLens, processRepeatGroup } from '../util'
import { FieldGroup } from './FieldGroup'
import {
  FieldType,
  FormFieldGroup,
  FormFieldRepeatGroup,
  FormFieldType,
} from './types'

type FieldRepeatGroup<FormData> = FieldType<FormData> & {
  field: FormFieldRepeatGroup<FormData>
}

// ------------------------------------
export const FieldRepeatGroup = <FormData extends {}>({
  data,
  field: fieldRepeatGroup,
  fieldIndex: fieldRepeatGroupIndex,
  formReadOnly,
  onChange,
  showValidation,
  style,
}: FieldRepeatGroup<FormData>) => {
  if (fieldRepeatGroup.isVisible && !fieldRepeatGroup.isVisible(data)) {
    return <></>
  }

  const groups = processRepeatGroup(fieldRepeatGroup, data)

  return (
    <div key={`repeat-group-${fieldRepeatGroupIndex}`}>
      {groups.map((fieldGroup, fieldGroupIndex) => (
        <FieldGroup
          data={data}
          field={fieldGroup}
          fieldIndex={fieldGroupIndex}
          formReadOnly={formReadOnly}
          key={`repeat-group-${fieldRepeatGroupIndex}-${fieldGroupIndex}`}
          onChange={onChange}
          showValidation={showValidation}
          style={style}
        />
      ))}
    </div>
  )
}
