import {
  Button,
  ButtonType,
  Props as ButtonProps,
} from 'frr-web/lib/components/Button'
import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FormTheme, useFormTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { someFormFields } from './functions/some.form'
import { filterByVisibility } from './functions/visible.form'
import { DisplayType, FormFieldType, SingleFormField, FormField } from './types'
import { FieldGroup } from './FieldGroup'
import { FieldRepeatGroup } from './FieldRepeatGroup'
import { FieldRepeatSection } from './FieldRepeatSection'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldSection } from './FieldSection'
import { FieldRow } from './FieldRow'
import { setScrolled, FormLens } from '../util'

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
  children,
  style,
  data,
  display,
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

  const computeFieldError = (f: SingleFormField<FormData>): string | null => {
    const isRequired =
      'required' in f
        ? typeof f.required === 'function'
          ? f.required(data)
          : f.required
        : false

    let val = f.lens.get(data)
    val = typeof val === 'string' ? val.trim() : val

    if (isRequired) {
      if (val === '' || val === null || val === undefined) {
        return 'fieldRequired' as string
      }
    }

    if ('validate' in f && f.validate !== undefined) {
      const l = f.validate(data)
      if (l !== null) {
        return l
      }
    }

    if (f.type === FormFieldType.NumberInput) {
      if ('min' in f && val < f.min) {
        return 'fieldErrorMin' as string
      } else if ('max' in f && val > f.max) {
        return 'fieldErrorMax' as string
      }
    }

    return null
  }

  const isFieldInvalid = (f: SingleFormField<FormData>): boolean =>
    computeFieldError(f) !== null

  const submit = () => {
    if (disableValidation) {
      onSubmit({ dispatch, formState: data })
    } else {
      const visibleFormFields = filterByVisibility(formFields, data)
      const isNotValid = someFormFields(visibleFormFields, isFieldInvalid)

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
    style,
    showValidation,
    onChange: internalOnChange,
    formReadOnly: readOnly,
  }

  const renderField = (field: FormField<FormData>, fieldIndex: number) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-form-${fieldIndex}`}
          fieldIndex={0}
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
              disabled={b.isDisabled ? b.isDisabled(data) : false}
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
