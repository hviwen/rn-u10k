import { Stack } from "expo-router"
import "react-native-reanimated"

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Home",
        headerStyle: {
          backgroundColor: "#f4511e"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    />
  )
}
