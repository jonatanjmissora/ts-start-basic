import { productQueryOptions } from "@/lib/queries/products"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense } from "react"
import z from "zod"
import { Product } from "../fake-api"

export const Route = createFileRoute("/fake-api4/$productId")({
	validateSearch: z.object({
		q: z.string().optional(),
	}),
	component: RouteComponent,
	loader: ({ params, context }) => {
		context.queryClient.ensureQueryData(productQueryOptions(params.productId))
	},
})

function RouteComponent() {
	return (
		<article className="w-full flex-1 flex items-center p-10 flex-col gap-4">
			<Link to="/fake-api4" className="underline mr-auto text-lg font-semibold">
				Volver
			</Link>
			<div className="w-1/2 h-max">
				<Suspense fallback={<div>Cargando...</div>}>
					<ProductSuspense />
				</Suspense>
			</div>
		</article>
	)
}

const ProductSuspense = () => {
	const { productId } = Route.useParams()
	const product = useSuspenseQuery(productQueryOptions(productId))
	return <Product product={product.data} />
}
