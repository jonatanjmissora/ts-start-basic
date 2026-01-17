import { delay } from "@/lib/utils"
import { queryOptions } from "@tanstack/react-query"

export const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: async () => {
		await delay()
		return await fetch("https://fakestoreapi.com/products").then(res =>
			res.json()
		)
	},
})

export const productQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ["product", id],
		queryFn: async () => {
			await delay()
			return await fetch(`https://fakestoreapi.com/products/${id}`).then(res =>
				res.json()
			)
		},
	})
