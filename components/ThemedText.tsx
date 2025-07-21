import { Text, type TextProps } from "react-native"

import { useThemeColor } from "@/hooks/useThemeColor"

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link"
  className?: string
}

export function ThemedText({ style, lightColor, darkColor, type = "default", className, ...rest }: ThemedTextProps) {
  // Check if className contains color classes
  const hasColorClass =
    className &&
    className.includes("text-") &&
    !className.match(/text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(\s|$)/) &&
    !className.match(/text-(left|center|right|justify)(\s|$)/)

  // Only use theme color if no Tailwind color class is provided and no explicit colors are set
  const shouldUseThemeColor = !hasColorClass && !lightColor && !darkColor
  const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, "text")

  // Combine Tailwind classes with type-based classes
  const getTypeClasses = () => {
    switch (type) {
      case "title":
        return "text-3xl font-bold leading-8"
      case "defaultSemiBold":
        return "text-base leading-6 font-semibold"
      case "subtitle":
        return "text-xl font-bold"
      case "link":
        return "text-base leading-7 text-blue-600 dark:text-blue-400"
      default:
        return "text-base leading-6"
    }
  }

  const combinedClassName = `${getTypeClasses()} ${className || ""}`.trim()

  return (
    <Text
      style={[shouldUseThemeColor ? { color: themeColor } : undefined, style]}
      className={combinedClassName}
      {...rest}
    />
  )
}
