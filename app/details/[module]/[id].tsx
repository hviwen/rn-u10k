import { CountdownOverlay } from "@/components/CountdownOverlay"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { useNavigation } from "@react-navigation/native"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useEffect } from "react"
import { Pressable, StyleSheet } from "react-native"

// 模块配置
const moduleConfig = {
  home: {
    title: "Home Detail",
    headerColor: { light: "#A1CEDC", dark: "#1D3D47" },
    headerStyle: { backgroundColor: "#A1CEDC" },
    headerTintColor: "#fff",
    icon: "iphone.badge.exclamationmark",
    iconStyle: {
      color: "#ececec",
      bottom: 90,
      left: -35,
      position: "absolute" as const,
      transform: [{ rotate: "-15deg" }]
    },
    showCountdown: true,
    description: "这是 Home 模块的详情页面，包含倒计时功能。"
  },
  settings: {
    title: "Settings Detail",
    headerColor: { light: "#007BFF", dark: "#0056b3" },
    headerStyle: { backgroundColor: "#007BFF" },
    headerTintColor: "#fff",
    icon: "info.circle.fill",
    iconStyle: {
      color: "#fff"
    },
    showCountdown: false,
    description: "这是 Settings 模块的详情页面，专注于配置和设置信息。"
  },
  default: {
    title: "Detail",
    headerColor: { light: "#D0D0D0", dark: "#353636" },
    headerStyle: { backgroundColor: "#D0D0D0" },
    headerTintColor: "#333",
    icon: "rectangle.on.rectangle.angled",
    iconStyle: {
      color: "#ececec"
    },
    showCountdown: false,
    description: "这是通用的详情页面。"
  }
}

export default function ModuleDetailsScreen() {
  const { module, id } = useLocalSearchParams<{ module: string; id: string }>()
  const navigation = useNavigation()
  // 获取模块配置
  const config = moduleConfig[module as keyof typeof moduleConfig] || moduleConfig.default

  // 设置动态导航选项
  useEffect(() => {
    navigation.setOptions({
      title: config.title,
      headerStyle: config.headerStyle,
      headerTintColor: config.headerTintColor,
      headerBackTitle: "返回"
    })
  }, [navigation, config])

  const hideHeader = useCallback(() => {
    if (module === "home" && config.showCountdown) {
      navigation.setOptions({
        headerShown: false
      })
    }
  }, [navigation, module, config.showCountdown])

  const showHeader = useCallback(() => {
    if (module === "home" && config.showCountdown) {
      navigation.setOptions({
        headerShown: true,
        title: config.title,
        headerStyle: config.headerStyle,
        headerTintColor: config.headerTintColor,
        headerBackTitle: "返回"
      })
    }
  }, [navigation, module, config])

  const handleNavigateToDetails = (targetModule: string, targetId?: string) => {
    const newId = targetId || Math.floor(Math.random() * 1000).toString()
    router.push(`/details/${targetModule}/${newId}` as any)
  }

  const handleNavigateBack = (targetModule: string) => {
    console.log("Navigating back to", targetModule, "module")

    // 使用 router.navigate 清空导航栈并返回到对应的 tab 首页
    let pathname = "" as any
    switch (targetModule) {
      case "home":
        pathname = "/(tabs)/(home)/"
        break
      case "settings":
        pathname = "/(tabs)/(settings)/"
        break
      default:
        pathname = "/(tabs)/(home)/"
        break
    }

    // 使用 navigate 而不是 back，这样会清空中间的导航栈
    router.dismissAll()
    router.navigate(pathname)
  }

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={config.headerColor}
        hasBottomTabOverflow={false}
        headerImage={
          <IconSymbol
            size={module === "settings" ? 146 : 200}
            color={config.iconStyle.color}
            name={config.icon}
            style={config.iconStyle}
          />
        }
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={[styles.title, { color: module === "settings" ? "#007BFF" : "#333" }]}>
            {config.title}
          </ThemedText>

          <ThemedText style={styles.idText}>ID: {id}</ThemedText>

          <ThemedText style={styles.moduleText}>模块: {module}</ThemedText>

          <ThemedText style={styles.description}>{config.description}</ThemedText>

          {/* 导航按钮区域 */}
          <ThemedView style={styles.navigationSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              页面导航
            </ThemedText>

            {/* 同模块内导航 */}
            <Pressable onPress={() => handleNavigateToDetails(module)} style={styles.navButton}>
              <ThemedText type="link" style={styles.navButtonText}>
                跳转到另一个{config.title}页面
              </ThemedText>
            </Pressable>

            {/* 跨模块导航 */}
            {module !== "home" && (
              <Pressable onPress={() => handleNavigateToDetails("home")} style={styles.navButton}>
                <ThemedText type="link" style={styles.navButtonText}>
                  跳转到 Home 详情页
                </ThemedText>
              </Pressable>
            )}

            {module !== "settings" && (
              <Pressable onPress={() => handleNavigateToDetails("settings")} style={styles.navButton}>
                <ThemedText type="link" style={styles.navButtonText}>
                  跳转到 Settings 详情页
                </ThemedText>
              </Pressable>
            )}

            {/* 返回主页 */}
            <Pressable onPress={() => handleNavigateBack(module)} style={[styles.navButton, styles.backButton]}>
              <ThemedText type="link" style={[styles.navButtonText, styles.backButtonText]}>
                返回{module === "home" ? "Home" : "Settings"}主页
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>

      {/* 仅在 Home 模块显示倒计时覆盖层 */}
      {module === "home" && config.showCountdown && (
        <CountdownOverlay onCountdownStart={hideHeader} onCountdownEnd={showHeader} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  idText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666"
  },
  moduleText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic"
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginVertical: 16
  },
  navigationSection: {
    marginTop: 24,
    gap: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333"
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 4
  },
  navButtonText: {
    fontSize: 16,
    textAlign: "center"
  },
  backButton: {
    backgroundColor: "#007BFF",
    marginTop: 8
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold"
  }
})
