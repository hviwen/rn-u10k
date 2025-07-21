import { StyleSheet } from "react-native"
import { Image } from "expo-image"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { useLocalSearchParams } from "expo-router"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

export default function UserScreen() {
  const { id } = useLocalSearchParams()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.wrapper}>
        <ThemedText style={styles.text}>User Screen</ThemedText>
        <ThemedText type="defaultSemiBold">User Screen {`${id}`}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: -20,
    left: -20,
    position: "absolute"
  },
  wrapper: {
    gap: 8,
    padding: 20
  },
  text: {
    fontSize: 20,
    color: "#fff"
  }
})
