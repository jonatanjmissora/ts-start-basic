import { getNotes } from "@/server/notes"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/mongodb/")({
	component: RouteComponent,
	loader: async () => {
		return getNotes()
	},
})

function RouteComponent() {
	const notes = Route.useLoaderData()
	return <div>Hello "/mongodb/" {JSON.stringify(notes)}</div>
}
