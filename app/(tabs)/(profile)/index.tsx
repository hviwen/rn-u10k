import { TouchableOpacity, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Image } from "expo-image"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"

export default function ProfileScreen() {
  const router = useRouter()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      hasBottomTabOverflow={true}
      headerImage={<IconSymbol size={180} name="chart.bar.fill" color="#fff" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.wrapper}>
        <ThemedText style={styles.text}>Profile Screen</ThemedText>
        <TouchableOpacity
          style={styles.heading}
          activeOpacity={0.8}
          onPress={() => {
            // navigate to the details screen
            console.log("Navigating to Profile")
            router.navigate(`/user/${+new Date()}`)
            // You can use the Link component to navigate to a different screen
          }}
        >
          <ThemedText type="defaultSemiBold" style={styles.text}>
            {"Go to User"}
          </ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold" style={styles.text}>
            <Link
              href={{
                pathname: "/(tabs)/(settings)"
              }}
            >
              {"Go to Settings"}
            </Link>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8
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
  },
  headerIcon: {
    height: 178,
    width: 290,
    bottom: 20,
    left: 20,
    position: "absolute"
  },
  stepContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8
  }
})
