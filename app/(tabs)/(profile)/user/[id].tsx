import { Text } from "react-native"
import { Image } from "expo-image"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { TailwindTest } from "@/components/TailwindTest"

export default function UserScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          className="absolute h-[178px] w-[290px] -bottom-5 -left-5"
        />
      }
    >
      <ThemedView className="gap-2 p-5">
        {/* Test component to verify NativeWind is working */}
        <TailwindTest />

        <ThemedText className="text-xl text-pink-600 dark:text-pink-400" onPress={() => router.back()}>
          User Screen (ThemedText with Tailwind)
        </ThemedText>
        <ThemedText type="defaultSemiBold">User Screen {`${id}`} (ThemedText with type)</ThemedText>
        <Text className="text-xl text-pink-600 dark:text-pink-400">Welcome to Tailwind (Regular Text)</Text>
      </ThemedView>
    </ParallaxScrollView>
  )
}
