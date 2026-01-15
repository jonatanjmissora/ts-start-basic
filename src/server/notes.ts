import { getNotesCollection } from "@/lib/db/mongodb"
import { documentToNote, Note } from "@/lib/types/notes"
import { delay } from "@/lib/utils"
import { createServerFn } from "@tanstack/react-start"

export const getNotes = createServerFn({ method: "GET" }).handler(
	async (): Promise<Note[]> => {
		try {
			const collection = await getNotesCollection()

			// Query database with sort
			const docs = await collection.find({}).sort({ updatedAt: -1 }).toArray()

			await delay()

			// Convert MongoDB documents to client-friendly format
			return docs.map(documentToNote)
		} catch (error) {
			console.error("Error fetching notes:", error)
			throw new Error("Failed to fetch notes")
		}
	}
)
