import { getNotesCollection } from "@/lib/db/mongodb"
import {
	createNoteSchema,
	deleteNoteSchema,
	documentToNote,
	Note,
	NoteDocument,
} from "@/lib/types/notes"
import { delay } from "@/lib/utils"
import { createServerFn } from "@tanstack/react-start"
import { ObjectId } from "mongodb"

export const getMongoNotes = createServerFn({ method: "GET" }).handler(
	async (): Promise<Note[]> => {
		try {
			await delay()
			const collection = await getNotesCollection()

			// Query database with sort
			const docs = await collection.find({}).sort({ updatedAt: -1 }).toArray()

			// Convert MongoDB documents to client-friendly format
			return docs.map(documentToNote)
		} catch (error) {
			console.error("Error fetching notes:", error)
			throw new Error("Failed to fetch notes")
		}
	}
)

export const createMongoNote = createServerFn({ method: "POST" })
	.inputValidator(createNoteSchema) // ← Automatic validation!
	.handler(async ({ data }) => {
		try {
			await delay()
			const collection = await getNotesCollection()

			// Create note document
			const newNote: NoteDocument = {
				title: data.title,
				content: data.content,
				author: "kp_36204bd6138c4b029b7f77d84fe30093",
				pinned: false,
			}

			// Insert into database
			const result = await collection.insertOne({
				...newNote,
				_id: new ObjectId(),
			})

			return {
				newNote: documentToNote({ ...newNote, _id: result.insertedId }),
			}
		} catch (error: any) {
			console.error("SERVER: Error creating note:", error)
			throw new Error(`SERVER: ${error?.message}`)
		}
	})

export const deleteMongoNote = createServerFn({ method: "POST" })
	.inputValidator(deleteNoteSchema)
	.handler(async ({ data }) => {
		try {
			await delay()
			const collection = await getNotesCollection()

			const result = await collection.deleteOne({
				_id: new ObjectId(data.id),
			})
			console.log("Delete on server:", result)

			if (result.deletedCount === 0) {
				throw new Error("Note not found")
			}

			return { note: data }
		} catch (error: any) {
			console.error("SERVER: Error creating note:", error)
			throw new Error(`SERVER: ${error?.message}`)
		}
	})
