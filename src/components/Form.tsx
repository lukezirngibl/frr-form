import {
  Button,
  ButtonType,
  Props as ButtonProps,
} from 'frr-web/lib/components/Button'
import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { FormField } from './FormField'
import { someFormFields } from './functions/some.form'
import { filterByVisibility } from './functions/visible.form'
import {
  DisplayType,
  FormField as FormFieldProps,
  FormFieldType,
  SingleFormField,
} from './types'

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

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export type Props<FormData> = {
  children?: ReactNode
  style?: Partial<FormTheme>
  data: FormData
  display?: DisplayType
  formFields: Array<FormFieldProps<FormData>>
  onSubmit?: (params: { dispatch: any; formState: FormData }) => void
  onInvalidSubmit?: () => void
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
  renderTopChildren,
  renderBottomChildren,
  readOnly,
  isVisible,
}: Props<FormData>) => {
  const dispatch = useDispatch()
  const theme = React.useContext(getThemeContext())
  const getFormStyle = useInlineStyle(theme, 'form')(style?.form || {})

  const [showValidation, setShowValidation] = React.useState(false)

  useEffect(() => {
    setShowValidation(false)
  }, [formFields, data])

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

  console.log('BUTTONS', buttons)

  return !isVisible || isVisible(data) ? (
    <FormWrapper
      style={getFormStyle('wrapper')}
      className={readOnly ? 'readonly' : ''}
    >
      {renderTopChildren && renderTopChildren(data)}

      <FormContent style={getFormStyle('content')}>
        {/* formFields.map(renderFormField) */}

        {formFields.map((field, fieldIndex) => (
          <FormField
            key={`field-${fieldIndex}`}
            data={data}
            field={field}
            fieldIndex={fieldIndex}
            formReadOnly={readOnly}
            onChange={onChange}
            showValidation={showValidation}
            style={style}
          />
        ))}
      </FormContent>

      {renderBottomChildren && renderBottomChildren(data)}

      
      {buttons && (
        <ButtonContainer style={getFormStyle('buttonContainer')}>
          {buttons.map((b, k) => (
            <Button
              {...b}
              key={k}
              dataTestId={
                b.type === ButtonType.Primary
                  ? 'form:primary'
                  : `form:${(
                      b.type || ButtonType.Secondary
                    ).toLowerCase()}:${k + 1}`
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
