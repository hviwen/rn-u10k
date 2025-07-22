import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import "react-native-reanimated"

export default function LayoutSettings() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            title: "Profile",
            drawerLabel: "Profile",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18
            },
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#007BFF"
            },
            headerTitleAlign: "center",
            headerShadowVisible: false
          }}
        />

        <Drawer.Screen
          name="user/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "User",
            title: "overview",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18
            },
            headerStyle: {
              backgroundColor: "deeppink"
            },
            headerTintColor: "#fff",
            headerShadowVisible: false
          }}
        />
        <Drawer.Screen
          name="auth/[id]"
          options={{
            drawerLabel: "Supabase Auth",
            title: "Auth",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18
            },
            headerStyle: {
              backgroundColor: "purple"
            },
            headerTintColor: "#fff",
            headerShadowVisible: false
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
