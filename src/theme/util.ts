import { FormTheme } from './theme'

export const createGetStyle = <C extends keyof FormTheme>(
  theme: FormTheme,
  componentKey: C,
) => (override?: Partial<FormTheme[C]>) => <K extends keyof FormTheme[C]>(
  elementKey: K,
): FormTheme[C][K] => {
  return {
    ...theme[componentKey][elementKey],
    ...(override && override[elementKey] ? override[elementKey] : {}),
  }
}
