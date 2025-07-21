import { StyleSheet, TouchableOpacity } from "react-native"
import { useUser } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import Animated, { FadeIn } from "react-native-reanimated"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Collapsible } from "@/components/Collapsible"

export default function PrivateProfileScreen() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<IconSymbol size={180} name="person.circle.fill" color="#fff" style={styles.headerIcon} />}
    >
      <Animated.View entering={FadeIn.duration(700)}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Private Profile</ThemedText>

          <ThemedView style={styles.profileCard}>
            <ThemedText type="subtitle">User Information</ThemedText>

            <ThemedView style={styles.infoRow}>
              <ThemedText type="defaultSemiBold">Email:</ThemedText>
              <ThemedText>{user?.emailAddresses[0].emailAddress}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoRow}>
              <ThemedText type="defaultSemiBold">Name:</ThemedText>
              <ThemedText>
                {user?.firstName || "Not provided"} {user?.lastName || ""}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoRow}>
              <ThemedText type="defaultSemiBold">ID:</ThemedText>
              <ThemedText>{user?.id}</ThemedText>
            </ThemedView>
          </ThemedView>

          <Collapsible title="Account Settings">
            <ThemedView style={styles.settingsContainer}>
              <TouchableOpacity style={styles.settingButton}>
                <IconSymbol name="key.fill" size={20} color="#007BFF" />
                <ThemedText>Change Password</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <IconSymbol name="envelope.fill" size={20} color="#007BFF" />
                <ThemedText>Update Email</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <IconSymbol name="bell.fill" size={20} color="#007BFF" />
                <ThemedText>Notification Preferences</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </Collapsible>

          <ThemedView style={styles.navigationButtons}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <IconSymbol name="arrow.left" size={20} color="#fff" />
              <ThemedText style={styles.buttonText}>Back</ThemedText>
            </TouchableOpacity>

            <Link href="/private">
              <ThemedText type="link">Return to Dashboard</ThemedText>
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
  profileCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 8,
    gap: 12
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150, 150, 150, 0.2)",
    paddingVertical: 8
  },
  settingsContainer: {
    gap: 10,
    marginTop: 10
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8
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
