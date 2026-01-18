import { getProduct, getProducts } from "@/server/products"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

export const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => getProducts(),
	refetchInterval: 60 * 1000,
})

export const productQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["product", id],
		queryFn: async () => getProduct(id),
		refetchInterval: 60 * 1000,
	})

export const useSuspenseFilteredProducts = (q?: string) => {
	return useSuspenseQuery({
		...productsQueryOptions,
		select: products => {
			if (!q) return products

			const normalized = q.toLowerCase()

			return products.filter(p => p.title.toLowerCase().includes(normalized))
		},
	})
}
