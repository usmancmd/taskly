import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { theme } from "../theme";

export default function Layout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Shopping List",
					tabBarIcon: ({ color, size }) => {
						return <Feather name="list" size={size} color={color} />;
					},
				}}
			/>
			<Tabs.Screen
				name="counter"
				options={{
					title: "Counter",
					headerShown: false,
					tabBarIcon: ({ color, size }) => {
						return <AntDesign name="clockcircleo" size={size} color={color} />;
					},
				}}
			/>
			<Tabs.Screen
				name="idea"
				options={{
					title: "Idea",
					tabBarIcon: ({ size, color }) => {
						return <FontAwesome5 name="lightbulb" size={size} color={color} />;
					},
				}}
			/>
		</Tabs>
	);
}
