import Typography from 'typography'
import noriegaTheme from 'typography-theme-noriega' // Best one so far
import altonTheme from 'typography-theme-alton' // Like this one's color scheme
import fairyGatesTheme from 'typography-theme-fairy-gates' // Big and spacious - looks very clean even on a mobile device

import irvingTheme from 'typography-theme-irving' // Like the look of this - only issue is the serif body font

import sutroTheme from 'typography-theme-sutro' // Looks great - using the opposite combo of what I was going for

const typography = new Typography(fairyGatesTheme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }
