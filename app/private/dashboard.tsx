import { StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useUser } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"

export default function PrivateDashboardScreen() {
  const { user } = useUser()
  const router = useRouter()

  // Mock data for dashboard
  const stats = [
    { title: "Total Sessions", value: "24", icon: "clock.fill", color: "#007BFF" },
    { title: "Active Projects", value: "8", icon: "folder.fill", color: "#28A745" },
    { title: "Notifications", value: "12", icon: "bell.fill", color: "#FFC107" },
    { title: "Messages", value: "5", icon: "envelope.fill", color: "#DC3545" }
  ]

  const recentActivity = [
    { action: "Logged in", time: "2 hours ago", icon: "person.fill" },
    { action: "Updated profile", time: "1 day ago", icon: "pencil.circle.fill" },
    { action: "Changed password", time: "3 days ago", icon: "key.fill" },
    { action: "Downloaded data", time: "1 week ago", icon: "arrow.down.circle.fill" }
  ]

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<IconSymbol size={180} name="chart.bar.fill" color="#fff" style={styles.headerIcon} />}
    >
      <Animated.View entering={FadeIn.duration(700)}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Dashboard</ThemedText>

          <ThemedView style={styles.welcomeCard}>
            <ThemedText type="subtitle">Welcome back, {user?.firstName || "User"}!</ThemedText>
            <ThemedText>Here's your activity overview</ThemedText>
          </ThemedView>

          <ThemedView style={styles.statsContainer}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Statistics
            </ThemedText>
            <ThemedView style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <Animated.View key={stat.title} entering={SlideInDown.delay(index * 100).duration(500)}>
                  <ThemedView style={[styles.statCard, { borderLeftColor: stat.color }]}>
                    <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
                    <ThemedView style={styles.statContent}>
                      <ThemedText type="title" style={styles.statValue}>
                        {stat.value}
                      </ThemedText>
                      <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </Animated.View>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.activityContainer}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Recent Activity
            </ThemedText>
            <ThemedView style={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <Animated.View key={index} entering={FadeIn.delay(index * 150).duration(500)}>
                  <ThemedView style={styles.activityItem}>
                    <IconSymbol name={activity.icon as any} size={20} color="#007BFF" />
                    <ThemedView style={styles.activityContent}>
                      <ThemedText>{activity.action}</ThemedText>
                      <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </Animated.View>
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.quickActions}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Quick Actions
            </ThemedText>
            <ThemedView style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/private/profile")}>
                <IconSymbol name="person.fill" size={20} color="#fff" />
                <ThemedText style={styles.actionButtonText}>Profile</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/private/settings")}>
                <IconSymbol name="gearshape.fill" size={20} color="#fff" />
                <ThemedText style={styles.actionButtonText}>Settings</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

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
  welcomeCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 8,
    gap: 8
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  statsContainer: {
    gap: 10
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: "45%",
    borderLeftWidth: 4
  },
  statContent: {
    flex: 1
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold"
  },
  statTitle: {
    fontSize: 12,
    opacity: 0.8
  },
  activityContainer: {
    gap: 10
  },
  activityList: {
    gap: 8
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8
  },
  activityContent: {
    flex: 1
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6
  },
  quickActions: {
    gap: 10
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10
  },
  actionButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600"
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
