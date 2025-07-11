import { StyleSheet } from "react-native"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { CountdownOverlay } from "@/components/CountdownOverlay"
import { useLocalSearchParams } from "expo-router"

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()
  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol size={200} color="#ececec" name="iphone.badge.exclamationmark" style={styles.headerImage} />
        }
      >
        <ThemedView>
          <ThemedText type="defaultSemiBold">Detail Screen {`${id}`}</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
      <CountdownOverlay />
    </>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#ececec",
    bottom: 90,
    left: -35,
    position: "absolute",
    transform: [{ rotate: "-15deg" }]
  }
})
