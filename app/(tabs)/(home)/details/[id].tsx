import { CountdownOverlay } from "@/components/CountdownOverlay"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useLocalSearchParams } from "expo-router"
import { useCallback } from "react"
import { StyleSheet } from "react-native"

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()

  // 控制 header 显示的函数
  const hideHeader = useCallback(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  const showHeader = useCallback(() => {
    navigation.setOptions({
      headerShown: true
    })
  }, [navigation])

  // 隐藏 tab bar 当进入详情页面时
  useFocusEffect(
    useCallback(() => {
      // 获取父级 tab navigation
      const parent = navigation.getParent()
      if (parent) {
        parent.setOptions({
          tabBarStyle: { display: "none" }
        })
      }

      // 当页面失去焦点时恢复 tab bar
      return () => {
        if (parent) {
          parent.setOptions({
            tabBarStyle: {
              display: "flex",
              position: "absolute"
            }
          })
        }
      }
    }, [navigation])
  )

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol size={200} color="#ececec" name="iphone.badge.exclamationmark" style={styles.headerImage} />
        }
      >
        <ThemedView style={styles.container}>
          <ThemedText type="defaultSemiBold">Detail Screen {`${id}`}</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
      <CountdownOverlay onCountdownStart={hideHeader} onCountdownEnd={showHeader} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headerImage: {
    color: "#ececec",
    bottom: 90,
    left: -35,
    position: "absolute",
    transform: [{ rotate: "-15deg" }]
  }
})
