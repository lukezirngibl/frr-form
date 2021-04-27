import React from 'react'
import { processRepeatGroup } from '../util'
import { FieldGroup } from './FieldGroup'
import { CommonThreadProps, FormFieldRepeatGroup } from './types'

type FieldRepeatGroup<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldRepeatGroup<FormData>
}

// ------------------------------------
export const FieldRepeatGroup = <FormData extends {}>(
  props: FieldRepeatGroup<FormData>,
) => {
  const {
    data,
    field: fieldRepeatGroup,
    fieldIndex: fieldRepeatGroupIndex,
    onChange,
    ...otherProps
  } = props
  if (fieldRepeatGroup.isVisible && !fieldRepeatGroup.isVisible(data)) {
    return <></>
  }

  const groups = processRepeatGroup(fieldRepeatGroup, data)

  return (
    <div key={`repeat-group-${fieldRepeatGroupIndex}`}>
      {groups.map((fieldGroup, fieldGroupIndex) => (
        <FieldGroup
          key={`repeat-group-${fieldRepeatGroupIndex}-${fieldGroupIndex}`}
          onChange={onChange}
          data={data}
          fieldIndex={fieldGroupIndex}
          field={fieldGroup}
          {...otherProps}
        />
      ))}
    </div>
  )
}
