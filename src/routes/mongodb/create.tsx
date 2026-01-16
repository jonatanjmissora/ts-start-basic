import { createMongoNote } from "@/server/notes"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/mongodb/create")({
	component: RouteComponent,
})

function RouteComponent() {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [isCreating, setIsCreating] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim()) return

		setIsCreating(true)
		try {
			const response = await createMongoNote({
				data: { title: title.trim(), content: content.trim() },
			})

			console.log("En componente", response)

			// Clear form
			setTitle("")
			setContent("")

			// Refresh list
			//   await refreshNotes();
		} catch (error) {
			console.error("Failed to create note:", error)
			alert("Failed to create note")
		} finally {
			setIsCreating(false)
		}
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
						{isCreating ? "Creando..." : "Crear"}
					</button>
				</form>
			</article>
		</section>
	)
}
