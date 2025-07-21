import { StyleSheet, TouchableOpacity, Switch } from "react-native"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import Animated, { FadeIn } from "react-native-reanimated"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Collapsible } from "@/components/Collapsible"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function PrivateSettingsScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()

  // State for various settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === "dark")
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<IconSymbol size={180} name="gearshape.fill" color="#fff" style={styles.headerIcon} />}
    >
      <Animated.View entering={FadeIn.duration(700)}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Private Settings</ThemedText>

          <Collapsible title="Notifications">
            <ThemedView style={styles.settingsSection}>
              <ThemedView style={styles.settingRow}>
                <ThemedView style={styles.settingInfo}>
                  <IconSymbol name="bell.fill" size={20} color="#007BFF" />
                  <ThemedText>Push Notifications</ThemedText>
                </ThemedView>
                <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
              </ThemedView>

              <ThemedView style={styles.settingRow}>
                <ThemedView style={styles.settingInfo}>
                  <IconSymbol name="envelope.fill" size={20} color="#007BFF" />
                  <ThemedText>Email Notifications</ThemedText>
                </ThemedView>
                <Switch value={analyticsEnabled} onValueChange={setAnalyticsEnabled} />
              </ThemedView>
            </ThemedView>
          </Collapsible>

          <Collapsible title="Privacy & Security">
            <ThemedView style={styles.settingsSection}>
              <ThemedView style={styles.settingRow}>
                <ThemedView style={styles.settingInfo}>
                  <IconSymbol name="location.fill" size={20} color="#007BFF" />
                  <ThemedText>Location Services</ThemedText>
                </ThemedView>
                <Switch value={locationEnabled} onValueChange={setLocationEnabled} />
              </ThemedView>

              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="key.fill" size={20} color="#007BFF" />
                <ThemedText>Change Password</ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="shield.fill" size={20} color="#007BFF" />
                <ThemedText>Two-Factor Authentication</ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#666" />
              </TouchableOpacity>
            </ThemedView>
          </Collapsible>

          <Collapsible title="Appearance">
            <ThemedView style={styles.settingsSection}>
              <ThemedView style={styles.settingRow}>
                <ThemedView style={styles.settingInfo}>
                  <IconSymbol name="moon.fill" size={20} color="#007BFF" />
                  <ThemedText>Dark Mode</ThemedText>
                </ThemedView>
                <Switch value={darkModeEnabled} onValueChange={setDarkModeEnabled} />
              </ThemedView>
            </ThemedView>
          </Collapsible>

          <Collapsible title="Data & Storage">
            <ThemedView style={styles.settingsSection}>
              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="arrow.down.circle.fill" size={20} color="#007BFF" />
                <ThemedText>Download My Data</ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="trash.fill" size={20} color="#FF3B30" />
                <ThemedText style={styles.dangerText}>Clear Cache</ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="xmark.circle.fill" size={20} color="#FF3B30" />
                <ThemedText style={styles.dangerText}>Delete Account</ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#666" />
              </TouchableOpacity>
            </ThemedView>
          </Collapsible>

          <ThemedView style={styles.navigationButtons}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <IconSymbol name="arrow.left" size={20} color="#fff" />
              <ThemedText style={styles.buttonText}>Back</ThemedText>
            </TouchableOpacity>
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
  settingsSection: {
    gap: 15,
    marginTop: 10
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150, 150, 150, 0.2)"
  },
  dangerText: {
    color: "#FF3B30"
  },
  navigationButtons: {
    marginTop: 20
  },
  backButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600"
  }
})
