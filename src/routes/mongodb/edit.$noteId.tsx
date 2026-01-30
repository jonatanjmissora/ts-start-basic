import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Loader, Plus } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Note } from "@/lib/types/notes"
import { useUpdateMongoNote } from "@/lib/queries/notes"

export const Route = createFileRoute("/mongodb/edit/$noteId")({
	loader: ({ params, context }) => {
		const notes = context.queryClient.getQueryData<Note[]>(["notes"])
		const note = notes?.find(note => note.id === params.noteId)
		return note
	},
	component: RouteComponent,
})

function RouteComponent() {
	const note = Route.useLoaderData()
	if (!note) return <div>Nota no encontrada</div>

	return <EditForm note={note} />
}

function EditForm({ note }: { note: Note }) {
	const navigate = useNavigate()
	const [title, setTitle] = useState(note.title)
	const [content, setContent] = useState(note.content)
	const [error, setError] = useState("")
	const queryClient = useQueryClient()

	const { mutateAsync: updateMongoNote, isPending } =
		useUpdateMongoNote(queryClient)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		updateMongoNote(
			{
				data: {
					id: note.id,
					author: note.author,
					title: title,
					content: content,
					pinned: note.pinned,
				},
			},
			{
				onSuccess: () => {
					navigate({ to: "/mongodb", replace: true })
					setTitle("")
					setContent("")
					setError("")
					// sonner mesage goes here
				},
				onError: error => {
					setError(`COMPONENT: ${error}`)
					// sonner error message goes here
				},
			}
		)
	}

	return (
		<section className="flex-1 w-full p-20 flex justify-center">
			<article className="w-1/3 h-max flex flex-col gap-6 bg-blue-800/30 p-6 rounded-lg shadow-lg">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">NOTA A EDITAR</h1>
					<Link to="/mongodb" search={Route.useSearch()}>
						<Plus size={24} className="rotate-45" />
					</Link>
				</div>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Titulo"
						className="bg-blue-100 p-2 text-black"
						defaultValue={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
					<textarea
						placeholder="Contenido"
						className="bg-blue-100 p-2 text-black"
						defaultValue={content}
						onChange={e => setContent(e.target.value)}
						required
					></textarea>
					<button
						type="submit"
						className="bg-blue-500/70 p-2 rounded cursor-pointer"
						disabled={isPending}
					>
						{isPending ? (
							<div className="flex items-center gap-2 justify-center">
								Editando...
								<Loader size={20} className="animate-spin" />
							</div>
						) : (
							"Editar"
						)}
					</button>
					{error && <p className="text-red-600">{error}</p>}
				</form>
			</article>
		</section>
	)
}
