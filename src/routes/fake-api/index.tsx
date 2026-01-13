import { ProductsSkeleton } from "@/components/ProductSkeltons"
import {
	productsQueryOptions,
	useSuspenseFilteredProducts,
} from "@/lib/queries/products"
import { ProductType } from "@/lib/types/products"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/fake-api/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions)
	},
})

function RouteComponent() {
	return (
		<article className="flex-1 w-full p-10 ">
			<p>
				Aqui utilizamos el {"<"}Suspense{">"}, y solo en ProductsList se hace
				uso del useSuspenseQuery.
			</p>
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				{/* <SearchInput /> */}
			</div>

			<Suspense
				fallback={<ProductsSkeleton from={"SUSPENSE + useSuspenseQuery"} />}
			>
				<ProductsList />
			</Suspense>
		</article>
	)
}

export default function ProductsList({ q }: { q?: string }) {
	const products = useSuspenseFilteredProducts(q).data

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{products.map((product: ProductType) => (
				<Link
					key={product.id}
					to="/fake-api/$productId"
					params={{ productId: String(product.id) }}
					// search={{ q }}
				>
					<Product product={product} />
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
			className={`flex flex-col gap-2 rounded-lg bg-blue-800 p-2 flex-1 min-w-64 shadow-lg`}
		>
			<img src={product.image} alt="" className="w-full h-48 object-contain" />
			<div className="flex-1 flex flex-col justify-between gap-2">
				<h2>{product.title}</h2>
				<div className="flex justify-between items-center">
					<span>{product.category}</span>
					<span>$ {product.price}</span>
				</div>
			</div>
		</div>
	)
}
