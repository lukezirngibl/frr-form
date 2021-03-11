import React, { ReactNode, useEffect } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { getThemeContext } from '../theme/theme'
import { useInlineStyle } from '../theme/util'

/*
 * Styled components
 */

const FormScrollToWrapper = styled.div<{
  width?: string
  maxwidth?: number
}>`
  position: relative;
  max-width: ${({ maxwidth }) => (!!maxwidth ? `${maxwidth}px` : 'none')};
  width: ${({ width }) => width || '100%'};

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

/*
 * Render field function
 */

type FieldScrollableWrapperProps<FormData> = {
  children: ReactNode
  width?: number
  showValidation: boolean
  style?: CSSProperties
  hasError: boolean
}

let scrolled = false

export const FieldScrollableWrapper = <FormData extends {}>(
  props: FieldScrollableWrapperProps<FormData>,
) => {
  /* Styles */
  const theme = React.useContext(getThemeContext())
  const getRowStyle = useInlineStyle(theme, 'row')()

  const width = !isNaN(props.width) ? props.width : 100

  const fieldRef = React.createRef<HTMLDivElement>()
  const onScrollToError = () => {
    scrolled = true
    setTimeout(() => {
      if (fieldRef.current) {
        scrolled = false
        fieldRef.current.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }, 300)
  }

  useEffect(() => {
    if (props.hasError && !scrolled) {
      onScrollToError()
    }
  }, [scrolled, props.hasError])

  /* Render form field */

  return (
    <FormScrollToWrapper
      ref={fieldRef}
      width={`calc(${width}% - ${width === 100 ? 0 : 4}px)`}
      className="form-field"
      style={{
        ...getRowStyle('item'),
        ...(props.style || {}),
      }}
    >
      {props.children}
    </FormScrollToWrapper>
  )
}
