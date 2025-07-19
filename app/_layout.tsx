import { ClerkProvider } from "@clerk/clerk-expo"
import { tokenCache } from "@clerk/clerk-expo/token-cache"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, StyleSheet } from "react-native"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"

function LogoTitle() {
  return <Image style={styles.image} source={{ uri: "https://rn.nodejs.cn/img/tiny_logo.png" }} />
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)"
            options={{
              headerStyle: { backgroundColor: "#f4511e" },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold"
              },
              headerShadowVisible: false,
              headerBackTitle: "Back",
              headerRight: () => <LogoTitle />
            }}
          />
          <Stack.Screen name="+not-found" />
          {/* 直接在根 Stack 中配置详情页面，避免嵌套导航栈 */}
          <Stack.Screen
            name="details/[module]/[id]"
            options={{
              headerShown: true,
              presentation: "card",
              gestureEnabled: true,
              gestureDirection: "horizontal",
              headerBackTitle: "返回",
              headerBackVisible: true,
              // 动态标题将在组件内设置
              title: "详情"
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 32,
    height: 32
  }
})
