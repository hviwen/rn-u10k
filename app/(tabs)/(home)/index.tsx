import { Image } from "expo-image"
import { StyleSheet } from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { SignOutButton } from "@/components/SignOutButton"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"

export default function HomeScreen() {
  const { user } = useUser()
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      hasBottomTabOverflow={true}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello World!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <SignedIn>
          <ThemedText>Hello {user?.emailAddresses[0].emailAddress}</ThemedText>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <ThemedText>Sign in</ThemedText>
          </Link>
          <Link href="/(auth)/sign-up">
            <ThemedText>Sign up</ThemedText>
          </Link>
        </SignedOut>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">
          <Link
            href={{
              pathname: "/details/[module]/[id]",
              params: { module: "home", id: "bee" }
            }}
          >
            View first user details (Home)
          </Link>
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Link
            href={{
              pathname: "/details/[module]/[id]",
              params: { module: "home", id: "bacon" }
            }}
          >
            View second user details (Home)
          </Link>
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Link href="/details/home/random-home-detail">View random home detail</Link>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">Private Section:</ThemedText>
        <ThemedText type="defaultSemiBold">
          <Link href="/private">🔒 Access Private Dashboard</Link>
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Link href="/private/profile">👤 Private Profile</Link>
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          <Link href="/private/settings">⚙️ Private Settings</Link>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute"
  }
})
