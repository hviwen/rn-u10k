import { TouchableOpacity, StyleSheet } from "react-native"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { IconSymbol } from "@/components/ui/IconSymbol"
import ParallaxScrollView from "@/components/ParallaxScrollView"

// <MaterialIcons name="settings-input-component" size={24} color="black" />
export default function SettingsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol size={200} color="#ececec" name="rectangle.on.rectangle.angled" style={styles.headerImage} />
      }
    >
      <ThemedView>
        <ThemedText style={styles.text}>Profile Screen</ThemedText>
        <TouchableOpacity
          style={styles.heading}
          activeOpacity={0.8}
          onPress={() => {
            console.log("Navigating to Settings")
          }}
        >
          <ThemedText type="defaultSemiBold" style={styles.text}>
            {"Go to Setting Detail"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#ececec",
    bottom: 90,
    left: -35,
    position: "absolute",
    transform: [{ rotate: "-15deg" }]
  },
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
  }
})
