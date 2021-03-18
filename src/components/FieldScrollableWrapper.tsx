import React, { ReactNode, useEffect, useRef } from 'react'
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

type FieldScrollableWrapperProps = {
  children: ReactNode
  width?: number
  isScrollToError: boolean
  style?: CSSProperties
}

export const FieldScrollableWrapper = (props: FieldScrollableWrapperProps) => {
  /* Styles */
  const theme = useFormTheme()
  const getRowStyle = useInlineStyle(theme, 'row')()

  const width = !isNaN(props.width) ? props.width : 100

  const fieldRef = React.createRef<HTMLDivElement>()
  // const onScrollToError = () => {
  //   setScrolled(true)
  //   setTimeout(() => {
  //     if (fieldRef.current) {
  //       setScrolled(false)
  //       fieldRef.current.scrollIntoView({
  //         behavior: 'smooth',
  //       })
  //     }
  //   }, 300)
  // }

  useEffect(() => {
    if (props.isScrollToError) {
      if (fieldRef.current) {
        fieldRef.current.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }
  }, [props.isScrollToError])

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
