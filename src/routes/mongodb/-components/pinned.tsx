import { Note } from "@/lib/types/notes"
import { Star, StarOff } from "lucide-react"

export const PinnedButton = ({ note }: { note: Note }) => {
	return (
		<button className="cursor-pointer">
			{note.pinned ? <Star size={20} /> : <StarOff size={20} />}
		</button>
	)
}
