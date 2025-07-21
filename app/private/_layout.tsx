import { Stack } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"
import { Redirect } from "expo-router"

export default function PrivateLayout() {
  const { isSignedIn } = useAuth()

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return (
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
          title: "Private Dashboard"
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Private Profile"
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Private Settings"
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard"
        }}
      />
    </Stack>
  )
}
