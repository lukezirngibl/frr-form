import React, { ReactNode, useEffect } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { setScrolled, getScrolled } from '../util'

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

const x = {
  person: {
    name: 'asd',
    eyeColor: 'blue',
  },
}

export const FieldScrollableWrapper = <FormData extends {}>(
  props: FieldScrollableWrapperProps<FormData>,
) => {
  /* Styles */
  const theme = useFormTheme()
  const getRowStyle = useInlineStyle(theme, 'row')()

  const width = !isNaN(props.width) ? props.width : 100

  const scrolled = getScrolled()

  const fieldRef = React.createRef<HTMLDivElement>()
  const onScrollToError = () => {
    setScrolled(true)
    setTimeout(() => {
      if (fieldRef.current) {
        setScrolled(false)
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
      {...getRowStyle('item', props.style || {})}
    >
      {props.children}
    </FormScrollToWrapper>
  )
}
