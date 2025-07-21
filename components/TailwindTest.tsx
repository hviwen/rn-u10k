import { View, Text } from "react-native"

export function TailwindTest() {
  return (
    <View className="p-4 bg-blue-100 dark:bg-blue-900">
      <Text className="text-xl text-red-500 font-bold mb-2">Red Bold Text (Tailwind Test)</Text>
      <Text className="text-base text-green-600 dark:text-green-400">Green Text with Dark Mode</Text>
      <Text className="text-lg text-pink-600 dark:text-pink-400 mt-2">Pink Text (Same as UserScreen)</Text>
    </View>
  )
}
