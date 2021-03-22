import { createStyled } from 'frr-web/lib/theme/util'
import React, { ReactNode, useEffect, useRef } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { setScrolled, getScrolled } from '../util'

/*
 * Styled components
 */

const FormScrollToWrapper = createStyled(styled.div<{
  width?: string
  maxwidth?: number
}>`
  position: relative;
  max-width: ${({ maxwidth }) => (!!maxwidth ? `${maxwidth}px` : 'none')};
  width: ${({ width }) => width || '100%'};

  @media (max-width: 768px) {
    
    &:first-of-type {
      margin-top: 0;
    }
  }
`)


/*
 * Render field function
 */

type FieldScrollableWrapperProps = {
  children: ReactNode
  isScrollToError: boolean
  style?: CSSProperties
  width?: number
}

export const FieldScrollableWrapper = (props: FieldScrollableWrapperProps) => {
  /* Styles */
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')()

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
    if (props.isScrollToError && fieldRef.current) {
      // const element = window.getComputedStyle(fieldRef.current)
      // console.log('ELEMENT', element)
      fieldRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [props.isScrollToError])

  /* Render form field */

  return (
    <FormScrollToWrapper
      className="form-field"
      ref={fieldRef}
      width={`calc(${width}% - ${width === 100 ? 0 : 4}px)`}
      {...getRowStyle('item', props.style || {})}
    >
      {props.children}
    </FormScrollToWrapper>
  )
}
