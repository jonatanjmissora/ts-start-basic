import { usePinnedMongoNote } from "@/lib/queries/notes"
import { Note } from "@/lib/types/notes"
import { useQueryClient } from "@tanstack/react-query"
import { Star, StarOff } from "lucide-react"
import { useState } from "react"

export const PinnedButton = ({ note }: { note: Note }) => {
	const [checked, setChecked] = useState(note.pinned)
	const queryClient = useQueryClient()
	const { mutateAsync: pinnedMongoNote, isPending } =
		usePinnedMongoNote(queryClient)

	const handleChange = () => {
		const updatedNote = { ...note, pinned: !note.pinned }
		pinnedMongoNote(
			{ data: updatedNote },
			{
				onSuccess: () => {
					setChecked(!checked)
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
		<>
			<input
				id={`pinned-${note.id}`}
				type="checkbox"
				className="hidden"
				defaultChecked={note.pinned}
				onChange={handleChange}
				disabled={isPending}
			/>
			<label htmlFor={`pinned-${note.id}`} className="cursor-pointer">
				{checked ? (
					<Star size={20} className={isPending ? "animate-spin" : ""} />
				) : (
					<StarOff size={20} className={isPending ? "animate-spin" : ""} />
				)}
			</label>
		</>
	)
}
