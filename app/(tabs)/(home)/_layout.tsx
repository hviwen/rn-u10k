import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"

export default function HomeLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../../../assets/fonts/SpaceMono-Regular.ttf")
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: true,
            headerTitleStyle: {
              fontFamily: "SpaceMono",
              fontSize: 18
            },
            headerTitleAlign: "center",
            headerShadowVisible: false
          }}
        />
        <Stack.Screen
          name="details/[id]"
          options={({ route }) => ({
            headerShown: true,
            title: `${(route.params as any)?.id || "details"} Details`,
            headerTitleStyle: {
              fontFamily: "SpaceMono",
              fontSize: 18
            },
            headerTitleAlign: "center",
            headerShadowVisible: false
          })}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
