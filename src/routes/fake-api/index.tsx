import { getProducts } from '@/server/products'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fake-api/')({
  component: RouteComponent,
  loader: async() => {
    const response = await getProducts()
    return response
  },
  pendingComponent: () => <div>Loading...</div>
})

function RouteComponent() {
  const response = Route.useLoaderData()
  return <div>Hello "/fake-api/"! {JSON.stringify(response)}</div>
}
