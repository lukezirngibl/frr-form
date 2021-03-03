import React from 'react'
import { createFakeFormLens } from '../util'
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

  // Map groups
  const length = fieldRepeatGroup.length.get(data)
  const groups = Array.from({
    length,
  }).map((_, index) => ({
    type: FormFieldType.FormFieldGroup,
    fields: fieldRepeatGroup.fields.map(repeatGroup => {
      if (Array.isArray(repeatGroup)) {
        return <></>
      } else {
        return {
          ...repeatGroup,
          lens: createFakeFormLens(
            fieldRepeatGroup.lens,
            index,
            fieldRepeatGroup.lens,
          ),
        }
      }
    }),
  })) as Array<FormFieldGroup<FormData>>

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
