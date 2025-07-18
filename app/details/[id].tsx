import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Link, useLocalSearchParams } from "expo-router"
import { StyleSheet } from "react-native"

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()
  console.log("DetailsScreen", id)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol size={200} color="#ececec" name="rectangle.on.rectangle.angled" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Details Page</ThemedText>
        <ThemedText type="defaultSemiBold">Detail Screen {`${id}`}</ThemedText>
        <ThemedText style={styles.description}>这个页面现在位于根目录下，不会显示底部的 tabbar。</ThemedText>

        <Link href={`/details/${Math.floor(Math.random() * 1000)}`} style={styles.link}>
          <ThemedText type="link">跳转到另一个详情页</ThemedText>
        </Link>

        <Link href="/(tabs)/(settings)" style={styles.link}>
          <ThemedText type="link">返回设置页面</ThemedText>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#ececec"
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 16
  },
  description: {
    marginVertical: 16,
    lineHeight: 24
  },
  link: {
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8
  }
})
