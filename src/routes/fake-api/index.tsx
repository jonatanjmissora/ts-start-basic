import { ProductElement } from "@/components/ProductElement"
import { ProductsSkeleton } from "@/components/ProductSkeltons"
import { SearchInput } from "@/components/SearchInput"
import {
	productsQueryOptions,
	useSuspenseFilteredProducts,
} from "@/lib/queries/products"
import { ProductType } from "@/lib/types/products"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense } from "react"
import z from "zod"

export const Route = createFileRoute("/fake-api/")({
	validateSearch: z.object({
		q: z.string().optional(),
	}),
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions)
	},
})

function RouteComponent() {
	return (
		<article className="flex-1 w-full p-10">
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				<SearchInput />
			</div>

			<p>
				en index.tsx, pre-cargo con el loader cuando hago hover en el link "Fake
				Api", envuelvo al componente con Suspense, y en ProductList consumo con
				el useSuspenseQuery()
			</p>
			<p>
				Aca en productId no cargo nada de la api, porque uso el cache para
				encontrar el elemento
			</p>

			<Suspense fallback={<ProductsSkeleton />}>
				<ProductsList />
			</Suspense>
		</article>
	)
}

export default function ProductsList() {
	const { q } = Route.useSearch()
	const products = useSuspenseFilteredProducts(q).data

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{products.map((product: ProductType) => (
				<Link
					key={product.id}
					to="/fake-api/$productId"
					params={{ productId: String(product.id) }}
					search={{ q }}
				>
					<ProductElement product={product} />
				</Link>
			))}
		</div>
	)
}
