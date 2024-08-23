import {
	StyleSheet,
	TextInput,
	ScrollView,
	FlatList,
	View,
	Text,
} from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
	id: string;
	name: string;
	completedAtTimestamp?: number;
	lastUpdatedTimestamp: number;
};

export default function App() {
	const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		const fetchInitial = async () => {
			const data = await getFromStorage(storageKey);
			if (data) {
				setShoppingList(data);
			}
		};
		fetchInitial();
	}, []);

	const handleSubmmit = () => {
		if (value) {
			const newShoppingList = [
				{
					id: new Date().toTimeString(),
					name: value,
					lastUpdatedTimestamp: Date.now(),
				},
				...shoppingList,
			];
			setShoppingList(newShoppingList);
			saveToStorage(storageKey, newShoppingList);
			setValue("");
		}
	};

	const handleDelete = (id: string) => {
		const newShoppingList = shoppingList.filter((item) => item.id !== id);
		saveToStorage(storageKey, newShoppingList);
		setShoppingList(newShoppingList);
	};

	const handleToggleCompelte = (id: string) => {
		const newShoppingList = shoppingList.map((item) => {
			if (item.id === id) {
				return {
					...item,
					lastUpdatedTimestamp: Date.now(),
					completedAtTimestamp: item.completedAtTimestamp
						? undefined
						: Date.now(),
				};
			}
			return item;
		});
		saveToStorage(storageKey, newShoppingList);
		setShoppingList(newShoppingList);
	};

	return (
		<FlatList
			data={orderShoppingList(shoppingList)}
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			stickyHeaderIndices={[0]}
			ListEmptyComponent={
				<View style={styles.listEmptyContainer}>
					<Text>Your shopping list is empty</Text>
				</View>
			}
			ListHeaderComponent={
				<TextInput
					placeholder="E.g. Coffee"
					style={styles.textInput}
					value={value}
					onChangeText={setValue}
					returnKeyType="done"
					onSubmitEditing={handleSubmmit}
				/>
			}
			renderItem={({ item }) => (
				<ShoppingListItem
					name={item.name}
					onDelete={() => handleDelete(item.id)}
					onToggleComplete={() => handleToggleCompelte(item.id)}
					isCompleted={Boolean(item.completedAtTimestamp)}
				/>
			)}
		/>
	);
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
	return shoppingList.sort((item1, item2) => {
		if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
			return item2.completedAtTimestamp - item1.completedAtTimestamp;
		}

		if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
			return 1;
		}

		if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
			return -1;
		}

		if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
			return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
		}

		return 0;
	});
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingVertical: 12,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	listEmptyContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 18,
	},
	textInput: {
		borderColor: theme.colorLightGrey,
		borderWidth: 2,
		padding: 12,
		marginHorizontal: 12,
		marginBottom: 12,
		borderRadius: 50,
		backgroundColor: theme.colorWhite,
	},
});
