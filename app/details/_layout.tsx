import { Stack } from "expo-router"
import "react-native-reanimated"

export default function DetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "card",
        gestureEnabled: true,
        gestureDirection: "horizontal"
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          presentation: "card"
        }}
      />
      <Stack.Screen
        name="[module]"
        options={{
          presentation: "card"
        }}
      />
    </Stack>
  )
}
