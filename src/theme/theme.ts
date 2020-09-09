import * as React from 'react'
import { CSSProperties } from 'styled-components'
import { keys } from 'frr-util/lib/util'

export type FormTheme = {
  form: {
    row: {
      wrapper: CSSProperties
    }
    group: {
      title: CSSProperties
      wrapper: CSSProperties
    }
    section: {
      title: CSSProperties
      wrapper: CSSProperties
    }
    form: {
      wrapper: CSSProperties
      content: CSSProperties
    }
  }
}

const defaultTheme: FormTheme = {
  form: {
    section: {
      title: {},
      wrapper: {},
    },
    row: {
      wrapper: {},
    },
    group: {
      title: {},
      wrapper: {},
    },
    form: {
      wrapper: {},
      content: {},
    },
  },
}

export type FormThemeConfig = { [k in keyof FormTheme]?: Partial<FormTheme[k]> }

let ThemeVal = defaultTheme
let ThemeContext = React.createContext(defaultTheme)

export const configureTheme = (userTheme: FormThemeConfig) => {
  ThemeVal = keys(defaultTheme).reduce(
    (acc1, k1) => ({
      ...acc1,
      [k1]: keys(defaultTheme[k1]).reduce(
        (acc2, k2) => ({
          ...acc2,
          [k2]: {
            ...((defaultTheme[k1][k2] as unknown) as any),
            ...(userTheme[k1] && ((userTheme[k1] as unknown) as any)[k2]
              ? ((userTheme[k1] as unknown) as any)[k2]
              : {}),
          },
        }),
        {},
      ),
    }),
    {},
  ) as FormTheme

  ThemeContext = React.createContext(ThemeVal)

  return ThemeContext
}

export const getThemeContext = () => ThemeContext
export const getTheme = () => ThemeVal
