import { ProductElement } from "@/components/ProductElement"
import { ProductType } from "@/lib/types/products"
import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import z from "zod"

export const Route = createFileRoute("/fake-api/$productId")({
	validateSearch: z.object({
		q: z.string().optional(),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { productId } = Route.useParams()
	const router = useRouter()
	const { q } = Route.useSearch()
	const { queryClient } = router.options.context
	const products = queryClient.getQueryData(["products"]) as
		| ProductType[]
		| undefined
	const product = products?.find(p => String(p.id) === productId)
	return (
		<article className="w-full flex-1 flex items-center p-10 flex-col gap-4">
			<Link
				to="/fake-api"
				search={{ q }}
				className="underline mr-auto text-lg font-semibold"
			>
				Volver
			</Link>
			<div className="w-1/2 h-max">
				<ProductElement product={product} />
			</div>
		</article>
	)
}
