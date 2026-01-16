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

export const createMongoNote = createServerFn({ method: "POST" })
	.inputValidator(createNoteSchema) // ← Automatic validation!
	.handler(async ({ data }) => {
		try {
			const collection = await getNotesCollection()

			// Create note document
			const newNote: NoteDocument = {
				title: data.title,
				content: data.content,
				author: "",
				pinned: false,
			}

			// Insert into database
			const result = await collection.insertOne(newNote as any)
			console.log("En servidor", result)

			// Fetch the created note
			const created = await collection.findOne({ _id: result.insertedId })

			if (!created) {
				throw new Error("Note created but could not be retrieved")
			}

			return documentToNote(created)
		} catch (error) {
			console.error("Error creating note:", error)
			throw new Error("Failed to create note")
		}
	})

export const deleteMongoNote = createServerFn({ method: "POST" })
	.inputValidator(deleteNoteSchema)
	.handler(async ({ data }) => {
		try {
			const collection = await getNotesCollection()

			const result = await collection.deleteOne({
				_id: new ObjectId(data.id),
			})
			console.log("Delete on server:", result)

			if (result.deletedCount === 0) {
				throw new Error("Note not found")
			}

			return { success: true }
		} catch (error) {
			console.error("Error deleting note:", error)
			if (error instanceof Error && error.message === "Note not found") {
				throw error
			}
			throw new Error("Failed to delete note")
		}
	})
