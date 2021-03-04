import { FormTheme } from './theme'
import { getUseInlineStyle, getUseCSSStyle } from 'frr-web/lib/theme/util'

export const useInlineStyle = getUseInlineStyle<FormTheme>()
export const useCSSStyle = getUseCSSStyle<FormTheme>()