import { getNotes } from "@/server/notes"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

export const notesQueryOptions = queryOptions({
	queryKey: ["notes"],
	queryFn: () => getNotes(),
})

export const useSuspenseFilteredNotes = (q?: string) => {
	return useSuspenseQuery({
		...notesQueryOptions,
		select: notes => {
			if (!q) return notes

			const normalized = q.toLowerCase()

			return notes.filter(p => p.title.toLowerCase().includes(normalized))
		},
	})
}
