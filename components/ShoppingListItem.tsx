import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type Props = {
	name: string;
	isCompleted?: boolean;
	onDelete: () => void;
	onToggleComplete: () => void;
};

export function ShoppingListItem({
	name,
	isCompleted,
	onDelete,
	onToggleComplete,
}: Props) {
	const handleDelete = () => {
		Alert.alert(
			`Are you sure you want to delete ${name}?`,
			"It will be gone for good",
			[
				{
					text: "Yes",
					onPress: () => onDelete(),
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
		<Pressable
			style={[
				styles.itemContainer,
				isCompleted ? styles.isCompletedContainer : undefined,
			]}
			onPress={onToggleComplete}>
			<View style={styles.row}>
				<Entypo
					name={isCompleted ? "check" : "circle"}
					size={24}
					color={isCompleted ? theme.colorGrey : theme.colorCerulean}
				/>
				<Text
					style={[
						styles.itemText,
						isCompleted ? styles.completedText : undefined,
					]}
					numberOfLines={1}>
					{name}
				</Text>
			</View>
			<TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
				<AntDesign
					name="closecircle"
					size={24}
					color={isCompleted ? theme.colorGrey : theme.colorRed}
				/>
			</TouchableOpacity>
		</Pressable>
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
		flex: 1,
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
	row: {
		flexDirection: "row",
		gap: 8,
		flex: 1,
	},
});
