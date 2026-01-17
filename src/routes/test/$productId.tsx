import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test/$productId")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/test/$productId"!</div>
}
