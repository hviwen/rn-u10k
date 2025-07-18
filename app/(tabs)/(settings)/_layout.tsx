import { Stack } from "expo-router"
import "react-native-reanimated"

export default function LayoutSettings() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18
          },
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#007BFF"
          },
          headerTitleAlign: "center",
          headerShadowVisible: false
        }}
      />
    </Stack>
  )
}
