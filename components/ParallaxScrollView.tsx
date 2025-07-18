import type { PropsWithChildren, ReactElement } from "react"
import { StyleSheet } from "react-native"
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withSpring,
  WithSpringConfig
} from "react-native-reanimated"

import { ThemedView } from "@/components/ThemedView"
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground"
import { useColorScheme } from "@/hooks/useColorScheme"

const HEADER_HEIGHT = 250

// Animation configuration interface
interface HeaderImageAnimation {
  /** Enable header image animation */
  enabled?: boolean
  /** Rotation range in degrees [pullDown, initial, scrollUp] */
  rotation?: [number, number, number]
  /** Scale range [pullDown, initial, scrollUp] */
  scale?: [number, number, number]
  /** Horizontal translation range [pullDown, initial, scrollUp] */
  translateX?: [number, number, number]
  /** Vertical translation range [pullDown, initial, scrollUp] */
  translateY?: [number, number, number]
  /** Spring animation configuration */
  springConfig?: WithSpringConfig
}

// Component props interface
interface ParallaxScrollViewProps extends PropsWithChildren {
  /** Header image component */
  headerImage: ReactElement
  /** Header background color for light/dark themes */
  headerBackgroundColor: { dark: string; light: string }
  /** Enable bottom tab overflow handling */
  hasBottomTabOverflow?: boolean
  /** Header image animation configuration */
  headerImageAnimation?: HeaderImageAnimation
  /** Custom header height */
  headerHeight?: number
}

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  hasBottomTabOverflow = false,
  headerImageAnimation,
  headerHeight = HEADER_HEIGHT
}: ParallaxScrollViewProps) {
  const colorScheme = useColorScheme() ?? "light"
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  // Handle bottom tab overflow safely
  const bottomTabOverflow = hasBottomTabOverflow ? useBottomTabOverflow() : 0
  // Header background animation (parallax effect)
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          )
        },
        {
          scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight * 1.25], [2, 1, 1])
        }
      ]
    }
  })

  // Header image animation
  const headerImageAnimatedStyle = useAnimatedStyle(() => {
    if (!headerImageAnimation?.enabled) return {}

    const defaultAnimation: Required<HeaderImageAnimation> = {
      enabled: true,
      rotation: [30, 0, -30],
      scale: [1.2, 1, 0.8],
      translateX: [0, 0, 0],
      translateY: [0, 0, 0],
      springConfig: {
        damping: 15,
        mass: 1,
        stiffness: 100
      }
    }

    const config = { ...defaultAnimation, ...headerImageAnimation }

    const transforms: any[] = []

    // Apply rotation if configured
    if (config.rotation && config.rotation.some((val) => val !== 0)) {
      const rotate = interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], config.rotation)
      transforms.push({ rotate: withSpring(`${rotate}deg`, config.springConfig) })
    }

    // Apply scale if configured
    if (config.scale && config.scale.some((val) => val !== 1)) {
      const scale = interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], config.scale)
      transforms.push({ scale: withSpring(scale, config.springConfig) })
    }

    // Apply horizontal translation if configured
    if (config.translateX && config.translateX.some((val) => val !== 0)) {
      const translateX = interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], config.translateX)
      transforms.push({ translateX: withSpring(translateX, config.springConfig) })
    }

    // Apply vertical translation if configured
    if (config.translateY && config.translateY.some((val) => val !== 0)) {
      const translateY = interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], config.translateY)
      transforms.push({ translateY: withSpring(translateY, config.springConfig) })
    }

    return transforms.length > 0 ? { transform: transforms } : {}
  })

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom: bottomTabOverflow }}
        contentContainerStyle={{ paddingBottom: bottomTabOverflow }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme], height: headerHeight },
            headerAnimatedStyle
          ]}
        >
          {headerImageAnimation?.enabled ? (
            <Animated.View style={[styles.headerImageWrapper, headerImageAnimatedStyle]}>{headerImage}</Animated.View>
          ) : (
            headerImage
          )}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    overflow: "hidden"
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden"
  },
  headerImageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
})
