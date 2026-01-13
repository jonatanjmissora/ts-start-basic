import { getProducts } from "@/server/products"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/fake-api/")({
	component: RouteComponent,
	// loader: async() => {
	//   const response = await getProducts()
	//   return response
	// },
	// pendingComponent: () => <div>Loading...</div>
})

function RouteComponent() {
	// const response = Route.useLoaderData()
	const { data, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	})

	if (isLoading) return <div>Loading...</div>
	return <div>Hello "/fake-api/"! {JSON.stringify(data)}</div>
}
