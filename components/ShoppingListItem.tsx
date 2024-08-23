import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
	name: string;
	isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted }: Props) {
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
		<View
			style={[
				styles.itemContainer,
				isCompleted ? styles.isCompletedContainer : undefined,
			]}>
			<Text
				style={[
					styles.itemText,
					isCompleted ? styles.completedText : undefined,
				]}>
				{name}
			</Text>
			<TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
				<AntDesign
					name="closecircle"
					size={24}
					color={isCompleted ? theme.colorGrey : theme.colorRed}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "#1a759f",
		paddingHorizontal: 18,
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	isCompletedContainer: {
		backgroundColor: theme.colorLightGrey,
		borderBottomColor: theme.colorLightGrey,
	},
	itemText: {
		fontSize: 18,
		fontWeight: "200",
	},
	completedText: {
		textDecorationLine: "line-through",
		textDecorationColor: theme.colorGrey,
	},
	button: {
		backgroundColor: theme.colorBlack,
		padding: 8,
		borderRadius: 6,
	},
	completedButton: {
		backgroundColor: theme.colorGrey,
	},
	buttonText: {
		color: theme.colorWhite,
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
});
