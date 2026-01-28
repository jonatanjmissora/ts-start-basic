import { ProductElement } from "@/components/ProductElement"
import { ProductsSkeleton } from "@/components/ProductSkeltons"
import { productsQueryOptions } from "@/lib/queries/products"
import { ProductType } from "@/lib/types/products"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/fake-api4")({
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions)
	},
})

function RouteComponent() {
	return (
		<div className="space-y-4 p-10">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			<p>
				Aca cargo lista en loader, y luego en el loader de $productId pre-cargo
				la query del producto para que cuando se renderice el componente ya esté
				en cache.
			</p>

			<Suspense fallback={<ProductsSkeleton qnt={3} />}>
				<ProductList />
			</Suspense>
			<Outlet />
		</div>
	)
}

const ProductList = () => {
	const { data: products } = useSuspenseQuery(productsQueryOptions)
	return (
		<div className="flex gap-4 my-10">
			{products.slice(0, 3).map((product: ProductType) => (
				<Link
					key={product.id}
					to="/fake-api4/$productId"
					activeProps={{ className: "text-blue-500" }}
					params={{ productId: String(product.id) }}
				>
					<ProductElement product={product} />
				</Link>
			))}
		</div>
	)
}
