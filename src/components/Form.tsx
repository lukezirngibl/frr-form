import {
  Button,
  ButtonType,
  Props as ButtonProps,
} from 'frr-web/lib/components/Button'
import React, { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { FormTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
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

export const FormFieldRowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

export const FormFieldWrapper = styled.div<{
  width: string
  maxwidth?: number
}>`
  position: relative;
  max-width: ${({ maxwidth }) => (!!maxwidth ? `${maxwidth}px` : 'none')};
  width: ${({ width }) => width};

  @media (max-width: 768px) {
    width: 100% !important;
    margin-top: 12px;
    margin-left: 0 !important;
    margin-right: 0 !important;

    &:first-of-type {
      margin-top: 0;
    }
  }
`

export const FormFieldGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  flex-shrink: 0;
`

export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 8px 0;
  flex-shrink: 0;
`

export type Props<FormData> = {
  children?: ReactNode
  style?: Partial<FormTheme>
  data: FormData
  display?: DisplayType
  dispatch: (func: any) => void
  formFields: Array<FormFieldProps<FormData>>
  onSubmit?: ({ dispatch }) => void
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
  dispatch,
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
  const theme = React.useContext(getThemeContext())
  const getFormStyle = createGetStyle(theme, 'form')(style?.form || {})

  const [showValidation, setShowValidation] = React.useState(false)
  // const [scrollToRef, setScrollToRef] = React.useState<
  //   React.RefObject<HTMLDivElement>
  // >()

  // useLayoutEffect(() => {
  //   if (scrollToRef.current) {
  //     console.log(scrollToRef.current)
  //   }
  // }, [scrollToRef])

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
      onSubmit({ dispatch })
    }
  }

  return !isVisible || isVisible(data) ? (
    <FormWrapper
      style={getFormStyle('wrapper')}
      className={readOnly ? 'read-only' : ''}
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
              dataTestId={`form:${(
                b.type || ButtonType.Secondary
              ).toLowerCase()}:${k + 1}`}
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
