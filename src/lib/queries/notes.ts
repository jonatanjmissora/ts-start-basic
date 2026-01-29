import { createMongoNote, deleteMongoNote, getMongoNotes } from "@/server/notes"
import {
	QueryClient,
	queryOptions,
	useMutation,
	useSuspenseQuery,
} from "@tanstack/react-query"
import { Note, SearchNotesParams } from "../types/notes"

export const notesQueryOptions = queryOptions({
	queryKey: ["notes"],
	queryFn: () => getMongoNotes(),
	refetchInterval: 60 * 1000,
})

export const useCreateMongoNote = (queryClient: QueryClient) => {
	return useMutation({
		mutationFn: createMongoNote,
		onSuccess: async ({ newNote }) => {
			await queryClient.cancelQueries({ queryKey: ["notes"] })
			const notes = queryClient.getQueryData<Note[]>(["notes"])
			if (!notes) return
			console.log("NEW NOTE", newNote)
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

export const useDeleteMongoNote = (queryClient: QueryClient) => {
	return useMutation({
		mutationFn: deleteMongoNote,
		onSuccess: async (_data, variables) => {
			if (!variables.data.id) return
			await queryClient.cancelQueries({ queryKey: ["notes"] })
			const oldNotes = queryClient.getQueryData<Note[]>(["notes"])
			if (!oldNotes) return
			const deletedNote = oldNotes.find(
				oldNote => oldNote.id === variables.data.id
			)
			console.log("DELETED NOTE", deletedNote)
			const newNotes = oldNotes.filter(
				oldNote => oldNote.id !== variables.data.id
			)
			queryClient.setQueryData(["notes"], newNotes)
		},
	})
}
