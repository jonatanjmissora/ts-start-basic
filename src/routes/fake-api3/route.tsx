import {
	productQueryOptions,
	productsQueryOptions,
} from "@/lib/queries/products"
import { ProductType } from "@/lib/types/products"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/fake-api3")({
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions)
	},
})

function RouteComponent() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			<p>
				Aca cargo lista en loader, y en el listado de links hago prefetch en
				hover de la query del producto para ponerla en cache, y luego la consumo
				cuando renderizo.
			</p>

			<Suspense fallback={<div>Cargando sección...</div>}>
				<ProductList />
			</Suspense>
			<Outlet />
		</div>
	)
}

const ProductList = () => {
	const { data: products } = useSuspenseQuery(productsQueryOptions)
	const queryClient = useQueryClient()
	return (
		<div className="flex flex-col gap-4 my-10">
			{products.slice(0, 3).map((product: ProductType) => (
				<Link
					key={product.id}
					to="/test/$productId"
					activeProps={{ className: "text-blue-500" }}
					params={{ productId: String(product.id) }}
					onMouseEnter={() =>
						queryClient.prefetchQuery(productQueryOptions(String(product.id)))
					}
				>
					{product.title}
				</Link>
			))}
		</div>
	)
}
