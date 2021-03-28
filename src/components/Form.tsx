import {
  Button,
  ButtonType,
  Props as ButtonProps,
} from 'frr-web/lib/components/Button'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FormTheme, useFormTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { FormLens, setScrolled } from '../util'
import { FieldDescription } from './FieldDescription'
import { FieldGroup } from './FieldGroup'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldRepeatGroup } from './FieldRepeatGroup'
import { FieldRepeatSection } from './FieldRepeatSection'
import { FieldRow } from './FieldRow'
import { FieldSection } from './FieldSection'
import { mapFormFields } from './functions/map.form'
import { someFormFields } from './functions/some.form'
import { filterByVisibility } from './functions/visible.form'
import { computeFieldError } from './hooks/useFormFieldError'
import { DisplayType, FormField, FormFieldType, SingleFormField } from './types'

export type FormProps<FormData> = {
  children?: ReactNode
  style?: Partial<FormTheme>
  data: FormData
  disableValidation?: boolean
  dataTestId?: string
  display?: DisplayType
  formFields: Array<FormField<FormData>>
  onSubmit?: (params: { dispatch: any; formState: FormData }) => void
  onInvalidSubmit?: () => void
  onChangeWithLens?: (lens: FormLens<FormData, any>, value: any) => void
  onChange: (formState: FormData) => void
  buttons?: Array<
    Omit<ButtonProps, 'onClick'> & {
      onClick: (params: { submit: () => void; dispatch: any }) => void
      isDisabled?: (d: FormData) => boolean
    }
  >
  renderTopChildren?: (f: FormData) => ReactNode
  renderBottomChildren?: (f: FormData) => ReactNode
  readOnly?: boolean
  isVisible?: (formData: FormData) => boolean
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Form = <FormData extends {}>({
  style,
  data,
  formFields,
  onSubmit,
  onInvalidSubmit,
  onChange,
  buttons,
  disableValidation,
  renderTopChildren,
  renderBottomChildren,
  onChangeWithLens,
  readOnly,
  dataTestId,
  isVisible,
}: FormProps<FormData>) => {
  const dispatch = useDispatch()
  const theme = useFormTheme()
  const getFormStyle = useInlineStyle(theme, 'form')(style?.form || {})

  const [showValidation, setShowValidation] = React.useState(false)

  useEffect(() => {
    setShowValidation(false)
    setScrolled(false)
  }, [formFields])

  const isFieldInvalid = (field: SingleFormField<FormData>): boolean => {
    const value = field.lens.get(data)
    return computeFieldError({ value, data, field }).error !== null
  }
  const getFieldError = (
    field: SingleFormField<FormData>,
  ): { error: string | null; fieldId: string } => {
    const value = field.lens.get(data)
    return computeFieldError({ value, data, field })
  }

  const [errorFieldId, setErrorFieldId] = useState(null)

  const submit = () => {
    setErrorFieldId(null)
    if (disableValidation) {
      onSubmit({ dispatch, formState: data })
    } else {
      const visibleFormFields = filterByVisibility(formFields, data)
      const errors = mapFormFields(visibleFormFields, getFieldError).filter(
        (fieldError) => !!fieldError.error,
      )
      const isNotValid = someFormFields(visibleFormFields, isFieldInvalid)

      console.log('ERRORS', errors)

      if (errors.length) {
        setErrorFieldId(errors[0].fieldId)
      }

      if (isNotValid) {
        setShowValidation(true)
        if (onInvalidSubmit) {
          onInvalidSubmit()
        }
      } else if (typeof onSubmit === 'function') {
        onSubmit({ dispatch, formState: data })
      }
    }
  }

  const internalOnChange = (lens: FormLens<FormData, any>, value: any) => {
    if (onChangeWithLens) {
      onChangeWithLens(lens, value)
    } else {
      onChange(lens.set(value)(data))
    }
  }

  // console.log('formData: ', data)

  const commonFieldProps = {
    data,
    errorFieldId,
    formReadOnly: readOnly,
    onChange: internalOnChange,
    showValidation,
    style,
  }

  const renderField = (field: FormField<FormData>, fieldIndex: number) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-form-${fieldIndex}`}
          fieldIndex={0}
          field={field}
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
            formReadOnly={readOnly}
          />
        )

      case FormFieldType.FormSection:
        return (
          <FieldSection
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
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

  return !isVisible || isVisible(data) ? (
    <FormWrapper
      {...getFormStyle('wrapper')}
      className={readOnly ? 'readonly' : ''}
      data-test-id={dataTestId}
    >
      {renderTopChildren && renderTopChildren(data)}

      <FormContent {...getFormStyle('content')}>
        {/* formFields.map(renderFormField) */}

        {formFields.map(renderField)}
      </FormContent>

      {renderBottomChildren && renderBottomChildren(data)}

      {buttons && (
        <ButtonContainer {...getFormStyle('buttonContainer')}>
          {buttons.map((b, k) => (
            <Button
              {...b}
              key={k}
              dataTestId={
                b.type === ButtonType.Primary
                  ? 'form:primary'
                  : `form:${(b.type || ButtonType.Secondary).toLowerCase()}:${
                      k + 1
                    }`
              }
              disabled={b.isDisabled ? b.isDisabled(data) : !!b.disabled}
              onClick={() => b.onClick({ submit, dispatch })}
            />
          ))}
        </ButtonContainer>
      )}
    </FormWrapper>
  ) : (
    <></>
  )
}
