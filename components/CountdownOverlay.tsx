import { ThemedText } from "@/components/ThemedText"
import { useThemeColor } from "@/hooks/useThemeColor"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Dimensions, StyleSheet } from "react-native"
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

export function CountdownOverlay() {
  const [currentNumber, setCurrentNumber] = useState<number | null>(3)
  const [isVisible, setIsVisible] = useState(true)
  const isMountedRef = useRef(true)

  // Animation values
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)
  const overlayOpacity = useSharedValue(1)

  // Theme colors
  const backgroundColor = useThemeColor({}, "background")
  const textColor = useThemeColor({}, "text")

  const animateNumber = useCallback(
    (number: number) => {
      if (!isMountedRef.current) return

      setCurrentNumber(number)
      scale.value = 0

      // Animate scale from 0 to 1.5 to 1 to 0
      scale.value = withSequence(
        withTiming(1.5, {
          duration: 200,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.quad)
        }),
        withTiming(0.8, {
          duration: 300,
          easing: Easing.in(Easing.quad)
        }),
        withTiming(
          0,
          {
            duration: 200,
            easing: Easing.in(Easing.quad)
          },
          (finished) => {
            if (finished && isMountedRef.current) {
              const nextNumber = number - 1
              if (nextNumber > 0) {
                // Use runOnJS to schedule the next animation from the UI thread
                runOnJS(animateNumber)(nextNumber)
              } else {
                // Hide the entire overlay after the last number
                overlayOpacity.value = withTiming(0, { duration: 300 }, () => {
                  if (isMountedRef.current) {
                    runOnJS(setIsVisible)(false)
                  }
                })
              }
            }
          }
        )
      )
    },
    [scale, overlayOpacity]
  )

  useEffect(() => {
    isMountedRef.current = true
    // Start countdown automatically when component mounts
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        animateNumber(3)
      }
    }, 500) // Small delay before starting

    return () => {
      isMountedRef.current = false
      clearTimeout(timer)
    }
  }, [animateNumber])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const animatedNumberStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value
  }))

  if (!isVisible) {
    return null
  }

  return (
    <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
      <Animated.View style={[styles.numberContainer, { backgroundColor: backgroundColor }, animatedNumberStyle]}>
        <ThemedText style={[styles.countdownNumber, { color: textColor }]}>{currentNumber}</ThemedText>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  numberContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },
  countdownNumber: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 64
  }
})
