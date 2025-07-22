import { Text, View } from "react-native"

export function TailwindTest() {
  return (
    <View className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg border-2 border-blue-300 dark:border-blue-700">
      <Text className="text-xl text-red-500 font-bold mb-2">✅ Red Bold Text (Tailwind Test)</Text>
      <Text className="text-base text-green-600 dark:text-green-400 mb-2">✅ Green Text with Dark Mode</Text>
      <Text className="text-lg text-pink-600 dark:text-pink-400 mt-2 mb-2">✅ Pink Text (Same as UserScreen)</Text>

      {/* Additional comprehensive tests */}
      <View className="flex-row justify-between items-center bg-gray-200 dark:bg-gray-800 p-3 rounded-md mb-2">
        <Text className="text-sm text-gray-700 dark:text-gray-300">Flex Layout Test</Text>
        <View className="w-4 h-4 bg-green-500 rounded-full"></View>
      </View>

      <View className="space-y-2">
        <Text className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Typography Test</Text>
        <Text className="text-2xl font-extrabold text-indigo-800 dark:text-indigo-200">Custom Colors Work!</Text>
      </View>

      <View className="mt-4 p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
        <Text className="text-white text-center font-semibold">Custom Theme Colors</Text>
      </View>
    </View>
  )
}
