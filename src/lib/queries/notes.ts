import { getMongoNotes } from "@/server/notes"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { Note, SearchNotesParams } from "../types/notes"

export const notesQueryOptions = queryOptions({
	queryKey: ["notes"],
	queryFn: () => getMongoNotes(),
})

export const useSuspenseFilteredNotes = ({
	filter,
	sort,
}: SearchNotesParams) => {
	return useSuspenseQuery({
		...notesQueryOptions,
		select: notes => {
			let sortedNotes: Note[] = []
			if (sort === "asc")
				sortedNotes = notes.sort((a, b) => a.title.localeCompare(b.title))
			if (sort === "desc")
				sortedNotes = notes.sort((a, b) => b.title.localeCompare(a.title))

			if (filter === "favorites") return sortedNotes.filter(note => note.pinned)
			return sortedNotes
		},
	})
}
