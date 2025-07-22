import { useState, useEffect } from "react"
import { StyleSheet, Alert } from "react-native"
import { Button, Input } from "@rneui/base"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/utils/supabase"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import Animated, { FadeIn } from "react-native-reanimated"
import { ThemedView } from "@/components/ThemedView"

export default function Account({ session }: { session: Session | null }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string>("")
  const [website, setWebsite] = useState<string>("")
  const [avatarUrl, setAvatarUrl] = useState<string>("")

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error("No user on the session!")
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session.user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error("No user on the session!")
      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date()
      }
      const { error } = await supabase.from("profiles").upsert(updates)
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<IconSymbol size={180} name="chart.bar.fill" color="#fff" style={styles.headerIcon} />}
    >
      <Animated.View entering={FadeIn.duration(700)}>
        <ThemedView style={styles.container}>
          <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "email" }}
              value={session?.user?.email}
              disabled
              autoCapitalize={"none"}
            />
          </ThemedView>

          <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Username"
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={(text: string) => setUsername(text)}
              value={username}
              placeholder="username"
              autoCapitalize={"none"}
            />
          </ThemedView>

          <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Website"
              leftIcon={{ type: "font-awesome", name: "globe" }}
              onChangeText={(text: string) => setWebsite(text)}
              value={website}
              placeholder="website"
              autoCapitalize={"none"}
            />
          </ThemedView>

          <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title={loading ? "Loading ..." : "Update"}
              onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
              disabled={loading}
            />
          </ThemedView>
          <ThemedView style={[styles.verticallySpaced]}>
            <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  mt20: {
    marginTop: 20
  }
})
