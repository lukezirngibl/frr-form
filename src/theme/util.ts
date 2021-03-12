import { FormTheme } from './theme'
import { getUseInlineStyle, getUseCSSStyles } from 'frr-web/lib/theme/util'

export const useInlineStyle = getUseInlineStyle<FormTheme>()
export const useCSSStyles = getUseCSSStyles<FormTheme>()
