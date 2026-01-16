import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useCreateMongoNote } from "@/lib/queries/notes"

export const Route = createFileRoute("/mongodb/create")({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const queryClient = useQueryClient()

	const { mutate: createNote, isPending } = useCreateMongoNote(queryClient)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim()) return

		createNote(
			{ data: { title: title.trim(), content: content.trim() } },
			{ onSuccess: () => navigate({ to: "/mongodb", replace: true }) }
		)
	}

	return (
		<section className="flex-1 w-full p-20 flex justify-center">
			<article className="w-1/3 h-max flex flex-col gap-6 bg-blue-800/30 p-6 rounded-lg shadow-lg">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">NOTA NUEVA</h1>
					<Link to="/mongodb" search={Route.useSearch()}>
						<Plus size={24} className="rotate-45" />
					</Link>
				</div>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Titulo"
						className="bg-blue-100 p-2 text-black"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<textarea
						placeholder="Contenido"
						className="bg-blue-100 p-2 text-black"
						value={content}
						onChange={e => setContent(e.target.value)}
					></textarea>
					<button
						type="submit"
						className="bg-blue-500/70 p-2 rounded cursor-pointer"
					>
						{isPending ? "Creando..." : "Crear"}
					</button>
				</form>
			</article>
		</section>
	)
}
