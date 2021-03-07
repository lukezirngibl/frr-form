import * as React from 'react'
import { CSSProperties } from 'frr-web/lib/theme/theme'
import { keys } from 'frr-util/lib/util'

export type FormTheme = {
  row: {
    wrapper: CSSProperties
    item: CSSProperties
  }
  group: {
    title: CSSProperties
    wrapper: CSSProperties
    description: CSSProperties
  }
  section: {
    title: CSSProperties
    wrapper: CSSProperties
    description: CSSProperties
  }
  sectionRight: {
    wrapper: CSSProperties
    editLink: CSSProperties
    editIcon: CSSProperties
  }
  form: {
    wrapper: CSSProperties
    content: CSSProperties
    buttonContainer: CSSProperties
  }
  fieldReadOnly: {
    wrapper: CSSProperties
    item: CSSProperties
    label: CSSProperties
  }
  icon: {
    edit: {
      svg?: string
      viewBox?: string
    }
  }
}

export const defaultTheme: FormTheme = {
  section: {
    title: {},
    wrapper: {},
    description: {},
  },
  sectionRight: {
    wrapper: {},
    editIcon: {},
    editLink: {},
  },
  row: {
    wrapper: {},
    item: {},
  },
  group: {
    title: {},
    wrapper: {},
    description: {},
  },
  form: {
    wrapper: {},
    content: {},
    buttonContainer: {},
  },
  fieldReadOnly: {
    wrapper: {},
    item: {},
    label: {},
  },
  icon: {
    edit: {},
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
