import { StyleSheet, TextInput, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
	id: string;
	name: string;
};

const initialList: ShoppingListItemType[] = [
	{ id: "1", name: "Coffee" },
	{ id: "2", name: "Tea" },
	{ id: "3", name: "Milk" },
];

export default function App() {
	const [shoppingList, setShoppingList] =
		useState<ShoppingListItemType[]>(initialList);
	const [value, setValue] = useState("");

	const handleSubmmit = () => {
		if (value) {
			const newShoppingList = [
				{ id: new Date().toTimeString(), name: value },
				...shoppingList,
			];
			setShoppingList(newShoppingList);
			setValue("");
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="E.g. Coffee"
				style={styles.textInput}
				value={value}
				onChangeText={setValue}
				returnKeyType="done"
				onSubmitEditing={handleSubmmit}
			/>
			{shoppingList.map((item) => (
				<ShoppingListItem name={item.name} key={item.id} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 12,
		// alignItems: "center",
		// justifyContent: "center",
	},
	textInput: {
		borderColor: theme.colorLightGrey,
		borderWidth: 2,
		padding: 12,
		marginHorizontal: 12,
		marginBottom: 12,
		borderRadius: 50,
	},
});
