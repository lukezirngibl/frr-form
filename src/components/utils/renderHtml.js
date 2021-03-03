import ReactHtmlParser from 'react-html-parser'

// TODO: Correct viewBox mapping to provide full custom SVG as string
export const renderHtml = text => ReactHtmlParser(text)
