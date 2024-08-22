import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { theme } from "./theme";

export default function App() {
	const handleDelete = () => {
		Alert.alert(
			"Are you sure you want to delete this?",
			"It will be gone for good",
			[
				{
					text: "Yes",
					onPress: () => console.log("ok, deleting..."),
					style: "destructive",
				},
				{
					text: "Cancel",
					style: "cancel",
				},
			]
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.itemContainer}>
				<Text>Coffee</Text>
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.5}
					onPress={handleDelete}>
					<Text style={styles.buttonText}>Delete</Text>
				</TouchableOpacity>
			</View>
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
	itemContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "#1a759f",
		paddingHorizontal: 8,
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	itemText: {
		fontSize: 18,
		fontWeight: "200",
	},
	button: {
		backgroundColor: theme.colorBlack,
		padding: 8,
		borderRadius: 6,
	},
	buttonText: {
		color: theme.colorWhite,
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
});
