import { Redirect, Stack } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"

export const unstable_settings = {
  initialRouteName: "index"
}

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  console.log("isSignedIn", isSignedIn)

  if (isSignedIn) {
    return (
      <Redirect
        href={{
          pathname: "/(auth)/sign-in"
        }}
      />
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false
        }}
      />
    </Stack>
  )
}
