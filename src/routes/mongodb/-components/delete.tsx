import { useDeleteMongoNote } from "@/lib/queries/notes"
import { Note } from "@/lib/types/notes"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Loader, Trash2 } from "lucide-react"

export const DeleteButton = ({ note }: { note: Note }) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { mutate: deleteMongoNote, isPending } = useDeleteMongoNote(queryClient)

	const handleDelete = async () => {
		// try {
		// 	const result = await deleteMongoNote({ data: { id: note.id } })
		// 	console.log("Delete result:", result)
		// 	//   setDeleteConfirmId(null);
		// 	//   await refreshNotes();
		// } catch (error) {
		// 	console.error("Failed to delete note:", error)
		// 	alert("Failed to delete note")
		// }
		deleteMongoNote(
			{ data: { id: note.id } },
			{
				onSuccess: () => {
					navigate({ to: "/mongodb", replace: true })
					// sonner mesage goes here
				},
				onError: error => {
					alert(`COMPONENT: ${error}`)
					// sonner error message goes here
				},
			}
		)
	}

	return (
		<button className="cursor-pointer" onClick={handleDelete}>
			{isPending ? (
				<Loader size={20} className="animate-spin" />
			) : (
				<Trash2 size={20} />
			)}
		</button>
	)
}
