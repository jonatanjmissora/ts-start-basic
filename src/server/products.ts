import { ProductType } from "@/lib/types/products"
import { delay } from "@/lib/utils"
import { createServerFn } from "@tanstack/react-start"

export const getProducts = createServerFn({ method: "GET" }).handler(
	async (): Promise<ProductType[]> => {
		await delay()
		return await fetch("https://fakestoreapi.com/products").then(res =>
			res.json()
		)
	}
)

export const getProduct = async (id: string) => {
	await delay()
	const res = await fetch(`https://fakestoreapi.com/products/${id}`)
	if (!res.ok) throw new Error("Error fetching product")
	return res.json() as Promise<ProductType>
}
