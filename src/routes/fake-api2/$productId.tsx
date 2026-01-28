import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { productQueryOptions } from "@/lib/queries/products"
import z from "zod"
import { ProductElement } from "@/components/ProductElement"
import { ProductsSkeleton } from "@/components/ProductSkeltons"

export const Route = createFileRoute("/fake-api2/$productId")({
	validateSearch: z.object({
		q: z.string().optional(),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<article className="w-full flex-1 flex items-center p-10 flex-col gap-4">
			<Link to="/fake-api2" className="underline mr-auto text-lg font-semibold">
				Volver
			</Link>
			<div className="w-1/2 h-max">
				<Suspense fallback={<ProductsSkeleton qnt={1} />}>
					<ProductSuspense />
				</Suspense>
			</div>
		</article>
	)
}

const ProductSuspense = () => {
	const { productId } = Route.useParams()
	const product = useSuspenseQuery(productQueryOptions(productId))
	return <ProductElement product={product.data} />
}
