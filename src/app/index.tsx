import { Header } from "@/app/components/header";
import { View, Text, FlatList } from "react-native";
import { CATEGORIES } from "@/utils/data/products";
import { CategoryButton } from "./components/category-button";
import { useState } from "react";
export default function Home() {
	
	const [category, setCategory] = useState(CATEGORIES[0])

	function handleCategorySelect(selectCategory: string) {
		setCategory(selectCategory)
	}

	return (
		<View className="flex-1">
			<Header title="Faça seu pedido" cardQuantityItems={9} />
			<FlatList
				data={CATEGORIES}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <CategoryButton title={item} isSelected={item === category}
				onPress={() => handleCategorySelect(item)}
				 />}
				horizontal
				className="max-h-10 mt-5"
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
			/>
		</View>
	);
}
