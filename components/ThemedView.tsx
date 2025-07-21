import { View, type ViewProps } from "react-native"

import { useThemeColor } from "@/hooks/useThemeColor"

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  className?: string
}

export function ThemedView({ style, lightColor, darkColor, className, ...otherProps }: ThemedViewProps) {
  // Check if className contains background color classes
  const hasBackgroundClass = className && className.includes("bg-")

  // Only use theme background color if no Tailwind background class is provided and no explicit colors are set
  const shouldUseThemeBackground = !hasBackgroundClass && !lightColor && !darkColor
  const themeBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background")

  return (
    <View
      style={[shouldUseThemeBackground ? { backgroundColor: themeBackgroundColor } : undefined, style]}
      className={className}
      {...otherProps}
    />
  )
}
