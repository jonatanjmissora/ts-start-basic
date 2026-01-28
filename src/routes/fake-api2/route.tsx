import { createFileRoute } from "@tanstack/react-router"
import { productQueryOptions } from "@/lib/queries/products"
import { productsQueryOptions } from "@/lib/queries/products"
import { ProductType } from "@/lib/types/products"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { Suspense } from "react"
import { Outlet } from "@tanstack/react-router"
import { ProductElement } from "@/components/ProductElement"
import { ProductsSkeleton } from "@/components/ProductSkeltons"

export const Route = createFileRoute("/fake-api2")({
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions)
		context.queryClient.ensureQueryData(productQueryOptions("1"))
		context.queryClient.ensureQueryData(productQueryOptions("2"))
		context.queryClient.ensureQueryData(productQueryOptions("3"))
	},
})

function RouteComponent() {
	return (
		<article className="flex-1 w-full p-10 flex gap-10">
			<div className="flex flex-col gap-3">
				<div className="flex items-enter justify-between">
					<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				</div>

				<p className="w-1/2">
					en route.tsx, precargo con el loader (cuando hago hover en "Fake
					Api2"), tanto la lista como los 3 elementos individuales. La
					ProductList envuelta en Suspense, y los elementos en el Outlet que los
					precargue en route.tsx.
				</p>
				<p className="w-1/2">
					Uso el Suspense en el productId, cuando refresco la pagina me pone
					cargando, ya que todavia no puede acceder al query. ProductId is
					inmediato porque uso el query de "products"
				</p>

				<Suspense fallback={<ProductsSkeleton qnt={3} />}>
					<ProductsList />
				</Suspense>
			</div>
			<Outlet />
		</article>
	)
}

export default function ProductsList() {
	const products = useSuspenseQuery(productsQueryOptions).data

	return (
		<div className="flex gap-4 my-10">
			{products.slice(0, 3).map((product: ProductType) => (
				<Link
					key={product.id}
					to="/fake-api2/$productId"
					activeProps={{ className: "text-blue-500" }}
					params={{ productId: String(product.id) }}
				>
					<ProductElement product={product} />
				</Link>
			))}
		</div>
	)
}

interface ProductProps {
	product: ProductType | undefined
}

export function Product({ product }: ProductProps) {
	if (!product) {
		return <div>Product not found</div>
	}
	return (
		<div
			key={product?.id}
			className={`flex flex-col justify-between gap-2 rounded-lg bg-blue-800 w-40 h-40 p-2 shadow-lg`}
		>
			<img src={product.image} alt="" className="h-24 object-contain" />
			<div className="flex flex-col justify-between gap-2 text-xs">
				<h2 className="truncate">{product.title}</h2>
				<div className="flex justify-between items-center">
					<span>{product.category}</span>
					<span>$ {product.price}</span>
				</div>
			</div>
		</div>
	)
}
