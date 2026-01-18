import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/fake-api2/")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Elige un producto</div>
}
