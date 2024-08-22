import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

type Props = {
	name: string;
};

export function ShoppingListItem({ name }: Props) {
	const handleDelete = () => {
		Alert.alert(
			`Are you sure you want to delete ${name}?`,
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
		<View style={styles.itemContainer}>
			<Text style={styles.itemText}>{name}</Text>
			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.5}
				onPress={handleDelete}>
				<Text style={styles.buttonText}>Delete</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
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
