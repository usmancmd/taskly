import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";

export default function App() {
	return (
		<View style={styles.container}>
			<ShoppingListItem name="Coffee" />
			<ShoppingListItem name="Tea" isCompleted />
			<ShoppingListItem name="Sugar" isCompleted />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// alignItems: "center",
		justifyContent: "center",
	},
});
