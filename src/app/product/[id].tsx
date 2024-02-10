import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/app/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "../components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { Redirect } from "expo-router"

export default function Product() {
	const { id } = useLocalSearchParams();
	const cartStore = useCartStore();
	const navegation = useNavigation();

	const product = PRODUCTS.find((item) => item.id === id);

	function handleAddToCart() {
		cartStore.add(product!);
		navegation.goBack();
	}

	if(!product) {
		return <Redirect href="/"/>
	}

	return (
		<View className="flex-1">
			<Image source={product.cover} className="w-full h-52" resizeMode="cover" />


			<View className="p-5 mt-8 flex-1">
			<Text className="text-white text-xl font-heading">{product.title}</Text>
				<Text className="text-lime-400 text-2xl font-heading my-2">{formatCurrency(product.price)}</Text>

				<Text className="text-slate-400 font-body text-base leading-6 mb-6">{product.description}</Text>

				{product.ingredients.map((ingrediente) => (
					<Text key={ingrediente} className="text-slate-400 font-body text-base leading-6">
						{"\u2022"}
						{ingrediente}
					</Text>
				))}
			</View>

			<View className="p-5 pb-8 gap-5">
				<Button onPress={handleAddToCart}>
					<Button.Icon>
						<Feather name="plus-circle" size={20} />
					</Button.Icon>
					<Button.Text>Adicionar ao Pedido</Button.Text>
				</Button>

				<LinkButton title="Voltar ao cardápio" href="/" />
			</View>
		</View>
	);
}