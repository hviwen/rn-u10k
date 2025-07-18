import { Stack, useLocalSearchParams } from "expo-router"
import "react-native-reanimated"

// 模块配置
const moduleConfig = {
  home: {
    title: "Home Details",
    headerStyle: { backgroundColor: "#f4511e" },
    headerTintColor: "#fff"
  },
  settings: {
    title: "Settings Details",
    headerStyle: { backgroundColor: "#007BFF" },
    headerTintColor: "#fff"
  },
  default: {
    title: "Details",
    headerStyle: { backgroundColor: "#f4511e" },
    headerTintColor: "#fff"
  }
}

export default function ModuleDetailsLayout() {
  const { module } = useLocalSearchParams<{ module: string }>()

  // 获取模块配置
  const config = moduleConfig[module as keyof typeof moduleConfig] || moduleConfig.default

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: config.title,
          headerStyle: config.headerStyle,
          headerTintColor: config.headerTintColor,
          presentation: "card",
          gestureEnabled: true
        }}
      />
    </Stack>
  )
}
