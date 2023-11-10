import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, View, Text } from "react-native";
import Colors from "../../constants/Colors";
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#006C3E",
        tabBarInactiveTintColor: "#000",
      }}
      
    >
      <Tabs.Screen
        name="addProduct"
        options={{
          tabBarShowLabel: false,
          title: "Adicionar Produto",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={25} color={color} />
          ),
          headerRight: () => (
            <Link href="/infos" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    icon="fa-solid fa-list"
                    size={25}
                    color={"#006C3E"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarShowLabel: false,
          title: "Lista de Produtos",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
