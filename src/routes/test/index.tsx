import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test/")({
	component: RouteComponent,
	loader: ({ context }) => {
		return context.queryClient.getQueryData(["products"])
	},
})

function RouteComponent() {
	const products = Route.useLoaderData()

	return <div>{products ? JSON.stringify(products) : "No products"}</div>
}
