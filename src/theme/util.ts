import { FormTheme } from './theme'
import { getUseInlineStyle, getUseCSSStyles } from 'frr-web/lib/theme/util'
import { CSSProperties } from 'frr-web/lib/theme/theme'

export const useInlineStyle = getUseInlineStyle<FormTheme>()
export const useCSSStyles: <C extends keyof FormTheme>(
  theme: FormTheme,
  componentKey: C,
) => (override?: Partial<FormTheme[C]>) => <K extends keyof FormTheme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
) => string = getUseCSSStyles<FormTheme>()