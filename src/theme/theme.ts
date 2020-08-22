import * as React from 'react'
import { CSSProperties } from 'styled-components'
import { keys } from 'frr-util/lib/util'

export type Theme = {
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

const defaultTheme: Theme = {
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

export type FormTheme = { [k in keyof Theme]?: Partial<Theme[k]> }

let ThemeVal = defaultTheme
let ThemeContext = React.createContext(defaultTheme)

export const configureTheme = (userTheme: FormTheme) => {
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
  ) as Theme

  ThemeContext = React.createContext(ThemeVal)

  return ThemeContext
}

export const getThemeContext = () => ThemeContext
export const getTheme = () => ThemeVal
