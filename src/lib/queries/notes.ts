import { createMongoNote, getMongoNotes } from "@/server/notes"
import {
	QueryClient,
	queryOptions,
	useMutation,
	useSuspenseQuery,
} from "@tanstack/react-query"
import { Note, NoteDocument, SearchNotesParams } from "../types/notes"

export const notesQueryOptions = queryOptions({
	queryKey: ["notes"],
	queryFn: () => getMongoNotes(),
})

export const useCreateMongoNote = (queryClient: QueryClient) => {
	return useMutation({
		mutationFn: createMongoNote,
		onSuccess: async (newNote: NoteDocument) => {
			await queryClient.cancelQueries({ queryKey: ["notes"] })
			const notes = queryClient.getQueryData<Note[]>(["notes"])
			if (!notes) return
			const newNotes = [newNote, ...(notes || [])]
			queryClient.setQueryData(["notes"], newNotes)
			await queryClient.invalidateQueries({ queryKey: ["notes"] })
		},
	})
}

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
