import { StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { useUser } from "@clerk/clerk-expo"

import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { SignOutButton } from "@/components/SignOutButton"
import { IconSymbol } from "@/components/ui/IconSymbol"

export default function PrivateHomeScreen() {
  const { user } = useUser()
  const router = useRouter()

  const handleBackHome = () => {
    router.dismissAll()
    router.navigate("/")
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      hasBottomTabOverflow={false}
      headerImage={<IconSymbol size={200} name="lock.fill" color="#fff" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Private Dashboard</ThemedText>

        <ThemedView style={styles.userInfoContainer}>
          <ThemedText type="subtitle">Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress}</ThemedText>
          <ThemedText>This is your private dashboard area.</ThemedText>
        </ThemedView>

        <ThemedView style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/private/profile")}>
            <IconSymbol name="person.fill" size={24} color="#fff" />
            <ThemedText style={styles.buttonText}>Profile</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/private/settings")}>
            <IconSymbol name="gearshape.fill" size={24} color="#fff" />
            <ThemedText style={styles.buttonText}>Settings</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/private/dashboard")}>
            <IconSymbol name="chart.bar.fill" size={24} color="#fff" />
            <ThemedText style={styles.buttonText}>Dashboard</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.actionsContainer}>
          <ThemedText type="link" onPress={() => handleBackHome()}>
            Return to Home
          </ThemedText>
          <SignOutButton />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 16
  },
  headerIcon: {
    position: "absolute",
    bottom: 20,
    right: 20
  },
  userInfoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 8,
    gap: 8
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10
  },
  navButton: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minWidth: "30%",
    flexDirection: "row",
    gap: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600"
  },
  actionsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})
