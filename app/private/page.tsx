import { StyleSheet, TouchableOpacity } from "react-native"
import { Link, useRouter } from "expo-router"
import { useUser } from "@clerk/clerk-expo"
import Animated, { FadeIn } from "react-native-reanimated"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"

export default function PrivatePageScreen() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<IconSymbol size={180} name="doc.text.fill" color="#fff" style={styles.headerIcon} />}
    >
      <Animated.View entering={FadeIn.duration(700)}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Private Page</ThemedText>

          <ThemedView style={styles.contentCard}>
            <ThemedText type="subtitle">Secure Content Area</ThemedText>
            <ThemedText>
              This is a private page that requires authentication. Only signed-in users can access this content.
            </ThemedText>

            <ThemedText>User: {user?.emailAddresses[0].emailAddress}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.featuresContainer}>
            <ThemedText type="defaultSemiBold">Available Features:</ThemedText>

            <ThemedView style={styles.featureList}>
              <ThemedView style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#28A745" />
                <ThemedText>Secure document storage</ThemedText>
              </ThemedView>

              <ThemedView style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#28A745" />
                <ThemedText>Private messaging</ThemedText>
              </ThemedView>

              <ThemedView style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#28A745" />
                <ThemedText>Personal dashboard</ThemedText>
              </ThemedView>

              <ThemedView style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#28A745" />
                <ThemedText>Advanced settings</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.navigationButtons}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <IconSymbol name="arrow.left" size={20} color="#fff" />
              <ThemedText style={styles.buttonText}>Back</ThemedText>
            </TouchableOpacity>

            <Link href="/private">
              <ThemedText type="link">Go to Dashboard</ThemedText>
            </Link>
          </ThemedView>
        </ThemedView>
      </Animated.View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20
  },
  headerIcon: {
    position: "absolute",
    bottom: 20,
    right: 20
  },
  contentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 8,
    gap: 12
  },
  featuresContainer: {
    gap: 12
  },
  featureList: {
    gap: 8
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  backButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600"
  }
})
