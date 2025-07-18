import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { router } from "expo-router"
import { StyleSheet, TouchableOpacity } from "react-native"

export default function SettingsScreen() {
  const handleNavigateToDetails = () => {
    console.log("Navigating to Settings Detail")
    const targetId = Math.floor(Math.random() * 1000).toString()
    router.push(`/details/settings/${targetId}`)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      hasBottomTabOverflow={true}
      headerImageAnimation={{
        enabled: true,
        rotation: [120, 0, 0],
        translateX: [0, 0, 375],
        scale: [1.8, 1, 0.15],
        springConfig: {
          damping: 12,
          mass: 1,
          stiffness: 80
        }
      }}
      headerImage={<IconSymbol size={146} color="#fff" name="gearshape.fill" />}
    >
      <ThemedView>
        <ThemedText style={styles.text}>Profile Screen</ThemedText>
        <TouchableOpacity style={styles.heading} activeOpacity={0.8} onPress={handleNavigateToDetails}>
          <ThemedText type="defaultSemiBold" style={styles.text}>
            {"Go to Setting Detail"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#fff"
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  IconSymbolCustomStyle: {
    bottom: 0,
    right: 0
  }
})
