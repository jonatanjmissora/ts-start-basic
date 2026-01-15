import { getNotes } from "@/server/notes"
import { queryOptions } from "@tanstack/react-query"

export const notesQueryOptions = queryOptions({
	queryKey: ["notes"],
	queryFn: () => getNotes(),
})
